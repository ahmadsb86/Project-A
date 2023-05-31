import NicePage from '../components/nicepage';
import { useState, useRef } from 'react';
import {
  Flex,
  Center,
  Heading,
  Icon,
  Slider,
  SliderFilledTrack,
  SliderTrack,
  SliderThumb,
  HStack,
  useDisclosure,
  Card,
  CardBody,
  CardHeader,
  Kbd,
  useToast,
} from '@chakra-ui/react';
import Image from 'next/image';
import Tilty from 'react-tilty';
import Tooly from '../components/Tooly';

import { useUser } from '../customStuff/useDB.js';
import { rankMap } from '../customStuff/nameMapping';

export default function DashBoard() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const toast = useToast();
  const { userData, updateUserData, forceFetch } = useUser();
  const rankCard = useRef();

  return (
    <NicePage tooly terminalOpen={terminalOpen} setTerminalOpen={setTerminalOpen}>
      {/* using transparent border on a wrapping div to load an element in the margin above first center element so that it
      doesnt have blue bg */}
      <div className='h-full w-screen border border-transparent'>
        <Center className='w-full mt-36 '>
          <div>
            <p className='hidden md:block pl-28 mono pb-3'>.currentRank()</p>
            <HStack
              ref={rankCard}
              gap={{ md: 12, sm: 100 }}
              className='hover:opacity-10 cursor-pointer mx-4 flex justify-center items-center border border-primc px-24 py-4 rounded-full transition-all md:hover:px-48'
            >
              <Image
                alt='rank-icon'
                src={`/rank-icons/${userData.cRank}.png`}
                width={1000}
                height={1000}
                className='w-24 md:w-48'
              ></Image>
              <div className='flex flex-col justify-center  h-full'>
                <h1 className='md:mb-4 mono text-3xl md:text-8xl '>{rankMap(userData.cRank)}</h1>
                <Slider className='mt-4' width={{ md: '36rem' }} pl='2'>
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                </Slider>
                <p className='mono mt-1 pl-2 hidden md:block'>Rank progress</p>
              </div>
            </HStack>
          </div>
        </Center>
        <div className='flex justify-center w-full h-full  mt-24'>
          <div className='flex justify-center w-3/4 h-96 flex-wrap'>
            <Tilty reset='true' perspective='1600' max='15' className='bg-dotted mx-4 shadow-xl h-max'>
              <div
                className='w-96 h-56 rounded-lg hover:bg-primc cursor-pointer  border-primc  transition-all border p-6'
                onClick={() => {
                  setTerminalOpen(true);
                }}
              >
                <h2 className='robo text-3xl mb-1'>Open Terminal</h2>
                <h3 className='robo text-base mb-4'>Navigate pages with your keyboard</h3>
                <span className='text-xl absolute bottom-0 mb-4'>
                  <Kbd>ctrl</Kbd> + <Kbd>space</Kbd>
                </span>
              </div>
            </Tilty>
            <Tilty max='15' perspective='1600' className='mx-4 shadow-xl h-max '>
              <div className='w-96 h-56 rounded-lg hover:bg-primc cursor-pointer  border-primc  transition-all border p-6'>
                <h1 className='robo text-3xl mb-4'>Hello World</h1>
                <span className='text-xl robo'>This card is supposed to do something</span>
              </div>
            </Tilty>
          </div>
        </div>
      </div>
      {!terminalOpen ? <Tooly text={'View Rank System'} refo={rankCard}></Tooly> : ''}
    </NicePage>
  );
}
