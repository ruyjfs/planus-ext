import firebase from './index';

const db = firebase.firestore();
const model = db.collection("notifications");

export const Notification = {
  _id: '',
  title: '',
  body: '',
  createdAt: '',
  updatedAt: '',
}

export default {
  async save(data) {
    model.add(data)
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  },
  async get() {
    return await model.get().then(querySnapshot => {
      return querySnapshot.docs.map(doc => {
        let result = doc.data();
        result.totalReceived = 0;
        result.totalViewed = 0;
        // model.doc(doc.id).collection('users').get().then(querySnapshot => {
        //   return querySnapshot.docs.map(doc => doc.data());
        // }).then(data => {
        //   result.users = data;
        //   result.totalReceived = data.length;
        // });
        return result;
      })
    });
  }
}




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