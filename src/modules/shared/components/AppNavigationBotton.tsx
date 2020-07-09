import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles({
  root: {
    width: 500,
    background: 'transparent',
  },
});

export default ({ value = 'home' }) => {
  const classes = useStyles();
  const [value2, setValue2] = React.useState('home');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue2(newValue);
  };

  return (
    <TabNavBotton>
      <BottomNavigation
        value={value2}
        onChange={handleChange}
        className={classes.root}
      >
        <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} />
        <BottomNavigationAction
          label="Favorites"
          value="fav"
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          label="Nearby"
          value="nerb"
          icon={<LocationOnIcon />}
        />
      </BottomNavigation>
    </TabNavBotton>
  );
};

const TabNavBotton = styled.div`
  justify-content: center;
  display: flex;
  background: #00000080;
  position: absolute;
  bottom: 0;
`;
