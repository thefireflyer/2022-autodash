import { useContext, useState } from 'react';
import { UserContext } from '../../lib/UserContext';
import Loading from '../../components/loading.js';
import { Box, Button, Card, Container, Divider, Fab, Pagination, Paper, Stack, Typography } from '@mui/material';
import { navInfo } from '../../components/constants';
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "@cloudscape-design/components/date-picker";
import { Add, AddCircle, AddCircleOutline } from '@mui/icons-material';
import { ScheduleDisplay } from '../../components/scheduleDisplay';
import Link from 'next/link';

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};


const Schedule = () => {
  const [[date, direction], setDate] = useState([
    `${new Date().getUTCFullYear()}-${new Date().getUTCMonth() + 1}-${new Date().getUTCDate()}`,
    0]
  );

  const paginate = (newDirection) => {
    let newDate = new Date(date)
    console.log(newDate)
    newDate.setUTCDate(newDate.getUTCDate() + newDirection)
    setDate([
      `${newDate.getUTCFullYear()}-${newDate.getUTCMonth() + 1}-${newDate.getUTCDate()}`,
      newDirection])
  };

  return <Stack spacing={3} sx={{ flex: 1, display: `flex` }}>

    <Stack
      direction={`row`}
      justifyContent="right"
      spacing={3}
      sx={{ display: `flex` }}>

      <DatePicker
        onChange={({ detail }) => setDate([detail.value, 0])}
        value={date}
        openCalendarAriaLabel={selectedDate =>
          "Choose Date" +
          (selectedDate
            ? `, selected date is ${selectedDate}`
            : "")
        }
        nextMonthAriaLabel="Next month"
        placeholder="YYYY/MM/DD"
        previousMonthAriaLabel="Previous month"
        todayAriaLabel="Today"
      />
      
      <Button variant={`outlined`} sx={{ flex: 1 }} onClick={() => {
        setDate([
          `${new Date().getUTCFullYear()}-${new Date().getUTCMonth() + 1}-${new Date().getUTCDate()}`,
          0])
      }}>Today</Button>
    </Stack>

    <Box
      sx={{ p: 3, flex: 1, display: `flex`, position: `relative` }}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          style={{
            top: 0, left: 0,
            width: `100%`, height: `100%`,
            position: `absolute`,
            display: `flex`,
            overflow: `hidden`,
            // WebkitMaskImage: `radial-gradient(circle 3rem at bottom right, transparent 100%, black)`,
          }}
          key={date}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        >
          <ScheduleDisplay date={date} />
        </motion.div>
        {/* <Fab size="medium"
          sx={{
            position: `absolute`,
            bottom: `0`,
            right: `0`
          }}
          color="secondary"
          aria-label="add">
          <Add />
        </Fab> */}
      </AnimatePresence>
    </Box>

    <Link href='./create-event'>
    <Fab size="medium"
      variant={`extended`}
      color="secondary"
      aria-label="add">
      <Add />
    </Fab>
    </Link>

  </Stack>;
};

export default Schedule;

export async function getStaticProps(context) {
  return {
    props: {
      title: `Schedule - Timeable`,
      slug: [navInfo.overview, navInfo.schedule]
    },
  }
}