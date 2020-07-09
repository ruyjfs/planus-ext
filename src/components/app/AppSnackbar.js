import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { Snackbar, SnackbarContent, Slide, Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import clsx from 'clsx';

const transition = (props) => <Slide {...props} direction="up" />;

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

export default () => {
  const dispatch = useDispatch();
  const snackbar = useSelector(state => state.layout.snackbar);
  const Icon = variantIcon[snackbar.type];
  const classes = useStyles1();

  const handleClose = () => {
    dispatch({ type: 'LAYOUT_SNACKBAR_ADD', snackbar: { open: false } });
  };

  useEffect(() => {
    // setTimeout(() => {
    //   dispatch({ type: 'LAYOUT_SNACKBAR_ADD', snackbar: { open: false } });
    // }, snackbar.time);
    // autoHideDuration={snackbar.time}
  }, [snackbar.open]);

  return (
    <Snackbar
      variant={snackbar.type}
      open={snackbar.open}
      onClose={handleClose}
      TransitionComponent={transition}
      autoHideDuration={snackbar.time}
    >
      <SnackbarContent
        className={clsx(classes[snackbar.type], 'info')}
        aria-describedby="client-snackbar"
        message={
          <span id="message-id" className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {snackbar.message}
          </span>}
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]} />
    </Snackbar>
  );
}


const useStyles1 = makeStyles(theme => ({
  success: {
    color: '#FFF',
    backgroundColor: green[600],
  },
  error: {
    color: '#FFF',
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    color: '#FFF',
    // backgroundColor: theme.palette.primary.main,
    backgroundColor: '#FBC02D',
  },
  warning: {
    color: '#FFF',
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));