import { useContext, useEffect, useState } from 'react';
import React from 'react';
import { UserContext } from '../lib/UserContext';
import Loading from '../components/loading.js';
import { AppBar, Box, Button, Card, Container, Dialog, IconButton, List, ListItem, ListItemButton, ListItemText, Slide, Toolbar, Typography } from '@mui/material';
import { navInfo } from '../components/constants';
import { StorageContext } from '../lib/StorageContext';
import { CloseRounded, SaveRounded, SettingsRounded } from '@mui/icons-material';
import { useRouter } from 'next/router';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Settings = (props) => {
  const [user] = useContext(UserContext);
  const [storage] = useContext(StorageContext);

  const [info, setInfo] = useState();
  const router = useRouter()
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    router.back()
  };

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

  return <Dialog
    fullScreen
    open={open}
    onClose={handleClose}
    TransitionComponent={Transition}
    PaperProps={{elevation:0}}
  >
    <AppBar sx={{ position: 'relative' }}>
      <Toolbar>
          <SettingsRounded />
        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
          Settings
        </Typography>
        <IconButton
          color="inherit"
          aria-label="close"
          onClick={handleClose}
        >
          <SaveRounded />
        </IconButton>
      </Toolbar>
    </AppBar>
    <Box sx={{p: 3}}>
      {user?.issuer && <div>
        <Typography variant={`header`}>
          Logged in as {user.email.slice(0, user.email.indexOf('@')).replaceAll(".", " ")}
        </Typography>
      </div>}
    <Card>
      <List>
        <ListItem>
          <ListItemText>
            {info?.username}
          </ListItemText>
        </ListItem>
        <ListItemButton onClick={() => {
          let newUsername = "user#" + Math.round(Math.random() * 1000)
          storage.current.keyValuePair("userdata", "username", newUsername).then(res => {
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
          storage.current.keyValuePair("userdata", "username", null).then(res => {
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
    </Card>
    </Box>
  </Dialog>;
};
export default Settings;

export async function getStaticProps(context) {
  return {
    props: {
      title: `Settings`,
      slug: [navInfo.settings]
    },
  }
}