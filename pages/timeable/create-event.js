import { forwardRef, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../lib/UserContext';
import Loading from '../../components/loading.js';
import { AppBar, Box, Card, Container, Dialog, Fab, IconButton, Slide, Stack, Toolbar, Typography } from '@mui/material';
import { navInfo } from '../../components/constants';
import { ExitToApp, Save, SaveRounded, Schedule } from '@mui/icons-material';
import { StorageContext } from '../../lib/StorageContext';
import { useRouter } from 'next/router';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const CreateEvent = () => {
    const [storage] = useContext(StorageContext);

    const [info, setInfo] = useState();
    const router = useRouter()
    const [open, setOpen] = useState(true);


    const handleClose = () => {
        setOpen(false)
        router.back()
    };

    useEffect(() => {
        if (info == undefined) {
            storage.current.keyValuePair("userdata", "username").then(res => {
                setInfo({
                    ...info,
                    username: res?.data
                })
            })
        }
    })


    return <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        PaperProps={{ elevation: 0 }}
        sx={{ width: `100%`, height: `100%` }}
    >
        <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
                <Schedule />
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                    Schedule new event
                </Typography>
                <IconButton
                    color="inherit"
                    aria-label="close"
                    onClick={handleClose}
                >
                    <ExitToApp color='secondary' />
                </IconButton>
            </Toolbar>
        </AppBar>
        <Stack
            spacing={3}
            sx={{ p: 3, height: `100%`, display: `flex` }}>

            <Card sx={{ p: 3, flex: 1 }} variant={`outlined`}>
                <Stack sx={{ flex: 1 }}>
                    <Typography variant={`header`}>
                        Create new event
                    </Typography>
                </Stack>

            </Card>

            <Fab size="medium"
                variant={`extended`}
                color="primary"
                aria-label="save"
                sx={{ width: `100%` }}
                onClick={handleClose}> {/**TODO: save the new event here */}
                <Save sx={{mr:1}} />
                Create new event
            </Fab>

        </Stack></Dialog>
};

export default CreateEvent;

export async function getStaticProps(context) {
    return {
        props: {
            title: `Schedule new event - Timeable`,
            slug: [navInfo.overview]
        },
    }
}