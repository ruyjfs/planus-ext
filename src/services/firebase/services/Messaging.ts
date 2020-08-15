import axios from 'axios';

interface Send {
  tokenFcm: String;
  title: String;
  message: String;
}

export default class Messaging {
  async send({ tokenFcm, title, message }: Send) {
    console.log(tokenFcm, title, message);
    const result = await axios.post(
      'https://fcm.googleapis.com/fcm/send',
      {
        priority: 'high',
        to: tokenFcm,
        data: {
          title: title,
          body: message,
          sound: 'default',
        },
        notification: {
          title: title,
          body: message,
          sound: 'default',
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'key=AAAA9IwWp7k:APA91bFT3BMZGX7htBbfsbXk74_27PABiQt-Y6xS3RW794_CPxlti655qK5DimPsyrq30jATkiLYox7q1riNLKQtURhClzYc1SGf3vjPKUNeiymkmaLD-4rICdT24bdwtNwm6U1vDc2W',
        },
      }
    );
    console.log('FIM PUSH', result);
    return result;
  }
}
