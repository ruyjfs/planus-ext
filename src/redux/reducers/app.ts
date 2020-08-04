import { createReducer } from 'reduxsauce';
import Types from './types';

const INITIAL_STATE = {
  routerLink: '',
  settings: {
    timeForDay: '08h45',
    timeLunch: '01h00',
    timeFocus: 45,
    timeFocusPause: '00h05',
  },
  checkPoint: {
    value1: '',
    value2: '',
    value3: '',
    value4: '',
  },
};

const add = (state = INITIAL_STATE, { payload }: any) => {
  return { ...state, ...payload };
};

const checkPointAdd = (state = INITIAL_STATE, { payload }: any) => {
  return { ...state, ...{ ...state.checkPoint, ...{ checkPoint: payload } } };
};
const settingsAdd = (state = INITIAL_STATE, { payload }: any) => {
  return { ...state, ...{ ...state.settings, ...{ settings: payload } } };
};

const HANDLERS = {
  [Types.APP.ADD]: add,
  [Types.APP.CHECKPOINT_ADD]: checkPointAdd,
  [Types.APP.SETTINGS_ADD]: settingsAdd,
};

export default createReducer(INITIAL_STATE, HANDLERS);
