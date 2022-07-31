import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../lib/UserContext';
import Loading from '../components/loading.js';
import { Paper, Button, List, ListItem, ListItemButton, ListItemText, Typography, Card, Grid, Divider, Stack, Container, Avatar, Skeleton, ListItemAvatar, ListItemIcon } from '@mui/material';
import { navInfo } from '../components/constants';
import { StorageContext } from '../lib/StorageContext';
import { Box } from '@mui/system';
import { AltLink } from '../components/link';
import { FeedOutlined, InfoRounded, LastPageRounded, UnfoldLessRounded, UnfoldMoreRounded } from '@mui/icons-material';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import { Clock } from '../components/clock';


const Home = (props) => {
  const [user] = useContext(UserContext);
  const [storage] = useContext(StorageContext);

  const [info, setInfo] = useState();

  const welcomeMessage = (new Date().getHours() < 12) ? `Good morning` : 
    `Welcome back`

  useEffect(() => {
    storage.current.keyValuePair("userdata", "username").then(res => {
      setInfo({
        ...info,
        username: res?.data
      }, err => { })
    })

  }, [])

  return <Grid container spacing={3} sx={{ flex: 1 }}>

    <Grid item xs={12} lg={9} xl={9.5}>
      {/* <Card sx={{ p: 3, height: `100%`, width: `100%` }}>
        <Typography variant={`h6`}>Dashboard</Typography>

      </Card> */}

      <Card variant={`outlined`}
        sx={{ p: 3, height: `100%`, width: `100%`, overflow: `scroll` }}>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ margin: 1 }}>
            {
              false ? (
                <Avatar>{info?.avatar}</Avatar>
              ) : (
                <Skeleton variant="circular">
                  <Avatar />
                </Skeleton>
              )
            }
          </Box>
          <Box sx={{ width: '100%' }}>
            {
              info?.username ? (
                <Typography variant={`h6`}>{welcomeMessage} {info.username}!</Typography>
              ) : (
                <Skeleton width="100%">
                  <Typography variant={`h6`}>.</Typography>
                </Skeleton>
              )
            }
          </Box>
        </Box>

        <Divider sx={{m: 1}} />

        <TreeView
          aria-label="TODO"
          defaultCollapseIcon={<UnfoldLessRounded />}
          defaultExpandIcon={<UnfoldMoreRounded />}
          defaultEndIcon={<LastPageRounded />}
          disableSelection
        >
          <TreeItem nodeId="1" label="Calendar">
            <TreeItem nodeId="1.1" label="Chronological events">
            </TreeItem>
            <TreeItem nodeId="1.2" label="Prioritized events">
              <TreeItem nodeId="1.2.1" label="Events sorted by importance (recursive)" />
              <TreeItem nodeId="1.2.2" label="Events with no prerequisites" />
            </TreeItem>
            <TreeItem nodeId="1.3" label="Schedule new event" />
          </TreeItem>
          <TreeItem nodeId="2" label="Notes">
            <TreeItem nodeId="2.1" label="Search" />
            <TreeItem nodeId="2.2" label="Recent">
            </TreeItem>
          </TreeItem>
          <TreeItem nodeId='3' label="Servers">
            <TreeItem nodeId="3.1" label="Most recent test results" />
          </TreeItem>
          <TreeItem nodeId='4' label="Account/Settings">

          </TreeItem>
        </TreeView>
      </Card>

    </Grid>

    <Grid item xs sx={{
      display: { xs: `none`, md: `none`, lg: `flex` }
    }}>
      <Grid
        container
        spacing={3}
        direction="column"
        sx={{ flex: 1 }}
      >
        <Grid item>
          <Card sx={{ p: 3 }} variant={`outlined`}>
            <Clock variant={`h6`} />
          </Card>
        </Grid>
        <Grid item xs>
          <Card sx={{ p: 3, height: `100%`, overflow: `scroll` }} variant={`outlined`}>
            <Typography variant={`h6`}>Updates</Typography>
            <Divider />
            <List>
              {
                props.updates.map(update => (
                  <AltLink href={update.slug}>
                    <ListItem>
                      {/* <ListItemIcon><FeedOutlined /></ListItemIcon> */}
                      <ListItemAvatar>{update.avatar}</ListItemAvatar>
                      <ListItemText>{update.title}</ListItemText>
                    </ListItem>
                  </AltLink>
                ))
              }
            </List>
          </Card>
        </Grid>
        <Grid item >

          <Card sx={{ p: 3 }} variant={`outlined`}>
            <AltLink href={`https://theflyingfire.github.io/website/blog/test1`}>
              <Typography sx={{ display: 'flex', justifyContent: `center`, alignItems: 'center' }} variant={`h6`}>
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
      slug: [navInfo.dashboard],
      updates: [
        {
          title: `Initial release`,
          avatar: `1.0`,
          slug: `https://theflyingfire.github.io/website/blog/test1`
        }
      ]
    },
  }
}