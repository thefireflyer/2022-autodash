import { useState } from 'react';
import Head from 'next/head';
import Header from './header';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {SwipeableDrawer, Box, Divider, Container,
   List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';

const Layout = (props) => {



  return (<>
    <Header />
    <div className='container'>
      {props.children}
    </div>

    <style jsx global>{`
      * {
        font-family: sans-serif !important;
        outline: none;
      }
      .container {
        max-width: 42rem;
        margin: 0 auto;
        padding: 0 10px;
      }
    `}</style>
  </>);
}

export default Layout;
