import { message } from "antd";
import axios from "axios";
import qs from 'querystring'
import store from "../redux/store";

const instance=axios.create({
  timeout:4000,
});

// 请求拦截器
axios.interceptors.request.use((config)=>{ //config包含所有的信息
//从redux里获取tokken---没有容器组件时 从store里拿 
  const {token} = store.getState().userInfo
  // 像请求头中添加token 用于校验身份
  if(token) {
    config.headers.Authorization='LHR_'+token
  }
  console.log(token);
  //从配置对象中获取method和data
  const {method,data} =config
    //若是post请求  （get本身就是urlencoded）
  if(method.toLowerCase==='post'){
    //若传递过来的参数是对象，转换成urlencoded形式 
    if(data instanceof Object){
      config.data=qs.stringify(data)
    }
  }
    return config;
  });

// 响应拦截器
axios.interceptors.response.use((response)=>{
  //成功
    return response;
  }, 
  (error)=>{ 
    //失败
    message.error(error.message,1)
    //中断promise链 用new promise
    return new Promise(()=>{})
  });
  export default instance