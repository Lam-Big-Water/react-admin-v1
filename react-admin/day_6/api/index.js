// 项目中所有请求由这个文件发出
import myAxios from './myAxios';
import jsonp from 'jsonp';
import {message} from 'antd'
import {BASE_URL,WEATHER_KEY,CITY} from '../config'

// 登录请求
export const reqLogin = (username,password)=> myAxios.post(`${BASE_URL}/api/login`,{username,password})
// 获取商品列表
export const reqCategoryList = ()=> myAxios.get(`${BASE_URL}/api/manage/category/list`)

// 获取天气信息
export const reqWeather = ()=>{
    return new Promise((resolve,reject)=>{
        jsonp(`http://restapi.amap.com/v3/weather/weatherInfo?key=${WEATHER_KEY}&city=${CITY}`,(err,data)=>{
        if(err) {
            message.error('请求错误')
            return new Promise(()=>{})
        }else{
            const {temperature,weather} = data.lives[0]
            let weatherObj = {temperature,weather}
            resolve(weatherObj)
        }
    })
    })
}