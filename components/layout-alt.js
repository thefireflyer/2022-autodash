import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';
import { demoPageContents, logo, navGroups, navIcons, navLinks } from './constants';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../lib/UserContext';
import Loading from './loading';
import { magic } from '../lib/magic';
import Router from 'next/router';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { CloudCircleOutlined, CloudOffOutlined, CloudOutlined, DashboardCustomizeRounded, DashboardRounded, FaceRounded, PagesRounded, Search, SignalWifiConnectedNoInternet4Outlined } from '@mui/icons-material';
import { Container } from '@mui/system';
//import Link from 'next/link';
import { Breadcrumbs, Icon, SwipeableDrawer } from '@mui/material';
import { AltLink, AltLink as Link } from './link';

import { motion, LayoutGroup, AnimatePresence } from 'framer-motion';
import { StorageContext } from '../lib/StorageContext';

const drawerWidth = 240;

function LayoutAlt(props) {
  const [storage] = useContext(StorageContext);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [user, setUser] = useContext(UserContext);

  const [connectionStatus, setConnectionStatus] = useState()

  const logout = () => {
    magic.user.logout().then(() => {
      setUser({ user: null });
      Router.push('/login');
    });
  };

  useEffect(() => {
    if (user?.loading) { }
    else {
      storage.current?.onMessageRecieved.push(msg => {
        setConnectionStatus(msg != "[connection closed]")
      })
      storage.current?.keyValuePair(
        "serverdata", "useserver").then(res => {
          if (res?.data == false) {
            setConnectionStatus(false)
          }
        })
    }
  }, [user])


  const drawer = (
    <Box sx={{ position: `relative`, height: `100%` }} onClick={handleDrawerToggle}>
      <Toolbar />
      {navGroups.map((group, index) => (<>
        <Divider />
        <List>
          {group.map((page, index) => (
            <ListItem key={page.name} disablePadding>
              <Link href={page.link} underline={`hover`}>
                <ListItemButton>
                  <ListItemIcon>
                    {navIcons[page.icon]}
                  </ListItemIcon>
                  <ListItemText primary={page.name} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List></>
      ))}
      <Container sx={{ position: `absolute`, bottom: `0` }}>
        <Divider sx={{ marginBottom: `1rem` }} />
        {/* {user?.loading ? <Loading /> : user?.issuer ?
          <List>
            <ListItem>
              <Link href='/account' underline={`hover`}>
                <ListItemButton>
                  <ListItemIcon>
                    <FaceRounded />
                  </ListItemIcon>
                  <ListItemText>Account</ListItemText>
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <LogoutRoundedIcon />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </ListItemButton>
            </ListItem>
          </List> :
          <ListItem>
            <Link href='/login' underline={`hover`}>
              <ListItemButton variant={``}>
                <ListItemIcon>
                  <LoginRoundedIcon />
                </ListItemIcon>
                <ListItemText>Sign in</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>} */}
        {user?.loading ? <Loading /> : connectionStatus ?
          <ListItem>
            <Link href='/settings' underline={`hover`}>
              <ListItemButton>
                <ListItemIcon>
                  <CloudOutlined />
                </ListItemIcon>
                <ListItemText>Connected</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
          :
          <ListItem>
            <Link href='/settings' underline={`hover`}>
              <ListItemButton variant={``}>
                <ListItemIcon>
                  <CloudOffOutlined />
                </ListItemIcon>
                <ListItemText>Local</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
        }
      </Container>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{
      display: 'flex',
      height: `100%`
    }}>
      <CssBaseline />
      <AppBar
        position="absolute"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            <Link href='/'>
              <Typography
                sx={{ display: 'flex', alignItems: 'center' }}
                color="text.primary"
              >
                {logo}
              </Typography>
            </Link>
            {props?.slug?.map(crumb => (
              <Link href={crumb.link} underline={`hover`}>
                <Typography
                  sx={{ display: 'flex', alignItems: 'center' }}
                  color="text.primary"
                >
                  {/* {navIcons[crumb?.icon]} */}
                  {crumb?.name}
                </Typography>
              </Link>
            ))}
          </Breadcrumbs>

          <IconButton
            color="inherit"
            aria-label="open settings"
            edge="end"
            sx={{
              mr: 2,
              position: `absolute`,
              right: `0`
            }}
          >
            <Link href='/search'>
              <Typography
                sx={{ display: 'flex', alignItems: 'center' }}
                color="text.primary">
                <Search />
              </Typography>
            </Link>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <SwipeableDrawer
          anchor={`left`}
          open={mobileOpen}
          onClose={() => { setMobileOpen(false) }}
          onOpen={() => { setMobileOpen(true) }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'auto', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </SwipeableDrawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          display: `flex`,
          flexDirection: `column`,
          width: { xs: `100%`, sm: `calc(100% - ${drawerWidth}px)` },
          maxWidth: `100vw`,
          height: `100%`,
        }}
      >

        <Toolbar />
        <Box sx={{
          flex: 1,
          width: `100%`,
          position: `relative`
        }}>
          <AnimatePresence initial={false}>
            <Box
              key={props.title}
              sx={{
                position: `absolute`,
                width: `100%`,
                height: `100%`,
                left: `0`, top: `0`, p: 3,
                display: `flex`
              }}>
              <motion.div
                style={{
                  flex: 1,
                  display: `flex`
                }}
                variants={{
                  enter: {
                    opacity: 0,
                    y: 100,
                  },
                  visible: {
                    opacity: 1,
                    y: 0
                  },
                  exit: {
                    opacity: 0,
                  }
                }}
                initial="enter"
                animate="visible"
                exit="exit"
              >
                {props.children}
              </motion.div>

            </Box>
          </AnimatePresence>
        </Box>
      </Box>

    </Box>
  );
}

export default LayoutAlt;
