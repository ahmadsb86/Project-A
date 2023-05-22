import { useState } from 'react';
import Blob from '../components/blob.jsx';
import Nav from './navstuff/nav.jsx';
import MobileNav from './navstuff/MobileNav.jsx';

export default function NicePage({ children }) {
  const [mouseState, setMouseState] = useState(null);
  return (
    <div
      onMouseMove={(e) => {
        setMouseState(e);
      }}
      className='page'
    >
      <Blob parentE={mouseState} />
      <div className='z-50 relative '>
        <Nav className='hidden lg:block'></Nav>
        <MobileNav className='lg:hidden'></MobileNav>
        {children}
      </div>
    </div>
  );
}
