import React from 'react';
import styled from 'styled-components';
import Icon from '@material-ui/core/Icon';

import TouchOpacity from '../../shared/components/AppTouchOpacity';
import { Custom } from '../../../services/Moment';
import Task from '../../../services/models/Task.types';
import { useHistory } from 'react-router-dom';

import {
  SwipeableList,
  SwipeableListItem,
} from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

interface Data {
  data: Task;
}

export default ({ data, onDelete, onEdit }: any) => {
  let history = useHistory();

  return (
    <Container>
      <SwipeableList>
        <SwipeableListItem
          swipeLeft={{
            content: (
              <div
                style={{
                  backgroundColor: '#ad000090',
                  height: '100%',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  flexDirection: 'row',
                  display: 'flex',
                  padding: 10,
                }}
              >
                Remover
              </div>
            ),
            action: () => onDelete(data.id),
          }}
          swipeRight={{
            content: (
              <div
                style={{
                  backgroundColor: '#005d0090',
                  height: '100%',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                  display: 'flex',
                  padding: 10,
                }}
              >
                Feito
              </div>
            ),
            action: () => console.info('swipe action triggered 2'),
          }}
          onSwipeProgress={(progress) =>
            console.info(`Swipe progress: ${progress}%`)
          }
        >
          <ContainerList>
            <Text>{data?.text}</Text>
            <Infos>
              {data && data.createdAt && (
                <Info>
                  <InfoText>
                    {Custom.toView(data.createdAt.seconds * 1000)}
                  </InfoText>
                </Info>
              )}
            </Infos>
            <Actions>
              <Action onPress={() => history.push(`/task-write/${data.id}`)}>
                <IconCustom>edit</IconCustom>
              </Action>
              <Action onPress={() => history.push(`/focus/${data.id}`)}>
                <IconCustom>av_timer</IconCustom>
              </Action>
              {/* <Action onPress={onDelete}>
                <IconCustom>delete_outline</IconCustom>
              </Action> */}
            </Actions>
          </ContainerList>
        </SwipeableListItem>
      </SwipeableList>
    </Container>
  );
};

const IconCustom = styled(Icon).attrs({ size: 18 })`
  margin: 0 10px;
  margin-left: 0;
`;

const Infos = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const InfoText = styled.div`
  color: #ccc;
  margin: 0 5px;
  font-size: 12px;
  margin-bottom: 10px;
`;

const Info = styled.div`
  flex-direction: row;
  align-items: center;
`;

// const Divider = styled.div`
//   flex: 1;
//   width: 100%;
//   margin: 5px 0;
//   border-width: 0.5px;
//   border-color: #ffffff30;
// `;

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  border-top: solid 0.5px #00000030;
  padding-top: 3px;
  justify-content: flex-end;
`;

const Action = styled(TouchOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

// const ActionText = styled.div`
//   color: #fff;
//   margin-right: 10px;
//   font-size: 14px;
// `;

const Text = styled.div`
  margin: 5px;
`;

const ContainerList = styled.div`
  background-color: #00000030;
  font-size: 16px;
  border: solid #fff 0;
  border-bottom-width: 0.5px;
  border-top-width: 0.5px;
  min-width: 100%;
`;

const Container = styled.div`
  margin-bottom: 10px;
`;
