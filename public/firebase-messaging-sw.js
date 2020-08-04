// if ('undefined' === typeof window) {
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");
// }

// if (!(evt.request.url.indexOf('http') === 0)) return;
// if (!(event.request.url.indexOf('http') === 0)) {
//   //skip request
// }

firebase.initializeApp({
  // Project Settings => Add Firebase to your web app
  // messagingSenderId: "1062407524656"
  messagingSenderId: "1062407524656"
});
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true
    })
    .then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        // console.log("PAYLOAD", payload.data);
        var options = {
          body: payload.data.body,
          icon: "favicon.ico",
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
          },
          actions: [
            {
              action: "explore",
              title: "Explore this new world",
              icon: "images/checkmark.png"
            },
            {
              action: "close",
              title: "Close notification",
              icon: "images/xmark.png"
            }
          ]
        };
        registration.showNotification(payload.data.title, options);
        windowClient.postMessage(payload);

      }
    })
    .then((payload) => {
      // console.log("PAYLOAD", payload);
      // return registration.showNotification('aaa');
    });
  return promiseChain;
});

self.addEventListener('notificationclick', function (event) {
  console.log('CLICKED')
  // do what you want
  // ...
});

// self.onMessage((param) => {
//   console.log('onMessage')
//   // do what you want
//   // ...
// });
