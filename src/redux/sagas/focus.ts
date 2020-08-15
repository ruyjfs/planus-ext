import { call, put, takeEvery, select } from 'redux-saga/effects';

import Service from '../../services/firebase/Focus';
import TypesReducers from '../reducers/types';
import Types from './types';
import Focus from '../../services/models/Focus.types';

interface DynamicIndice {
  [state: string]: any;
}

function* load({ payload }: any) {
  yield put({ type: Types.LOAD.REQUEST });
  const byId = yield call(Service.getAll, payload.where, payload?.page);
  yield put({
    type: TypesReducers.FOCUS.ADD,
    payload: byId,
  });
  yield put({ type: Types.LOAD.SUCCES });
}

function* save({ payload }: any) {
  //   try {
  let id = null;
  yield put({ type: Types.LOAD.REQUEST });
  const focusIdByTask = yield select(
    (state) => state.focus.byTask[payload.taskId]
  );
  let newData: Focus = {
    taskId: payload.taskId,
    userId: payload.userId,
    running: payload.running,
    reseted: 0,
    paused: 0,
    duration: 45,
    startedAt: new Date(),
  };

  if (focusIdByTask) {
    const focusById = yield select((state) => state.focus.byId);

    console.log(focusIdByTask, focusById, 'TTT');
    let currentFocus = focusById[focusIdByTask[0]];
    id = currentFocus.id;
    newData = {
      ...currentFocus,
      ...{
        running: payload.running,
        paused: payload.running ? currentFocus.paused : currentFocus.paused + 1,
        // reseted: currentFocus++,
        // startedAt: new Date(),
      },
    };
    console.log(currentFocus.paused, newData.paused, 888);
  }

  const result = yield call(Service.save, newData, id);
  let byId: DynamicIndice = {};
  byId[result.id] = result.data;
  yield put({
    type: TypesReducers.FOCUS.ADD,
    payload: byId,
  });
  yield put({ type: Types.FOCUS.SAVE_SUCCES });
  yield put({ type: Types.LOAD.SUCCES });
  //   } catch (e) {
  //     console.log('FALHOU -----', e.message);
  //     yield put({ type: Types.LOAD.FAILURE, message: e.message });
  //   }
}

function* main() {
  yield takeEvery(Types.FOCUS.LOAD, load);
  yield takeEvery(Types.FOCUS.SAVE, save);
  // yield takeEvery(Types.TASKS.SAVE, save);
  // yield takeEvery(Types.TASKS.DEL, del);
  // yield takeEvery(Types.PUBLICATIONS.COMMENTS_LOAD, loadComments);
  // yield takeEvery(Types.PUBLICATIONS.VIEWS_LOAD, loadViews);
  // yield takeEvery(Types.PUBLICATIONS.LOAD_SUCCES, loadComments);
  // yield takeEvery(Types.PUBLICATIONS.LOAD_SUCCES, loadViews);
  // yield fork(loadComments);
  // yield fork(loadViews);
  // yield[
  //   fork('LOAD_DASHBOARD', loadDashboardSequenced),
  //   fork('LOAD_DASHBOARD2' loadDashboardNonSequenced)
  // ];
  // yield fork(Types.PUBLICATIONS.LOAD)
}

export default main;
