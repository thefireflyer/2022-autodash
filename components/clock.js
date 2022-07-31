import { useEffect, useState } from 'react';

import { Typography } from '@mui/material';


export const Clock = (props) => {
    const [date, setDate] = useState(new Date());
  
    function refreshClock() {
      setDate(new Date());
    }
    useEffect(() => {
      const timerId = setInterval(refreshClock, 1000);
      return function cleanup() {
        clearInterval(timerId);
      };
    }, []);
  
    return (
      <Typography {...props}>
        {date.toLocaleTimeString()}
      </Typography>
    )
  }