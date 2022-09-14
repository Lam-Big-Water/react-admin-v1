一.login页面

1.使用useNavigate，Navigate进行路由跳转

const history = useNavigate();

history("/admin",{replace:true});

<Navigate to="/admin/home"/>

2.使用redux connect进行数据共享

import { connect } from 'react-redux';

export default connect(
    state => ({isLogin:state.userInfo.isLogin}),
    {
        saveUserInfo:createSaveUserInfoAction,
    }
)(Login)

3.使用preventDefault()，阻止提交事件

4.创建redux action，将用户信息，taken，存入localStorage中

axios的post请求默认将参数转成json进而发送给服务器，如果需要转换为urlencoded，可以使用querystring

qs.stringify({username,password})

由于在比较新的node.js版本中已被弃用querystring，在名称上有所调整，功能基本没有太大变化， 将原来的querystring改为qs即可
![sum2](https://user-images.githubusercontent.com/106876072/190110683-5033e320-f9b5-42b2-b2d0-0f9603ffc530.jpg)
