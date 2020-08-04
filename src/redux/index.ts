import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
// import storage from 'localforage';

import rootReducer from './reducers';
import rootSaga from './sagas';
const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['auth', 'tasks', 'app', 'focus'],
};

const persistedReducer = persistReducer(persistConfig, <any>rootReducer);

const middleWare = <any>[];
const sagaMiddleware = createSagaMiddleware({});
middleWare.push(sagaMiddleware);

// let store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
const store = createStore(
  persistedReducer,
  compose(applyMiddleware(...middleWare))
);
// const store = createStore(
//   persistedReducer,
//   {},
//   applyMiddleware(sagaMiddleware)
// );

// const middleware = [];

// const store = createStore(
//   makeRootReducer(),
//   initialState,
//   compose(applyMiddleware(...middleware), autoRehydrate(), ...enhancers)
// );

sagaMiddleware.run(rootSaga);

let persistor = persistStore(store);

export { store, persistor };

// const sagaMiddleware = createSagaMiddleware();
// const store = createStore(
//   persistedReducer,
//   {},
//   applyMiddleware(sagaMiddleware)
// );
// sagaMiddleware.run(rootSaga);

// let store = createStore(persistedReducer);
// let persistor = persistStore(store);

// export { store, persistor };
