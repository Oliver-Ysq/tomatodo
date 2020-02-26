import React from 'react';
import { Input, Button, Icon } from 'antd';
import axios from '../../config/axios';
import { Link, withRouter } from 'react-router-dom';
import './signup.scss';

interface ISignUpState {
  account: string;
  password: string,
  passwordConformation: string;
}

class SignUp extends React.Component<any, ISignUpState> {//第一个参数是prop类型， 第二个参数是state类型
  constructor(props: any) {
    super(props);
    this.state = {
      account: '',
      password: '',
      passwordConformation: ''
    };
  }
  onChangeAccount = (e: any) => {
    this.setState({ account: e.target.value });
  };
  onChangePassword = (e: any) => {
    this.setState({ password: e.target.value });
  };
  onChangePasswordConformation = (e: any) => {
    this.setState({ passwordConformation: e.target.value });
  };
  submit = async () => {
    const { account, password, passwordConformation } = this.state;
    try {
      await axios.post('sign_up/user', {
        account,
        password,
        password_confirmation: passwordConformation
      });
      this.props.history.push('/');
    } catch (e) {
      throw new Error(e);
    }
  };
  render() {
    const { account, password, passwordConformation } = this.state;
    return (
      <div className="SignUp" id="SignUp">
        <h2>番茄闹钟 - 注册</h2>
        <Input
          placeholder="输入你的用户名"
          value={account}
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          onChange={this.onChangeAccount}
        />
        <Input.Password placeholder="请输入密码" value={password} onChange={this.onChangePassword} />
        <Input.Password placeholder="请再次输入密码" value={passwordConformation} onChange={this.onChangePasswordConformation} />
        <Button type="primary" className="signUpBtn" onClick={this.submit}> 注册</Button>
        <p>如果已有账号，请立即<Link to="/login">登录</Link></p>
      </div >
    );
  }
}
export default withRouter(SignUp);