import { all } from 'redux-saga/effects';
import tasks from './tasks';
import focus from './focus';

function* rootSaga() {
  yield all([tasks(), focus()]);
}

export default rootSaga;
