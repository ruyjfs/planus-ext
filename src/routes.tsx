import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import LayoutPrivate from './components/layouts/LayoutPrivate';
import LayoutPublic from './components/layouts/LayoutPublic';

import AppRedirect from './modules/shared/pages/AppRedirect';
// import SaveRouter from './modules/shared/containers/AppSaveRouter';
import Config from './modules/task/pages/Config';
import Tasks from './modules/task/pages/Tasks';
import TaskWrite from './modules/task/pages/TaskWrite';
import TaskWriteEdit from './modules/task/pages/TaskWriteEdit';
import CheckPoint from './modules/task/pages/CheckPoint';

import Focus from './modules/task/pages/Focus';
import Auth from './modules/auth';
import AuthEmail from './modules/auth/pages/Email';
import AuthPassword from './modules/auth/pages/Password';
import AuthPasswordConfirm from './modules/auth/pages/PasswordConfirm';
import AuthPhone from './modules/auth/pages/Phone';
import AuthLogout from './modules/auth/pages/Logout';

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
            path="/auth/logout"
            render={({ history }) => (
              <LayoutPublic history={history}>
                <AuthLogout history={history} />
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
          <Route
            path="/checkpoint"
            render={({ history }) => (
              <LayoutPrivate history={history}>
                <CheckPoint />
              </LayoutPrivate>
            )}
          />
          <Route path="/config">
            <Config />
          </Route>
          {/* <Route path="/check-point">
            <CheckPoint />
          </Route> */}
          <Route path="/">
            <AppRedirect />
          </Route>
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
