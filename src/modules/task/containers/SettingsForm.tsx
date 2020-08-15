import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Fade } from '@material-ui/core';

import Types from '../../../redux/reducers/types';
import AppTextInput from '../../shared/components/AppTextInput';
import AppContainer from '../../shared/components/AppContainer';
import AppNavigationTop from '../../shared/components/AppNavigationTop';
import AppLogo from '../../shared/components/AppLogo';
import AppButton from '../../shared/components/AppButton';
import AppDivider from '../../shared/components/AppDivider';

import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';

const LinkBehavior = React.forwardRef<any, Omit<RouterLinkProps, 'to'>>(
  (props, ref) => (
    <RouterLink ref={ref} to="/getting-started/installation/" {...props} />
  )
);

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state: any) => state.auth);
  const settings = useSelector((state: any) => state.app.settings);
  const [form, setForm] = React.useState({
    timeForDay: '08h45',
    timeLunch: '01h00',
    timeFocus: '45',
    timeFocusPause: '05',
  });

  React.useEffect(() => {
    console.log(auth);
    if (settings) {
      setForm({
        timeForDay: settings.timeForDay,
        timeLunch: settings.timeLunch,
        timeFocus: settings.timeFocus,
        timeFocusPause: settings.timeFocusPause,
      });
    }
  }, []);

  function onSubmit() {
    dispatch({
      type: Types.APP.SETTINGS_ADD,
      payload: form,
    });
    return history.push('/checkpoint');
  }

  const onChange = (name: any) => (event: any) =>
    setForm({ ...form, [name]: event.target.value });

  return (
    <>
      <AppNavigationTop
        left={{ icon: 'keyboard_arrow_left', link: '/' }}
        right={{ icon: 'save', onPress: onSubmit }}
      />
      <AppLogo />
      <Container>
        <ContainerInput>
          <Title>Ponto diário</Title>
        </ContainerInput>
        <ContainerInput>
          <TextInputLabel>Expediente:</TextInputLabel>
          <AppTextInput
            placeholder="00h00"
            onChange={onChange('timeForDay')}
            value={form.timeForDay}
            width={50}
            type="outline"
            mask="99h99"
          />
        </ContainerInput>
        <ContainerInput>
          <TextInputLabel>Almoço:</TextInputLabel>
          <AppTextInput
            placeholder="00h00"
            onChange={onChange('timeLunch')}
            value={form.timeLunch}
            width={50}
            type="outline"
            mask="99h99"
          />
        </ContainerInput>
        <ContainerInput>
          <Title>Foco</Title>
        </ContainerInput>
        <ContainerInput>
          <TextInputLabel>Focado (minutos):</TextInputLabel>
          <AppTextInput
            placeholder="45"
            onChange={onChange('timeFocus')}
            value={form.timeFocus}
            width={50}
            type="outline"
            mask="99"
          />
        </ContainerInput>
        <ContainerInput>
          <TextInputLabel>Descanço (minutos):</TextInputLabel>
          <AppTextInput
            placeholder="05"
            onChange={onChange('timeFocusPause')}
            value={form.timeFocusPause}
            width={50}
            type="outline"
            mask="99"
          />
        </ContainerInput>
        <ContainerButton>
          {auth.id ? (
            <Button
              variant="outlined"
              color="primary"
              to="/auth-chat/logout"
              component={RouterLink}
            >
              Sair
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              to="/auth/email"
              component={RouterLink}
            >
              Autenticar
            </Button>
          )}
        </ContainerButton>
      </Container>
    </>
  );
};

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  min-width: 200px;
  /* border-bottom: 1px solid #ffffff60; */
  /* margin: 10px;
  padding-bottom: 5px; */
`;

const ContainerButton = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContainerInput = styled.div`
  margin-bottom: 5px;
  width: 100%;
  /* border-radius: 10px;
  border: 1px solid #fff; */
  flex-direction: column;
  flex: 1;
  display: flex;
  /* align-items: center; */
  justify-content: flex-start;
  /* padding: 0 10px; */
`;
const TextInputLabel = styled.div`
  font-size: 16px;
`;
const Row = styled.div`
  /* flex-direction: row;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 10px; */
`;
const ContainerButtom = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 10px;
`;

const Container = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  /* height: 90vh; */
`;

// const Container = styled.div`
//   /* min-width: 280px; */
//   /* min-width: 100%; */
//   /* min-width: 100vh;
//   min-height: 100vh; */
//   /* min-height: 600px; */
//   /* margin: 0 10px; */
//   /* flex-direction: row;
//   flex: 1;
//   display: flex;
//   justify-content: flex-start;
//   padding: 0 10px; */
//   align-items: center;
//   flex: 1;
//   display: flex;
//   flex-direction: column;
// `;
