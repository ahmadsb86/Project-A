import { Button, Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    setScrollProgress(scrolled);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='fixed top-0 w-4 right-16 flex flex-col justify-center h-screen'>
      <div className='h-1/2 w-full border border-neutral-700 rounded-full'>
        <Box
          top='0'
          right='4'
          width='100%'
          height='50%'
          bg='primc'
          rounded='full'
          transition='height  0.2s'
          style={{ height: `${Math.max(5, scrollProgress)}%` }}
        />
      </div>
    </div>
  );
}
