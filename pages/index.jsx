import {
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
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState, useEffect } from 'react';

export default function Home() {
  const auth = getAuth();
  const [UUID, setUUID] = useState('guest');

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      login_hint: 'user@example.com',
    });
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setUUID(user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // const email = error.customData.email;
        // const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorMessage);
      });
  };

  const signInWithGithub = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setUUID(user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // const email = error.customData.email;
        // const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorMessage);
      });
  };

  useEffect(() => {
    localStorage.setItem('uuid', UUID);
  }, [UUID]);

  return (
    <Center className='h-screen'>
      <Card bg='prim.800' rounded='lg' className=' w-3/4 md:w-1/3' color='chita' shadow='xl'>
        <CardHeader>
          <Heading>Sign up</Heading>
          Get Started by linking your Google account
        </CardHeader>
        <Button mx='5' color='#111111' leftIcon={<FcGoogle />} onClick={signInWithGoogle}>
          Continue with Google
        </Button>
        <Button my='4' mx='5' color='#111111' leftIcon={<FaGithub />} onClick={signInWithGithub}>
          Continue with Github
        </Button>
      </Card>
    </Center>
  );
}
