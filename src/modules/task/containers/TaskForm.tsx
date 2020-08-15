import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch, AnyIfEmpty } from 'react-redux';
import _ from 'lodash';

import Types from '../../../redux/sagas/types';
import AppTextarea from '../../shared/components/AppTextarea';
import AppButton from '../../shared/components/AppButton';
import { useHistory, useParams } from 'react-router-dom';

import AppNavigationTop from '../../shared/components/AppNavigationTop';

export default () => {
  let { id } = useParams();
  let history = useHistory();

  const auth = useSelector((state: any) => state.auth);
  const data = useSelector((state: any) => (id ? state.tasks.byId[id] : {}));
  const dispatch = useDispatch();
  // const id = route.params.id;
  // const yearDay = route.params.yearDay;
  // const data = useSelector(state => state.stories.list[id]);
  // const auth = useSelector(state => state.auth);
  // const dispatch = useDispatch();
  const [value, setValue] = useState({ text: '' });
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    // if (loading) {
    //   // Alert.alert('Aguarde um instante!');
    //   return false;
    // }
    console.log('FOII');

    if (value.text.length <= 3) {
      await dispatch({
        type: 'LAYOUT_SNACKBAR_ADD',
        snackbar: {
          open: true,
          message: 'Ops.. Acho que esqueceu de escrever algo!',
        },
      });
      return false;
    }

    dispatch({
      type: Types.TASKS.SAVE,
      payload: {
        text: _.trim(value.text),
        userId: auth.id,
        dayWeek: '',
      },
      id: id ? id : null,
    });
    history.push('/tasks');
    //   return onClose();

    // const result = await ServiceMain.save(
    //   {
    //     text: _.trim(value.text),
    //     userId: auth.id,
    //     yearDay: yearDay,
    //   },
    //   id ? id : null,
    // );

    // if (result.status) {
    //   // await dispatch({
    //   //   type: 'STORY_MY_ADD',
    //   //   values: result.data,
    //   //   userId: auth.id,
    //   //   id: result.data.id,
    //   // });
    //   // await dispatch({
    //   //   type: 'STORY_MY_ADD',
    //   //   values: result.data,
    //   //   id: result.data.id,
    //   // });
    //   // await dispatch({
    //   //   type: 'STORY_BY_USER_ADD',
    //   //   values: result.data,
    //   //   userId: auth.id,
    //   //   id: result.data.id,
    //   // });
    //   setLoading(false);
    //   return onClose();
    // }

    //   setLoading(false);
    //   Alert.alert('Não foi possível enviar o texto!');
  }

  function onChange(event: any) {
    setValue({ ...value, ...{ text: event.target.value } });
  }

  useEffect(() => {
    if (data) {
      setValue(data);
    }
  }, []);

  return (
    <Container>
      {data ? (
        <AppNavigationTop
          left={{ link: '/tasks', icon: 'arrow_back' }}
          right={{ onPress: onSubmit, icon: 'send' }}
        />
      ) : (
        <AppNavigationTop right={{ onPress: onSubmit, icon: 'send' }} />
      )}
      <AppTextarea
        placeholder="Nova tarefa"
        onChange={onChange}
        value={value.text}
      />
      {/* <AppTextInput placeholder="Adicionar nova tarefa" /> */}
      {/* <ContainerBottom>
        <AppButton onPress={() => {}} label="Salvar" color="#FFF" />
      </ContainerBottom> */}
    </Container>
  );
};

const ContainerTop = styled.div`
  flex: 1;
  align-items: flex-end;
  justify-content: space-between;
  display: flex;
  width: 100%;
`;
const Container = styled.div`
  min-width: 300px;
  width: 100%;
  /* height: 100vh; */
  justify-content: start;
  align-items: start;
  flex: 1;
  /* display: flex; */
  flex-direction: column;
`;
const ContainerBottom = styled.div`
  justify-content: center;
  width: 100%;
  /* height: 100vh; */
  /* justify-content: start; */
  align-items: start;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
