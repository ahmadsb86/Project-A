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

import Blob from '../components/blob';
import Head from 'next/head';

import SignUpCard from '../components/SignUpCard';

export default function Home() {
  const [mouseState, setMouseState] = useState(null);

  const changeUser = async (newUser) => {
    return;
  };

  return (
    <>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Rubik:wght@400;500&display=swap'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Oswald:wght@400&family=Roboto&display=swap'
          rel='stylesheet'
        />
      </Head>
      <div
        className='page'
        onMouseMove={(e) => {
          setMouseState(e);
        }}
      >
        <Blob parentE={mouseState} />
        <Center className='h-screen'>
          <SignUpCard></SignUpCard>
        </Center>
      </div>
    </>
  );
}
