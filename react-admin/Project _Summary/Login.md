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
