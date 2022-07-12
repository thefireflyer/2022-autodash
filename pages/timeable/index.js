import { useContext } from 'react';
import { UserContext } from '../../lib/UserContext';
import Loading from '../../components/loading.js';
import { Container, Typography } from '@mui/material';
import { navInfo } from '../../components/constants';

const Home = () => {
  const [user] = useContext(UserContext);

  return <>{user?.loading ?
     <Loading /> :
     user?.issuer && <div>
      <Typography variant={`header`}>
        Summary
      </Typography>
      </div>}</>;
};

export default Home;

export async function getStaticProps(context) {
  return {
    props: {
      title:`Overview - Timeable`,
      slug:[navInfo.overview]
    },
  }
}