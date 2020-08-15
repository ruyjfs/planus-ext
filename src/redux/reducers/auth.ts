import { createReducer } from 'reduxsauce';
import Types from './types';

const INITIAL_STATE = {
  id: '',
  uid: '',
  email: '',
  phone: '',
  username: '',
  name: '',
  lastName: '',
  emailVerified: false,
  tokenFcm: '',
};

const add = (state = INITIAL_STATE, { payload }: any) => {
  return { ...state, ...payload };
};
const refresh = () => {
  return INITIAL_STATE;
};

interface Action {
  type: String;
  data: any;
  phone?: any;
}

const HANDLERS = {
  [Types.AUTH.ADD]: add,
  [Types.AUTH.REFRESH]: refresh,
};

export default createReducer(INITIAL_STATE, HANDLERS);
