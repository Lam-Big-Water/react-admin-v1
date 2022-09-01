// react hooks API
import React,{useEffect} from 'react'
import { Layout } from 'antd';
// redux action 方法
import {createDeleteUserInfoAction} from '../../redux/action_creators/login_action'
// 接口
import { reqCategoryList } from '../../api'
import {connect} from 'react-redux'
// react-router-dom@6
import {Navigate} from 'react-router-dom'
import './css/Admin.less'
import Header from './Header/Header';


const { Footer, Sider, Content } = Layout;

function Admin(props) {
    // 获取当前组件的props
    useEffect(()=>{
        console.log(props)
    })
    // 点击退出登录
    const logout = ()=>{
        props.deleteUserInfo()
    }
    const demo = async()=>{
        let result = await reqCategoryList()
        console.log(result)
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
                <Layout className='admin'>
                    <Sider className='sider'>Sider</Sider>
                    <Layout>
                        <Header className='header'>Header</Header>
                        <Content className='content'>Content</Content>
                        <Footer className='footer'>Footer</Footer>
                    </Layout>
                </Layout>
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