import React from 'react';
import { useDispatch } from 'react-redux';

import Types from '../../../redux/reducers/types';

export default ({ routerLink }: any) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({
      type: Types.APP.ADD,
      payload: { routerLink: routerLink },
    });
    console.log('Salvou link ->>', routerLink);
  }, []);

  return <></>;
};
