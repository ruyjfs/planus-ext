import React, { useEffect } from 'react';
import Auth from '../../../services/firebase/Auth';
import { useDispatch } from 'react-redux';

export default ({ history }: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    Auth.logout();
    dispatch({ type: 'AUTH_ADD_DATA', data: { uid: '', email: '' } });
    history.push('/');
  }, []);

  return <></>;
};
