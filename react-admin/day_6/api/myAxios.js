import axios from "axios";
import {message} from 'antd'
import NProgress from 'nprogress'
import store from '../redux/store';
import {createDeleteUserInfoAction} from '../redux/action_creators/login_action'
import qs from 'qs'
// 获取token
// import store from '../redux/store'
import 'nprogress/nprogress.css'

const instance = axios.create({
    timeout: 4000,
})


// 请求拦截器
instance.interceptors.request.use((config) =>{
    // 进度条
    NProgress.start()
    // 在非容器组件获取redux之前保存的token
    // const {token} = store.getState().userInfo
    // console.log(token)
    // Authorization 公共请求头
    // 参数 atguigu + token
    // 向请求头中添加token 用于校验身份
    // if(token) config.headers.Authorization = 'atguigu' + token
    const {method,data} = config
    // 若是post请求
    if(method.toLowerCase() === 'post') {
        // 若传递过来的参数是对象
        if(data instanceof Object){
            config.data = qs.stringify(data)
        }
    }
    return config
})

// 响应拦截器
instance.interceptors.response.use(
    (response)=>{
        // 进度条
        NProgress.done()
        // 请求若成功，走这里
        return response.data;
    },
    (error) => {
        NProgress.done()
        // 当权限过期，或者401时，删除user信息，使其回到login获取最新的user信息
        if(error.response.status === 401) {
            message.error('身份校验失败，请重新登录',1)
            // this.props.deleteUserInfo()
            // 分发一个删除用户信息的action
            store.dispatch(createDeleteUserInfoAction())
        }else{
        // 请求若失败，走这里
        message.error(error.message,1)
        }
        // 中断promise链
        return new Promise(()=>{})
    }
);
export default instance