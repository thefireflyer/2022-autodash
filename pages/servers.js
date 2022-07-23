import { useContext } from 'react';
import { UserContext } from '../lib/UserContext';
import Loading from '../components/loading.js';
import { Box, Container, Typography } from '@mui/material';
import { navInfo } from '../components/constants';

const Home = () => {
  const [user] = useContext(UserContext);

  return <Box>      
  <Typography variant={`header`}>
    Running server checkups...
  </Typography>
  </Box>;
};

export default Home;

export async function getStaticProps(context) {
  return {
    props: {
      title:`Servers`,
      slug:[navInfo.servers]
    },
  }
}