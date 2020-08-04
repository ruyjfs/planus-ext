import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import Auth from '../../services/firebase/Auth';

import AppSnackbar from '../app/AppSnackbar';
import AppContainer from '../../modules/shared/components/AppContainer';
import AppNavigationTop from '../../modules/shared/components/AppNavigationTop';
import AppNavigationBotton from '../../modules/shared/components/AppNavigationBotton';

export default ({ history, children }: any) => {
  const auth = useSelector((state: any) => state.auth.data);

  // useEffect(() => {
  //   async function verifyAuth() {
  //     let user = await Auth.user();
  //     console.log('LAYOUTPRIVATE', user);

  //     if (!user && !auth.uid) {
  //       history.push('/');
  //     }
  //   }

  //   verifyAuth();
  // }, []);

  return (
    <AppContainer color="orange">
      <>
        {children}
        <AppNavigationBotton />
        <AppSnackbar />
      </>
    </AppContainer>
  );
};
