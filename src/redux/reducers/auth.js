
const initialState = {
  data: {
    uid: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    username: '',
    name: '',
    lastName: '',
    emailVerified: false,
  }
};

export default function (state = initialState, action) {
  if (localStorage.auth) {
    state.data = JSON.parse(localStorage.auth);
  }

  switch (action.type) {
    case 'AUTH_ADD_DATA': {
      console.log(action.data);
      state.data = { ...state.data, ...action.data };
      localStorage.auth = JSON.stringify(state.data);
      console.log(state);

      return state;
    }
    case 'AUTH_ADD_PHONE': {
      state.data.phone = action.phone
      return state
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
