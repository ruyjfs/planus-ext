import React from 'react';
import styled from 'styled-components';

import AppContainer from '../../shared/components/AppContainer';
import AppNavigationBotton from '../../shared/components/AppNavigationBotton';

import TaskList from '../containers/TaskList';

export default () => {
  return (
    <AppContainer alignHorizontal="center">
      <TaskList />
      <AppNavigationBotton value="home" />
    </AppContainer>
  );
};
