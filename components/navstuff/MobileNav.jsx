import styles from '../cssModules/nav.module.css';
import { useEffect, useRef } from 'react';
import { Button, IconButton, Slide, useDisclosure, Box, Lorem, CloseButton } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Navel from './navel';
import Mnavel from './Mnavel.jsx';

export default function MobileNav(props) {
  const { isOpen, onToggle } = useDisclosure();
  function handle() {
    onToggle();
  }
  return (
    <>
      <div className={props.className}>
        <div className='flex fixed top-14 right-14 justify-end'>
          <IconButton
            aria-label='MobileNav'
            boxSize='14'
            variant='ghost'
            icon={<HamburgerIcon />}
            onClick={handle}
            className='scale-150'
          />
        </div>
      </div>
      <Slide direction='right' in={isOpen} style={{ zIndex: 49 }}>
        <Box color='white' p='14' bg='primc' rounded='md' shadow='md' h='full'>
          <CloseButton boxSize='14' mt='0' onClick={onToggle} className='scale-150' />
          <div className='flex flex-col justify-start items-end h-1/2'>
            <Mnavel name='home' />
            <Mnavel name='home' />
            <Mnavel name='home' />
            <Mnavel name='home' />
          </div>
        </Box>
      </Slide>
    </>
  );
}
