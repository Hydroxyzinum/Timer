import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [time, setTime] = useState('');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const [hh, mm, ss] = time.split(':').map(Number);
    setHours(hh || 0);
    setMinutes(mm || 0);
    setSeconds(ss || 0);
  }, [time]);

  useEffect(() => {
    let interval = null;

    if (hours !== 0 || minutes !== 0 || seconds !== 0) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          if (minutes > 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
          } else {
            if (hours > 0) {
              setHours(hours - 1);
              setMinutes(59);
              setSeconds(59);
            } else {
              clearInterval(interval);
            }
          }
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [hours, minutes, seconds]);

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : `${time}`;
  };

  return (
    <div className='timer-container'>
      <div className='result'>Осталось времени: {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}</div>
      <input className='timer-input' type="time" onChange={handleTimeChange} placeholder="ЧЧ:ММ:СС" step={2}/>
    </div>
  );
};

export default Timer;
