import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Auth from '../../../services/firebase/Auth';
import Types from '../../../redux/reducers/types';
import { useHistory } from 'react-router-dom';

export default () => {
  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    Auth.logout();
    dispatch({ type: Types.AUTH.REFRESH });
    dispatch({ type: Types.TASKS.REFRESH });
    return history.push('/');
  }, []);

  return <></>;
};
