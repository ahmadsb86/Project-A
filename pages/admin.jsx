import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  HStack,
  VStack,
  Textarea,
  NumberInput,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  Button,
  PinInput,
  PinInputField,
} from '@chakra-ui/react';
import { setStorage, mergeObjects, getStorage, addStorage } from '../customStuff/useDB';
import { useState } from 'react';
import { useEffect } from 'react';

export default function admin() {
  const [title, setTitle] = useState('A Random Question');
  const [rank, setRank] = useState('iron');
  const [credits, setCredits] = useState('Ahmad Bilal');
  const [time, setTime] = useState(2);
  const [mem, setMem] = useState(256);
  const [statement, setStatement] = useState('');
  const [testCasesInput, setTestCasesInput] = useState([]);
  const [testCasesOutput, setTestCasesOutput] = useState([]);
  const [tcs, setTcs] = useState(3);

  const handleInputChange = (callback) => {
    return (event) => {
      if (event.target) callback(event.target.value);
      else callback(event);
    };
  };

  const [access, setAccess] = useState(true);
  const [pin, setPin] = useState(-1);

  useEffect(() => {
    setTestCasesInput(Array.from({ length: tcs }, (index) => ``));
    setTestCasesOutput(Array.from({ length: tcs }, (index) => ``));
  }, [tcs]);

  const addTC = (index, newItem, callback, items) => {
    // const updatedItems = [...items.slice(0, index), newItem, ...items.slice(index)];
    // const updatedItems = ['abc', 'def', 'hij', 'klm'];
    // console.log(items);
    const updatedItems = items.map((val, i) => (index == i ? newItem : items[i]));
    callback(updatedItems);
  };

  useEffect(() => {
    getStorage('Secrets', 'admin-pin')
      .then((e) => {
        setPin(e.pass);
      })
      .catch((e) => {
        console.log('ther was an eror');
      });
  }, []);

  return (
    <div className='flex justify-center items-center h-screen w-screen bg-back '>
      {!access ? (
        <HStack>
          <PinInput
            otp
            onComplete={(value) => {
              console.log(pin);
              if (pin != -1) setAccess(value == pin);
            }}
          >
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>
      ) : (
        <div className='w-1/2 h-3/4 bg-backL rounded-lg shadow  overflow-scroll p-8'>
          <div className=' h-full'>
            <FormControl>
              <div className='w-full mb-8'>
                <FormLabel>Problem Title</FormLabel>
                <Input value={title} onChange={handleInputChange(setTitle)} />
              </div>
              <div className='w-full mb-8'>
                <FormLabel>Problem Rank</FormLabel>
                <Input value={rank} onChange={handleInputChange(setRank)} />
              </div>
              <div className='w-full mb-8'>
                <FormLabel>Problem Credits</FormLabel>
                <Input value={credits} onChange={handleInputChange(setCredits)} />
              </div>
              <div className='w-full mb-8'>
                <FormLabel>Time Constraint</FormLabel>
                <NumberInput max={20} min={0} value={time} onChange={handleInputChange(setTime)}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </div>
              <div className='w-full mb-8'>
                <FormLabel>Memory Constraint</FormLabel>
                <NumberInput max={1000} min={50} value={mem} onChange={handleInputChange(setMem)}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </div>
              <div className='w-full mb-8'>
                <FormLabel>Problem Statement [Paste from editor] </FormLabel>
                <Textarea height='96' value={statement} onChange={handleInputChange(setStatement)} />
              </div>
              <div className='w-full mb-8'>
                <FormLabel>Test Cases</FormLabel>
                <NumberInput max={30} min={3} value={tcs} onChange={handleInputChange(setTcs)}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </div>
              {Array.from({ length: tcs }).map((_, index) => (
                <div key={`in ${index}`}>
                  <div className='w-full mb-8'>
                    <FormLabel>Test Case {index} - Input </FormLabel>
                    <Textarea
                      value={testCasesInput[index]}
                      onChange={(e) => {
                        addTC(index, e.target.value, setTestCasesInput, testCasesInput);
                      }}
                    />
                  </div>
                  <div className='w-full mb-8'>
                    <FormLabel>Test Case {index} - Output </FormLabel>
                    <Textarea
                      value={testCasesOutput[index]}
                      onChange={(e) => {
                        addTC(index, e.target.value, setTestCasesOutput, testCasesOutput);
                      }}
                    />
                  </div>
                </div>
              ))}
            </FormControl>
            <Button
              colorScheme='prim'
              variant='outline'
              width='100%'
              mt='8'
              mb='4'
              onClick={async () => {
                const res = await addStorage('Problems', {
                  title: title,
                  credits: credits,
                  time: time,
                  mem: mem,
                  statement: statement,
                  rank: rank,
                  tcIn: testCasesInput,
                  tcOut: testCasesOutput,
                })
                  .then(alert('problem created'))
                  .catch((e) => console.log(e));
                console.log(res);
              }}
            >
              Create Problem
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
