import { useEffect, useRef, useState } from 'react';
import { Tooltip, Container, Box } from '@chakra-ui/react';

export default function Tooly(props) {
  var txt = props.text;
  var refoo = props.refo;

  var myRef = useRef();
  var hidden = true;

  useEffect(() => {
    const { left, top, right, bottom } = refoo.current.getBoundingClientRect();
    document.addEventListener('mousemove', (e) => {
      if (myRef.current) {
        let x = e.clientX;
        let y = e.clientY;
        if (left <= x && top <= y && right >= x && bottom >= y) {
          if (hidden) {
            myRef.current.animate(
              {
                left: `${x + 100}px`,
                top: `${y - 192 / 2}px`,
              },
              { duration: 0, fill: 'forwards', easing: 'ease' }
            );
            myRef.current.animate(
              {
                transform: 'scale(1)',
                opacity: 1,
              },
              { duration: 500, fill: 'forwards', easing: 'ease' }
            );
            hidden = false;
          } else {
            myRef.current.animate(
              {
                left: `${x + 100}px`,
                top: `${y - 192 / 2}px`,
              },
              { duration: 700, fill: 'forwards', easing: 'ease' }
            );
          }
        } else {
          hidden = true;
          myRef.current.animate(
            {
              transform: ' scale(0.5)',
              opacity: 0,
            },
            { duration: 500, fill: 'forwards', easing: 'ease' }
          );
        }
      }
    });
  }, []);

  return (
    <Box
      className={`phase w-48 h-48 absolute z-60 bg-primc rounded-full flex
       justify-center items-center opacity-0 scale-50`}
      ref={myRef}
    >
      <p className='ossi text-lg absolute'>{txt}</p>
    </Box>
  );
}
