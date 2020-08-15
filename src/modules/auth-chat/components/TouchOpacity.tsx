import React, { useState } from 'react';
import styled from 'styled-components';
import Icon from '@material-ui/core/Icon';

export default ({ children }: any) => {
  const [touched, setTouched] = useState(false);

  function onMouseDown() {
    setTouched(!touched);
  }
  function onMouseUp() {
    setTimeout(() => {
      setTouched(false);
    }, 150);
  }

  return (
    <Container
      style={{ opacity: touched ? '0.3' : '1' }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {children}
    </Container>
  );
};

const Container = styled.div.attrs({})``;
