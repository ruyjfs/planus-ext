import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import LayoutPrivate from './components/layouts/LayoutPrivate';
import LayoutPublic from './components/layouts/LayoutPublic';

import Tasks from './modules/task/pages/Tasks';
import CheckPoint from './modules/task/pages/CheckPoint';
import Login from './modules/auth/pages/Login';
import Focus from './modules/task/pages/Focus';
import Auth from './modules/auth';

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
          <Route path="/auth">
            <Auth />
          </Route>
          <Route
            path="/login"
            render={({ history }) => (
              <LayoutPublic history={history}>
                <Login history={history} />
              </LayoutPublic>
            )}
          />
          <Route path="/focus">
            <Focus />
          </Route>
          {/* <Route path="/check-point">
            <CheckPoint />
          </Route> */}
          <Route path="/">
            {/* <Tasks /> */}
            <CheckPoint />
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
