// import { TOGGLE_USERS_DIALOG, NOTICE_LOAD_LIST } from "../actionTypes";

const initialState = {
  dialog: {
    active: false
  },
  data: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'USERS_DIALOG_TOGGLE': {
      state.dialog.active = action.dialog.active;
      return state;
      // return { ...state, initialState: { active: action.data.active, data: action.data } }
    }
    case 'USERS_LIST_LOAD': {
      state.data = action.data;
      return state;
      // return { ...state, initialState: { active: action.data.active, data: action.data } }
    }
    // case 'NOTICE_LOAD': {
    //   state.data = action.data;
    //   return state;
    //   // return { ...state, initialState: { active: action.data.active, data: action.data } }
    // }
    default:
      return state;
  }
}
