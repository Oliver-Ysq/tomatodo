import React, { Component } from 'react';
import { Dropdown, Icon, Menu } from 'antd';
import { withRouter } from 'react-router-dom';
import history from '../../config/history';
import axios from '../../config/axios';
import './Index.scss';
import Todos from '../Todos/Todos';

interface IIndexState {
  user: any;
}

const logout = () => {
  localStorage.setItem('x-token', '');
  history.push('/login');
};

const menu = (
  <Menu>
    <Menu.Item key="1">
      <Icon type="user" />
      个人设置
    </Menu.Item>
    <Menu.Item key="2" onClick={logout}>
      <Icon type="logout" />
      注销
    </Menu.Item>
  </Menu>
);


class Index extends Component<any, IIndexState> {

  constructor(props: any) {
    super(props);
    this.state = {
      user: ''
    };
  }

  async componentWillMount() {
    await this.getMe();
  }

  getMe = async () => {
    try {
      const response = await axios.get('me');
      this.setState({ user: response.data }
      );
      console.log(response);
    } catch (e) { }
  };

  render() {
    return (
      <div className="Index" id="Index">
        <header>
          <span className="logo">LOGO</span>
          <Dropdown overlay={menu}>
            <span>{this.state.user && this.state.user.account}
              <Icon type="down" style={{ marginLeft: 8 }} />
            </span>
          </Dropdown>
        </header>
        <main>
          <Todos />
        </main>
      </div>
    );
  }
}

export default withRouter(Index);