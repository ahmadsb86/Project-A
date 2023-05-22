import { useEffect, useRef } from 'react';
import { Button, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function Hack(props) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let final = props.text;
  let myRef = useRef(null);
  const router = useRouter();
  let interval = null;
  let speed = 30;
  if (props.speed) speed = parseInt(props.speed);

  useEffect(() => {
    hackify();
  }, []);

  const hackify = () => {
    let iteration = 0;

    if (interval) clearInterval(interval);

    interval = setInterval(() => {
      try {
        myRef.current.innerText = myRef.current.innerText
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return final[index];
            }

            return letters[Math.floor(Math.random() * 26)];
          })
          .join('');

        if (iteration >= final.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      } catch {
        router.reload(window.location.pathname);
      }
    }, speed);
  };

  return (
    <h1 ref={myRef} onMouseEnter={hackify} className={props.classy}>
      {props.text}
    </h1>
  );
}
