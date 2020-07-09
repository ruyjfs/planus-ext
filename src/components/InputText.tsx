import React from 'react';
import styled from 'styled-components';
import InputMask from 'react-input-mask';
import TextField from '@material-ui/core/TextField';

export default ({ placeholder, value, onChange }: any) => {
  return (
    <Container>
      {/* <Title>{placeholder} </Title> */}
      <InputText
        type="text"
        placeholder={placeholder}
        mask="99:99"
        onChange={onChange}
        value={value}
      />
      {/* <TextField id="outlined-basic" variant="outlined" /> */}
    </Container>
  );
};

const Container = styled.div`
  margin: 5px 10px;
  /* flex-direction: column; */
  /* flex: 1; */
  /* width: 600px; */
`;

const Title = styled.div`
  /* background-color: red; */
  font-size: 15px;
  display: inline;
`;

const InputText = styled(InputMask)`
  /* max-width: 40px; */
  max-width: 110px;
`;
