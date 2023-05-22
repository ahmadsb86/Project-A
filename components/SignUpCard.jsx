import {
  Box,
  Stack,
  Vstack,
  Heading,
  Button,
  Center,
  Container,
  Flex,
  Card,
  CardHeader,
  Text,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import firebase from '../firebaseConfig'; //needed

export default function SignUpCard(props) {
  const [UUID, setUUID] = useState('guest');
  const [user, setUser] = useState();
  const { push } = useRouter();
  var [auth, setAuth] = useState();
  const toast = useToast();

  useEffect(() => {
    localStorage.setItem('uuid', UUID);
    setAuth(getAuth());
  }, [UUID]);

  const signIn = (providerName) => {
    return async () => {
      if (!auth) console.log('brahsdas');
      var provider;
      var credCallback;
      switch (providerName) {
        case 'Google':
          credCallback = GoogleAuthProvider.credentialFromResult;
          provider = new GoogleAuthProvider();
          break;
        case 'Github':
          credCallback = GithubAuthProvider.credentialFromResult;
          provider = new GithubAuthProvider();
          break;
        default:
          console.log('BRAIHDbsalkd');
          break;
      }

      provider.setCustomParameters({
        login_hint: 'user@example.com',
      });
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = credCallback(result);
          const token = credential.accessToken;
          const user = result.user;
          console.log(user.displayName);
          setUUID(user.uid);
          // push('/landing');
        })
        .catch(handleMe());
    };
  };
  const handleMe = () => {
    return (error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      var displayError;
      switch (errorMessage) {
        case 'auth/account-exists-with-different-credential':
          displayError = `You have already signed up using a different authentication provider. Please sign in with that authentication provider`;
          break;

        case 'auth/cancelled-popup-request':
          displayError = `Popup was closed`;
          return;
          break;

        case 'Firebase: Error (auth/cancelled-popup-request)':
          displayError = `Popup was closed`;
          return;
          break;

        case 'Firebase: Error (auth/popup-closed-by-user)':
          displayError = `Popup was closed`;
          return;
          break;

        default:
          console.log(`uncaught error: ${errorMessage}`);
          displayError = `If you contact support, tell them this error code: ${errorMessage}`;
          break;
      }
      toast({
        title: 'Account creation failed.',
        description: displayError,
        status: 'error',
        duration: 6000,
        isClosable: true,
      });
    };
  };
  return (
    <div className=' lighten w-2/3 md:w-1/3 rounded-lg '>
      <Card bg='transparent' rounded='lg' shadow='xl' className='sep w-full md:full ' color='chita'>
        <CardHeader>
          <Heading color='prim.500' fontFamily='Oswald' mb='2'>
            SIGN UP / LOG IN
          </Heading>
          <Heading fontSize='sm' mb='4'>
            Get started by choosing an authentication provider
          </Heading>
        </CardHeader>
        <Button mx='5' leftIcon={<FcGoogle />} onClick={signIn('Google')}>
          Continue with Google
        </Button>
        <Button
          // variant='outline'
          my='4'
          mx='5'
          leftIcon={<FaGithub />}
          onClick={signIn('Github')}
        >
          Continue with Github
        </Button>
      </Card>
    </div>
  );
}
