import React,{useEffect} from 'react'
import {createDeleteUserInfoAction} from '../../redux/action_creators/login_action'
import {connect} from 'react-redux'
import {Navigate} from 'react-router-dom'
function Admin(props) {
    useEffect(()=>{
        console.log(props)
    })

    const logout = ()=>{
        props.deleteUserInfo()
    }
    const {user,isLogin} = props.userInfo
    if(!isLogin){
        console.log('no');
        return <Navigate to="/login"/>
    }else{
        console.log('ok');
        return (
            <div>
                <div>{user.username}</div>
                <button onClick={logout}>退出登录</button>
            </div>
        )
    }
    
}
// 如下代码中所有key是控制容器组件传递给UI组件的key
// 如下代码中所有value是控制容器组件传递给UI组件的value
export default connect(
    state => ({userInfo:state.userInfo}),
    {
        deleteUserInfo:createDeleteUserInfoAction
    }
)(Admin)