import React,{Component} from 'react'
import './css/login.less'
import logo from './imges/logo.png'
import { Form, Input, Button} from 'antd';
import { RocketOutlined, LockOutlined } from '@ant-design/icons';

export default class Login extends Component{

  onFinish = (values) => {
    console.log('Received values of form: ', values);
    alert('up');
  };
  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  pwdValidator=(rule, value)=>{
    //输入函数体
    if (!value){
      return Promise.reject(new Error('密码必须输入'));
  }else if(value.length<4){
    return Promise.reject(new Error('密码不能少于4位'));
  }else if(value.length>12){
    return Promise.reject(new Error('密码不能多于12位'));
  }else if(!/^\w+$/){
    return Promise.reject(new Error('密码必须是数字字母下划线'));
  }else{
    return Promise.resolve();
  }
};
  render(){
    return(
      <div className="login">
          <header>
              <img src={logo} alt="logo" />
              {/* <h1></h1> */}
          </header>
          <section>
            <h1>login</h1>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
             >
              <Form.Item
              /*
              用户名/密码的的合法性要求
                1). 必须输入
                2). 必须大于等于4位
                3). 必须小于等于12位
                4). 必须是英文、数字或下划线组成
              */
              name="username"
              rules={[
                //声明式
                {required: true,message: '请输入用户名!'},
                {min:4,message: '用户名不能少于4位!'},
                {max:12,message: '用户名不能多于12位!'},
                {pattern:/^\w+$/,message: '用户名必须是字母，数字，下划线组成'},
              ]}
              >
              <Input 
              prefix={<RocketOutlined className="site-form-item-icon" />} 
              placeholder="Username" />
              </Form.Item>
              <Form.Item
              name="password"
              rules={[
                //自定义
                {validator:this.pwdValidator},
              ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />

              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>
              </Form.Item>
            </Form>
   
          </section>
      </div>
    )
   }

  }