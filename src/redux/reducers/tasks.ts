import { createReducer } from 'reduxsauce';
import { REHYDRATE } from 'redux-persist/lib/constants';
import _ from 'lodash';

import Types from './types';

const INITIAL_STATE = {
  byId: <any>{},
  allId: <any>[],
};

const add = (state = INITIAL_STATE, { payload }: any) => {
  let dataNew = <any>{};
  dataNew.byId = { ...state.byId, ...payload };
  dataNew.allId = _.orderBy(dataNew.byId, ['createdAt'], ['desc']).map(
    (item: any) => item.id
  );

  console.log('REDUX REDUCER', payload);

  return { ...state, ...dataNew };
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
  [Types.TASKS.ADD]: add,
  [Types.TASKS.REFRESH]: refresh,
  [Types.TASKS.DEL]: del,
  // [REHYDRATE]: (state = INITIAL_STATE, action: any) => {
  //   if (action.payload) {
  //     return { ...state, ...action.payload.tasks };
  //   }
  //   // return { ...state, ...{ persistedState: action.payload } };
  //   return { test: '' };
  // },
};

export default createReducer(INITIAL_STATE, HANDLERS);
