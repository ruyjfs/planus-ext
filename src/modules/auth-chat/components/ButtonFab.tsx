import React, { useState } from 'react';
import styled from 'styled-components';
import Icon from '@material-ui/core/Icon';

import TouchOpacity from './TouchOpacity';

interface Params {
  icon: string;
  onPress: any;
}

export default ({ icon, onPress }: Params) => {
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
    <TouchOpacity>
      <Container
        style={{ opacity: touched ? '0.3' : '1' }}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onClick={onPress}
      >
        <Icon>{icon}</Icon>
      </Container>
    </TouchOpacity>
  );
};

const Container = styled.div.attrs({})`
  opacity: 1;
  transition: opacity 200ms ease;
  color: #fff;
  width: 24px;
  height: 24px;
  background-color: transparent;
  border: solid 1px #fff;
  border-radius: 50px;
  padding: 10px;
  margin: 0 10px;
`;
