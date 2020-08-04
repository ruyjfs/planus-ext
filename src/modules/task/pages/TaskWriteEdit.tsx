import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AppSaveRouter from '../../shared/containers/AppSaveRouter';
import AppContainer from '../../shared/components/AppContainer';
// import AppNavigationBotton from '../../shared/components/AppNavigationBotton';

import TaskForm from '../containers/TaskForm';

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state: any) => state.auth.data);

  React.useEffect(() => {
    if (!auth.uid) {
      dispatch({
        type: 'LAYOUT_SNACKBAR_ADD',
        snackbar: {
          open: true,
          message: 'Entre com a sua conta!',
        },
      });
      return history.push('/checkpoint');
    }
  }, []);

  return (
    <AppContainer color="orange" alignHorizontal="center">
      <AppSaveRouter routerLink="/task-write-edit" />
      <TaskForm />
    </AppContainer>
  );
};
