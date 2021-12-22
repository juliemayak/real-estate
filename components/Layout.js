import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import Nav from './Nav';

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Real Estate</title>
      </Head>
      <Box maxWidth="1280px" m="auto">
        <header>
          <Nav />
        </header>
        <main>{children}</main>
        <footer>Footer</footer>
      </Box>
    </>
  );
}

export default Layout;