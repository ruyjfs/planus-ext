import firebase from './index';

const firestore = firebase.firestore()
export const Messages = firestore.collection("posts")


// let database = firebase.database().ref('/messages');


// export const Messages = {
//   find: async () => {
//     return await database.once('value').then(data => {
//       const object = data.val();
//       return Object.keys(object).map(key => ({
//         ...object[key],
//         _id: key,
//       }));
//     });
//   }
// }