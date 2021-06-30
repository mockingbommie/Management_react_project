// import myAxios from './myAxios'
// import {BASE_URL} from '../config/indux'

// //登录请求
// export const reqLogin=(username,password)=>myAxios.post('${BASE_URL}/login',{username,password})



//引入我们自定义的myAxios
import myAxios from './myAxios'
//引入请求的基本路径
import {BASE_URL} from '../config/indux'

//发起登录请求
export const reqLogin = (username,password)=> myAxios.post(`${BASE_URL}/login`,{username,password})
    //values的值是{username:XXXX,password:yyyy}
//发起商品列表请求   
export const reqCategoryList=()=>myAxios.get(`${BASE_URL}/manage/category/list`)