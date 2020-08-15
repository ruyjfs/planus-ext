import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Users from '../../../services/firebase/Users';
import Auth from '../../../services/firebase/Auth';
import Types from '../../../redux/reducers/types';

import './Chat.css';
import ChatList from '../components/ChatList';
import ChatForm from '../components/ChatForm';

import ChatBot from '../../../services/ChatBot';

import STEPS from '../data/steps.json';
import PACKAGE_JSON from '../../../../package.json';

interface Message {
  me: boolean;
  text: any;
  item: any;
}

interface DynamicIndice {
  [state: string]: any;
}

export default () => {
  const auth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  let history = useHistory();
  const [list, setList]: any = useState([]);
  const [typing, setTyping]: any = useState(false);
  const [showInput, setShowInput]: any = useState(false);
  const [steps, setSteps] = useState(STEPS);
  const [value, setValue] = useState('');
  const [form, setForm]: any = useState({});
  const [user, setUser]: any = useState({});
  const [bot, setBot] = useState(new ChatBot(STEPS));
  const [current, setCurrent]: any = useState({
    me: false,
    text: [],
    input: {
      name: '',
      type: '',
      placeholder: '',
    },
  });

  async function onTyping(text: string) {
    setTyping(true);
    await new Promise((resolve) => setTimeout(resolve, text.length * 30));
    setTyping(false);
  }

  async function addMessage(text: string, me = false, item: any = {}) {
    let params = {
      text: bot.getTextRandom(text),
      me: me,
      item: item,
    };

    if (me) {
      setList((list: Message[]) => [...list, params]);
      return true;
    }
    await onTyping(params.text);
    setList((list: Message[]) => [...list, params]);
    return true;
  }

  async function botAction() {
    await addMessage(bot.talk());
    if (!bot.current.input && bot.current.nextId) {
      bot.next();
      botAction();
      return true;
    }

    setCurrent(bot.current);
  }

  useEffect(() => {
    botAction();
  }, []);

  async function userAuthentication(email: string, password: string) {
    addMessage(
      bot.getTextRandom([
        'Calma ai...',
        'Só um estante...',
        'Aguenta mão ai haha...',
      ])
    );
    const login = await Auth.login(email, password);
    if (login.status) {
      let userAuth: any = await Auth.user();
      const user = await Users.getByEmail(userAuth.email);
      let newData = user;
      newData.uid = userAuth.uid;
      newData.emailVerified = userAuth.emailVerified;
      dispatch({
        type: Types.AUTH.ADD,
        payload: newData,
      });
      await Users.save(newData, newData.id);
      return redirectToMain();
    }
  }

  async function redirectToMain() {
    await addMessage('Seja muito bem vindo, entre e sinta-se à vontade!');
    setTimeout(() => {
      // return navigation.navigate('App', {screen: 'Publication'});
      history.push(`/checkpoint`);
    }, 5000);
  }

  let submitForm: DynamicIndice = {
    onSubmitEmail: async (text: string) => {
      if (text) {
        await addMessage(text, true, bot.current);
        bot.setResponse(bot.current.id, text);
      }
      let validate = bot.validate(text).email();
      if (validate.status === false) {
        return await addMessage(validate.message);
      }

      const userDb = await Users.getByEmail(text);
      if (userDb) {
        setUser(userDb);
        await addMessage(bot.getReply());
        bot.next('password');
      } else {
        await addMessage('Legal.. Prazer em te conhecer!');
        await addMessage(`Eu me chamo Planus!`);
        bot.next();
      }

      setValue('');
      return botAction();
    },
    onSubmitPassword: async (text: string) => {
      await addMessage('******', true);
      let validate = bot.validate(text).password();
      if (validate.status === false) {
        return await addMessage(validate.message);
      }

      bot.setResponse(bot.current.id, text);
      if (user.uid) {
        return userAuthentication(bot.responses.email, bot.responses.password);
      }
      setValue('');
      bot.next();
      return botAction();
    },
    onSubmitEnd: async (text: string) => {
      await addMessage(text, true);
      setValue('');
      bot.setResponse(bot.current.id, text);
      addMessage(bot.getReply().replace('::value::', value));

      const signup = await Auth.signup(
        bot.responses.email,
        bot.responses.password
      );
      if (signup.status) {
        let user = await Auth.user();
        if (!user) {
          console.log('Ops.. Usuario nao se registrou por algum motivo...');
          return false;
        }

        let userNew = bot.responses;
        if (userNew.password) {
          delete userNew.password;
        }
        userNew.email = user.email;
        userNew.emailVerified = user.emailVerified;
        userNew.uid = user.uid;
        // userNew.phoneNumber = user.phoneNumber;
        // userNew.displayName = user.displayName;
        userNew.platform = 'chrome';
        userNew.version = PACKAGE_JSON.version;

        addMessage(
          bot.getTextRandom([
            'Calma ai...',
            'Só um estante...',
            'Aguenta mão ai haha...',
          ])
        );
        userNew.id = await await Users.save(userNew);
        await addMessage('Cadastro realizado com sucesso.');
        // messaging().subscribeToTopic(`user-${userNew.id}`);
        dispatch({
          type: Types.AUTH.ADD,
          payload: userNew,
        });
        return redirectToMain();
      }

      if (signup.error.code === 'auth/email-already-in-use') {
        addMessage('Ops.. Parece que você já está cadastrado.');
      }
    },
  };

  async function onSubmit(value: any) {
    if (bot.current.onSubmitName) {
      if (submitForm[bot.current.onSubmitName]) {
        return submitForm[bot.current.onSubmitName](value);
      }
      console.log('Nao encontrou metodo de submit');
      return false;
    }

    addMessage(value, true, bot.current);
    bot.setResponse(bot.current.id, value);
    setValue('');
    await addMessage(bot.getReply().replace('::value::', value));
    bot.next();
    await botAction();
  }

  async function onEdit(item: any) {
    bot.next(item.item.id);
    setCurrent(bot.current);
    await addMessage(
      bot.getTextRandom([
        'Vamos voltar!',
        'Voltemos haha...',
        'Não tem problema a gente volta!',
      ])
    );
    botAction();
  }

  return (
    <Container>
      <ChatForm
        config={current?.input}
        show={true}
        onSubmit={onSubmit}
        value={value}
        setValue={setValue}
      />
      <ChatList list={list} typing={typing} onEdit={onEdit} />
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  justify-content: flex-end;
  flex-direction: column;
  min-width: 100%;
  margin: 10px;
  display: flex;
  align-items: flex-end;
  min-width: 290px;
  /* min-height: 400px; */
`;
