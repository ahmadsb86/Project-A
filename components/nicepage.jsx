import { useState, useRef, useEffect } from 'react';
import { Center } from '@chakra-ui/react';
import { Terminal } from './Terminal.jsx';
import Blob from '../components/blob.jsx';
import Nav from './navstuff/nav.jsx';
import MobileNav from './navstuff/MobileNav.jsx';
import Tooly from './Tooly.jsx';
import Hotkeys from 'react-hot-keys';

export default function NicePage({ children, isTerminalOpen, terminalOpener }) {
  const closeTerminal = useRef();
  const [terminalOpen, setTerminalOpen] = useState(false);
  isTerminalOpen = terminalOpen;

  useEffect(() => {
    const handleClick = () => {
      setTerminalOpen(true);
    };

    if (terminalOpener) {
      const button = terminalOpener.current;

      if (button) {
        button.addEventListener('click', handleClick);
      }

      return () => {
        if (button) {
          button.removeEventListener('click', handleClick);
        }
      };
    }
  }, []);

  return (
    <div className='page overflow-x-hidden'>
      <Blob />
      <Hotkeys keyName='ctrl+space' onKeyDown={() => setTerminalOpen(!terminalOpen)}>
        <div className='z-50 relative h-full'>
          <Nav
            className='hidden lg:block'
            openTerminalCallback={() => {
              setTerminalOpen(true);
              console.log('clickki');
            }}
            selelcted={'learn'}
          ></Nav>
          <MobileNav className='lg:hidden'></MobileNav>
          {children}
        </div>
      </Hotkeys>
      {terminalOpen ? <Terminal toOpen={terminalOpen} closeCallback={() => setTerminalOpen(false)}></Terminal> : ''}
    </div>
  );
}
