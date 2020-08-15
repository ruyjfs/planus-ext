import React from 'react';
import styled from 'styled-components';

export default ({ children, onPress = () => {} }: any) => {
  const [touched, setTouched] = React.useState(false);

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
      style={{ opacity: touched ? '0.3' : '1', display: 'inline' }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onClick={onPress}
    >
      {children}
    </Container>
  );
};

const Container = styled.div`
  opacity: 1;
  transition: opacity 200ms ease;
  cursor: pointer;
`;
