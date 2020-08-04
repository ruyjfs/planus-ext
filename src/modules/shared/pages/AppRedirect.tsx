import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AppLoading from '../components/AppLoading';

export default () => {
  let history = useHistory();
  const auth = useSelector((state: any) => state.auth.data);
  const routerLink = useSelector((state: any) => state.app.routerLink);

  React.useEffect(() => {
    if (routerLink) {
      return history.push(routerLink);
    }

    // console.log('Loading ->>', routerLink);
    return history.push('/checkpoint');
  });

  return <AppLoading />;
};
