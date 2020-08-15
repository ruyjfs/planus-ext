import React, { useState } from 'react';

import { TextField, Fab, InputAdornment, Grid, Fade } from '@material-ui/core';
import Mail from '@material-ui/icons/Mail';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

import { useSelector, useDispatch } from 'react-redux';

export default ({ history }: any) => {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);
  const classes = useStyles();

  const [form, setForm] = useState({
    email: '',
  });

  const handleChange = (name: any) => (event: any) => {
    setForm({ ...form, [name]: event.target.value });
  };

  async function submit(event: any) {
    event.preventDefault();
    if (!form.email) {
      dispatch({
        type: 'LAYOUT_SNACKBAR_ADD',
        snackbar: { open: true, message: 'Ops.. Falta escrever o seu email!' },
      });
      return false;
    }
    dispatch({ type: 'AUTH_ADD_DATA', data: { email: form.email } });
    return history.push(`/auth/password`);
  }

  return (
    <form onSubmit={submit}>
      <div className={classes.container}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item sm={12} md={3}>
            <TextField
              autoFocus
              label="Escreva o seu email"
              // className={classes.textField}
              margin="normal"
              variant="outlined"
              value={form.email}
              onChange={handleChange('email')}
              fullWidth
              type={'email'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon style={{ color: '#FBC02D' }}>mail</Icon>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
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
