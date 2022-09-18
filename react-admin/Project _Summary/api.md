发送请求

GET：
export const reqCategoryList = ()=> myAxios.get(`${BASE_URL}/api/manage/category/list`)

POST：

export const reqLogin = (username,password)=> myAxios.post(`${BASE_URL}/api/login`,{username,password})

GET带参数：

export const reqProductList = (pageNum,pageSize)=>myAxios.get(`${BASE_URL}/api/manage/product/list`,{params:{pageNum,pageSize}})

jsonp：

引入jsonp插件

import jsonp from 'jsonp';

![jsonp](https://user-images.githubusercontent.com/106876072/190849469-4177e854-d37c-43db-ac6b-4204d72f74a1.jpg)
