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
import NicePage from '../components/nicepage';

export default function Home() {
  return (
    <NicePage>
      <Center className='h-screen'>
        <SignUpCard></SignUpCard>
      </Center>
    </NicePage>
  );
}
