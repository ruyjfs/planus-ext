import React, { useState, useEffect, useRef } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import dayjs from 'dayjs';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';

import Messaging from '../../../services/firebase/services/Messaging';

export default ({ start, min }: any) => {
  const [secondsEllapsed, setSecondsEllapsed] = useState(0);
  const [dateTime, setDateTime] = useState(dayjs('01/05/2020 00:00:00'));
  const [currentDateTime, setCurrentDateTime] = useState(
    dayjs('01/05/2020 00:00:00')
  );
  const [started, setStarted] = useState(false);
  // const [timerEnabled, setTimeEnabled] = useState(false);
  const timer = useRef(0);

  useEffect(() => {
    // setTimeEnabled(start);
    onStart();
    onStartBrowser();
  }, [start]);

  function onReset() {
    clearInterval(timer.current);
    setSecondsEllapsed(0);
    setStarted(false);
    // setTimeEnabled(false);
  }

  function onStartBrowser() {
    // localStorage.timer = JSON.stringify({
    //   started: true,
    //   currentDateTime: currentDateTime,
    // });
    // localStorage.setItem('currentDateTime', 'true');
    // if (localStorage?.timer) {
    // console.log(JSON.parse(localStorage?.timer), 'background local time');
    // window.chrome.extension.getBackgroundPage().console.log(localStorage?.timer);
    // }

    console.log(window.chrome.runtime.id);
    if (window.chrome.runtime?.id) {
      window.chrome.runtime?.sendMessage(window.chrome.runtime.id, {
        type: 'START',
        payload: {
          status: start,
          minLimit: min,
        },
      });
    }
  }

  useEffect(() => {
    // if (localStorage?.timer) {
    let localStorageData = JSON.parse(localStorage?.timer);
    console.log(localStorageData);
    if (localStorageData) {
      setCurrentDateTime(dayjs(localStorageData?.currentDateTime));
      setSecondsEllapsed(parseInt(localStorageData?.secondsEllapsed));
      setStarted(localStorageData?.started);
    }
    // }

    console.log('FOII');
  }, []);

  function onStart() {
    // window.chrome.browserAction.setBadgeText({
    //   text: dateTime.add(state + 1, 'second').format('mm:ss'),
    // });

    if (started === false) {
      setStarted(true);
      // setDateTime(dayjs());
      // setTimeEnabled(true);
    }
    //  else {
    // setTimeEnabled(timerEnabled ? false : true);
    // }
    countTimer();
  }

  // useEffect(() => {
  //   countTimer();
  // }, [timerEnabled]);

  function countTimer() {
    if (start) {
      timer.current = setInterval(() => {
        setSecondsEllapsed((state) => {
          setCurrentDateTime(dateTime.add(state + 1, 'second'));

          // window.chrome.browserAction.setBadgeText({
          //   text: dateTime.add(state + 1, 'second').format('mm:ss'),
          // });
          // localStorage.setItem(
          //   'timer',
          //   JSON.stringify({
          //     started: start,
          //     currentDateTime: currentDateTime,
          //     secondsEllapsed: secondsEllapsed,
          //   })
          // );
          return state + 1;
        });
      }, 1000);
    } else {
      // localStorage.setItem(
      //   'timer',
      //   JSON.stringify({
      //     started: start,
      //     currentDateTime: currentDateTime,
      //     secondsEllapsed: secondsEllapsed,
      //   })
      // );
      clearInterval(timer.current);
    }
  }

  useEffect(() => {
    // chrome.browserAction.setBadgeText({ text: '10+' });
  }, [secondsEllapsed]);

  useEffect(() => {
    // chrome.browserAction.setBadgeText({ text: '10+' });
    console.log(currentDateTime.format('mm'), min);

    if (currentDateTime.format('mm') == min) {
      onReset();
      // if (secondsEllapsed == 10) {
      // const m = new Messaging();
      // m.send({
      //   tokenFcm:
      //     'dQ-MzgslqSGLZ_Q3nS7IO_:APA91bGd1ymfJCleRQwzmIB6AaoL6SJSA61LZ-nfwJ56ZqZMGLQgjQ3H8vYyTwLBHvaXg9IFTxTMGCcYFvNaFdtMEqaFZMxhecumL59kVeQtyHzaqQw-fV8oxIpht0ba7Qrv07iG-ElF',
      //   title: 'Planus',
      //   message: 'Teste Description',
      // });
    }
  }, [currentDateTime]);

  function formatSeconds(seconds: any) {
    return currentDateTime.format('mm:ss');
  }

  const porcentagem = 70;

  return (
    <Container>
      <CircularProgressbar
        value={(secondsEllapsed * 100) / (min * 60)}
        text={`${formatSeconds(secondsEllapsed)}`}
        styles={buildStyles({
          // Rotation of path and trail, in number of turns (0-1)
          rotation: 0,

          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          // strokeLinecap: 'butt',

          // Text size
          textSize: '16px',

          // How long animation takes to go from one percentage to another, in seconds
          // pathTransitionDuration: 0.5,

          // Can specify path transition in more detail, or remove it entirely
          // pathTransition: 'none',

          // Colors
          // pathColor: `rgba(62, 152, 199, ${value / 100})`,
          textColor: '#FFF',
          // textColor: '#FBC02D',
          trailColor: '#fff',
          // trailColor: '#d6d6d6',
          backgroundColor: '#0874ff',
          // backgroundColor: '#3e98c7',
          pathColor: '#0874ff',
        })}
      />
    </Container>
  );
};

const Container = styled.div`
  max-width: 150px;
`;
