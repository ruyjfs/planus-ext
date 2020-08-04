import React, { useState, useEffect } from 'react';
import { Button, Fade } from '@material-ui/core';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import InputText from '../../../components/InputText';
import AppInputText from '../../shared/components/AppTextInput';

// import { format, compareAsc } from 'date-fns'
// import { formatDistance, subDays } from 'date-fns';
import TypesReducer from '../../../redux/reducers/types';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/pt-br';
import { intersectionBy } from 'lodash';

import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';

const LinkBehavior = React.forwardRef<any, Omit<RouterLinkProps, 'to'>>(
  (props, ref) => (
    <RouterLink ref={ref} to="/getting-started/installation/" {...props} />
  )
);

dayjs.extend(utc);

export default () => {
  const dispatch = useDispatch();
  const checkPoint = useSelector((state: any) => state.app.checkPoint);
  const settings = useSelector((state: any) => state.app.settings);
  const timeForDay = useSelector((state: any) => state.app.settings.timeForDay);

  const [total1, setTotal1] = useState('');
  const [total2, setTotal2] = useState('');
  const [total3, setTotal3] = useState('');
  const [totalTimeLunch, setTotalTimeLunch] = useState('');
  const [totalTimeLunchMinutes, setTotalTimeLunchMinutes] = useState(0);
  const [endPrevision, setEndPrevision] = useState('');
  const [form, setForm] = React.useState({
    value1: '',
    value2: '',
    value3: '',
    value4: '',
  });

  async function pushNotification() {
    // let promise = await Notification.requestPermission();
    // console.log(promise);
    //   if (Notification.permission == 'granted') {
    //     navigator.serviceWorker.getRegistration().then(function (reg) {
    //       reg.showNotification('Hello world!');
    //     });
    //   }
    // navigator.serviceWorker.ready.then(function (registration) {
    //   console.log('terminou');
    //   registration.showNotification('Vibration Sample', {
    //     body: 'Buzz! Buzz!',
    //     icon: '../images/touch/chrome-touch-icon-192x192.png',
    //     vibrate: [200, 100, 200, 100, 200, 100, 200],
    //     tag: 'vibration-sample',
    //   });
    // });
    // navigator.serviceWorker.getRegistration().then(function (reg: any) {
    //   var options = {
    //     body: 'self.form.text',
    //     icon: 'favicon.ico',
    //     vibrate: [100, 50, 100],
    //     data: {
    //       dateOfArrival: Date.now(),
    //       primaryKey: 1,
    //     },
    //     actions: [
    //       {
    //         action: 'explore',
    //         title: 'Explore this new world',
    //         icon: 'images/checkmark.png',
    //       },
    //       {
    //         action: 'close',
    //         title: 'Close notification',
    //         icon: 'images/xmark.png',
    //       },
    //     ],
    //   };
    //   console.log(reg);
    //   // reg.showNotification('Aviso!', options);
    // });
  }

  useEffect(() => {
    // pushNotification();
  }, []);

  useEffect(() => {
    // This will send the #someSelector value to popup
    // console.log(window.chrome.runtime.id, 'ÍD');
    window.chrome?.runtime.sendMessage('dkaagkdinghogdefbehebocjapbpdmdo', {
      type: 'OPEN',
      configData: 'SSSS',
    });

    if (checkPoint) {
      setForm({
        value1: checkPoint.value1,
        value2: checkPoint.value2,
        value3: checkPoint.value3,
        value4: checkPoint.value4,
      });
      calculate(checkPoint);
    }

    // window.chrome.runtime.onMessage.addListener(
    //   (message, sender, sendResponse) => {
    //     if (message.type === 'OYO_PLUGIN_EVALUATED_CONFIG') {
    //       // this.setState({
    //       //   configData: message.configData
    //       // });
    //     }
    //     console.log(message.configData, '789');
    //   }
    // );

    // window.chrome.runtime.onMessage?.addListener(
    //   (message, sender, sendResponse) => {
    //     if (message.type === 'OYO_PLUGIN_EVALUATED_CONFIG') {
    //       console.log(message.configData, 'LL');
    //       // this.setState({
    //       //   configData: message.configData,
    //       // });
    //     }
    //   }
    // );
  }, []);

  const onChange = (name: any) => (event: any) => {
    // console.log(name, event.target.value.replace(/\D/g, ''));
    let formNew = { ...form, [name]: event.target.value };

    if (event.target.value.replace(/\D/g, '').length === 4) {
      dispatch({
        type: TypesReducer.APP.CHECKPOINT_ADD,
        payload: formNew,
      });
      // dispatch({
      //   type: TypesReducer.APP.ADD,
      //   payload: { checkPoint: formNew },
      // });
    }
    setForm(formNew);
    calculate(formNew);
  };

  function calculate(formNew: any) {
    console.log(settings, '<<--');
    if (
      formNew.value1.replace(/\D/g, '').length >= 4 &&
      formNew.value2.replace(/\D/g, '').length >= 4 &&
      formNew.value3.replace(/\D/g, '').length >= 4
    ) {
      let value1 = formNew.value1.replace(/\D/g, '');
      let value2 = formNew.value2.replace(/\D/g, '');
      let value3 = formNew.value3.replace(/\D/g, '');
      let value4 = formNew.value4.replace(/\D/g, '');

      let start1 = dayjs(`2018-05-16 ${value1}`);
      let end1 = dayjs(`2018-05-16 ${value2}`);
      let diff1 = end1.diff(start1);
      let f1 = dayjs.utc(diff1).format('HH[h]mm');

      let start2 = dayjs(`2018-05-16 ${value3}`);
      let end2 = dayjs(`2018-05-16 ${value4}`);
      let diff2 = end2.diff(start2);
      let f2 = dayjs.utc(diff2).format('HH[h]mm');

      let sumHour = parseInt(f1.split('h')[0]) + parseInt(f2.split('h')[0]);
      let sumMinute = parseInt(f1.split('h')[1]) + parseInt(f2.split('h')[1]);

      let startSum = start1.add(sumHour, 'hour').add(sumMinute, 'minute');
      let diff3 = dayjs.utc(startSum.diff(start1)).format('HH[h]mm');

      let timeLunch = dayjs.utc(start2.diff(end1)).format('HH[h]mm');

      if (timeLunch) {
        setTotalTimeLunchMinutes(
          parseInt(timeLunch.split('h')[0]) * 60 +
            parseInt(timeLunch.split('h')[1])
        );
      }
      setTotalTimeLunch(timeLunch);

      // 8h45 - hora1 = hora restante + hora almoco  = hora final
      let timeForDayHour = 8;
      let timeForDayMinute = 45;
      if (settings) {
        timeForDayHour = parseInt(settings.timeForDay.split('h')[0]);
        timeForDayMinute = parseInt(settings.timeForDay.split('h')[1]);
      }
      let horaTotal = start1
        .add(timeForDayHour, 'hour')
        .add(timeForDayMinute, 'minute')
        .add(parseInt(timeLunch.split('h')[0]), 'hour')
        .add(parseInt(timeLunch.split('h')[1]), 'minute')
        .format('HH[h]mm');
      setEndPrevision(horaTotal);

      setTotal1(f1);
      setTotal2(f2);
      if (value4) {
        setTotal3(diff3);
      } else {
        setTotal3('');
      }
    } else {
      setTotal3('');
    }
  }

  function getColor() {
    let times = total3.split('h');

    if (
      parseInt(times[0]) < 8 ||
      (parseInt(times[0]) === 8 && parseInt(times[1]) < 45)
    ) {
      return '#ffbe00';
    }

    return total3 === '08h45' ? '#adff2f' : 'red';
    // #ffe100
  }

  return (
    <>
      {/* <header className="App-header"> */}
      <Text>Expediente: {timeForDay}</Text>
      <AppInputText
        placeholder="Entrada"
        value={form.value1}
        onChange={onChange('value1')}
        type="outline"
        mask="99h99"
      />
      <AppInputText
        placeholder="Almoço - Saída"
        value={form.value2}
        onChange={onChange('value2')}
        type="outline"
        mask="99h99"
      />
      <AppInputText
        placeholder="Almoço - Entrada"
        value={form.value3}
        onChange={onChange('value3')}
        type="outline"
        mask="99h99"
      />
      <AppInputText
        placeholder="Saída"
        value={form.value4}
        onChange={onChange('value4')}
        type="outline"
        mask="99h99"
      />
      <div>
        {total1} + {total2} = <b style={{ color: getColor() }}>{total3}</b>
      </div>
      <div>
        Almoço:{' '}
        <b>
          {totalTimeLunch} ({totalTimeLunchMinutes}min)
        </b>
      </div>
      <div>
        Previsão: <b style={{ color: '#adff2f' }}>{endPrevision}</b>
      </div>
      {/* <Button color="primary">Hello World</Button> */}
      {/* <ContainerButton>
        <Button
          variant="outlined"
          color="primary"
          to="/focus"
          component={RouterLink}
        >
          Focar
        </Button>
      </ContainerButton> */}

      {/* <a
          className="App-link"
          href="https://ruyjfs.com"
          target="_blank"
          rel="Link para o site do ruy"
        >
          Ruyjfs
        </a> */}
      {/* </header> */}
    </>
  );
};

const Text = styled.div`
  margin: 5px 0;
`;

const Container = styled.div`
  /* max-width: 150px; */
`;

const ContainerButton = styled.div`
  margin: 10px;
`;
