import React,{useState,useEffect} from 'react'
import {Button,Modal} from 'antd'
import {FullscreenOutlined,FullscreenExitOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
import screenfull from 'screenfull/dist/screenfull';
import {useLocation} from 'react-router-dom'
import {connect} from 'react-redux'
import dayjs from 'dayjs';
import {createDeleteUserInfoAction} from '../../../redux/action_creators/login_action'
import './Header.less'
import { reqWeather } from '../../../api';
import menu_List from '../../../config/menu_config'



function Header(props) {
    // header 实时
    const [date,setTime] = useState(dayjs().format('YYYY年 MM月 DD日 HH:mm:ss'))
    // 全屏插件
    const [isFull,setScreen] = useState(false)
    // header 天气
    const [weatherInfo,setWeatherInfo] = useState({})
    // 获取当前路径
    const location = useLocation()
    // 获取title参数 配合 getTitle 将参数转变成中文
    let [title,setTitle] = useState('')



    useEffect(()=>{
        // screenFull绑定监听
        screenfull.on('change',()=>{
            setScreen(isFull => !isFull)
        })
        // 时间
        let timeID = setInterval(()=>{
            setTime(dayjs().format('YYYY年 MM月 DD日 HH:mm:ss'))
        },1000)
        // 天气
        getWether()
        // title
        getTitle()
        return ()=>{
            // 清除时间定时器
            clearInterval(timeID)
        }
                //eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // 点击退出登录的回调
    const fullScreen = () =>{
        screenfull.toggle()
    }

    // 弹窗
    const confirm = () => {
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: '请再次确认是否退出!',
            okText: '确认',
            cancelText: '取消',
        onOk:() =>{
            // 退出登录回调
            props.deleteUser()
        }
    });
};
    // 获取天气的回调
    const getWether = async()=>{
        let weather = await reqWeather()
        setWeatherInfo(weather)
    }
    // 获取title的回调
    const getTitle = ()=>{
        console.log('getTitle')
        // 获取当前路径参数
        let pathKey = location.pathname.split('/').pop()
        console.log(pathKey)
        // 遍历出menu_List里面的数组，
        menu_List.forEach((item)=>{
            if(item.children instanceof Array){
                // 有数组，则遍历数组里面的参数是否与路径参数吻合
                let tmp = item.children.find((citem)=>{
                    return citem.key === pathKey
                })
                if(tmp) title = tmp.title
            }else{
                // 没有数组，则判断路径参数与menu_List的参数是否吻合
                if(pathKey === item.key) title = item.title
            }
        })
        setTitle(title)
    }

    let {user} = props.userInfo
    return (
        <header className='header'>
            <div className='header-top'>
                <Button size='small' onClick={fullScreen}>
                    {isFull ? <FullscreenOutlined/> : <FullscreenExitOutlined/>}
                </Button>
                <span className='username'>Welcome,{user.username}</span>
                <Button onClick={confirm}>退出登录</Button>
            </div>
            <div className='header-bottom'>
                <div className='header-bottom-left'>
                    {/* 第一个title由redux中获取，当用户刷新时，redux保存的信息将被清除，这时我们调用getTitle方法获取信息 */}
                { props.title || title}
                </div>
                <div className='header-bottom-right'>
                    {date}
                    {weatherInfo.weather} 温度: {weatherInfo.temperature}
                </div>
            </div>
        </header>
    )
}

export default connect(
    state => ({userInfo:state.userInfo,title:state.title}),
    {
        deleteUser:createDeleteUserInfoAction
    }
)(Header)