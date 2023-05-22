import styles from '../cssModules/nav.module.css';
import { useEffect, useRef } from 'react';
import { Button } from '@chakra-ui/react';
import Navel from './navel';

export default function Nav(props) {
  return (
    <div className={props.className}>
      <div className='fixed top-8 flex justify-center items-center h-8 w-full'>
        <div
          className='
        w-1/2 rounded-full flex justify-start items-center h-full shadow-xl 
        px-4'
        >
          <Navel name='Home' selected />
          <Navel name='Home' />
          <Navel name='Home' />
        </div>
      </div>
      <div className='fixed top-8 right-16 flex justify-end items-center h-8 '>
        <Button
          variant='ghost'
          px='6'
          _hover={{ bg: 'prim.700' }}
          className='robo'
          color='chita'
          rounded='full'
          bg='backL'
          shadow='xl'
        >
          Sign In
        </Button>
      </div>
    </div>
  );
}
