import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Auth from '../../../services/firebase/Auth';
import Types from '../../../redux/reducers/types';

export default ({ history }: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    Auth.logout();
    dispatch({ type: Types.AUTH.REFRESH });
    if (history) {
      history.push('/');
    }
  }, []);

  return <></>;
};
