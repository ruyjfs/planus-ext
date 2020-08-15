import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Types from '../../../redux/sagas/types';
import ListItem from '../components/ListItem';

export default () => {
  const list = useSelector((state: any) => state.tasks?.allId);
  const byId = useSelector((state: any) => state.tasks?.byId);
  const dispatch = useDispatch();

  // function onEdit(id: string) {
  //   dispatch({
  //     type: Types.TASKS.DEL,
  //     id,
  //   });
  // }

  function onDelete(id: string) {
    dispatch({
      type: Types.TASKS.DEL,
      id,
    });
  }

  return list.map((id: string) => (
    <ListItem data={byId[id]} key={id} onDelete={onDelete} />
  ));
};
