import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/messaging';
import 'firebase/';

const firebaseConfig = {
  apiKey: 'AIzaSyB45oXJyBISbQKQJTCeE5z-qlgPYAW2yoc',
  authDomain: 'planus-app.firebaseapp.com',
  databaseURL: 'https://planus-app.firebaseio.com',
  projectId: 'planus-app',
  storageBucket: 'planus-app.appspot.com',
  messagingSenderId: '1050322315193',
  appId: '1:1050322315193:web:bd5cfe804a3eb473ecb868',
  measurementId: 'G-MFYNY9RH16',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
export const messaging = firebase.messaging();
export const firestore = firebase.firestore();

messaging.onMessage((params) => {
  console.log(params);
});

messaging.usePublicVapidKey(
  // Project Settings => Cloud Messaging => Web Push certificates
  'BI9ygYrK_8rjg9lsAkuzJljbdDCTzHndw-E3rYq7h5zxMEIDDOjdcp13eJtW6koiUUvyGaWyLsIcnVd50mfVmOo'
);

// const subscribe = () => {

// }
