import '../styles/globals.css';
import { ChakraProvider, ModalContextProvider } from '@chakra-ui/react';
import { ThemeProvider } from '@mui/material';
import { generatePalette } from 'palette-by-numbers';
import { extendTheme } from '@chakra-ui/react';
import { createTheme } from '@mui/material/styles';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#41808B',
    },
    mode: 'dark',
  },
});

const theme = extendTheme({
  config: {
    initialColorMode: 'dark', // Set your desired default color mode (e.g., "light", "dark")
    useSystemColorMode: false, // Set to true to enable system color mode
  },

  colors: {
    back: '#1f1f1f',
    backScheme: generatePalette('#303030'),
    backL: '#303030',

    chita: '#efefef',
    chiti: {
      50: '#efefef',
      100: '#efefef',
      200: '#efefef',
      300: '#efefef',
      400: '#efefef',
      500: '#efefef',
      600: '#efefef',
      700: '#efefef',
      800: '#efefef',
      900: '#efefef',
    },

    primc: '#41808B',
    prim: generatePalette('#41808B'),

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
    <ChakraProvider cssVarsRoot=':root' theme={theme}>
      <ThemeProvider theme={muiTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </ChakraProvider>
  );
}

export default MyApp;
