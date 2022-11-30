import { useContext, useEffect, useState } from 'react';
import React from 'react';
import { UserContext } from '../lib/UserContext';
import Loading from '../components/loading.js';
import { AppBar, Box, Button, Card, Container, Dialog, IconButton, List, ListItem, ListItemButton, ListItemText, Slide, Stack, TextField, Toolbar, Typography } from '@mui/material';
import { navInfo } from '../components/constants';
import { StorageContext } from '../lib/StorageContext';
import { CloseRounded, SaveRounded, Search, SettingsRounded } from '@mui/icons-material';
import { useRouter } from 'next/router';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SearchPage = (props) => {
  const [user] = useContext(UserContext);
  const [storage] = useContext(StorageContext);

  const [info, setInfo] = useState();
  const router = useRouter()
  const [open, setOpen] = React.useState(true);


  const handleClose = () => {
    setOpen(false)
    router.back()
  };

  useEffect(() => {
    if (info == undefined) {
      async function loadData() {
        let data = {
            search: ''
        }
        setInfo(data)
      }
      loadData()
    }
  })

  return <Dialog
    fullScreen
    open={open}
    onClose={handleClose}
    TransitionComponent={Transition}
    PaperProps={{ elevation: 0 }}
  >
    <AppBar sx={{ position: 'relative' }}>
      <Toolbar>
        <Search />
        {/* <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
          Search
        </Typography> */}
        <TextField id='search'
        label='Search'
        variant={`filled`}
        sx={{ ml: 2, mr: 2, flex: 1 }} 
        value={info?.search}
        onChange={event => {
            setInfo({
                ...info,
                search: event.target.value
            })
        }}/>
        <IconButton
          color="inherit"
          aria-label="close"
          onClick={handleClose}
        >
          <CloseRounded />
        </IconButton>
      </Toolbar>
    </AppBar>
    <Stack sx={{ p: 3 }} spacing={3}>
      {/* <Card sx={{ p: 3 }} variant={`outlined`}>
      </Card> */}
    </Stack>
  </Dialog>;
};
export default SearchPage;

export async function getStaticProps(context) {
  return {
    props: {
      title: `Search`,
      slug: [navInfo.search]
    },
  }
}