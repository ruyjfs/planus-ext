import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import AppSaveRouter from '../../shared/containers/AppSaveRouter';
import AppToolbar from '../../shared/components/AppToolbar';

import Focus from '../containers/Focus';

export default () => {
  let { id } = useParams();

  return (
    <>
      <AppSaveRouter routerLink={`/focus/${id}`} />
      <AppToolbar buttonLeft={{ to: '/tasks', icon: 'arrow_back' }} />
      <Focus />
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  /* height: 90vh; */
`;
