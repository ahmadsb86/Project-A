import Blob from '../components/blob.jsx';
import Nav from '../components/navstuff/nav.jsx';
import CircleBtn from '../components/circleBtn.jsx';
import Hack from '../components/hack.jsx';
import { Button, Center, Tooltip, Heading, Stack } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import NicePage from '../components/nicepage.jsx';
import ScrollProgress from '../components/ScrollProgress.jsx';
import Head from 'next/head.js';
import Script from 'next/script.js';
import Tilty from 'react-tilty';

export default function Landing() {
  return (
    <>
      <NicePage>
        <Center className='h-screen flex-col '>
          <Hack text='PROJECT A' classy='text-3xl md:text-8xl'></Hack>
          <h2 className='text-base md:text-2xl mt-4 robo'>(ahmad please come up with a good tagline)</h2>
          <button className='mono text-white bg-transparent hover:bg-primc border-primc border rounded-full mt-8 px-8 py-2 hover:px-14 transition-all'>
            .getStarted()
          </button>
        </Center>

        <Tilty className=' mt-56 w-1/2  text-lg bg-backL rounded-lg px-4 py-4 pb-14 shadow-xl '>
          <div className='flex justify-end items-center gap-2'>
            <div className='rounded-full w-4 aspect-square bg-green-500'></div>
            <div className='rounded-full w-4 aspect-square bg-orange-500'></div>
            <div className='rounded-full w-4 aspect-square bg-red-500'></div>
          </div>
          <div className='flex justify-center items-start mt-14 px-14'>
            <h1 className='mono w-full '>
              <span className='text-orange-400'>const </span>
              <span className='text-pink-400'>about </span>=
            </h1>
            <p className='mono  '>
              "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae, nostrum dolore ullam, possimus hic
              provident dolores nobis quidem ut perferendis, minima expedita. Pariatur facere veniam eos, architecto
              quibusdam quam hic saepe labore doloribus illo et deleniti facilis inventore! Id, ab!"
            </p>
          </div>
        </Tilty>

        {/* <ScrollProgress></ScrollProgress> */}

        <div className='absolute top-h -left-14 w-1/6 aspect-square hidden md:block '>
          <CircleBtn
            callback={() => {
              window.scrollTo({ top: 800, behavior: 'smooth' });
            }}
          ></CircleBtn>
        </div>
      </NicePage>
    </>
  );
}
