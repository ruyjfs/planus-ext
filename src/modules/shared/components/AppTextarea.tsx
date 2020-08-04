import React from 'react';
import styled from 'styled-components';
import InputMask from 'react-input-mask';

export default ({ placeholder, onChange, value = '' }: any) => {
  return (
    <Container>
      <Textarea
        placeholder={placeholder}
        onChange={onChange}
        rows={10}
        value={value}
      />
    </Container>
  );
};

const Container = styled.div`
  margin: 10px;
  border: solid 1px #fff;
  border-radius: 10px;
  padding: 10px;
`;

const Textarea = styled.textarea`
  width: 100%;
  flex: 1;
  background-color: transparent;
  padding: 0;
  /* margin: 5px 0; */
  border: solid 0px #fff;
  border-radius: 10px;
  font-size: 16px;
  color: #fff;
  :focus {
    outline: none;
    border: solid 0px #fff;
    /* background: #0074d9; */
    /* border-radius: 30px; */
  }
  ::-webkit-input-placeholder {
    color: #fff;
  }
`;
