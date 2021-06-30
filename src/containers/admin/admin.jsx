import React,{Component} from 'react'
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import {Layout} from 'antd'
import {deleteSaveUserInfoAction} from '../../redux/action_creators/login_action'
import {reqCategoryList} from '../../api/indux'
import './css/admin.less'
import Header from './header/header' //没有{}


const {Footer, Sider, Content } = Layout;


class Admin extends Component{
  // componentDidMount(){
  //  console.log(this.props)
  // }

  //退出登录的回调
  logout=()=>{
  //触发redux删除所保存的用户信息
  this.props.deleteUserInfo()
  }  
  demo=async()=>{
   let result=await reqCategoryList()
   console.log(result);
  }

  //在render里，若想实现跳转，最好用<Redirect>
  render(){
  //从redux中获取user和isLogin
    const{user,isLogin}=this.props.userInfo
  //判断用户是否登录，若未登录跳转login页面
    if(!isLogin) return <Redirect to="/login"/>
    else{
      console.log('登陆了');
      return(
        <Layout className="admin">
          <Sider className="sider">Sider</Sider>
          <Layout>
            <Header>Header</Header>
            <Content className="content">Content</Content>
            <Footer className="footer">Footer</Footer>
          </Layout>
        </Layout>
      )
    }
   }
}

//如下代码中的所有key是控制容器组件传递给UI组件的key
//如下代码中的所有value是控制容器组件传递给UI组件的value
export default connect(  //通过connect方法与redux交互
  //函数返回一个对象
  state => ({userInfo:state.userInfo}),   //获取状态  在reducers
  {
    deleteUserInfo:deleteSaveUserInfoAction,  //获取操作状态的方法 在action
  } 
)(Admin)