import { useContext } from 'react';
import { UserContext } from '../lib/UserContext';
import Loading from '../components/loading.js';
import { Container, Typography } from '@mui/material';

const Home = () => {
  const [user] = useContext(UserContext);

  return <Container sx={{width:`100%`, height:`100%`, marginTop:`25%`}}>
    <Typography textAlign={`center`}>
        404 | Page not found
    </Typography>
  </Container>;
};

export default Home;

export async function getStaticProps(context) {
  return {
    props: {
      title:`Page not found :/`,
      slug:[]
    },
  }
}