import { Center, Flex } from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';
import { Icon } from '@chakra-ui/react';

export default function Navel(props) {
  return (
    <Flex
      className='h-full rounded-full hover:bg-opacity-10 justify-center items-center flex-1 -m-4 transition-all'
      _hover={{ bg: 'prim.700', zIndex: '51 ' }}
      background={props.selected ? 'primc' : 'backL'}
      zIndex={props.selected ? 52 : 50}
    >
      <Icon as={FaHome} mr='2'></Icon>
      <h1>{props.name}</h1>
    </Flex>
  );
}
