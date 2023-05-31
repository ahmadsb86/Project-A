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
import { getAuth, getUser, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getFirestore, collection, doc, setDoc, getDoc, query, where } from 'firebase/firestore';

import firebase from '../firebaseConfig'; //needed

export default function SignUpCard(props) {
  //Init
  const toast = useToast();
  const auth = getAuth();
  const db = getFirestore(firebase);

  //Connect to DB
  // const [users, userLoading, dbError] = useCollection(collection(db, 'Users'));
  // if (dbError)
  //   errorToast(
  //     'Connection to Database failed',
  //     `If you contact support, please include the error code: ${dbError.message}`
  //   );

  const loginOldUser = async () => {
    console.log('Welcome back, ');
  };

  const onboardNewUser = async (user) => {
    console.log('Welcome to Project A, ' + user.displayName + '!');
    await setDoc(
      doc(db, 'Users', user.uid),
      {
        name: user.displayName,
        email: user.email,
        handle: `Please-change-your-handle-${user.email}`,
        pRank: `unranked`,
      },
      { merge: true }
    );
    window.open('/onboarding', '_blank');
  };

  const postSignin = async (credCallback) => {
    return async (result) => {
      const credential = credCallback(result);
      const token = credential.accessToken;
      const user = result.user;

      //check if user exists in database with same email
      // var newUser = true;
      // if (users) {
      //   users.docs.map((doc) => {
      //     if (doc.data().email === user.email) {
      //       newUser = false;
      //     }
      //   });
      // }

      const userRef = doc(db, 'Users', user.uid);

      var newUser;
      try {
        const userDoc = await getDoc(userRef);
        newUser = !userDoc.exists();
      } catch (error) {
        console.error('Error checking if new user:', error);
        newUser = false; // Assume not a new user on error
      }

      //call appropriate function based on user type
      if (newUser) await onboardNewUser(user);
      else await loginOldUser();
    };
  };

  const signIn = (providerName) => {
    return async () => {
      if (!auth) console.log('Auth undefined :(');
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
      await signInWithPopup(auth, provider)
        .then(await postSignin(credCallback))
        .catch(handleMe());
    };
  };

  const errorToast = (title, msg) => {
    toast({
      title: 'Account creation failed.',
      description: msg,
      status: 'error',
      duration: 6000,
      isClosable: true,
    });
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
      errorToast('Account creation failed.', displayError);
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
            Sign in with an account by choosing an authentication provider
          </Heading>
        </CardHeader>
        <Button mx='5' className='robo' leftIcon={<FcGoogle />} onClick={signIn('Google')}>
          Continue with Google
        </Button>
        <Button className='robo' my='4' mx='5' leftIcon={<FaGithub />} onClick={signIn('Github')}>
          Continue with Github
        </Button>
      </Card>
    </div>
  );
}
