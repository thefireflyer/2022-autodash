import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../lib/UserContext';
import Loading from '../components/loading.js';
import { Paper, Button, List, ListItem, ListItemButton, ListItemText, Typography, Card, Grid, Divider, Stack } from '@mui/material';
import { navInfo } from '../components/constants';
import { StorageContext } from '../lib/StorageContext';
import { Box } from '@mui/system';

const Clock = (props) => {
  const [date, setDate] = useState(new Date());

  function refreshClock() {
    setDate(new Date());
  }
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  return (
    <Typography {...props}>
      {date.toLocaleTimeString()}
    </Typography>
  )
}

const Home = () => {
  const [user] = useContext(UserContext);
  const [storage] = useContext(StorageContext);

  const [info, setInfo] = useState();


  useEffect(() => {


    if (info == undefined) {
      storage.current.keyValuePair("userdata", "username").then(res => {
        setInfo({
          ...info,
          username: res?.data
        }, err => { })
      })
    }

  })

  return <Box>
    {
      user?.issuer && <div>
        <Typography variant={`header`}>
          Logged in as {user.email.slice(0, user.email.indexOf('@')).replaceAll(".", " ")}
        </Typography>
      </div>}
    {/* <Card
      sx={{
        m: 3,
        p: 3,
        width: {
          sm: `100%`,
          lg: `70%`
        },
        height: `20rem`
      }}>
      <Clock variant={`h3`} />
      <Typography>Dashboard</Typography>
    </Card>
    <Card
      sx={{
        m: 3,
        p: 3,
        width: {
          sm: `100%`,
          lg: `20%`
        },
      }}>
      <Typography>Updates</Typography>
    </Card> */}
    <Grid container spacing={3}>
      <Grid item xs={12} lg={9}>
        <Card sx={{ p: 3 }}>
          <Typography variant={`h5`}>Dashboard</Typography>
        </Card>
      </Grid>
      <Grid item xs sx={{display:{xs:`none`, md: `none`, lg:`block`}}}>
        <Stack spacing={3}>
          <Card sx={{ p: 3 }}>
            <Clock variant={`h6`} />
          </Card>
          <Card sx={{ p: 3 }}>
            <Typography variant={`h6`}>Updates</Typography>
            <Divider />
            <List>
              {/** Links to release notes */}
            </List>
          </Card>
        </Stack>
      </Grid>
    </Grid>
  </Box>;
};

export default Home;

export async function getStaticProps(context) {
  return {
    props: {
      title: `Home`,
      slug: [navInfo.dashboard]
    },
  }
}