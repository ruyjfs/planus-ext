import dayjs from 'dayjs';
import Messaging from './services/firebase/services/Messaging'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/messaging';
import 'firebase/database';

// this file will run once on extension load
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
// const app = firebase.initializeApp(firebaseConfig);
// const appDb = app.database().ref();

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
const firestore = firebase.firestore();

enableMessaging();

function enableMessaging() {
    try {
        messaging
            .requestPermission()
            .then(async () => {
                const token = await messaging.getToken();
                // await messaging.subscribe('users');
                // console.log('AEEE inscrico ao topico USERS');
                localStorage.setItem(
                    'authFcm',
                    JSON.stringify({
                        tokenFcm: token,
                    })
                );
                console.log('TOKEN FCM', JSON.parse(localStorage.authFcm).tokenFcm);

                window.chrome.runtime.sendMessage(
                    window.chrome.runtime.id,
                    {
                        type: 'debug',
                        value: { tokenFcm: token, localStorage },
                    }
                );
                window.chrome.runtime.sendMessage(
                    window.chrome.runtime.id,
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



// // instantiate global application state object for Chrome Storage and feed in firebase data
// // Chrome Storage will store our global state as a a JSON stringified value.
// const applicationState = { values: [] };
// appDb.on('child_added', snapshot => {
//     applicationState.values.push({
//         id: snapshot.key,
//         value: snapshot.val()
//     });
//     updateState(applicationState);
// });

// appDb.on('child_removed', snapshot => {
//     const childPosition = getChildIndex(applicationState, snapshot.key)
//     if (childPosition === -1) return
//     applicationState.values.splice(childPosition, 1);
//     updateState(applicationState);
// });

// appDb.on('child_changed', snapshot => {
//     const childPosition = getChildIndex(applicationState, snapshot.key)
//     if (childPosition === -1) return
//     applicationState.values[childPosition] = snapshot.val();
//     updateState(applicationState);
// });

// // updateState is a function that writes the changes to Chrome Storage
// function updateState(applicationState) {
//     chrome.storage.local.set({ state: JSON.stringify(applicationState) });
// }

// // getChildIndex will return the matching element in the object
// function getChildIndex(appState, id) {
//     return appState.values.findIndex(element => element.id == id)
// }

// // if your Chrome Extension requires any content scripts that will manipulate data,
// // add a message listener here to access appDb:

// chrome.runtime.onMessage.addListener((msg, sender, response) => {
//     switch (msg.type) {
//         case 'updateValue':
//             appDb.child(msg.opts.id).set({ value: msg.opts.value });
//             response('success');
//             break;
//         default:
//             response('unknown request');
//             break;
//     }
// });
//That’s it! All your extension needs to do is load from the Chrome local storage before rendering itself. If it or a content script needs to manipulate the RTD, the following snippet should be invoked:

// chrome.runtime.sendMessage({ type: 'updateValue', opts: request.opts }, (response) => {
//     if (response == 'success') {
//         // implement success action here
//     }
// });
// FIM FIREBASE;

const onStart2 = async () => {
    console.log(window.chrome.runtime.id, 'ÍD', Date.now() + 1);
}
onStart2();

chrome.alarms.create('Pomodoro', { delayInMinutes: 0.1, periodInMinutes: 0.5 });

const showNotification = () => {


    const tokenFcm = JSON.parse(localStorage.authFcm).tokenFcm;
    if (tokenFcm) {
        const m = new Messaging();
        m.send({
            tokenFcm: tokenFcm,
            title: 'Uhul! \\o/', message: `Fim do expediente!`
        })
        var myAudio = new Audio(chrome.runtime.getURL("message-msn.mp3"));
        myAudio.play();
    }
    // chrome.notifications.create('reminder', {
    //     type: 'basic',
    //     title: 'Don\'t forget!',
    //     message: 'You have things to do. Wake up, dude!'
    // }, function (notificationId) { });
}

chrome.alarms.onAlarm.addListener(function (alarm) {
    console.log("Got an alarm!", alarm);
    // Now create the notification
    showNotification();
    chrome.alarms.clear(alarm.name);
});

// create alarm for watchdog and fresh on installed/updated, and start fetch data
chrome.runtime.onInstalled.addListener(function (details) {
    console.log('Instaled...');
    // This gets once the extension is installed on browser
});
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // Get called when page URL is updated or refreshed
    console.log('Updated...');
});

// fetch and save data when chrome restarted, alarm will continue running when chrome is restarted
chrome.runtime.onStartup.addListener(() => {
    console.log('onStartup....');
    startRequest();
});

// chrome.alarms.create('refresh');


let secondsEllapsed = 0;
let current = null;
let dateTime = dayjs('01/05/2020 00:00:00');
let currentDateTime = dayjs('01/05/2020 00:00:00');
function onStartBrowser(params) {
    if (params.status) {
        onStart(params);
    } else {
        onStop();
    }
}
let tokenFcm = '';
function onStart(params) {
    // const tokenFcm = localStorage.auth;
    // const tokenFcm = JSON.parse(localStorage.auth).tokenFcm;
    const tokenFcm = JSON.parse(localStorage.authFcm).tokenFcm;
    current = setInterval(() => {
        secondsEllapsed = secondsEllapsed + 1;
        currentDateTime = dateTime.add(secondsEllapsed, 'second');
        chrome.browserAction.setBadgeText({ text: currentDateTime.format('mm:ss') });

        console.log(params.minLimit)
        if (currentDateTime.format('mm') == params.minLimit) {
            // if (secondsEllapsed == 10) {

            if (tokenFcm) {
                const m = new Messaging();
                m.send({
                    tokenFcm: tokenFcm,
                    title: 'Uhul! \\o/', message: `Hora de descansar!`
                })
                console.log('Enviou i O PUSH')

            } else {
                console.log('Nao enviou o push pois nao tem o tokenFcm')
            }


            onReset();
            return false;
        }
        // localStorage.setItem('currentDateTime', currentDateTime);
        localStorage.setItem('timer', JSON.stringify({
            started: true,
            currentDateTime: currentDateTime,
            secondsEllapsed: secondsEllapsed,
            minLimit: params.minLimit,
        }));
        // console.log(JSON.parse(localStorage.timer), 'Background');
    }, 1000);
}

function onReset() {
    console.log('RESET <<-------')
    clearInterval(current);
    secondsEllapsed = 0;
    currentDateTime = dayjs('01/05/2020 00:00:00');
    localStorage.setItem('timer', JSON.stringify({
        started: false,
        currentDateTime: currentDateTime,
        secondsEllapsed: secondsEllapsed,
    }));
}

function onStop() {
    localStorage.setItem('timer', JSON.stringify({
        started: false,
        currentDateTime: currentDateTime,
        secondsEllapsed: secondsEllapsed,
    }));
    clearInterval(current);
}

window.chrome.runtime.onMessage.addListener(
    (message, sender, sendResponse) => {
        if (message.type === 'START') {
            onStartBrowser(message.payload)
        }
        if (message.type === 'STOP') {
            onStop();
            onReset()
        }
        if (message.type === 'tokenUpdate') {
            console.log(message, 'tokenUpdate');
            tokenFcm = message.payload.tokenFcm;
        }
        if (message.type === 'debug') {
            console.log(message, 'debug');
            // console.log(message.configData, 'LL');
            // this.setState({
            //   configData: message.configData,
            // });
        }
        if (message.type === 'OPEN') {
            // console.log(message.configData, 'LL');
            // this.setState({
            //   configData: message.configData,
            // });
        }
    }
);

// alarm listener
// window.chrome.alarms.onAlarm.addListener(alarm => {
//     // if watchdog is triggered, check whether refresh alarm is there
//     if (alarm && alarm.name === 'watchdog') {
//         chrome.alarms.get('refresh', alarm => {
//             if (alarm) {
//                 console.log('Refresh alarm exists. Yay.');
//             } else {
//                 // if it is not there, start a new request and reschedule refresh alarm
//                 console.log("Refresh alarm doesn't exist, starting a new one");
//                 // startRequest();
//                 // scheduleRequest();
//             }
//         });
//     } else {
//         // if refresh alarm triggered, start a new request
//         startRequest();
//     }
// });

// schedule a new fetch every 30 minutes
function scheduleRequest() {
    console.log('schedule refresh alarm to 30 minutes...');
    chrome.alarms.create('refresh', { periodInMinutes: 30 });
}

// schedule a watchdog check every 5 minutes
function scheduleWatchdog() {
    console.log('schedule watchdog alarm to 5 minutes...');
    chrome.alarms.create('watchdog', { periodInMinutes: 5 });
}

// fetch data and save to local storage
async function startRequest() {
    console.log('start HTTP Request...');
    const data = await fetchRepositories();
    saveToLocalStorage(data);
}

// chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
// chrome.browserAction.setBadgeBackgroundColor({ color: '#orange' });
// let time = 0;
// setInterval(() => {
//     time = time + 1;
//     // setSecondsEllapsed((state) => state + 1);
//     // console.log(time);
//     // chrome.browserAction.setBadgeText({ text: '00:12' });
//     chrome.browserAction.setBadgeText({ text: `00:${time}` });
//     localStorage.setItem('test', time);
//     // chrome.extension.getBackgroundPage().console.log('EEEEEEEe....');
//     // chrome.extension.getBackgroundPage().console.log(time);
// }, 1000);

