import React, { Component } from 'react';
import { Button } from 'antd';
import { withRouter } from 'react-router-dom';
import axios from '../../config/axios';


interface IIndexState {
  user: any;
}

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
  logout = () => {
    localStorage.setItem('x-token', '');
    this.props.history.push('/login');
  };
  getMe = async () => {
    try {
      const response = await axios.get('me');
      this.setState({ user: response.data });
    } catch (e) { }
  };

  render() {
    return (
      <div>
        <p>欢迎，{this.state.user.account}</p>
        <Button onClick={this.logout}>登出</Button>
      </div>
    );
  }
}
export default withRouter(Index);