import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import styled from "styled-components";

import { blue, orange, } from "@material-ui/core/colors";
import { Fade } from "@material-ui/core";
import { ThemeProvider } from '@material-ui/styles';

import Icon from '@material-ui/core/Icon';

import { useSelector, useDispatch } from "react-redux";
import Auth from '../../services/firebase/Auth';

import AppSnackbar from '../app/AppSnackbar';

const drawerWidth = 240;

export default ({ history, children }) => {
  const auth = useSelector(state => state.auth.data);

  useEffect(() => {
    async function verifyAuth() {
      let user = await Auth.user();
      console.log('LAYOUTPRIVATE', user);

      if (!user && !auth.uid) {
        history.push('/');
      }
    }

    verifyAuth();
  }, []);

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

  function redirect(url) {
    history.push(`${url}`)
  }

  const theme = createMuiTheme({
    palette: {
      type: 'dark', // Switching the dark mode on is a single property value change.
      primary: orange,
      secondary: blue
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
      <Fade in={true}>
        <div className={classes.root} >
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>

              </Typography>
              <AppSpace />
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={e => redirect('/logout')}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <PowerSettingsNew />
              </IconButton>
            </Toolbar>

          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
            <Divider />
            <List>
              {menu.map((item, index) => (
                <ListItem button onClick={e => redirect(item.link)} key={index}>
                  {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                  <ListItemIcon><Icon>{item.icon}</Icon></ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              ))}
            </List>
          </Drawer>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <div className={classes.drawerHeader} />
            {children}
          </main>
          <AppSnackbar />
        </div >
      </Fade>
    </ThemeProvider>
  );
}


const AppSpace = styled.div`
  flex-grow: 1;
`;

const useStyles = makeStyles(theme => ({
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
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));
