import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';

import Types from '../../../redux/sagas/types';
import ProgressCircle from '../components/ProgressCircle';

export default () => {
  const auth = useSelector((state: any) => state.auth);
  const byId = useSelector((state: any) => state.focus.byId);
  const settings = useSelector((state: any) => state.app.settings);
  let { id } = useParams();
  const byTask = useSelector((state: any) =>
    state.focus.byTask[id] ? state.focus.byTask[id] : []
  );

  const dispatch = useDispatch();
  const [start, setStart] = useState(false);
  const [reset, setReset] = useState(false);
  const [durationMinutes, setDurationMinutes] = useState(45);
  const classes = useStyles();

  useEffect(() => {
    // if (localStorage?.timer) {
    let localStorageData = localStorage.timer
      ? JSON.parse(localStorage.timer)
      : {};
    if (window.chrome.runtime?.id) {
      window.chrome.runtime?.sendMessage(window.chrome.runtime?.id, {
        value2: localStorageData,
      });
    }

    if (localStorageData) {
      setStart(localStorageData?.started);
      setDurationMinutes(parseInt(settings.timeFocus));
      console.log(settings.timeFocus, 'OOOOOOOO');
    }
    // }
  }, []);

  function onStart() {
    setStart(start ? false : true);
    let localStorageData = localStorage.timer
      ? JSON.parse(localStorage.timer)
      : {};

    dispatch({
      type: Types.FOCUS.SAVE,
      payload: {
        taskId: id,
        userId: auth.id,
        duration: 45,
        running: start ? false : true,
      },
      id: id ? id : null,
    });
  }

  function onReset(param: boolean) {
    setReset(param);
    setStart(false);
  }

  function onStop() {
    setReset(!reset);
  }

  function loadFocus() {
    dispatch({
      type: Types.FOCUS.LOAD,
      payload: {
        where: {
          taskId: id,
        },
      },
    });
  }

  React.useEffect(() => {
    loadFocus();
  }, []);

  return (
    <>
      <ProgressCircle
        start={start}
        min={durationMinutes}
        reset={reset}
        onReset={onReset}
      />
      <ContainerButtons>
        {/* {start ? (
          <Fab
            color="secondary"
            aria-label="stop"
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
          onClick={onStop}
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
    </>
  );
};
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
