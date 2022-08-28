// react hooks API
import React,{useEffect} from 'react'
// redux action 方法
import {createDeleteUserInfoAction} from '../../redux/action_creators/login_action'
import {connect} from 'react-redux'
// react-router-dom@6
import {Navigate} from 'react-router-dom'
function Admin(props) {
    // 获取当前组件的props
    useEffect(()=>{
        console.log(props)
    })
    // 点击退出登录
    const logout = ()=>{
        props.deleteUserInfo()
    }
    // 在props中获取对应的数据
    const {user,isLogin} = props.userInfo
    // 判断，如果isLogin为false，跳转到登录页面
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

// 在redux中获取对应的数据，并使用删除用户信息action
export default connect(
    state => ({userInfo:state.userInfo}),
    {
        deleteUserInfo:createDeleteUserInfoAction
    }
)(Admin)