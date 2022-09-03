// react hooks API
import React,{useEffect} from 'react'
import { Layout } from 'antd';
// redux action 方法
import {createDeleteUserInfoAction} from '../../redux/action_creators/login_action'
// 接口
import { reqCategoryList } from '../../api'
import {connect} from 'react-redux'
// react-router-dom@6
import {Navigate,Route,Routes} from 'react-router-dom'
import './css/Admin.less'
import Header from './Header/Header';
import Home from '../../components/Home/Home'
import LeftNav from './Left_Nav/Left_Nav';
import Category from '../Category/Category'
import Product from '../Product/Product'
import User from '../User/User'
import Role from '../Role/Role'
import Bar from '../Bar/Bar'
import Line from '../Line/Line'
import Pie from '../Pie/Pie'


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
    const {isLogin} = props.userInfo
    // 判断，如果isLogin为false，跳转到登录页面
    if(!isLogin){
        console.log('no');
        return <Navigate to="/login"/>
    }else{
        console.log('ok');
        return (
                <Layout className='admin'>
                    <Sider className='sider'><LeftNav/></Sider>
                    <Layout>
                        <Header className='header'>Header</Header>
                        <Content className='content'>
                            <Routes>
                                <Route path="/home" element={<Home/>}/>
                                <Route path="/prod_about/category" element={<Category/>}/>
                                <Route path="/prod_about/product" element={<Product/>}/>
                                <Route path="/user" element={<User/>}/>
                                <Route path="/role" element={<Role/>}/>
                                <Route path="/charts/bar" element={<Bar/>}/>
                                <Route path="/charts/line" element={<Line/>}/>
                                <Route path="/charts/pie" element={<Pie/>}/>
                                <Route path="/" element={<Navigate to="/admin/home"/>}/>
                            </Routes>
                        </Content>
                        <Footer className='footer'>推荐使用google，获取最佳用户体验</Footer>
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