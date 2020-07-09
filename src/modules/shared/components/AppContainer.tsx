import React from 'react';
import styled from 'styled-components';
import Fade from '@material-ui/core/Fade';

export default ({
  children,
  color = 'orange',
  alignFlex = 'left',
  alignHorizontal = 'left',
}: any) => {
  const colors: any = {
    pink: '#FF6345, #FF0274, #E94D91, #FF95EA',
    orange: '#fbd27d, #FFAF00, #FF6345, #FF6345',
    green: '#00A247, #02E265, #00A247',
    purple: '#C774FD, #A82CFB, #7100BC, #3F0167',
    blue: '#00BCD4, #4BBAFF, #009EFF, #006BAD',
    red: '#ff5f6d, #FF1E1E',
    // red: '#ffc371, #FF7442, #ff5f6d, #FF1E1E',
    white: '#FFE6FF, #E6FFFF, #E6E6FF, #E6FFE6, #FFFFE6, #FFE7E7',
    beige: '#FDF5E7, #FDF5E7, #FEFDDE',
  };

  return (
    <Fade in={true}>
      <Container
        style={{
          background: `radial-gradient(circle at top, ${colors[color]})`,
          alignItems: alignHorizontal,
          justifyContent: alignFlex,
        }}
      >
        {children}
      </Container>
    </Fade>
  );
};

const Container = styled.div`
  padding: 0 10px;
  min-width: 150px;
  /* min-height: 100vh; */
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  color: white;
`;
