import React from 'react';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ButtonFab from './ButtonFab';
import TextInput from './TextInput';

interface Config {
  name: string;
  type: string;
  placeholder: string;
}

interface Params {
  config: Config;
  show?: boolean;
  onSubmit: any;
  value: string;
  setValue: any;
}

export default ({
  config,
  onSubmit = () => {},
  value = '',
  setValue = () => {},
  show = true,
}: Params) => {
  //   const [value, setValue] = React.useState('');

  function submit(event: any) {
    event.preventDefault();
    onSubmit(value);
  }

  if (config.name !== '' && show) {
    return (
      <form onSubmit={submit}>
        <Container></Container>
        <ContainerFixed>
          <TextInput
            name={config.name}
            type={config?.type}
            placeholder={config.placeholder}
            onChange={(event: any) => setValue(event.target.value)}
            value={value}
          />
          <ButtonFab icon="send" onPress={submit} />
        </ContainerFixed>
      </form>
    );
  }

  return <></>;
};
const Container = styled.div`
  flex-direction: row;
  display: flex;
  width: 100%;
  height: 40px;
`;

const ContainerFixed = styled.div`
  flex-direction: row;
  display: flex;
  width: 100%;
  position: fixed;
  top: 0;
  margin: 5px;
  left: 0;
`;
