import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Types from '../../../redux/reducers/types';

export default ({ routerLink }: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (routerLink) {
      dispatch({
        type: Types.APP.ADD,
        payload: { routerLink },
      });
    }
    // console.log('Salvou link ->>', routerLink);
  }, []);

  return <></>;
};
