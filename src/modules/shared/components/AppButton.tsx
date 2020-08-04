import React from 'react';
import styled from 'styled-components';
import Icon from '@material-ui/core/Icon';

interface Params {
  label: string;
  onPress?: () => any;
  color?: string;
  type?: string;
  icon?: string;
}

export default ({ onPress, label, color, type = '', icon }: Params) => {
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
    <>
      {type === 'fab' ? (
        <ButtonFab
          style={{ opacity: touched ? '0.3' : '1' }}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onClick={onPress}
        >
          <Icon>{icon}</Icon>
        </ButtonFab>
      ) : (
        <Button
          style={{ opacity: touched ? '0.3' : '1' }}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onClick={onPress}
        >
          {label}
        </Button>
      )}
    </>
  );
};

const Container = styled.div``;
const ButtonFab = styled.div.attrs({})`
  width: 24px;
  height: 24px;
  /* flex: 1; */
  background-color: transparent;
  border: solid 0px #fff;
  padding: 10px;
  border-radius: 50px;
  font-size: 16px;
  color: #fff;
  opacity: 1;
  transition: opacity 200ms ease;
  :focus {
    outline: none;
    border: solid 0;
    /* background: #0074d9; */
    /* border-radius: 30px; */
  }
  ::-webkit-input-placeholder {
    color: #fff;
  }
`;

const Button = styled.div.attrs({})`
  /* flex: 1; */
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 10px;
  border-radius: 10px;
  font-size: 16px;
  color: #fff;
  opacity: 1;
  transition: opacity 200ms ease,
    background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  :hover {
    background-color: #ffffff20;
    border: solid 1px #fff;
    cursor: pointer;
  }
  :focus {
    outline: none;
    border: solid 0;
    /* background: #0074d9; */
    /* border-radius: 30px; */
  }
  ::-webkit-input-placeholder {
    color: #fff;
  }
`;
