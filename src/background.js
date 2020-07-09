import dayjs from 'dayjs';
import Messaging from './services/firebase/services/Messaging'

console.log(window.chrome.runtime.id, 'ÍD');

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
    console.log(tokenFcm, 'tokenFcm')
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
    clearInterval(timer.current);
    currentDateTime = dayjs('01/05/2020 00:00:00');
    secondsEllapsed = 0;
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
window.chrome.alarms.onAlarm.addListener(alarm => {
    // if watchdog is triggered, check whether refresh alarm is there
    if (alarm && alarm.name === 'watchdog') {
        chrome.alarms.get('refresh', alarm => {
            if (alarm) {
                console.log('Refresh alarm exists. Yay.');
            } else {
                // if it is not there, start a new request and reschedule refresh alarm
                console.log("Refresh alarm doesn't exist, starting a new one");
                // startRequest();
                // scheduleRequest();
            }
        });
    } else {
        // if refresh alarm triggered, start a new request
        startRequest();
    }
});

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

