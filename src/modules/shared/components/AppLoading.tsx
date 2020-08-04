import React from 'react';
import styled from 'styled-components';
import AppContainer from './AppContainer';

import AppLogo from './AppLogo';

export default () => {
  return (
    <AppContainer>
      <Container>
        <AppLogo />
        <Text>Só um instante...</Text>
      </Container>
    </AppContainer>
  );
};

const Container = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
  min-width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Text = styled.div`
  font-size: 18px;
  margin: 15px;
  color: #fff;
`;
