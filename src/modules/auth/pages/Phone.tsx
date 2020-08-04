import React, { useState } from 'react';

import { TextField, Fab, InputAdornment, Grid, Fade } from '@material-ui/core';
import Mail from '@material-ui/icons/Mail';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

import { useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import { messaging } from '../../../services/firebase';
import Users from '../../../services/firebase/Users';
import Auth from '../../../services/firebase/Auth';

// window.recaptchaVerifier = firebase.auth.RecaptchaVerifier('sign-in-button', {
//   'size': 'invisible',
//   'callback': function (response) {
//     // reCAPTCHA solved, allow signInWithPhoneNumber.
//     // onSignInSubmit();
//   }
// });

function TextMaskCustom(props: any) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        '(',
        /[1-9]/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

export default ({ history }: any) => {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth.data);
  const classes = useStyles();

  const [form, setForm] = useState({
    phone: '',
  });

  const handleChange = (name: any) => (event: any) => {
    setForm({ ...form, [name]: event.target.value });
  };

  function maskPhone(value: any) {
    if (value.length > 14) {
      return form.phone;
    }
    value = value.trim();
    value =
      value.length > 10
        ? value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
        : value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    setForm({ ...form, phone: value });
  }
  //todo salvar mais de um fcm e qual dispositivo.
  async function submit(event: any) {
    event.preventDefault();

    if (form.phone.length < 15) {
      dispatch({
        type: 'LAYOUT_SNACKBAR_ADD',
        snackbar: { open: true, message: 'Ops.. Este telefone não é válido.' },
      });
      return false;
    }

    dispatch({ type: 'AUTH_ADD_DATA', data: { phone: form.phone } });
    const signup = await Auth.signup(auth.email, auth.password);
    const tokenFcm = await messaging.getToken();
    if (signup.status) {
      let user = await Auth.user();

      if (!user) return false;
      dispatch({
        type: 'AUTH_ADD_DATA',
        data: { uid: user.uid, tokenFcm: tokenFcm },
      });

      let userNew = {
        ...user,
        ...{
          emailVerified: user.emailVerified,
          uid: user.uid,
          displayName: user.displayName,
          // tokenFcm: tokenFcm,
          // fcmToken: tokenFcm,
          // platform: Platform.OS,
          // version: packageJson.version,
          email: user.email,
          tokenFcm: tokenFcm,
          phone: form.phone,
        },
      };

      let test = await Users.insertOrUpdate(userNew);

      console.log('user', user, test);

      dispatch({
        type: 'LAYOUT_SNACKBAR_ADD',
        snackbar: { open: true, message: 'Cadastro realizado com sucesso.' },
      });
      return history.push(`/checkpoint`);
    }

    if (signup.error.code === 'auth/email-already-in-use') {
      dispatch({
        type: 'LAYOUT_SNACKBAR_ADD',
        snackbar: {
          open: true,
          message: 'Ops.. Este usuário já está cadastrado.',
        },
      });
      return history.push(`/logout`);
    }

    console.log('result', signup);
    // return history.push(`/auth-password`);
  }

  return (
    <Fade in={true}>
      <form onSubmit={submit}>
        <div className={classes.container}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={3} style={{ paddingTop: '300px' }}>
              <TextField
                autoFocus
                label="Escreva o seu telefone"
                // className={classes.textField}
                margin="normal"
                variant="outlined"
                value={form.phone}
                onChange={(e) => {
                  handleChange('password');
                  maskPhone(e.target.value);
                }}
                fullWidth
                type={'phone'}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon style={{ color: '#FBC02D' }}>phone</Icon>
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
