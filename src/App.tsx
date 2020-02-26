import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Index from './components/Index/Index';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';

class App extends Component {
  render() {
    return (
      <Router>
        <div>

          {/* <nav>
          <ul>
            <li>
              <Link to="/">index</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav> */}

          <Switch>
            {/* 首页 */}
            <Route exact={true} path="/">
              <Index></Index>
            </Route>

            <Route path="/login">
              <Login></Login>
            </Route>

            <Route path="/signUp">
              <SignUp ></SignUp>
            </Route>

          </Switch>

        </div>
      </Router>

    );
  }
}

export default App;