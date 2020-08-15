import React from 'react';
import styled from 'styled-components';

export default (props: any) => <TextInput {...props} />;

const TextInput = styled.input`
  width: 100%;
  margin: 5px 0;
  font-size: 18px;
  color: #fff;
  margin: 5px 0;
  border-radius: 30px;
  background: transparent;
  border: solid 1px #fff;
  padding: 5px 10px;
  font-size: 16px;
  :focus {
    outline: none;
    border: solid 1px #fff;
  }
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #fff;
    opacity: 1; /* Firefox */
  }
`;
