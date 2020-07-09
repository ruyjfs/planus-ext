import { firestore } from './index';

const model = firestore.collection("users");
export default {
  async insertOrUpdate(data) {
    let user = await model.where("uid", "==", data.uid).get().then(querySnapshot => {
      return querySnapshot.docs.map(doc => {
        let result = doc.data();
        return result;
      })
    });
    console.log('Tem usuário?', user);


    if (user.length > 0) {
      return user[0];
    }

    return await this.save(data);
  },
  async save(data) {
    return await model.add(data)
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        return docRef;
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  },
  async get() {
    return await model.get().then(querySnapshot => {
      return querySnapshot.docs.map(doc => {
        let result = doc.data();
        // model.doc(doc.id).collection('users').get().then(querySnapshot => {
        //   return querySnapshot.docs.map(doc => doc.data());
        // }).then(data => {
        //   result.users = data;
        //   result.totalReceived = data.length;
        // });
        return result;
      })
    });
  },
  async getByEmail(email) {
    return await model.where("email", "==", email).get().then(querySnapshot => {
      return querySnapshot.docs.map(doc => {
        let result = doc.data();
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

