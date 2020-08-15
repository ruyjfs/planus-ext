import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import AppRedirect from '../shared/pages/AppRedirect';
import Chat from './pages/Chat';
export default () => {
  return (
    <>
      <Route path="/auth-chat">
        <Chat />
      </Route>
    </>
  );
};
