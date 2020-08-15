import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

import AppNavigationTop from '../../shared/components/AppNavigationTop';
import AppSaveRouter from '../../shared/containers/AppSaveRouter';
import AppLogo from '../../shared/components/AppLogo';
import CheckPointFrom from '../containers/CheckPointForm';

export default () => {
  const [dateToday, setDateToday] = React.useState('');

  React.useEffect(() => {
    setDateToday(dayjs().format('D/MM/YYYY'));
  }, []);
  return (
    <>
      <AppNavigationTop right={{ icon: 'settings', link: '/settings' }} />
      <Container>
        <AppSaveRouter routerLink="/checkpoint" />
        <AppLogo />
        <Text>Meu ponto</Text>
        <Text>Hoje é {dateToday}</Text>
        <CheckPointFrom />
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px 10px 10px;
`;

const Text = styled.div`
  margin: 5px 0;
`;
