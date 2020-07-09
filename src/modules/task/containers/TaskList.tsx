import React from 'react';
import styled from 'styled-components';

export default () => {
  return (
    <Container>
      <ContainerList></ContainerList>
    </Container>
  );
};

const ContainerList = styled.div``;
const Container = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  width: 100%; */
`;
