import { useContext, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { magic } from '../lib/magic';
import { UserContext } from '../lib/UserContext';
import { CallToAction, TextButton } from '@magiclabs/ui';
import { deepOrange, deepPurple, amber } from '@mui/material/colors';
import { Menu, DashboardRounded } from '@mui/icons-material';
import {
  AppBar, Toolbar, Drawer,
  Paper, Avatar, Typography,
  SwipeableDrawer, Box, Divider,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const drawerWidth = 240;

const Header = () => {
  const [user, setUser] = useContext(UserContext);

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor, open) =>
      (event) => {
        setState({ ...state, [anchor]: open });
      };

  const Menu = (props) => (
    <Box
      sx={{ width: props.anchor === 'top' || props.anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(props.anchor, false)}
      onKeyDown={toggleDrawer(props.anchor, false)}
    >
      <List>
        {props.children}
        <Link href='/'>
          <ListItem>
            <ListItemIcon>
              <DashboardRounded></DashboardRounded>
            </ListItemIcon>
            <ListItemText>
              Dashboard
            </ListItemText>
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  const logout = () => {
    magic.user.logout().then(() => {
      setUser({ user: null });
      Router.push('/login');
    });
  };

  return (<Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Clipped drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box>

      </Box>);

  // return (
  //   <>

  //     <SwipeableDrawer
  //       anchor={'left'}
  //       open={state['left']}
  //       onClose={toggleDrawer('left', false)}
  //       onOpen={toggleDrawer('left', true)}
  //     >
  //       <Menu anchor={'left'}>

  //       </Menu>
  //     </SwipeableDrawer>

  //     <SwipeableDrawer
  //       anchor={'right'}
  //       open={state['right']}
  //       onClose={toggleDrawer('right', false)}
  //       onOpen={toggleDrawer('right', true)}
  //     >
  //       <Menu anchor={'right'}></Menu>
  //       {/* <List
  //         role="presentation"
  //         onClick={toggleDrawer('right', false)}
  //         onKeyDown={toggleDrawer('right', false)}
  //       >
  //         <ListItem>
  //           <ListItemIcon><Avatar></Avatar></ListItemIcon>
  //           <ListItemText>{user?.email}</ListItemText>
  //         </ListItem>
  //         <ListItem>
  //           <Link href='/profile'>
  //             <CallToAction color='primary' size='sm'
  //               onClick={toggleDrawer('right', false)}
  //               onKeyDown={toggleDrawer('right', false)}>
  //               Profile
  //             </CallToAction>
  //           </Link>
  //         </ListItem>
  //         <ListItem>
  //           <CallToAction color='error' size='sm' onPress={logout}
  //             onClick={toggleDrawer('right', false)}
  //             onKeyDown={toggleDrawer('right', false)}>
  //             Logout
  //           </CallToAction>
  //         </ListItem>
  //       </List> */}
  //     </SwipeableDrawer>

  //     <Paper sx={{
  //       position: `relative`, width: `100%`, height: `3rem`,
  //       padding: `1rem`,
  //       overflow: `hidden`,
  //       marginBottom: `2rem`
  //     }} elevation={1}>

  //       <Menu onClick={toggleDrawer('left', true)}
  //         sx={{ position: `absolute`, top: `25%` }}></Menu>



  //       {user?.loading ? (
  //         <div style={{ height: '38px' }}></div>
  //       ) : user?.issuer ? (
  //         <Avatar onClick={toggleDrawer('right', true)}
  //           sx={{ position: `absolute`, top: `7.5%`, right: `1rem` }}>
  //           {user.email[0]}
  //         </Avatar>
  //       ) :
  //         <Link href='/login'>
  //           <CallToAction color='primary' size='sm' style={{ position: `absolute`, top: `10%`, right: `1rem` }}>
  //             Login
  //           </CallToAction>
  //         </Link>
  //       }



  //     </Paper></>
  // )
};

export default Header;
