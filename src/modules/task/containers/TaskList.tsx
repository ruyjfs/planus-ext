import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';

import Service from '../../../services/firebase/Tasks';

import AppNavigationTop from '../../shared/components/AppNavigationTop';
import Types from '../../../redux/sagas/types';
import TypesReducer from '../../../redux/reducers/types';

import ListItem from '../components/ListItem';

import TaskListItem from './TaskListItem';
import { persistor } from '../../../redux/index';

export default () => {
  let history = useHistory();
  const auth = useSelector((state: any) => state.auth.data);
  const app = useSelector((state: any) => state.app);
  const byId = useSelector((state: any) => state.tasks.byId);
  const list = useSelector((state: any) => state.tasks.allId);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [test, setTest] = useState({});

  async function refreshList() {
    console.log('resetou');
    setRefreshing(true);
    setPage(1);
    dispatch({
      type: Types.TASKS.REFRESH,
      payload: { page, userId: auth.id },
    });
    dispatch({
      type: Types.TASKS.LOAD,
      payload: { page, userId: auth.id },
    });
    setRefreshing(false);
  }

  async function load() {
    if (list.length === 0) {
      dispatch({
        type: Types.TASKS.LOAD,
        payload: { page, userId: auth.id },
      });
    }
    // console.log('tasks', auth, app);
    // console.log('Load tasks', byId, list);
    // dispatch({
    //   type: TypesReducer.TASKS.ADD,
    //   payload: { byId: { 3: '1' } },
    // });
    // const result = await Service.model.get().then((querySnapshot: any) => {
    //   return querySnapshot.docs.map((doc: any) => {
    //     return { ...{ id: doc.id }, ...doc.data() };
    //   });
    // });
    // // setTest(result);
    // dispatch({
    //   type: TypesReducer.TASKS.ADD,
    //   payload: result,
    // });
    // persistor.flush();
    // console.log('load()', result);
  }

  useEffect(() => {
    // if (!auth.id) {
    //   return history.push('/auth/email');
    // }

    load();
  }, []);
  // useEffect(() => {
  //   console.log('PPPPP', test);
  //   dispatch({
  //     type: TypesReducer.TASKS.ADD,
  //     payload: {
  //       byId: test,
  //     },
  //   });
  // }, [test]);

  return (
    <Container>
      <AppNavigationTop right={{ icon: 'refresh', onPress: refreshList }} />
      <ContainerList>
        <TaskListItem />
      </ContainerList>
    </Container>
  );
};

const ContainerList = styled.div``;
const Container = styled.div`
  width: 100%;
  /* display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  width: 100%; */
`;
