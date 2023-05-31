import firebase from '../firebaseConfig'; //needed
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';
import { getAuth } from 'firebase/auth';
import { getFirestore, getDoc, doc, setDoc, onSnapshot, getDocFromServer } from 'firebase/firestore';
import { useContext } from 'react';


const db = getFirestore(firebase);

const getStorage = async (collection, name) => {
  return new Promise(async (resolve, reject) => {
    const res = await getDocFromServer(doc(db, collection, name));
    try {
      if (res.exists) resolve(res.data());
      else {
        reject('User document does not exist');
      }
    } catch (err) {
      reject(`Error ${err}`);
    }
  });
};

const existsStorage = async (collection, name) => {
  return new Promise(async (resolve, reject) => {
    const documentRef = doc(db, 'Users', name);
    try {
      const document = await getDoc(documentRef);
      resolve(document.exists());
    } catch (error) {
      resolve(false);
    }
  });
};

const setStorage = async (collection, name, payload, overwrite) => {
  return new Promise(async (resolve, reject) => {
    const docRef = await doc(db, collection, name);
    try {
      await setDoc(docRef, payload, { merge: !overwrite });
      resolve();
    } catch (err) {
      reject(`Error ${err}`);
    }
  });
};

const mergeObjects = (obj1, obj2) => {
  return { ...obj1, ...obj2 };
};

const useUser = () => {
  const auth = getAuth();

  //init
  const [user, loading] = useAuthState(auth);
  const [userData, setUserData] = useState({
    name: 'Loading ...',
    email: 'Loading ...',
pRank: 'Loading ...',
    cRank: 'loading'
  });

  const updateUserData = async (payload) => {
    new Promise(async (resolve, reject) => {
      try {
        const newUserData = mergeObjects(userData, payload);
        setUserData(newUserData);
        localStorage.setItem('ud', JSON.stringify(newUserData));
        setStorage('Users', user.uid, newUserData, false);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  };

  const forceFetch = async () => {
    return getUserData(true);
  };

  const getUserData = async (forceFetch) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (localStorage.getItem('ud') != null && !forceFetch) {
          console.log('got from loacl');
          setUserData(JSON.parse(localStorage.getItem('ud')));
        } else {
          const res = await getStorage('Users', user.uid);
          console.log('got from firestore: ', res);
          setUserData(res);
          localStorage.setItem('ud', JSON.stringify(res));
        }
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  };

  useEffect(() => {
    if (user && userData.name === 'Loading ...') getUserData();
  }, [loading]);

  return { userData, updateUserData, forceFetch };
};

export { useUser, getStorage, setStorage, existsStorage };
