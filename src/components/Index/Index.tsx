import React, { Component } from 'react';
import { Button } from 'antd';
import { Link, withRouter } from 'react-router-dom';

class Index extends Component {

  login = () => {
    console.log(this.props);
  };
  render() {
    return (
      <div>
        <Button onClick={this.login}><Link to="/login">登录</Link></Button>
      </div>
    );
  }
}
export default Index;