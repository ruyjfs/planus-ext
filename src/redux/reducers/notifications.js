// import { TOGGLE_NOTIFICATION_DIALOG, NOTICE_LOAD_LIST } from "../actionTypes";

const initialState = {
  dialog: {
    active: false
  },
  data: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'NOTIFICATION_DIALOG_TOGGLE': {
      state.dialog.active = action.dialog.active;
      return state;
      // return { ...state, initialState: { active: action.data.active, data: action.data } }
    }
    case 'NOTIFICATION_LIST_LOAD': {
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
