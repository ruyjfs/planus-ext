import { firestore } from './index';
import _ from 'lodash';

import ormBase from './Orm';
import Focus from '../models/Focus.types';

const model = firestore.collection('focus'),
  interfaceModel: Focus = {
    taskId: '',
    userId: '',
    running: false,
    reseted: 0,
    paused: 0,
    duration: '',
    startedAt: new Date(),
    pausedAt: null,
    stopedAt: null,
    finishedAt: null,
    createdAt: '',
    updatedAt: '',
  },
  orm = ormBase(model, interfaceModel);

export { model };

const service = {
  model: model,
  ...orm,
  ...{},
};

export default service;
