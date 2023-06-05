import {
  Card,
  Center,
  SlideFade,
  CardHeader,
  CardBody,
  Icon,
  Input,
  Button,
  Text,
  Image,
  Box,
  useToast,
} from '@chakra-ui/react';
import NicePage from '../components/nicepage';
import { Typewriter, useTypewriter } from 'react-simple-typewriter';
import { useEffect, useState } from 'react';
import { TbHexagonNumber1, TbHexagonNumber2 } from 'react-icons/tb';
import { IoIosCheckmarkCircle, IoIosCloseCircle } from 'react-icons/io';

import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import firebase from '../firebaseConfig'; //needed
import { queryStorageFieldExists, setStorage } from '../customStuff/useDB';

import { useRouter } from 'next/router';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function onboarding() {
  const toast = useToast();

  /* -------------------------------------------------------------------------- */
  /*                                 TypeWriter                                 */
  /* -------------------------------------------------------------------------- */

  const [text, helper] = useTypewriter({
    // words: ['Looks like you are new here ...', 'Welcome to Project A ...', 'Lets get started'],
    words: ['L'],
    loop: 1,
    typeSpeed: 10,
    deleteSpeed: 5,
    delaySpeed: 1000,
  });
  const { isDone } = helper;
  const [displayCard, setDisplayCard] = useState(false);
  useEffect(() => {
    if (isDone) {
      setTimeout(() => {
        setDisplayCard('Step 1');
      }, 500);
    }
  }, [isDone]);

  /* -------------------------------------------------------------------------- */
  /*                                   Step 1                                   */
  /* -------------------------------------------------------------------------- */

  const [usernameInputValue, setusernameInputValue] = useState('');
  const [isusernameValid, setIsusernameValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isContinueBtnLoading, setIsContinueBtnLoading] = useState(false);
  const handleInputChange = (event) => {
    const value = event.target.value;
    setusernameInputValue(value);
    setIsusernameValid(/^[a-zA-Z0-9_-]+$/.test(value));
    setErrorMessage(
      /^[a-zA-Z0-9_-]+$/.test(value)
        ? ''
        : 'Username can only contain alphanumeric characters, hyphens, and underscores.'
    );
  };
  const handleContinue = async () => {
    // Check if username meets the criteria
    if (!isusernameValid || usernameInputValue.trim().length === 0 || usernameInputValue.length > 80) {
      setIsusernameValid(false);
      setErrorMessage(
        'Username must be up to 80 characters and can only contain alphanumeric characters, hyphens, and underscores.'
      );
      return;
    }

    setIsContinueBtnLoading(true);
    //Check if username taken
    const isUsernameTaken = await queryStorageFieldExists('Users', 'username', usernameInputValue);
    if (isUsernameTaken) {
      setIsusernameValid(false);
      setErrorMessage('This username is taken. Please choose another one');
      setIsContinueBtnLoading(false);
      return;
    }

    setDisplayCard('Step 2');
    return;
  };

  /* -------------------------------------------------------------------------- */
  /*                                   Step 2                                   */
  /* -------------------------------------------------------------------------- */

  const router = useRouter();
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const db = getFirestore(firebase);
  const ranks = [
    {
      id: 1,
      name: 'Iron',
      imageSrc: '/rank-icons/iron2.png',
      description: 'I am completely new to programming and have never done it before.',
    },
    {
      id: 2,
      name: 'Bronze',
      imageSrc: '/rank-icons/bronze2.png',
      description: `I understand basic programming concepts in my preferred language such as variables, conditions, arrays, functions. I have no competitive programming specific knowledge.`,
    },
    {
      id: 3,
      name: 'Silver',
      imageSrc: '/rank-icons/silver2.png',
      description: 'I am a pro',
    },
    {
      id: 4,
      name: 'Gold',
      imageSrc: '/rank-icons/gold2.png',
      description: 'I am a pro',
    },
    // Add more ranks as needed
  ];

  const [slideIndex, setSlideIndex] = useState(0);
  const handleChangeSlide = (index) => {
    setSlideIndex(ranks[index].name.toLowerCase());
  };

  const handleFinish = async () => {
    //Check User signed in
    if (!user) {
      toast({
        title: 'Account Onboarding failed.',
        description: 'User not signed in',
        status: 'error',
        duration: 6000,
        isClosable: true,
      });
      return;
    }

    console.log('slide index is', slideIndex);
    await setStorage('Users', user.uid, {
      username: usernameInputValue,
      pRank: slideIndex,
    })
      .then(() => {
        toast({
          title: 'Account Onboarding Successful.',
          description: `You will be redirected to the dashboard shortly`,
          status: 'success',
          duration: 6000,
          isClosable: true,
        });
        router.push('/dashboard');
      })
      .catch((e) => {
        toast({
          title: 'Account Onboarding failed.',
          description: `If you contact support, tell them this error: ${e.errorMessage}`,
          status: 'error',
          duration: 6000,
          isClosable: true,
        });
      });
  };

  return (
    <NicePage className='h-full'>
      <Center className='min-h-screen h-full flex flex-col mt-24 '>
        <h1 className='mono text-4xl mb-12'>{text}|</h1>
        {displayCard == 'Step 1' && (
          <SlideFade in={displayCard} className='w-full flex justify-center '>
            <Card className=' robo mt-8 mx-2 w-full md:w-1/2 rounded-lg' bg='backL'>
              <CardHeader className='text-3xl font-bold w-full'>
                <div className='flex items-center'>
                  <Icon as={TbHexagonNumber1} color='primc' className='mr-4 scale-150'></Icon>
                  <h1>Choose a username</h1>
                </div>
                <h2 className='text-base font-normal mt-4 '>Don't worry, you can always change it later</h2>
              </CardHeader>
              <CardBody>
                <div className='w-full flex justify-start items-center mt-6'>
                  <span className='mr-2'>@</span>
                  <Input
                    value={usernameInputValue}
                    onChange={handleInputChange}
                    placeholder='Enter your username'
                    variant='flushed'
                  />
                  <Icon
                    as={isusernameValid ? IoIosCheckmarkCircle : IoIosCloseCircle}
                    color={isusernameValid ? 'green.500' : 'red.500'}
                    className='text-3xl ml-6'
                  />
                </div>
                {!isusernameValid && (
                  <Text color='red.500' fontSize='sm' mt='2'>
                    {errorMessage}
                  </Text>
                )}
                <Button
                  className='mt-8 bg-neutral-700'
                  onClick={handleContinue}
                  isLoading={isContinueBtnLoading}
                  isDisabled={!isusernameValid}
                >
                  Continue
                </Button>
              </CardBody>
            </Card>
          </SlideFade>
        )}
        {displayCard == 'Step 2' && (
          <SlideFade in={displayCard} className='w-full flex justify-center '>
            <Card className=' robo mt-8 mx-2 w-full md:w-1/2 rounded-lg h-full' bg='backL'>
              <CardHeader className='text-3xl font-bold w-full'>
                <div className='flex items-center'>
                  <Icon as={TbHexagonNumber2} color='primc' className='mr-4 scale-150'></Icon>
                  <h1>Choose a perceived rank</h1>
                </div>
                <h2 className='text-base font-normal mt-4 '>
                  Choose a rank that best describes your proir knowledge. You can always change this later
                </h2>
              </CardHeader>
              <CardBody>
                {/* CAROSELLLLLL */}
                <div className='w-full rounded-lg '>
                  <Carousel
                    showThumbs={false}
                    showStatus={false}
                    showArrows={true}
                    infiniteLoop={true}
                    emulateTouch={true}
                    onChange={handleChangeSlide}
                  >
                    {ranks.map((rank) => (
                      <div key={rank.id} className=' bg-neutral-700 m-12 rounded-lg'>
                        <Box p={4}>
                          <Image src={rank.imageSrc} alt={rank.name} boxSize='200px' objectFit='contain' />
                          <Text mt={2} fontWeight='bold' fontSize='lg' textAlign='center'>
                            {rank.name}
                          </Text>
                          <Text mt={2} pb={12} textAlign='center'>
                            {rank.description}
                          </Text>
                        </Box>
                      </div>
                    ))}
                  </Carousel>
                </div>

                <Button className='mt-8 mb-0 bg-neutral-700' onClick={handleFinish}>
                  Finish
                </Button>
              </CardBody>
            </Card>
          </SlideFade>
        )}
      </Center>
    </NicePage>
  );
}
