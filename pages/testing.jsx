import { useEffect } from 'react';
import { existsStorage, getStorage, setStorage, useUser } from '../customStuff/useDB';
import { Button, Heading } from '@chakra-ui/react';

export default function testing() {
  const { userData, updateUserData, forceFetch } = useUser();
  return (
    <div>
      <Heading>{userData.name}</Heading>
      <Button
        onClick={() => {
          updateUserData({ name: 'Ahmad the boss' });
        }}
      >
        Update User Name
      </Button>
      <Button onClick={() => forceFetch()}>Force Fetch</Button>
    </div>
  );
}
