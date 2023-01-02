
import '../styles/globals.scss'
import styles from '../styles/App.module.scss'
import Head from 'next/head';
import { useState, useEffect, useRef, useMemo } from 'react';
import { UserContext } from '../lib/UserContext';
import Router from 'next/router';
import { magic } from '../lib/magic';
import Layout from '../components/layout';
import LayoutAlt from '../components/layout-alt';

import { Alert, AlertTitle, Backdrop, Button, IconButton, Paper, useMediaQuery } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {SetupStorage, StorageContext} from '../lib/StorageContext';
import {SystemStorageContext} from "../lib/SystemStorageContext";
import Loading from '../components/loading';
import { CloseRounded } from '@mui/icons-material';

import { applyMode, applyDensity, Density, Mode } from '@cloudscape-design/global-styles';



function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();
  const [alert, newAlert] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const storage = useRef();
  const systemStorage = useRef();



  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {


    setIsLoading(true)
    SetupStorage(
        false,
        storage,
        setIsLoading,
        setUser,
        newAlert)
    setUser({ loading: true });

    // storage.current.keyValuePair("serverdata", "useserver").then(res => {
    //   console.log("loaded useserver")
    // })

    // magic.user.isLoggedIn().then((isLoggedIn) => {
    //   if (isLoggedIn) {
    //     magic.user.getMetadata().then((userData) => setUser(userData));
    //   } else {
    //     //Router.push('/login');
    //     setUser({ user: null });
    //   }
    // });

  }, []);

  useEffect(() => {

    applyMode(prefersDarkMode ? Mode.Dark : Mode.Light);

  })


  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: prefersDarkMode ? '#b388ff' : '#81d4fa',
          },
          secondary: {
            main: '#f50057',
          },
        },
      }),
    [prefersDarkMode],
  );

  return (<div className={styles.app}>
    <Head>
      <title>{`${pageProps.title} - ` || ''} Autodash</title>
      <meta name="description" content="main web portal" />
      <link rel='icon' href='/test.svg' />
      <link rel="manifest" href="/manifest.json" />
    </Head>

    <ThemeProvider theme={theme}>
      <Paper elevation={0} sx={{ width: `100%`, height: `100%`, overflow: `scroll` }}>
        <UserContext.Provider value={[user, setUser]}>
          <StorageContext.Provider value={[storage]}>
            <SystemStorageContext.Provider value={[systemStorage]}>
              <LayoutAlt {...pageProps} >
                {isLoading ?
                  <Loading /> :
                  <Component {...pageProps} />
                }
              </LayoutAlt>
              <Backdrop
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={alert != null}>
                <Alert
                  variant={`outlined`}
                  sx={{ width: `70%` }}
                  severity={alert?.type}
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => { newAlert(null) }}
                    >
                      <CloseRounded fontSize="inherit" />
                    </IconButton>
                  }>
                  <AlertTitle>{alert?.title}</AlertTitle>
                  {alert?.text}
                </Alert>
              </Backdrop>
            </SystemStorageContext.Provider>
          </StorageContext.Provider>
        </UserContext.Provider>
      </Paper>
    </ThemeProvider>
  </div >
  );
}

export default MyApp;
