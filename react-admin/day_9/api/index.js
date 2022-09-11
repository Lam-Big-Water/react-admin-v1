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

// 请求商品分页列表
export const reqProductList = (pageNum,pageSize)=>myAxios.get(`${BASE_URL}/api/manage/product/list`,{params:{pageNum,pageSize}})

// 请求更新商品状态
export const reqUpdateProdStatus = (productId,status)=>myAxios.post(`${BASE_URL}/api/manage/product/updateStatus`,{productId,status})

// 搜索商品
export const reqSearchProduct = (pageNum,pageSize,searchType,keyWord)=>myAxios.get(`${BASE_URL}/api/manage/product/search`,{params:{pageNum,pageSize,[searchType]:keyWord}})

// 按id获取商品信息
export const reqProdById = (productId)=>myAxios.get(`${BASE_URL}/api/manage/category/info`,{params:{productId}})

// 请求删除图片 （根据图片唯一名字删除）
export const reqDeletePicture = (name)=>myAxios.post(`${BASE_URL}/api/manage/img/delete`,{name})

// 请求添加商品
export const reqAddProduct = (productObj)=>myAxios.post(`${BASE_URL}/api/manage/product/add`,{...productObj})

// 请求更新商品
export const reqUpdateProduct = (productObj)=>myAxios.post(`${BASE_URL}/api/manage/product/update`,{...productObj})