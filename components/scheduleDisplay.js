import { createRef, useEffect, useRef, useState } from 'react';

import { Card, Grid, Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';

const GenericSegment = (props) => {

    if (props.label) {

        let formattedTime = new Date()
        formattedTime.setHours(0)
        formattedTime.setMinutes(props.i * 15)
        formattedTime = `${formattedTime.getHours()}:${formattedTime.getMinutes()}`

        return (
            <Paper sx={{ width: `100%`, height: `2rem` }}
                key={props.i}
                elevation={0}>
                {props?.label && formattedTime}
            </Paper>
        )
    }
    else if (props.event) {
        return (
            <Paper sx={{ width: `100%`, height: `2rem` }}
                key={props.i}
                elevation={1}>

            </Paper>)
    }
    else if (props.backSelector) {
        return (
            <Paper sx={{ width: `100%`, height: `2rem` }}
                key={props.i}
                elevation={0}
                variant={`outlined`}>
            </Paper>
        )
    }
    else {
        return (
            <Paper sx={{ width: `100%`, height: `2rem` }}
                key={props.i}
                elevation={0}>
            </Paper>
        )
    }
}

const ScheduleDisplayOverlay = (props) => {

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
            <Stack
                justifyContent="right"
                spacing={2}
                sx={{ p: 1, flex: 1 }}>
                <div></div>
                {segments}
            </Stack>
        </Grid>)
}

const DayDisplay = (props) => {

    let date = new Date(props.date)
    date.setDate(date.getDate() + props.dateModifier)
    date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

    const segments = []
    const segmentReferences = []
    for (let i = 0; i < 24 * 4; i++) {
        segmentReferences.push(createRef())
        segments.push(
            <GenericSegment backSelector ref={segmentReferences[i]} i={i} />
        )
    }

    return (
        <Grid item {...props}>
            <Stack
                justifyContent="center"
                spacing={2}
                sx={{ p: 1, flex: 1 }}>
                {date}
                {segments}
            </Stack>
        </Grid>
    )
}

export const ScheduleDisplay = (props) => {

    return (
        <Card variant={`outlined`}
            sx={{ p: 1, flex: 1, overflow: `scroll`, position: `relative` }}>
            <Grid
                container
                direction={`row`}
                sx={{ flex: 1 }}>

                <ScheduleDisplayOverlay />
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