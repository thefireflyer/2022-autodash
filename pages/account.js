import { useContext } from 'react';
import { UserContext } from '../lib/UserContext';
import Loading from '../components/loading.js';
import { Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { navInfo } from '../components/constants';

const Profile = () => {
  const [user] = useContext(UserContext);

  return (
    <Box>
      {user?.loading ? (
        <Loading />
      ) : (
        user?.issuer && (
          <Box>
            <div className='label'>Email</div>
            <div className='profile-info'>{user.email}</div>

            <div className='label'>User Id</div>
            <div className='profile-info'>{user.issuer}</div>
          </Box>
        )
      )}
      <style jsx>{`
        .label {
          font-size: 12px;
          color: #6851ff;
          margin: 30px 0 5px;
        }
        .profile-info {
          font-size: 17px;
          word-wrap: break-word;
        }
      `}</style>
    </Box>
  );
};

export default Profile;

export async function getStaticProps(context) {
  return {
    props: {
      title: `Account`,
      slug: [navInfo.account]
    },
  }
}