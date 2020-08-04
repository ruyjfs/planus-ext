import React from 'react';
import styled from 'styled-components';
import Icon from '@material-ui/core/Icon';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import { makeStyles } from '@material-ui/core/styles';
// import BottomNavigation from '@material-ui/core/BottomNavigation';
// import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
// import HomeIcon from '@material-ui/icons/Home';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import LocationOnIcon from '@material-ui/icons/LocationOn';

// const useStyles = makeStyles({
//   root: {
//     width: '100%',
//     background: 'transparent',
//     minWidth: 'inherit',
//   },
//   root2: {
//     width: '100%',
//     background: 'transparent',
//     minWidth: 'inherit',
//   },
// });

interface Button {
  icon: string;
  link?: string;
  onPress?: any;
}

interface Params {
  left?: Button;
  right?: Button;
}

export default ({
  left = { icon: '', link: '', onPress: () => {} },
  right = { icon: '', link: '', onPress: () => {} },
}: Params) => {
  return (
    <>
      <Container />
      <ContainerFixed
        style={{
          justifyContent:
            right.link && right.icon ? 'flex-end' : 'space-between',
        }}
      >
        {left.icon && left.link ? (
          <ContainerButton>
            <ButtomLink to={left.link}>
              <Icon fontSize="large">{left.icon}</Icon>
            </ButtomLink>
          </ContainerButton>
        ) : (
          <ContainerButton>
            <Buttom>
              <Icon fontSize="large" onClick={left.onPress}>
                {left.icon}
              </Icon>
            </Buttom>
          </ContainerButton>
        )}

        {right.link && right.icon ? (
          <ContainerButton>
            <ButtomLink to={right.link}>
              <Icon>{right.icon}</Icon>
            </ButtomLink>
          </ContainerButton>
        ) : (
          <ContainerButton>
            <Buttom onClick={right.onPress}>
              <Icon>{right.icon}</Icon>
            </Buttom>
          </ContainerButton>
        )}
      </ContainerFixed>
    </>
  );
};

const Buttom = styled.div`
  margin: 9px;
  color: #fff;
  text-decoration: none;
  /* align-items: center;
  justify-content: center; */
  /* flex: 1;
  display: flex; */
  cursor: pointer;
`;

const ButtomLink = styled(Link)`
  margin: 9px;
  color: #fff;
  text-decoration: none;
  /* align-items: center;
  justify-content: center; */
  /* flex: 1;
  display: flex; */
  cursor: pointer;
`;

const ContainerButton = styled.div`
  /* justify-content: flex-end;
  display: flex; */
  /* flex: 1; */
`;

const ContainerFixed = styled.div`
  justify-content: space-between;
  min-height: 46px;
  align-items: center;
  position: fixed;
  top: 0;
  flex-direction: row;
  display: flex;
  flex: 1;
  width: 100%;
`;

const Container = styled.div`
  min-height: 46px;
`;
