
const initialState = {
  snackbar: {
    type: 'info',
    open: false,
    message: '',
    time: 3000
  }
};

export default function (state = initialState, action) {
  if (localStorage.layout) {
    state = JSON.parse(localStorage.layout);
  }

  switch (action.type) {
    case 'LAYOUT_SNACKBAR_ADD': {
      state.snackbar = { ...state.snackbar, ...action.snackbar };
      localStorage.layout = JSON.stringify(state);
      return state;
    }
    default:
      return state;
  }
}
