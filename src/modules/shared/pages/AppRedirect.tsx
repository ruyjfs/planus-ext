import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Auth from '../../../services/firebase/Auth';

import AppLoading from '../components/AppLoading';

export default () => {
  let history = useHistory();
  const auth = useSelector((state: any) => state.auth);
  const routerLink = useSelector((state: any) => state.app.routerLink);

  React.useEffect(() => {
    async function verifyAuth() {
      // console.log(auth);
      // return true;
      if (auth.id) {
        if (routerLink) {
          return history.push(routerLink);
        }

        return history.push('/checkpoint');
      }

      return history.push('/auth-chat');
    }

    verifyAuth();
  });

  return <AppLoading />;
};
