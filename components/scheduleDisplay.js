import { createRef, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { Card, Grid, Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { useIsPresent } from 'framer-motion';
const segmentHeight = `2rem`
const GenericSegment = (props) => {

    if (props.label) {

        let formattedTime = new Date()

        formattedTime.setUTCHours(0)
        formattedTime.setUTCMinutes(props.i * 15)

        formattedTime = `${formattedTime.getUTCHours()}:${formattedTime.getUTCMinutes()}`

        return (
            <Paper sx={{ width: `100%`, height: `${segmentHeight}` }}
                key={props.i}
                elevation={0}>
                {props?.label && formattedTime}
            </Paper>
        )
    }
    else if (props.event) {
        return (
            <Paper sx={{ width: `100%`, height: `${segmentHeight}` }}
                key={props.i}
                elevation={1}>

            </Paper>)
    }
    else if (props.backSelector) {
        return (
            <Paper sx={{ width: `100%`, height: `${segmentHeight}` }}
                key={props.i}
                elevation={0}
                variant={`outlined`}
            >
            </Paper>
        )
    }
    else {
        return (
            <Paper sx={{ width: `100%`, height: `${segmentHeight}` }}
                key={props.i}
                elevation={0}>{props.children}
            </Paper>
        )
    }
}

const ClockOverlay = (props) => {

    const [date, setDate] = useState(new Date());
    
    function refreshClock() {
        setDate(new Date());
    }
    useEffect(() => {
        const timerId = setInterval(refreshClock, 1000);

        // date.setHours(4,30)
        // setDate(date)

        return function cleanup() {
            clearInterval(timerId);
        };
    });


    return (<Box
        sx={{
            left: `1%`,
            position: `absolute`,
            top: `${2.5*((date.getHours() * 60 + date.getMinutes()) / 15+1)+1.5}rem`,
            width: `98%`,
            height: `0.1rem`,
            background: useTheme().palette.secondary.dark
        }} />)
}

const TimeDisplay = (props) => {

    //displays formatted time labels
    //displays overlayed line showing current time

    const segments = []
    for (let i = 0; i < 24 * 4; i++) {
        segments.push(
            <GenericSegment label i={i} />
        )
    }

    return (
        <Grid item {...props}>

            <ClockOverlay />

            <Stack
                justifyContent="right"
                spacing={`0.5rem`}
                sx={{ p: `0.5rem`, flex: 1 }}>
                {/* <div></div> */}
                <GenericSegment />
                {segments}
            </Stack>


        </Grid>)
}

const DayDisplay = (props) => {

    let date = new Date(props.date)
    date.setUTCDate(date.getUTCDate() + props.dateModifier)
    date = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`
    const today = date === `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`

    const segments = []
    const segmentReferences = []
    for (let i = 0; i < 24 * 4; i++) {
        segmentReferences.push(createRef())
        segments.push(
            <GenericSegment backSelector i={i} />
        )
    }

    return (
        <Grid item {...props}>
            <Stack
                justifyContent="center"
                spacing={`0.5rem`}
                sx={{ flex: 1 }}>
                {/* {date} */}
                    <GenericSegment>
                        {date}
                    </GenericSegment>
                <Stack
                    justifyContent="center"
                    spacing={`0.5rem`}
                    sx={{
                        p: `0.5rem`, flex: 1,
                        border: today && `solid ${useTheme().palette.primary.main} 0.1rem`,
                        borderRadius: today && useTheme().shape.borderRadius
                    }} >
                    {segments}
                </Stack>
            </Stack>
        </Grid>
    )
}

function convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export const ScheduleDisplay = (props) => {

    let display = createRef()

    useEffect(() => {

        const scrollRelayId = setTimeout(() => {
            console.log("test")
            display.current.scrollTo({
                top: convertRemToPixels(2.5*((new Date().getHours() * 60 + new Date().getMinutes()) / 15+1-5)+1.5),
                left: 0, behavior: 'smooth'
            })
        }, 500)

    }, [])

    return (
        <Card variant={`outlined`} ref={display}
            sx={{ p: `1rem`, flex: 1, overflow: `scroll`, position: `relative` }}>
            <Grid
                container
                direction={`row`}
                sx={{ flex: 1 }}>

                <TimeDisplay />
                <DayDisplay date={props.date} dateModifier={-1} md sx={{ display: { xs: `none`, sm: `none`, md: `block` } }} />


                <DayDisplay date={props.date} dateModifier={0} xs />
                <DayDisplay date={props.date} dateModifier={1} sm sx={{ display: { xs: `none`, sm: `block` } }} />
                <DayDisplay date={props.date} dateModifier={2} lg sx={{ display: { xs: `none`, md: `none`, lg: `block` } }} />

                <DayDisplay date={props.date} dateModifier={3} xl sx={{ display: { xs: `none`, lg: `none`, xl: `block` } }} />
                <DayDisplay date={props.date} dateModifier={4} xl sx={{ display: { xs: `none`, lg: `none`, xl: `block` } }} />
                <DayDisplay date={props.date} dateModifier={5} xl sx={{ display: { xs: `none`, lg: `none`, xl: `block` } }} />
            </Grid>
        </Card >
    )

}
