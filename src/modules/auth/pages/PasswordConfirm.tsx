import React, { useState, useEffect } from 'react';

import {
  TextField,
  Fab,
  InputAdornment,
  Grid,
  Fade,
  IconButton,
} from '@material-ui/core';
import Mail from '@material-ui/icons/Mail';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { useSelector, useDispatch } from 'react-redux';

import Auth from '../../../services/firebase/Auth';

export default ({ history }: any) => {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth.data);
  const classes = useStyles();

  const [form, setForm] = useState({ password: '' });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!auth.email) {
      history.push(`/auth-email`);
    }
  }, []);

  const handleChange = (name: any) => (event: any) => {
    setForm({ ...form, [name]: event.target.value });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  async function submit(event: any) {
    event.preventDefault();

    console.log(auth.password, form.password);

    if (auth.password !== form.password) {
      dispatch({
        type: 'LAYOUT_SNACKBAR_ADD',
        snackbar: { open: true, message: 'Confirmação de senha diferente!' },
      });
      return history.push(`/auth/password`);
    }
    return history.push(`/auth/phone`);
  }
  return (
    <Fade in={true}>
      <form onSubmit={submit}>
        <div className={classes.container}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item sm={12} md={3}>
              <TextField
                autoFocus
                label="Confirme a sua senha"
                // className={classes.textField}
                margin="normal"
                variant="outlined"
                value={form.password}
                onChange={handleChange('password')}
                fullWidth
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon style={{ color: '#FBC02D' }}>vpn_key</Icon>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              {/* <Fab variant="extended" color="primary" aria-label="add" onClick={submit} style={{ color: '#FFF', marginRight: '15px' }}>
              <Icon>arrow_backward</Icon>
              Voltar
            </Fab> */}
              <Fab
                variant="extended"
                color="primary"
                aria-label="add"
                onClick={submit}
                style={{ color: '#FFF' }}
              >
                Próximo
                <Icon>arrow_forward</Icon>
              </Fab>
            </Grid>
          </Grid>
        </div>
      </form>
    </Fade>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    minHeight: 'calc(100vh - 64px)',
  },
  gridContainer: {
    // minHeight: '100vh',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  paper: {
    // padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
