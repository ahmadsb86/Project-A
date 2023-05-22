import { useEffect, useRef } from 'react';
import { ArrowDownIcon } from '@chakra-ui/icons';

export default function CircleBtn(props) {
  var myRef = useRef();

  const doofi = (e) => {
    return () => {
      if (e) {
        myRef.current.animate(
          {
            width: '40%',
            backgroundColor: '#41808B',
          },
          { duration: 300, fill: 'forwards', easing: 'ease' }
        );
      } else {
        myRef.current.animate(
          {
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0)',
          },
          { duration: 300, fill: 'forwards', easing: 'ease' }
        );
      }
    };
  };

  return (
    <div
      className='w-full h-full flex items-center justify-center'
      onMouseEnter={doofi(true)}
      onMouseLeave={doofi(false)}
      onClick={props.callback}
    >
      <button
        ref={myRef}
        className='absolute l-auto rounded-full bg-transparent border border-primc w-full aspect-square'
      >
        <ArrowDownIcon boxSize='8'></ArrowDownIcon>
      </button>
    </div>
  );
}
