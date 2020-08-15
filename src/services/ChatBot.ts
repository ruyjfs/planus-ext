import _ from 'lodash';

export interface Step {
  id: string;
  text: string;
  input?: {
    name: string;
    type: string;
    placeholder: string;
  };
  onSubmitName?: string;
  nextId?: string;
}

const helpers = {
  getTextRandom(text: any) {
    if (text && typeof text !== 'string') {
      let test = Math.floor(Math.random() * text.length);
      return text[test];
    }
    return text;
  },
  validateEmailRegex(mail: string) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  },
};

export default class ChatBot {
  steps: any;
  current: any;
  responses: any;
  stepsId: any;

  constructor(steps: any) {
    this.steps = steps;
    this.responses = {};
    this.stepsId = _.keys(steps);
    this.current = {};

    _.values(this.steps)
      .filter((value) => value.input)
      .map((value) => {
        this.responses[value.id] = '';
        return value;
      });
  }

  validate(value: string) {
    return {
      email: () => {
        if (!value) {
          return {
            status: false,
            message: 'Ops.. Falta o seu email!',
          };
        }

        if (!helpers.validateEmailRegex(value) || value.length < 10) {
          return {
            status: false,
            message: 'Esse não é o seu email, é?',
          };
        }

        return { status: true, message: '' };
      },
      password: () => {
        if (!value) {
          return {
            status: false,
            message: 'Ops.. Falta informar a sua senha.',
          };
        }

        if (value.length < 6) {
          return {
            status: false,
            message: 'A sua senha é muito pequena, informe uma maior..',
          };
        }

        return { status: true, message: '' };
      },
    };
  }

  talk(id = '') {
    if (!this.current.id) {
      this.current = id === '' ? _.values(this.steps)[0] : this.steps[id];
    }
    return this.getTextRandom(this.current.text);
  }

  next(nextId = '') {
    if (nextId) {
      this.current = this.steps[nextId];
      return this.current;
    }

    this.current = this.steps[this.current.nextId];
    return this.current;
  }

  setResponse(id: string, value: string) {
    this.responses[id] = value;
  }

  getReply() {
    if (this.current.reply) {
      return this.getTextRandom(this.current.reply);
    }
  }

  getTextRandom(text: any) {
    if (text && typeof text !== 'string') {
      let test = Math.floor(Math.random() * text.length);
      return text[test];
    }
    return text;
  }
}
