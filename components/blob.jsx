import styles from './cssModules/blob.module.css';
import { useEffect, useRef } from 'react';

export default function Blob({ parentE }) {
  var myRef = useRef();

  useEffect(() => {
    if (parentE) handleMe(parentE);
  }, [parentE]);

  const handleMe = (e) => {
    const { clientX, clientY } = e;

    myRef.current.animate(
      {
        left: `${clientX}px`,
        top: `${clientY}px`,
      },
      { duration: 3000, fill: 'forwards' }
    );
  };

  return (
    <div className='hidden md:block h-screen w-screen fixed top-0 left-0 '>
      <div className={styles.blob} ref={myRef}></div>
      <div className={styles.blur}></div>
    </div>
  );
}
