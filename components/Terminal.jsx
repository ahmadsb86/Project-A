import NicePage from '../components/nicepage';
import { useEffect, useRef, useState } from 'react';
import { Center, Box, Tooltip, Heading, Icon, Stack, HStack, Slider } from '@chakra-ui/react';
import Tilty from 'react-tilty';
import Tooly from '../components/Tooly';
import useSpecialEffect from '../components/useSpecialEffect';

import { useUser } from '../customStuff/useDB';

function Proompt(props) {
  const { userData, forceFetch } = useUser();

  const asd = ['cd', 'rank', 'help', 'create', 'cra', 'crooo', 'alacra', 'alocrooo'];
  let [suggestions, setSuggestions] = useState(null);
  const maxSuggestions = 10;
  let inpBox = useRef();
  const [selectedSuggestion, setSelectedSuggestion] = useState('');
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);

  const generateSuggestions = (inputText, knownCommands) => {
    let res = new Set(); //result
    const passA = knownCommands.filter(
      (command, index) => command.startsWith(inputText.toLowerCase()) & (index <= maxSuggestions)
    );
    passA.forEach((item) => res.add(item));

    let left = 10 - res.size;
    const passB = knownCommands.filter((command, index) => command.includes(inputText.toLowerCase()) & (index <= left));
    passB.forEach((item) => res.add(item));

    return res;
  };

  const exec = (input) => {
    const cmd = input.split(' ');
    console.log(cmd);
    switch (cmd[0]) {
      case 'rank':
        props.cliRef.current.innerHTML += `<p>${userData.pRank}</p>`;
        break;

      case 'forceFetch':
        forceFetch()
          .then(() => {
            props.cliRef.current.innerHTML += `<p>Forced Fetch Successful</p>`;
          })
          .catch(() => {
            props.cliRef.current.innerHTML += `<p>Forced Fetch Unsuccessful</p>`;
          });
        break;

      default:
        break;
    }
  };

  const completeSuggestion = (suggestion) => {
    const words = inpBox.current.value.split(' ');
    const lastWord = words[words.length - 1];
    words[words.length - 1] = suggestion;
    inpBox.current.value = words.join(' ') + ' ';
    setSelectedSuggestion('');
    setSelectedSuggestionIndex(0);
    setSuggestions(null);
  };

  useSpecialEffect(() => {
    if (suggestions) {
      setSelectedSuggestion(suggestions[selectedSuggestionIndex]);
    }
  }, [selectedSuggestionIndex]);

  const typeEvent = (event) => {
    let value = event.target.value;
    const lastWord = value.split(' ')[value.split(' ').length - 1];

    // Arrow key navigation for suggestions
    if (suggestions) {
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelectedSuggestionIndex((prevIndex) => Math.max(prevIndex - 1, -1));
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelectedSuggestionIndex((prevIndex) => Math.min(prevIndex + 1, suggestions.length - 1));
      } else if (event.key === 'Enter' || event.key === 'Tab') {
        if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < suggestions.length) {
          event.preventDefault();
          if (selectedSuggestion == '') completeSuggestion(suggestions[selectedSuggestionIndex]);
          else completeSuggestion(selectedSuggestion);
        }
      } else {
        if (
          value &&
          value.length > 0 &&
          lastWord.length > 0 &&
          event.target.selectionStart == event.target.value.length
        )
          setSuggestions(Array.from(generateSuggestions(lastWord, asd)));
        else {
          setSuggestions(null);
        }
      }
    } else {
      if (
        value &&
        (value.length > 0) & (lastWord.length > 0) &&
        event.target.selectionStart == event.target.value.length
      )
        setSuggestions(Array.from(generateSuggestions(lastWord, asd)));
      else {
        exec(value);
      }
    }
  };

  return (
    <div className='flex justify-start flex-grow'>
      {props.prompt}{' '}
      <div className='flex flex-col justify-start items-start w-full'>
        <input
          className='bg-transparent w-full ml-3 overflow-hidden focus:outline-none '
          ref={inpBox}
          type='text'
          onKeyUp={typeEvent}
        />
        {suggestions && suggestions.length > 0 && (
          <Box width='100%' bg='backL' mt='2' py='2' px='2' boxShadow='md' zIndex='1' rounded='md'>
            {suggestions.map((suggestion, index) => (
              <Box
                id={suggestion}
                key={suggestion}
                px='2'
                py='1'
                rounded='sm'
                bg={selectedSuggestionIndex === index ? 'primc' : 'transparent'}
                onMouseOver={(e) => {
                  setSelectedSuggestion(e.target.id);
                }}
                _hover={{ bg: 'prim.600' }}
                onClick={(e) => {
                  completeSuggestion(e.target.id);
                }}
              >
                {suggestion}
              </Box>
            ))}
          </Box>
        )}
      </div>
    </div>
  );
}

export function Terminal(props) {
  var latestInpBox = useRef();
  const prompt = `C:\\User>`;
  const cliRef = useRef();
  const closeButtons = useRef();

  const tiltyRef = useRef();

  useEffect(() => {
    if (latestInpBox.current) latestInpBox.current.focus();
  }, []);

  // useSpecialEffect(() => {
  //   console.log('das');
  //   if (props.toOpen) {
  //     tiltyRef.current.animate(
  //       {
  //         transform: 'scale(1)',
  //         opacity: 1,
  //       },
  //       { duration: 400, fill: 'forwards', easing: 'ease' }
  //     );
  //   } else {
  //     tiltyRef.current.animate(
  //       {
  //         transform: 'scale(0)',
  //         opacity: 0.2,
  //       },
  //       { duration: 400, fill: 'forwards', easing: 'ease' }
  //     );
  //   }
  // }, [props.toOpen]);

  const cme = (a, c) => {
    return <span className={c}>{a} </span>;
  };

  return (
    <div ref={tiltyRef} className='flex justify-center items-center top-0 left-0 fixed z-60 w-full h-full '>
      <Tilty className={`shadow-xl w-1/2 h-3/4 bg-neutral-700  rounded-xl `} max='5' reverse>
        <div className='flex justify-between border-b '>
          <div className='m-4 w-48 '></div>
          <div className='m-4 w-48    flex  justify-center '>
            <p className='mono text-center w-full text-lg py-0'>terminal.exe</p>
          </div>
          <div className='m-4 w-48 flex justify-end items-center' ref={closeButtons} onClick={props.closeCallback}>
            <div className='rounded-full bg-green-500 w-5 h-5 mx-1'></div>
            <div className='rounded-full bg-orange-500 w-5 h-5 mx-1'></div>
            <div className='rounded-full bg-red-500 w-5 h-5 mx-1'></div>
          </div>
        </div>
        <div className='w-full p-8 mono' ref={cliRef}>
          {prompt} {cme('help --breif', 'text-yellow-500')} <br />
          <br />
          {cme('Welcome to Project A!', 'text-cyan-500')}Get started by using one of these commands <br />
          {cme('cd [page]', 'text-green-500')} - Navigate to a certain page <br />
          {cme('view [problem-name]', 'text-green-500')} - Navigate to the view page of a certain problem <br />
          {cme('rank', 'text-green-500')} - View your rank and other useful competitive data <br />
          <br />
          <Proompt prompt={prompt} cliRef={cliRef}></Proompt>
        </div>
      </Tilty>
      <Tooly text={'Close Terminal'} refo={closeButtons}></Tooly>
    </div>
  );
}
