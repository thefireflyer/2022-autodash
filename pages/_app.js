
import '../styles/globals.scss'
import styles from '../styles/App.module.scss'
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { UserContext } from '../lib/UserContext';
import Router from 'next/router';
import { magic } from '../lib/magic';
import Layout from '../components/layout';
import LayoutAlt from '../components/layout-alt';

import { Paper } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();

  // If isLoggedIn is true, set the UserContext with user data
  // Otherwise, redirect to /login and set UserContext to { user: null }
  useEffect(() => {
    setUser({ loading: true });
    magic.user.isLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn) {
        magic.user.getMetadata().then((userData) => setUser(userData));
      } else {
        Router.push('/login');
        setUser({ user: null });
      }
    });
  }, []);


  return (<div className={styles.app}>
    <Head>
      <title>{`${pageProps.title} - ` || ''} Testing03</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    
    <ThemeProvider theme={darkTheme}>
      <Paper elevation={0} sx={{width:`100%`, height:`100%`, overflow:`scroll`}}>
        <UserContext.Provider value={[user, setUser]}>
          {/* <Layout>
            <Component {...pageProps} />
          </Layout> */}
          <LayoutAlt {...pageProps} >
            <Component {...pageProps} />
          </LayoutAlt>
        </UserContext.Provider>
      </Paper>
    </ThemeProvider>
    </div>
  );
}

export default MyApp;
