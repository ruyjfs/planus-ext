const initialState = {
  data: {
    today: '',
    start1: '',
    end1: '',
    start2: '',
    end2: '',
  },
};

interface Action {
  type: String;
  data: any;
  phone?: any;
}

export default function (state = initialState, action: Action) {
  if (localStorage.auth) {
    state.data = JSON.parse(localStorage.auth);
  }

  switch (action.type) {
    case 'CHECKPOINT_ADD_DATA': {
      // console.log(action.data);
      // state.data = { ...state.data, ...action.data };
      // localStorage.checkPoint = JSON.stringify(state.data);
      // console.log(state);

      return state;
    }
    // case 'AUTH_ADD_PHONE': {
    //   state.data.phone = action.phone;
    //   return state;
    // }
    // case 'NOTICE_LOAD': {
    //   state.data = action.data;
    //   return state;
    //   // return { ...state, initialState: { active: action.data.active, data: action.data } }
    // }
    default:
      return state;
  }
}
