import * as React from 'react';
import Typography from '@mui/material/Typography';
import { DashboardRounded, DnsRounded, NotesRounded, ScheduleRounded, StickyNote2Rounded, TaskRounded } from '@mui/icons-material';

export const demoPageContents = (
    <Typography>
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
    </Typography>
);

export const navIcons = {
    "DashboardRounded": <DashboardRounded />,
    "NotesRounded": <NotesRounded />,
    "ScheduleRounded": <ScheduleRounded />,
    "TaskRounded": <TaskRounded />,
    "StickyNote2Rounded": <StickyNote2Rounded />,
    "DnsRounded": <DnsRounded />,
}

export const navInfo = {
    dashboard : 
    {
        name: "Dashboard",
        icon: "DashboardRounded",
        link: "/"
    },
    overview :
    {
        name: "Overview",
        icon: "NotesRounded",
        link: "/timeable"
    },
    schedule :
    {
        name: "Schedule",
        icon: "ScheduleRounded",
        link: "/timeable/schedule"
    },
    tasks :
    {
        name: "Tasks",
        icon: "TaskRounded",
        link: "/timeable/tasks"
    },
    notes :
    {
        name: "Notes",
        icon: "StickyNote2Rounded",
        link: "/mip"
    },
    servers :
    {
        name: "Servers",
        icon: "DnsRounded",
        link: "/servers"
    },
    account :
    {
        name: "Account",
        icon: "FaceRounded",
        link: "/account"
    },
    login :
    {
        name: "Login",
        icon: "LoginRoundedIcon",
        link: "/login"
    },
}

export const navGroups = [
    [
        navInfo.dashboard
    ],
    [
        navInfo.overview,
        navInfo.schedule,
        navInfo.tasks
    ],
    [
        navInfo.notes
    ],
    [
        navInfo.servers
    ],
]

export const logo = <img height={`25rem`} src='./test.svg'></img>