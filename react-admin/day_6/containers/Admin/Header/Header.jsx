import React,{useState,useEffect} from 'react'
import {Button,Modal} from 'antd'
import {FullscreenOutlined,FullscreenExitOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
import screenfull from 'screenfull/dist/screenfull';
import {connect} from 'react-redux'
import dayjs from 'dayjs';
import {createDeleteUserInfoAction} from '../../../redux/action_creators/login_action'
import './Header.less'
import { reqWeather } from '../../../api';



function Header(props) {

    const [date,setTime] = useState(dayjs().format('YYYY年 MM月 DD日 HH:mm:ss'))

    const [isFull,setScreen] = useState(false)

    const [weatherInfo,setWeatherInfo] = useState({})

    // const [time,setTime] = useState()

    useEffect(()=>{
        // screenFull绑定监听
        screenfull.on('change',()=>{
            setScreen(isFull => !isFull)
        })
        let timeID = setInterval(()=>{
            setTime(dayjs().format('YYYY年 MM月 DD日 HH:mm:ss'))
        },1000)
        getWether()
        return ()=>{
            clearInterval(timeID)
        }
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
            props.deleteUser()
        }
    });
};
    // 获取天气的回调
    const getWether = async()=>{
        let weather = await reqWeather()
        setWeatherInfo(weather)
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
                    图
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
    state => ({userInfo:state.userInfo}),
    {
        deleteUser:createDeleteUserInfoAction
    }
)(Header)