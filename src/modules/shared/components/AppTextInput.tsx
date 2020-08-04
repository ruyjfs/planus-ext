import React from 'react';
import styled from 'styled-components';
import InputMask from 'react-input-mask';

interface Params {
  placeholder: string;
  onChange: any;
  value?: any;
  width?: any;
  type?: any;
  mask?: any;
}

export default ({
  placeholder,
  onChange,
  value = '',
  width = null,
  type = '',
  mask = '',
}: Params) => {
  if (mask) {
    return type === 'outline' ? (
      <TextInputOutlineMask
        placeholder={placeholder}
        mask={mask}
        onChange={onChange}
        value={value}
      />
    ) : (
      <TextInputMask
        style={{ width: `${width}px` }}
        mask={mask}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    );
  }

  return type === 'outline' ? (
    <TextInputOutline
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  ) : (
    <TextInput
      style={{ width: `${width}px` }}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};

const Container = styled.div``;

const TextInputOutline = styled.input.attrs({
  type: 'text',
})`
  flex: 1;
  background-color: transparent;
  padding: 10px;
  margin: 5px 0;
  border: solid 1px #fff;
  border-radius: 10px;
  font-size: 16px;
  color: #fff;
  :focus {
    outline: none;
    border: solid 1px #fff;
    /* background: #0074d9; */
    /* border-radius: 30px; */
  }
  ::-webkit-input-placeholder {
    color: #fff;
  }
`;

const TextInput = styled.input.attrs({ type: 'text', autoFocus: true })`
  flex: 1;
  background-color: transparent;
  padding: 10px;
  border: solid 0 #fff;
  border-radius: 10px;
  font-size: 16px;
  color: #fff;
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

const TextInputOutlineMask = styled(InputMask).attrs({
  type: 'text',
})`
  flex: 1;
  background-color: transparent;
  padding: 10px;
  margin: 5px 0;
  border: solid 1px #fff;
  border-radius: 10px;
  font-size: 16px;
  color: #fff;
  :focus {
    outline: none;
    border: solid 1px #fff;
    /* background: #0074d9; */
    /* border-radius: 30px; */
  }
  ::-webkit-input-placeholder {
    color: #fff;
  }
`;

const TextInputMask = styled(InputMask).attrs({
  type: 'text',
  autoFocus: true,
})`
  flex: 1;
  background-color: transparent;
  padding: 10px;
  border: solid 0 #fff;
  border-radius: 10px;
  font-size: 16px;
  color: #fff;
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
