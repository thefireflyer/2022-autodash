import { useContext, useEffect, useState } from 'react';
import React from 'react';
import { UserContext } from '../lib/UserContext';
import Loading from '../components/loading.js';
import { AppBar, Box, Button, Card, Container, Dialog, FormControlLabel, FormGroup, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Slide, Stack, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from '@mui/material';
import { navInfo } from '../components/constants';
import { StorageContext } from '../lib/StorageContext';
import { CloseRounded, ListAltOutlined, SaveRounded, SettingsRounded } from '@mui/icons-material';
import { useRouter } from 'next/router';

const Settings = (props) => {
  const [user] = useContext(UserContext);
  const [storage] = useContext(StorageContext);

  const [info, setInfo] = useState();
  const [log, setLog] = useState();
  const router = useRouter()
  const [open, setOpen] = React.useState(true);


  const handleClose = () => {
    setOpen(false)
    router.back()
  };


  function appendLog(item) {
    setLog(log => [...log, item])
  }

  function updateLog(data) {
    console.log("old log", log)
    var messages = data.split('\n');

    // const newLog = log.concat(messages)
    // console.log("new log", newLog)
    setLog(log => [...log, messages])
  };

  async function loadData() {
    let data = {}
    await storage.current.keyValuePair("userdata", "username").then(res => {
      data.username = res?.data
      console.log("loaded username")
    })
    await storage.current.keyValuePair("serverdata", "uri").then(res => {
      data.uri = res?.data
      console.log("loaded uri")
    })
    await storage.current.keyValuePair("serverdata", "serverauth").then(res => {
      data.auth = res?.data
      console.log("loaded serverauth")
    })
    await storage.current.keyValuePair("serverdata", "useserver").then(res => {
      data.connected = res?.data
      console.log("loaded useserver")
    })

    storage.current.onMessageRecieved.push(updateLog)

    // if (window["WebSocket"] && data.connected) {
      
    //   var operatingSystems = [
    //     { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
    //     { name: 'Windows', value: 'Win', version: 'NT' },
    //     { name: 'iPhone', value: 'iPhone', version: 'OS' },
    //     { name: 'iPad', value: 'iPad', version: 'OS' },
    //     { name: 'Kindle', value: 'Silk', version: 'Silk' },
    //     { name: 'Android', value: 'Android', version: 'Android' },
    //     { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
    //     { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
    //     { name: 'Macintosh', value: 'Mac', version: 'OS X' },
    //     { name: 'Linux', value: 'Linux', version: 'rv' },
    //     { name: 'Palm', value: 'Palm', version: 'PalmOS' }
    //   ]

    //   let deviceOS = "Unknown"
    //   operatingSystems.forEach(os => {
    //     if (navigator.userAgent.includes(os.value)) {
    //       console.log(os.name)
    //       deviceOS = os.name
    //     }
    //   })

    //   data.conn = new WebSocket(`ws://` + data.uri + `/live/?os=`+deviceOS);
    //   data.conn.onmessage = updateLog

    //   data.conn.onclose = () => { appendLog("connection closed") }

    //   data.conn.onopen = () => {
    //     data.conn.send(data.auth)
    //     let clientInfo = {}
    //     storage.current.getAll("userdata").then(res => {
    //       res.forEach(element => {
    //         console.log(element)
    //         clientInfo[element.info] = element.data
    //       });

    //       clientInfo["test"] = "test"
    //       data.conn.send(JSON.stringify(clientInfo))

    //       data.connready = true
    //       data.conn.send("GetDevices")
    //     })
    //   }


    //   data.devices = []
    // } else {
    //   appendLog(`Your browser does not support WebSockets`);
    // }
    setInfo(data)
  }

  useEffect(() => {
    setLog([])

    loadData()
    // console.log("log", log)
    // console.log("username:"+ info?.username)
    // console.log("server auth:"+ info?.auth)
    // console.log("connected:"+ info?.connected)
    // console.log("uri:"+ info?.uri)

    // data.conn.onclose = function (evt) {
    //   appendLog('connection closed')
    // };
    // if (info && info.conn)
    // {
    //   console.log("init onmessage")
    //   info.conn.onmessage = updateLog
    //   setInfo(info)
    // }
  }, [])

  return <Grid container spacing={3} sx={{ flex: 1 }}>
    <Stack sx={{ p: 3, flex: 1, maxWidth: `100vw` }} spacing={3}>
      {user?.issuer && <div>
        <Typography variant={`header`}>
          Logged in as {user.email.slice(0, user.email.indexOf('@')).replaceAll(".", " ")}
        </Typography>
      </div>}
      <Card sx={{ p: 3 }} variant={`outlined`}>
        <List>
          <ListItem>
            <TextField id="username"
              label="username"
              variant={`standard`}
              value={info ? info.username : ``}
              onChange={event => {
                const newUsername = event.target.value
                storage.current.keyValuePair("userdata", "username", newUsername).then(res => {
                  setInfo({
                    ...info,
                    username: newUsername
                  })
                })
              }}
            />
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
              random username
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
              clear username
            </ListItemText>
          </ListItemButton>
        </List>
      </Card>

      <Card sx={{ p: 3 }} variant={`outlined`}>
        <List>
          <ListItem>
            <TextField id="uri"
              label="server uri"
              variant={`standard`}
              value={info ? info.uri : ``}
              disabled={info ? info.connected : `false`}
              onChange={event => {
                const newURI = event.target.value
                storage.current.keyValuePair("serverdata", "uri", newURI).then(res => {
                  setInfo({
                    ...info,
                    uri: newURI
                  })
                })
              }}
            />
          </ListItem>
          <ListItem>
            <TextField id="auth"
              label="auth (name:password)"
              variant={`standard`}
              value={info ? info.auth : ``}
              disabled={info ? info.connected : `false`}
              onChange={event => {
                const newAuth = event.target.value
                storage.current.keyValuePair("serverdata", "serverauth", newAuth).then(res => {
                  setInfo({
                    ...info,
                    auth: newAuth
                  })
                })
              }}
            />
          </ListItem>
          <ListItemButton onClick={async () => {
            console.log(info.connected)
            if (!info.connected) {

              console.log("uri: " + info.uri)
              storage.current.connectExternal().then(res => {
                console.log(res)
                setInfo({
                  ...info,
                  connected: res
                })
                if (!res)
                {
                  appendLog("failed to connect")
                }
              }
              )

            }
            else {
              storage.current.keyValuePair("serverdata", "useserver", false).then(res => {
                setInfo({
                  ...info,
                  connected: false
                })
                storage.current.server = null
                storage.current.onMessageRecieved.forEach( reciever => {
                  reciever("[connection closed]")
                })
              })
            }
          }}>
            <ListItemText>
              {info ? !info.connected ? `Connect` : `Disconnect` : `....`}
            </ListItemText>
          </ListItemButton>
        </List>
      </Card>

      {info?.connected ? <>
        <Card sx={{ p: 3, overflow: `scroll` }} variant={`outlined`}>
          <Card sx={{ p: 3 }} variant={`outlined`}>
            <List>
              {
                log?.map(message => <ListItem key={message}>
                  <ListItemText>
                    {message}
                  </ListItemText>
                </ListItem>)
              }
              <ListItem>
                <TextField id="message"
                  label="message"
                  variant={`standard`}
                  value={info ? info.message : ``}
                  onChange={event => {
                    const newMessage = event.target.value
                    setInfo({
                      ...info,
                      message: newMessage
                    })
                  }}
                />
              </ListItem>
              <ListItemButton onClick={async () => {
                console.log(info.connected)

                console.log("uri: " + info.uri)

                if (!storage.current.server) {
                  return
                }
                if (!info.message) {
                  return
                }
                storage.current.server.send(info.message);
                setInfo(info => {
                  return {
                    ...info,
                    message: ''
                  }
                })

              }}>
                <ListItemText>
                  {info ? `Send` : `....`}
                </ListItemText>
              </ListItemButton>
            </List>
          </Card>
          <br />
          <TableContainer component={Paper} variant={`outlined`}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>IP</TableCell>
                  <TableCell align="right">OS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {info?.devices?.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.ip}
                    </TableCell>
                    <TableCell align="right">{row.os}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <TableContainer component={Paper} variant={`outlined`}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Table name</TableCell>
                  <TableCell align="right">Rows</TableCell>
                  <TableCell align="right">Last updated</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {info?.tables?.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.rows}</TableCell>
                    <TableCell align="right">{row.lastUpdated}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </>
        : <></>}
      {/* <Card sx={{ p: 3 }} variant={`outlined`}>
      </Card> */}
    </Stack>
  </Grid>;
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