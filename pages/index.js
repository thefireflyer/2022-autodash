import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../lib/UserContext';
import Loading from '../components/loading.js';
import { Box, Button, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { navInfo } from '../components/constants';
import { StorageContext } from '../lib/StorageContext';

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
        })
      })
    }
  })

  return <Box>{
    user?.issuer && <div>
      <Typography variant={`header`}>
        Logged in as {user.email.slice(0, user.email.indexOf('@')).replaceAll(".", " ")}
      </Typography>
    </div>}
    <List>
      <ListItem>
        <ListItemText>
          {info?.username}
        </ListItemText>
      </ListItem>
      <ListItemButton onClick={() => {
        let newUsername = "user#"+Math.round(Math.random() * 1000)
        storage.current.keyValuePair("userdata", "username",newUsername).then(res => {
          setInfo({
            ...info,
            username: newUsername
          })
        })
      }}>
        <ListItemText>
          change username
        </ListItemText>
      </ListItemButton>
      <ListItemButton onClick={() => {
        storage.current.keyValuePair("userdata", "username",null).then(res => {
          setInfo({
            ...info,
            username: ""
          })
        })
      }}>
        <ListItemText>
          delete username
        </ListItemText>
      </ListItemButton>
    </List>
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