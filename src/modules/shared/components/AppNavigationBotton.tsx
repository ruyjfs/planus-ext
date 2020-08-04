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

export default ({ value = 'home' }) => {
  const [value2, setValue2] = React.useState('home');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue2(newValue);
  };

  const list = [
    { link: '/checkpoint', icon: 'home' },
    { link: '/task-write', icon: 'edit' },
    { link: '/tasks', icon: 'article' },
  ];

  return (
    <>
      <Container />
      <ContainerFixed>
        {list.map((item) => (
          <ContainerButtom key={item.icon}>
            <Buttom to={item.link}>
              <Icon>{item.icon}</Icon>
            </Buttom>
          </ContainerButtom>
        ))}
      </ContainerFixed>
    </>
  );
};

const Buttom = styled(Link)`
  color: #fff;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  flex: 1;
  display: flex;
  cursor: pointer;
`;

const ContainerButtom = styled.div`
  display: flex;
  flex: 1;
`;

const ContainerFixed = styled.div`
  min-height: 46px;
  justify-content: center;
  background: #00000099;
  position: fixed;
  bottom: 0;
  flex-direction: row;
  display: flex;
  flex: 1;
  width: 100%;
`;

const Container = styled.div`
  min-height: 46px;
`;
