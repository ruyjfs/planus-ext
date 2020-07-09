import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';

import AppContainer from '../../shared/components/AppContainer';
import AppToolbar from '../../shared/components/AppToolbar';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ProgressCircle from '../components/ProgressCircle';

export default () => {
  const [start, setStart] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    // if (localStorage?.timer) {
    let localStorageData = JSON.parse(localStorage.timer);
    if (window.chrome.runtime?.id) {
      window.chrome.runtime?.sendMessage(window.chrome.runtime?.id, {
        value2: localStorageData,
      });
    }
    if (localStorageData) {
      setStart(localStorageData?.started);
    }
    // }
  }, []);

  function onStart() {
    setStart(start ? false : true);
  }

  return (
    <Fade in={true}>
      <AppContainer alignFlex="center" alignHorizontal="center">
        <AppToolbar />
        <Container>
          <ProgressCircle start={start} min={45} />
          <ContainerButtons>
            {/* {start ? (
          <Fab
            color="secondary"
            aria-label="stop"
            // onClick={onReset}
            className={classes.button}
          >
            <Icon>stop</Icon>
          </Fab>
        ) : (
          <Fab
            aria-label="stop-disabled"
            disabled={true}
            className={classes.button}
          >
            <Icon>stop</Icon>
          </Fab>
        )} */}

            <Button
              onClick={onStart}
              variant="outlined"
              color="secondary"
              disabled={!start}
              className={classes.button}
              size="small"
            >
              <Icon>stop</Icon>
            </Button>
            {/* <Fab
          variant="extended"
          color="primary"
          aria-label="start-pause"
          onClick={onStart}
          className={classes.button}
        >
          <Icon>{start ? 'pause' : 'play_arrow'}</Icon>
        </Fab> */}
            <Button
              onClick={onStart}
              variant="outlined"
              color="primary"
              className={classes.button}
              size="small"
            >
              <Icon>{start ? 'pause' : 'play_arrow'}</Icon>
            </Button>
            {/* <ButtonSimple onClick={onStart}>
          <Icon>{start ? 'pause' : 'play_arrow'}</Icon>
        </ButtonSimple> */}
          </ContainerButtons>
        </Container>
      </AppContainer>
    </Fade>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* height: 90vh; */
`;

const ButtonSimple = styled.div`
  border-radius: 100px;
  width: 50px;
  height: 50px;
  background-color: transparent;
  border: 1.5px solid #fff;
  align-items: center;
  text-align: center;
  display: flex;
  justify-content: center;
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonTop: {
      // margin: '10px',
      padding: '0',
    },
    button: {
      margin: '5px',
    },
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const ContainerButtons = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;
