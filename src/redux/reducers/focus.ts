import { createReducer } from 'reduxsauce';
import { REHYDRATE } from 'redux-persist/lib/constants';
import _ from 'lodash';

import Types from './types';

const INITIAL_STATE = {
  byId: <any>{},
  allId: <any>[],
  byTask: <any>{},
};

const add = (state = INITIAL_STATE, { payload }: any) => {
  let dataNew = <any>{};
  dataNew.byId = { ...state.byId, ...payload };
  dataNew.byTask = {};
  dataNew.allId = _.orderBy(dataNew.byId, ['createdAt'], ['desc']).map(
    (item: any) => {
      if (!dataNew.byTask[item.taskId]) {
        dataNew.byTask[item.taskId] = [];
      }
      dataNew.byTask[item.taskId].push(item.id);
      return item.id;
    }
  );

  console.log('REDUX REDUCER', dataNew.byTask);

  state.byId = { ...state.byId, ...dataNew.byId };
  state.byTask = { ...state.byTask, ...dataNew.byTask };
  state.allId = { ...state.allId, ...dataNew.allId };

  return { ...state, ...dataNew };

  // return {
  //   ...state,
  //   ...{ ...state.byId, ...{ byId: { ...state.byId, ...payload } } },
  //   ...{ ...state.byId, ...{ byId: { ...state.byId, ...payload } } },
  // };
};

const del = (state = INITIAL_STATE, { id }: any) => {
  console.log('DELETE RED', id, state.byId[id]);
  if (state.byId[id]) {
    delete state.byId[id];
    state.allId = _.orderBy(state.byId, ['createdAt'], ['desc']).map(
      (item: any) => item.id
    );
  }

  return state;
};

const refresh = (state = INITIAL_STATE, { payload }: any) => {
  return INITIAL_STATE;
};

const HANDLERS = {
  [Types.FOCUS.ADD]: add,
  [Types.FOCUS.REFRESH]: refresh,
  [Types.FOCUS.DEL]: del,
  // [REHYDRATE]: (state = INITIAL_STATE, action: any) => {
  //   if (action.payload) {
  //     return { ...state, ...action.payload.tasks };
  //   }
  //   // return { ...state, ...{ persistedState: action.payload } };
  //   return { test: '' };
  // },
};

export default createReducer(INITIAL_STATE, HANDLERS);
