import { firestore } from 'firebase';
import _ from 'lodash';

const orm = (model: any, interfaceModel: any = null) => {
  function treateDataToSave(data: any, id = null) {
    if (interfaceModel) {
      data = { ...interfaceModel, ...data };
    }
    data.updatedAt = firestore.FieldValue.serverTimestamp();
    // data.updatedAt = new Date();
    if (typeof data.id !== 'undefined') delete data.id;
    if (!id) data.createdAt = firestore.Timestamp.now();
    // if (!id) data.createdAt = new Date();
    return data;
  }

  function autoQuery(query: any, where: any, whereType = '==') {
    if (where) {
      _.each(where, (value, collumn) => {
        if (value) {
          query = query.where(collumn, whereType, value);
        }
      });
    }
    return query;
  }

  let functions = {
    treateDataToSave: (data: any, id = null) => treateDataToSave(data, id),
    save: async (data: any, id = null) => {
      data = treateDataToSave(data, id);

      if (id) {
        model.doc(id).update(data);
        const newData = await model
          .doc(id)
          .get()
          .then((doc: any) => doc.data());
        return { status: true, data: { ...{ id: id }, ...newData } };
      }

      return await model
        .add(data)
        .then(async (docRef: any) => {
          return { status: true, data: { ...{ id: docRef.id }, ...data } };
        })
        .catch((error: any) => {
          return { status: false, error: error };
        });
    },
    delete: async (id: string) => {
      return await model
        .doc(id)
        .delete()
        .then(function () {
          return { status: true, message: 'Document successfully deleted!' };
        })
        .catch((error: any) => {
          return { status: false, error: error };
        });
    },
    getAll: async (where: any = null, page = 0, whereArray = null) => {
      let query = model,
        result = {};
      // query = autoQuery(query, where);

      console.log(where, 'PP');
      if (whereArray) {
        query = autoQuery(query, where, 'array-contains');
      }
      query = query.orderBy('createdAt', 'desc'); //TODO criar metodo automatico depois
      if (page > 0) {
        query = query.limit(page * 30);
      }

      const docs = await query
        .get()
        .then((querySnapshot: any) => querySnapshot.docs);

      docs.forEach((doc: any) => {
        result = {
          ...result,
          ...{ [doc.id]: { ...{ id: doc.id }, ...doc.data() } },
        };
      });
      return result;
    },
    find: async (id: String) => {
      return await model
        .doc(id)
        .get()
        .then((doc: any) => {
          const data = doc.data();
          return data ? { ...{ id: id }, ...data } : null;
        });
    },
    get: async (where = null) => {
      let query = model;
      return await autoQuery(query, where)
        .limit(1)
        .get()
        .then((querySnapshot: any) => {
          return querySnapshot.docs[0]
            ? {
                ...{ id: querySnapshot.docs[0].id },
                ...querySnapshot.docs[0].data(),
              }
            : null;
        });
    },
    deleteBy: async (where: any) => {
      try {
        const result = await functions.getAll(where);
        _.each(_.keys(result), (docId) => {
          functions.delete(docId);
        });
        return { status: true, data: result };
      } catch (error) {
        console.log(error.toString());
        return { status: false, error: error };
      }
    },
    getAllCollection: async (nameCollection: any, docId: any) => {
      return await orm(model.doc(docId).collection(nameCollection)).getAll();
    },
    async getLikes(id: string) {
      let likes: any;
      return new Promise(async function (resolve, reject) {
        return await model
          .doc(id)
          .collection('likes')
          .orderBy('createdAt', 'asc')
          .get()
          .then(async (querySnapshot: any) => {
            await _.each(await querySnapshot.docs, async (doc) => {
              return (likes[doc.id] = doc.data());
            });
            resolve();
          });
      }).then(() => {
        // console.log('LIKES', likes);
        return likes;
      });
    },
  };
  return functions;
};

export default orm;
