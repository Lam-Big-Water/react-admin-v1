// 项目中所有请求由这个文件发出
import myAxios from './myAxios';
// jsonp插件
import jsonp from 'jsonp';
// antdUI
import {message} from 'antd'
// 路径，城市名称
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
            // 中断promise链
            return new Promise(()=>{})
        }else{
            const {temperature,weather} = data.lives[0]
            let weatherObj = {temperature,weather}
            resolve(weatherObj)
        }
    })
    })
}

// 新增商品分类
export const reqAddCategory = ({categoryName})=>myAxios.post(`${BASE_URL}/api/manage/category/add`,{categoryName})

// 更新商品分类
export const reqUpdateCategory = ({categoryName,categoryId})=>myAxios.post(`${BASE_URL}/api/manage/category/update`,{categoryName,categoryId})