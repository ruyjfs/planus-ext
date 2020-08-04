import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';

import styled from 'styled-components';

import { blue, orange } from '@material-ui/core/colors';
import { Fade } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import Icon from '@material-ui/core/Icon';

import AppSnackbar from '../app/AppSnackbar';
import AppContainer from '../../modules/shared/components/AppContainer';

import { useSelector, useDispatch } from 'react-redux';
// import Auth from '../../services/firebase/Auth';

const drawerWidth = 240;

export default ({ history, children }: any) => {
  // const auth = useSelector(state => state.auth.data);

  // useEffect(() => {
  //   async function verifyAuth() {
  //     let user = await Auth.user();
  //     console.log('AUTH', user);

  //     if (user && auth.uid) {
  //       history.push('/notifications');
  //     }
  //   }

  //   verifyAuth();
  // }, []);

  const menu = [
    // { label: 'home', link: '/', icon: 'home' },
    // { label: 'login', link: 'Login', icon: 'account_box' },
    { label: 'Avisos', link: 'notifications', icon: 'mail' },
    { label: 'Usuários', link: 'users', icon: 'account_box' },
  ];

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  function redirect(url: string) {
    history.push(`${url}`);
  }

  const theme = createMuiTheme({
    palette: {
      type: 'dark', // Switching the dark mode on is a single property value change.
      primary: {
        main: '#FBC02D',
      },
      secondary: blue,
      // {
      //   // light: pink,
      //   // main: palette.primary[500],
      //   // dark: palette.primary[700],
      //   // contrastText: getContrastText(palette.primary[500]),
      // },
      // secondary: {
      //   // light: palette.secondary.A200,
      //   // main: palette.secondary.A400,
      //   // dark: pink,
      //   // contrastText: getContrastText(palette.secondary.A400),
      // },
      // error: {
      //   // light: palette.error[300],
      //   // main: palette.error[500],
      //   // dark: palette.error[700],
      //   // contrastText: getContrastText(palette.error[500]),
      // },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppContainer color="black">
        <div className={classes.root}>
          <main className={classes.content}>{children}</main>
          <AppSnackbar />
        </div>
      </AppContainer>
    </ThemeProvider>
  );
};

const AppSpace = styled.div`
  flex-grow: 1;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    minHeight: '100vh',
    // padding: theme.spacing(3),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));
