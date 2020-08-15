import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import LayoutPrivate from './components/layouts/LayoutPrivate';
import LayoutPublic from './components/layouts/LayoutPublic';

import AppRedirect from './modules/shared/pages/AppRedirect';
// import SaveRouter from './modules/shared/containers/AppSaveRouter';
import Settings from './modules/task/pages/Settings';
import Tasks from './modules/task/pages/Tasks';
import TaskWrite from './modules/task/pages/TaskWrite';
import TaskWriteEdit from './modules/task/pages/TaskWriteEdit';
import CheckPoint from './modules/task/pages/CheckPoint';

import Focus from './modules/task/pages/Focus';
import Chat from './modules/auth-chat/pages/Chat';
import AuthLogout from './modules/auth-chat/pages/Logout';
import AuthChat from './modules/auth-chat';
import AuthEmail from './modules/auth/pages/Email';
import AuthPassword from './modules/auth/pages/Password';
import AuthPasswordConfirm from './modules/auth/pages/PasswordConfirm';
import AuthPhone from './modules/auth/pages/Phone';

export default function App() {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav> */}

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/auth-chat/logout">
            <AuthLogout />
          </Route>
          <Route path="/auth-chat">
            <Chat />
          </Route>
          {/* <Route path="/auth">
            <Auth />
          </Route> */}
          <Route
            path="/auth/email"
            render={({ history }) => (
              <LayoutPublic history={history}>
                <AuthEmail history={history} />
              </LayoutPublic>
            )}
          />
          <Route
            path="/auth/password"
            render={({ history }) => (
              <LayoutPublic history={history}>
                <AuthPassword history={history} />
              </LayoutPublic>
            )}
          />
          <Route
            path="/auth/password-confirm"
            render={({ history }) => (
              <LayoutPublic history={history}>
                <AuthPasswordConfirm history={history} />
              </LayoutPublic>
            )}
          />
          <Route
            path="/auth/phone"
            render={({ history }) => (
              <LayoutPublic history={history}>
                <AuthPhone history={history} />
              </LayoutPublic>
            )}
          />
          <Route
            path="/focus/:id"
            render={({ history }) => (
              <LayoutPrivate history={history}>
                <Focus />
              </LayoutPrivate>
            )}
          />
          <Route
            path="/tasks"
            render={({ history }) => (
              <LayoutPrivate history={history}>
                <Tasks />
              </LayoutPrivate>
            )}
          />
          <Route path="/task-write/:id">
            <TaskWriteEdit />
          </Route>
          <Route
            path="/task-write"
            render={({ history }) => (
              <LayoutPrivate history={history}>
                <TaskWrite />
              </LayoutPrivate>
            )}
          />
          <Route path="/checkpoint">
            <LayoutPrivate>
              <CheckPoint />
            </LayoutPrivate>
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          {/* <Route path="/check-point">
            <CheckPoint />
          </Route> */}
          <Route path="/">
            <AppRedirect />
          </Route>
          <AuthChat />
        </Switch>
      </div>
    </Router>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
