import { useContext } from 'react';
import { UserContext } from '../../lib/UserContext';
import Loading from '../../components/loading.js';
import { Box, Card, Container, Typography } from '@mui/material';
import { navInfo } from '../../components/constants';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

const Home = () => {
  const [user] = useContext(UserContext);

  return <Box sx={{ flex: 1 }}>      
      {/* <Typography variant={`header`}>
        Summary
      </Typography> */}

        <Card variant={`outlined`} sx={{p:3, flex:1}}>
                <Timeline position="alternate">
                  {[
                    {
                      title: `test`,
                      time: `09:30 am`
                    },
                    {
                      title: `test`,
                      time: `09:30 am`
                    },
                    {
                      title: `test`,
                      time: `09:30 am`
                    },
                    {
                      title: `test`,
                      time: `09:30 am`
                    },
                  ].map(event => (
                    <TimelineItem>
                      <TimelineOppositeContent variant={`h6`} color={`text.secondary`}>
                        {event.time}
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot variant={`outlined`} color={`primary`} />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent color={`text.primary`} variant={`h6`} >{event.title}</TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </Card>
      </Box>;
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