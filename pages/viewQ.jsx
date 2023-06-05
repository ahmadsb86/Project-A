import {
  Button,
  Icon,
  IconButton,
  NumberInputStepper,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import Image from 'next/image';
import NicePage from '../components/nicepage';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import Pagination from '@mui/material/Pagination';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../customStuff/useDB';
import { getQuestion } from '../customStuff/usePset';
import CircleBtn from '../components/circleBtn';

export default function viewQ() {
  const renderers = {
    // Map HTML elements to custom components with Tailwind CSS classes
    h1: ({ children }) => <h1 className=' text-2xl font-bold mt-12 robo underline'>{children}</h1>,
    h2: ({ children }) => <h1 className=' font-bold mt-6 robo text-lg'>{children}</h1>,
    p: ({ children }) => <p className='mt-4 '>{children}</p>,
    pre: ({ children }) => (
      <pre className='mt-3 bg-backL py-2 rounded-md px-4 border border-neutral-400'>{children}</pre>
    ),
    code: ({ children }) => <code className='mt-2  rounded-md bg-backL px-2 py-1'>{children}</code>,
    strong: ({ children }) => <strong className='font-bold'>{children}</strong>,
    em: ({ children }) => <em className='italic'>{children}</em>,
    // Add more custom components for other HTML elements as needed
  };
  const router = useRouter();
  const { problem_id } = router.query;
  const { userData, updateUserData } = useUser();
  const [tcIndex, setTcIndex] = useState(1);
  const [marked, setMarked] = useState(false);

  const [title, setTitle] = useState('Loading ...');
  const [statement, setStatement] = useState(`Loading ...`);
  const [credits, setCredits] = useState('Loading ...');
  const [time, setTime] = useState(-1);
  const [mem, setMem] = useState(-1);
  const [rank, setRank] = useState('loading');
  const [tcIn, setTcIn] = useState(Array.from({ length: 10 }, (_, index) => `loading ${index}`));
  const [tcOut, setTcOut] = useState(Array.from({ length: 10 }, (_, index) => `loading ${index}`));

  useEffect(() => {
    const run = async () => {
      if (problem_id != undefined) {
        const res = getQuestion(problem_id);
        setTitle(res.title);
        setStatement(res.statement.replaceAll('\\n', '\n\n'));
        setCredits(res.credits);
        setTime(res.time);
        setMem(res.mem);
        setRank(res.rank);
        setTcIn(res.tcIn);
        setTcOut(res.tcOut);
      }
    };
    run();
  });

  return (
    <NicePage>
      <div className='flex justify-start  w-3/4'>
        <div className='h-full min-h-screen mt-20 pr-24 pl-14 py-10 w-full relative '>
          <div className='relative slab flex justify-start items-center h-64  border-neutral-300 rounded-md p-4 w-auto '>
            <img src={`/rank-icons/${rank}.png`} alt='rank' className='w-auto h-full mr-8 '></img>
            <div className='border-l-2 border-neutral-300 pl-4'>
              <h1 className='mont text-8xl mb-4 text-primc'>{title}</h1>
              <h2 className='mont text-2xl'>Time Constraint: {time}</h2>
              <h2 className='mont text-2xl'>Memory Constraint: {mem}</h2>
              <h2 className='mont text-2xl'>Credits: {credits}</h2>
            </div>
          </div>
          <div className='robo  h-full mt-16 mr-24'>
            <ReactMarkdown components={renderers} className='ml-6'>
              {statement}
            </ReactMarkdown>
          </div>

          {/* -------------------------------------------------------------------------- */
          /*                           MARK AS COMPLETE BUTTON                          */
          /* -------------------------------------------------------------------------- */}
          {/*
            <Button
            className={`w-full my-8 mx-4 robo ${marked ? 'bg-green-700' : 'bg-backL'}`}
            onClick={() => {
              const ifMarked = () => {
                let com = [...userData.completed];
                if (com != undefined) {
                  com.push(title);
                  return com;
                }
                return title;
              };

              const ifNotMarked = () => {
                let com = [...userData.completed];
                com.splice(userData.completed.indexOf(title), 1);
                return com;
              };

              const newMarked = !marked;
              updateUserData({
                completed: newMarked ? ifMarked : ifNotMarked,
              });
              setMarked(newMarked);
            }}
          >
            Mark as complete
          </Button> 
          
          */}
        </div>
      </div>
      <div className='h-5/6  flex flex-col justify-center items-center w-1/4 fixed top-32 right-8 z-10 '>
        <div className=' rounded-lg bg-backL h-full w-full relative'>
          {/* -------------------------------------------------------------------------- */
          /*                             Test cases menu bar                            */
          /* -------------------------------------------------------------------------- */}

          <div className='flex justify-between border-b h-18 items-center '>
            <p className='m-4 w-96 mono text-lg  '>test-cases.exe</p>
            <div className='m-4 w-24    flex  justify-center '>
              <p className='mono text-center w-full text-lg py-0'></p>
            </div>
            <div className='m-4 w-48 flex justify-end items-center'>
              <div className='rounded-full bg-green-500 w-5 h-5 mx-1'></div>
              <div className='rounded-full bg-orange-500 w-5 h-5 mx-1'></div>
              <div className='rounded-full bg-red-500 w-5 h-5 mx-1'></div>
            </div>
          </div>

          {/* -------------------------------------------------------------------------- */
          /*                                 Test Cases                                 */
          /* -------------------------------------------------------------------------- */}
          <div className='text-left robo p-8 mt-8 '>
            <div className='flex justify-start items-center '>
              <h2 className='text-lg font-bold'>Test Input: </h2>
              <Button
                ml='4'
                // bg=''
                _hover={{ bg: 'prim.500' }}
                transition='0.1s ease all'
                className='transition-all '
                variant='outline'
                size='sm'
                onClick={() => {
                  navigator.clipboard.writeText(tcIn[tcIndex - 1]);
                }}
              >
                Copy to clipboard
              </Button>
            </div>
            <h2 className='text-lg font-bold mt-2'>Test Output: </h2>
            <div className='bg-neutral-800 border mono rounded-md p-4 mt-2'>{tcOut[tcIndex - 1]}</div>
          </div>

          <div className='absolute flex justify-center items-center bottom-0 mt-auto w-full mb-4'>
            <Pagination
              count={tcIn.length}
              variant='outlined'
              color='primary'
              onChange={(e, page) => setTcIndex(page)}
            />
          </div>
        </div>
      </div>
    </NicePage>
  );
}
