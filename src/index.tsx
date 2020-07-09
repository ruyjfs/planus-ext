import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { amber } from '@material-ui/core/colors';

import { Provider } from 'react-redux';
import store from './redux/store';

import './index.css';
import * as serviceWorker from './serviceWorker';

import Routes from './routes';

// import firebaseConfig from './configs/firebase';
import { messaging } from './services/firebase/index';

// firebaseConfig.init();

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register(`${process.env.PUBLIC_URL}/firebase-messaging-sw.js`)
//     .then(function (registration) {
//       // console.log("Registration FIREBASE successful, scope is:", registration.scope);
//     })
//     .catch(function (err) {
//       console.log('Service worker FIREBASE registration failed, error:', err);
//     });
// }

// messaging.setBackgroundMessageHandler(async function (payload) {
//   console.log(
//     '[firebase-messaging-sw.js] Received background message ',
//     payload
//   );
//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png',
//   };

//   const registration = await navigator.serviceWorker.getRegistration();
//   if (registration) {
//     console.log('FOI NOTIFICATION');
//     return registration.showNotification(
//       notificationTitle,
//       notificationOptions
//     );
//   }
// });

// messaging.onTokenRefresh(() => {
//   messaging
//     .getToken()
//     .then((refreshedToken) => {
//       console.log('Token refreshed.');
//       // Indicate that the new Instance ID token has not yet been sent to the
//       // app server.
//       // setTokenSentToServer(false);
//       // Send Instance ID token to app server.
//       // sendTokenToServer(refreshedToken);
//       // ...
//     })
//     .catch((err) => {
//       console.log('Unable to retrieve refreshed token ', err);
//       // showToken('Unable to retrieve refreshed token ', err);
//     });
// });

// navigator.serviceWorker.addEventListener('message', (message) => {
//   // console.log(message.data.data, 'aaa');

//   navigator.serviceWorker.getRegistration().then(function (reg): any {
//     console.log(message.data['firebase-messaging-msg-data'].data, reg);

//     var options = {
//       title: message.data['firebase-messaging-msg-data'].data.title,
//       body: message.data['firebase-messaging-msg-data'].data.body,
//       icon: 'favicon.ico',
//       vibrate: [100, 50, 100],
//       data: {
//         dateOfArrival: Date.now(),
//         primaryKey: 1,
//       },
//       actions: [
//         {
//           action: 'explore',
//           title: 'Explore this new world',
//           icon: 'images/checkmark.png',
//         },
//         {
//           action: 'close',
//           title: 'Close notification',
//           icon: 'images/xmark.png',
//         },
//       ],
//     };
//     if (reg) {
//       reg.showNotification('NORMAL', options);
//     }
//     console.log('EXIBIR PUSH');
//   });
// });

const App = () => {
  function enableMessaging() {
    try {
      messaging
        .requestPermission()
        .then(async () => {
          const token = await messaging.getToken();
          // await messaging.subscribe('users');
          // console.log('AEEE inscrico ao topico USERS');
          localStorage.setItem(
            'auth',
            JSON.stringify({
              tokenFcm: token,
            })
          );
          console.log('TOKEN FCM', JSON.parse(localStorage.auth).tokenFcm);

          window.chrome.runtime?.sendMessage(
            'dkaagkdinghogdefbehebocjapbpdmdo',
            {
              type: 'debug',
              value: { tokenFcm: token, localStorage },
            }
          );
          window.chrome.runtime?.sendMessage(
            'dkaagkdinghogdefbehebocjapbpdmdo',
            {
              type: 'tokenUpdate',
              payload: { tokenFcm: token },
            }
          );
        })
        .catch(function (err) {
          console.log('Unable to get permission to notify.', err);
        });

      messaging.onMessage((payload) => {
        console.log('Message received. ', payload);
        // ...
      });
    } catch (e) {
      console.log(e, 'Aqui');
    }
  }

  useEffect(() => {
    enableMessaging();
  });

  return <Routes />;
};
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      // Purple and green play nicely together.
      // main: amber[100],
      main: '#FFF',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  // </React.StrictMode>
  document.getElementById('root')
);
// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
serviceWorker.register();
