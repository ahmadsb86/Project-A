import { Stack, Flex, Icon } from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';

export default function Mnavel(props) {
  return (
    <Flex
      className='w-full rounded-full hover:bg-opacity-10 transition-all px-8 py-2 text-3xl '
      _hover={{ bg: 'prim.700', zIndex: '51 ' }}
      background={props.selected ? 'primc' : 'transparent'}
      zIndex={props.selected ? 52 : 50}
    >
      <div className='flex justify-end items-center w-full'>
        <h1>{props.name}</h1>
        <Icon as={FaHome} ml='2'></Icon>
      </div>
    </Flex>
  );
}
