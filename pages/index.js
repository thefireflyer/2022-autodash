import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../lib/UserContext';
import Loading from '../components/loading.js';
import { Paper, Button, List, ListItem, ListItemButton, ListItemText, Typography, Card, Grid, Divider, Stack, Container } from '@mui/material';
import { navInfo } from '../components/constants';
import { StorageContext } from '../lib/StorageContext';
import { Box } from '@mui/system';
import { AltLink } from '../components/link';
import { InfoRounded } from '@mui/icons-material';

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

  return <Grid container spacing={3} sx={{ flex:1 }}>
      
      <Grid item xs={12} lg={9} xl={9.5}>
        <Card sx={{ p: 3, height:`100%`, width:`100%` }}>
          <Typography variant={`h6`}>Dashboard</Typography>
        </Card>
      </Grid>

      <Grid item xs sx={{
        display: { xs: `none`, md: `none`, lg: `flex` }
      }}>
        <Grid
          container
          spacing={3}
          direction="column"
          sx={{ flex:1 }}
        >
          <Grid item>
            <Card sx={{ p: 3 }} variant={`outlined`}>
              <Clock variant={`h6`} />
            </Card>
          </Grid>
          <Grid item xs>
            <Card sx={{ p: 3, height: `100%` }} variant={`outlined`}>
              <Typography variant={`h6`}>Updates</Typography>
              <Divider />
              <List>
              </List>
            </Card>
          </Grid>
          <Grid item >

            <Card sx={{ p: 3 }} variant={`outlined`}>
              <AltLink href={`https://theflyingfire.github.io/website/blog/test1`}>
                <Typography sx={{ display: 'flex', justifyContent:`center`, alignItems: 'center' }} variant={`h6`}>
                  <InfoRounded />Release notes
                </Typography>
              </AltLink>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>;
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