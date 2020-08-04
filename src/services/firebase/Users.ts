import { firestore } from './index';

import _ from 'lodash';

const model = firestore.collection('users');
export default {
  async insertOrUpdate(data: any) {
    let user = await model
      .where('uid', '==', data.uid)
      .get()
      .then((querySnapshot: any) => {
        return querySnapshot.docs.map((doc: any) => {
          let result = doc.data();
          return result;
        });
      });
    // console.log('Tem usuário?', user);

    if (user.length > 0) {
      return user[0];
    }

    return await this.save(data);
  },
  async save(data: any, id = '') {
    // data.updatedAt = firestore.FieldValue.serverTimestamp();
    data.updatedAt = new Date();

    if (typeof data.id !== 'undefined') {
      delete data.id;
    }

    if (id) {
      model.doc(id).update(data);
      return id;
    } else {
      // data.createdAt = firestore.Timestamp.now();
      data.createdAt = new Date();
    }

    return await model
      .add(data)
      .then(function (docRef: any) {
        return docRef.id;
      })
      .catch(function (error: any) {
        console.error('Error adding document: ', error);
      });
  },
  async get() {
    return await model.get().then((querySnapshot: any) => {
      return querySnapshot.docs.map((doc: any) => {
        let result = doc.data();
        // model.doc(doc.id).collection('users').get().then(querySnapshot => {
        //   return querySnapshot.docs.map(doc => doc.data());
        // }).then(data => {
        //   result.users = data;
        //   result.totalReceived = data.length;
        // });
        return result;
      });
    });
  },
  async getByUid(uid: string) {
    let result = await model
      .where('uid', '==', uid)
      .get()
      .then((querySnapshot: any) => {
        return querySnapshot.docs.map((doc: any) => {
          let result = doc.data();
          result.id = doc.id;
          return result;
        });
      });
    return result.length > 0 ? result[0] : null;
  },
  async findById(id: string) {
    return await model
      .doc(id)
      .get()
      .then((querySnapshot) => {
        return { ...querySnapshot.data(), ...{ id: querySnapshot.id } };
      });
  },
  async getByEmail(email: any) {
    let result = await model
      .where('email', '==', email)
      .get()
      .then((querySnapshot: any) => {
        return querySnapshot.docs.map((doc: any) => {
          let result = doc.data();
          result.id = doc.id;
          return result;
        });
      });
    return result.length > 0 ? result[0] : null;
  },
};
