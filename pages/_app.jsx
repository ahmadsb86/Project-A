import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';

// 2. Extend the theme to include custom colors, fonts, etc
const theme = extendTheme({
  config: {
    initialColorMode: 'dark', // Set your desired default color mode (e.g., "light", "dark")
    useSystemColorMode: false, // Set to true to enable system color mode
  },

  colors: {
    chita: '#efefef',
    primc: '#41808B',
    prim: {
      50: '#EEF5F7',
      100: '#CEE4E8',
      200: '#AFD3DA',
      300: '#90C2CB',
      400: '#70B1BD',
      500: '#51A0AE',
      600: '#41808B',
      700: '#316068',
      800: '#204046',
      900: '#102023',
    },
    eee: {
      50: '#f2ffde',
      100: '#defcb2',
      200: '#caf884',
      300: '#b5f554',
      400: '#a1f226',
      500: '#88d90d',
      600: '#69a905',
      700: '#4a7801',
      800: '#2b4800',
      900: '#0b1900',
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <div className='page'>
        <Component {...pageProps} />
      </div>
    </ChakraProvider>
  );
}

export default MyApp;
