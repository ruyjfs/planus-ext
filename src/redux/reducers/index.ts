import { combineReducers } from 'redux';
import notifications from './notifications';
import user from './user';
import users from './users';
import auth from './auth';
import layout from './layout';
import tasks from './tasks';
import focus from './focus';
import app from './app';

const reducers: any = {
  notifications,
  user,
  users,
  auth,
  layout,
  app,
  tasks,
  focus,
};

export default combineReducers(reducers);
