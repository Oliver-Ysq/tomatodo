import React from 'react';
import { Input, Button, Icon } from 'antd';
import axios from '../../config/axios';
import { Link, withRouter } from 'react-router-dom';
import './login.scss';

interface ILoginState {
  account: string;
  password: string,
}

class Login extends React.Component<any, ILoginState> {//第一个参数是prop类型， 第二个参数是state类型
  constructor(props: any) {
    super(props);
    this.state = {
      account: '',
      password: '',
    };
  }
  onChangeAccount = (e: any) => {
    this.setState({ account: e.target.value });
  };
  onChangePassword = (e: any) => {
    this.setState({ password: e.target.value });
  };

  submit = async () => {
    const { account, password } = this.state;
    try {
      await axios.post('sign_in/user', {
        account,
        password,
      });
      this.props.history.push('/');
    } catch (e) {
      throw new Error(e);
    }
  };
  render() {
    const { account, password } = this.state;
    return (
      <div className="Login" id="Login">
        <h2>番茄闹钟 - 登录</h2>
        <Input
          placeholder="输入你的用户名"
          value={account}
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          onChange={this.onChangeAccount}
        />
        <Input.Password placeholder="请输入密码" value={password} onChange={this.onChangePassword} />
        <Button type="primary" className="loginBtn" onClick={this.submit}> 登录</Button>
        <p>如果没有账号，请立即<Link to="/signUp">注册</Link></p>
      </div >
    );
  }
}
export default withRouter(Login);