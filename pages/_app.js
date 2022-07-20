
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
import { StorageContext } from '../lib/StorageContext';
import Loading from '../components/loading';
import { CloseRounded } from '@mui/icons-material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const NO_VALUE = Math.random()

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();
  const [alert, newAlert] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const storage = useRef();

  function setupStorage(isCloudAccount) {//TODO: add cloud syncing

    storage.current = {
      db: null,
      keyValuePair:
        /**
         * @param {String} database an existing database to edit.
         * @param {String} key key of an existing or new key value pair.
         * @param {any} [updatedValue=NO_VALUE] new data value (optional), defaults to no update. Value of null will delete the key value pair.
         * @returns {(Promise)} if there was an error, {@link keyValuePair} will return the error code.
         *  If successful it will return the original data.
         */
        (database, key, updatedValue = NO_VALUE) =>
          new Promise((resolve, reject) => {
            
            const transaction = storage.current.db.transaction(database, "readwrite");
            
            const objectStore = transaction.objectStore(database);

            const request = objectStore.get(key);

            request.onsuccess = event => {
              const data = event.target.result;
              if (updatedValue != NO_VALUE) {//should update existing data
                if (updatedValue == null) {//data is null, delete the key value pair
                  objectStore.delete(key)
                }
                else {//new data, update it
                  objectStore.put({
                    info: key,
                    data: updatedValue
                  })
                }
              }

              resolve(data)
            };
          }),

      createDatabase:
        /**
         * 
         * @param {String} databaseName 
         * @param {String} primaryKey 
         * @returns {IDBDatabase}
         */
        (databaseName, primaryKey) => new Promise((resolve, reject) => {
          resolve(storage.current.db.createObjectStore(databaseName, { keyPath: primaryKey }));
        }),

      removeDatabase:
        /**
         * 
         * @param {String} databaseName 
         * @returns {IDBDatabase}
         */
        (databaseName) => new Promise((resolve, reject) => {
          resolve(storage.current.db.deleteObjectStore(databaseName));
        }),

    }

    if (!window.indexedDB) {
      console.log("Your browser doesn't support a stable version of IndexedDB.");
    }
    let request = window.indexedDB.open("testing05", 1);
    request.onerror = event => {
      newAlert({
        type: "error",
        title: "Trouble opening database",
        text: event.target.errorCode
      })
    };
    request.onsuccess = event => {
      storage.current.db = event.target.result;

      storage.current.db.onerror = event => {
        newAlert({
          type: "error",
          title: "Database error",
          text: event.target.errorCode
        })
      }

      storage.current.keyValuePair(
        "userdata", "username").then(res => {
          console.log("---" + JSON.stringify(res)) //TODO: remove!!
          setIsLoading(false)
        })

    };

    request.onupgradeneeded = event => {


      storage.current.db = event.target.result;
      storage.current.createDatabase("userdata", "info");

      newAlert({
        type: "info",
        title: "Update",
        text: "update complete"
      })
    };

  }

  // If isLoggedIn is true, set the UserContext with user data
  // Otherwise, redirect to /login and set UserContext to { user: null }
  useEffect(() => {
    setIsLoading(true)
    setupStorage(false)
    setUser({ loading: true });
    magic.user.isLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn) {
        magic.user.getMetadata().then((userData) => setUser(userData));
      } else {
        //Router.push('/login');
        setUser({ user: null });
      }
    });
  }, []);

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (<div className={styles.app}>
    <Head>
      <title>{`${pageProps.title} - ` || ''} Testing05</title>
      <meta name="description" content="main web portal" />
      <link rel='icon' href='/test.svg' />
      <link rel="manifest" href="/manifest.json" />
    </Head>

    <ThemeProvider theme={theme}>
      <Paper elevation={0} sx={{ width: `100%`, height: `100%`, overflow: `scroll` }}>
        <UserContext.Provider value={[user, setUser]}>
          <StorageContext.Provider value={[storage]}>
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
          </StorageContext.Provider>
        </UserContext.Provider>
      </Paper>
    </ThemeProvider>
  </div >
  );
}

export default MyApp;
