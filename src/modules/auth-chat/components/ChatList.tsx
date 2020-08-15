import React from 'react';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Icon from '@material-ui/core/Icon';

import AppTouchOpacity from '../../shared/components/AppTouchOpacity';

export default ({ list, typing, onEdit = (item: any) => {} }: any) => {
  React.useEffect(() => {
    let anchor = document?.querySelector('.anchor');
    if (anchor) {
      anchor.scrollIntoView();
    }
  }, [list]);

  return (
    <Container>
      <TransitionGroup
        style={{
          scrollBehavior: 'smooth',
          maxHeight: '500px',
          overflow: 'auto',
        }}
      >
        {list.map((value: any, id: any) => (
          <CSSTransition key={id} timeout={500} classNames="item">
            <>
              {/* {value.input && } */}
              <Text
                style={{
                  justifyContent: value.me ? 'flex-end' : 'flex-start',
                }}
              >
                {value.me && (
                  <AppTouchOpacity
                    style={{ display: 'inline' }}
                    onPress={() => onEdit(value)}
                  >
                    <Icon
                      fontSize="small"
                      style={{
                        margin: '0 5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      edit
                    </Icon>
                  </AppTouchOpacity>
                )}
                {value?.text}
              </Text>
            </>
          </CSSTransition>
        ))}
        {typing && (
          <CSSTransition key="typing" timeout={500} classNames="item">
            <Text>Digitando...</Text>
          </CSSTransition>
        )}
        <CSSTransition key="anchor" timeout={500} classNames="item">
          <div className="anchor"></div>
        </CSSTransition>
      </TransitionGroup>
    </Container>
  );
};

const Container = styled.div`
  justify-content: flex-end;
  min-width: 100%;
  margin: 10px 0;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Text = styled.div`
  font-size: 18px;
  color: #fff;
  margin: 5px 0;
  padding: 0px 10px;
  align-items: center;
  justify-content: flex-start;
  display: flex;
`;
