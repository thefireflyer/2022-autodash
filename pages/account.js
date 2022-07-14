import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../lib/UserContext';
import Loading from '../components/loading.js';
import { Button, Divider, FormControl, ListItemButton, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { navInfo } from '../components/constants';

const Profile = () => {
  const [user] = useContext(UserContext);

  const [data, setData] = useState()

  const refresh = () => {
    fetch('/api/db')
      .then(response => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then(json => {
        setData(json)
        console.log(data)
      })
      .catch(function () {
        console.error("failed to refresh")
      })
  }

  const add = () => {
    fetch('/api/db',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          action: `add`,
          id: user.publicAddress,
          email: user.email,
          testValue: 69,
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then(json => {
        setData(json)
        console.log(data)
      })
      .catch(function () {
        console.error("failed to refresh")
      })
  }

  const remove = () => {
    fetch('/api/db',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            action: `remove`,
            id: user.publicAddress
          }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then(json => {
        setData(json)
        console.log(data)
      })
      .catch(function () {
        console.error("failed to refresh")
      })
  }
  return (
    <Box>
      {/**TESTING*/}
      <Box>

        <TableContainer component={Paper} variant={`outlined`} sx={{ marginBottom: `1rem` }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Auth token</TableCell>
                <TableCell align="right">Example Data</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.users.map(userEntry => (
                <TableRow key={userEntry.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">{userEntry.id}</TableCell>
                  <TableCell align="right">{userEntry.email}</TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right">{userEntry.testValue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button variant={`outlined`} onClick={refresh} sx={{ margin:`1rem` }} >refresh</Button>

        <Button variant={`outlined`} onClick={add} sx={{ margin:`1rem` }} >add account</Button>
        
        <Button variant={`outlined`} onClick={remove} sx={{ margin:`1rem` }} >remove account</Button>

      </Box>


      <Divider sx={{ margin: `1rem` }} />

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