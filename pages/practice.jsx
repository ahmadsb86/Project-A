import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import NicePage from '../components/nicepage';
import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ranks } from '../customStuff/nameMapping';
import { Button } from '@chakra-ui/react';
import { useUser } from '../customStuff/useDB';
import { getTopics, searchQuestion } from '../customStuff/usePset';
import { useRouter } from 'next/router';

export default function practice() {
  const [value, setValue] = useState();
  const [rankVal, setRankVal] = useState('loading');
  const [topicVal, setTopicVal] = useState('Any Topic');
  const anytop = ['Any Topic'];
  const [topicsList, setTopicsList] = useState(anytop);
  const [ranksList, setRanksList] = useState(ranks);
  const { userData } = useUser();
  const router = useRouter();
  const { rank, topic } = router.query;

  const [cards, setCards] = useState([]);

  function replaceFirstOccurrence(arr, searchValue, replaceValue) {
    const index = arr.findIndex((item) => item === searchValue);
    if (index !== -1) {
      const updatedArr = [...arr];
      updatedArr[index] = replaceValue;
      return updatedArr;
    }
    return arr;
  }
  function capitalizeFirstCharacter(str) {
    if (str.length === 0) {
      return str;
    }
    const firstChar = str.charAt(0).toUpperCase();
    const restOfString = str.slice(1);
    return `${firstChar}${restOfString}`;
  }
  function removeLastCharacter(str) {
    if (str.length === 0) {
      return str;
    }
    return str.slice(0, -1);
  }
  function omitCurrentRank(string) {
    const substring = ' (Current Rank)';

    if (string.endsWith(substring)) {
      return string.slice(0, -substring.length).trim();
    }

    return string;
  }
  function makeFirstCharacterLowercase(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
  }

  useEffect(() => {
    if (rank == undefined) {
      if (userData.cRank != 'loading') {
        if (userData.cRank == 'unranked') {
          if (userData.pRank != 'unranked') {
            setRanksList(
              replaceFirstOccurrence(
                ranksList,
                capitalizeFirstCharacter(userData.pRank),
                `${capitalizeFirstCharacter(userData.pRank)} (Current Rank)`
              )
            );
            setRankVal(`${capitalizeFirstCharacter(userData.pRank)} (Current Rank)`);
          }
        } else {
          setRanksList(
            replaceFirstOccurrence(
              ranksList,
              capitalizeFirstCharacter(removeLastCharacter(userData.cRank)),
              `${capitalizeFirstCharacter(removeLastCharacter(userData.cRank))} (Current Rank)`
            )
          );
          setRankVal(`${capitalizeFirstCharacter(removeLastCharacter(userData.cRank))} (Current Rank)`);
        }
      }
    } else {
      setRankVal(rank);
    }
  }, [userData]);

  useEffect(() => {
    async function go() {
      if (rankVal && rankVal != 'loading') {
        const santizedVal = omitCurrentRank(rankVal);
        const res = await getTopics(santizedVal);
        setTopicsList(anytop.concat(res));
      }
    }
    go();
  }, [rankVal]);

  return (
    <NicePage>
      <div className=' min-h-screen h-full mt-32'>
        <div className='w-full flex flex-col justify-start items-center rounded-lg '>
          <div className='bg-backL rounded-lg w-3/4 robo p-16'>
            <h1 className='jose text-6xl text-primc '>Search Problems</h1>
            <div className='mt-16 flex justify-center  items-stretch w-full px-4 '>
              <div className=' w-1/3 px-4'>
                <Autocomplete
                  options={ranksList}
                  value={rankVal}
                  onChange={(_, v) => setRankVal(v)}
                  renderInput={(params) => <TextField {...params} label='Rank' className='bg-backL' />}
                />
              </div>
              <div className=' w-1/3 px-4'>
                <Autocomplete
                  options={topicsList}
                  getOptionDisabled={(option) => option === 'Any Rank'}
                  value={topicVal}
                  onChange={(_, v) => {
                    setTopicVal(v);
                  }}
                  renderInput={(params) => <TextField {...params} label='Topic' className='bg-backL' />}
                />
              </div>
              <div className=' w-1/3 px-4'>
                <Button
                  onClick={async () => {
                    const res = await searchQuestion(makeFirstCharacterLowercase(omitCurrentRank(rankVal)), topicVal);
                    setCards(res);
                  }}
                  className='bg-primc rounded-md w-full text-left h-full'
                >
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* CARDS */}

          <div className=' mt-12 w-3/4'>
            {cards.map((card, index) => (
              <div className='bg-neutral-600 h-32 rounded mb-8 w-full' key={index}></div>
            ))}
          </div>
        </div>
      </div>
    </NicePage>
  );
}
