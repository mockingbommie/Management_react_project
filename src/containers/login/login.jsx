import React,{Component} from 'react'
import { Form, Input, Button,message} from 'antd';
import {connect} from 'react-redux'
import {createSaveUserInfoAction} from '../../redux/action_creators/login_action'
import {reqLogin} from '../../api/indux'
import './css/login.less'
import logo from './imges/logo.png'
import { RocketOutlined, LockOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router-dom';



class Login extends Component{
  onFinishFailed = (errorInfo) => {
    console.log('表单输入有误，请检查！', errorInfo);
  };

  //点击登录按钮的回调
  onFinish = (async(values)=>{
    // event.preventDefault();//阻止默认事件--禁止form表单提交---通过ajax发送
    // this.props.form.validateFields((values) => {
      // console.log('向服务器发送登录请求')
      // if(!err){
        console.log('向服务器发送登录请求')
        const{username,password}=values
        /*
        reqLogin(username,password)
        .then((result)=>{
          console.log(result);
        })
        .catch((reason)=>{
          console.log(reason);
        })
        */
       let result = await reqLogin(username,password)
       console.log(result)
       const {status,msg,data}=result.data
       if (status === 0){
        console.log(data);
        //服务器返回的user和toooken交给redux
        this.props.saveUserInfo(data);
        //跳转admin
        this.props.history.replace('/admin')
       }
       else message.warning(msg,1)
      });



//密码的验证器---每当在密码输入框输入东西后，都会调用此函数去验证输入是否合法。自定义校验，即：自己写判断
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
}
  render(){
    const{isLogin}=this.props;
    if(isLogin) return <Redirect to ="/admin"/>
    return(
      <div className="login">
          <header>``
              <img src={logo} alt="logo" />
              <h1>{this.props.test}</h1>
          </header>
          <section>
            <h1>login</h1>
            <Form
              // onSubmit={this.handleSubmit}
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
             >
              <Form.Item
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

export default connect(
  state => ({userInfo:state.userInfo}),
  {
    saveUserInfo:createSaveUserInfoAction,
  }
)(Login)
