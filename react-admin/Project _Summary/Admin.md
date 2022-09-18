一.admin页面

1.使用Navigate,Route,Routes搭建路由

import {Navigate,Route,Routes} from 'react-router-dom'

![sum](https://user-images.githubusercontent.com/106876072/190107844-23a4973f-c5a2-485c-b9cd-264aa3da4204.jpg)

创建 redux action， 用于退出当前账户，删除localstorage里面的数据

![sum3](https://user-images.githubusercontent.com/106876072/190112010-75988c40-d870-47e5-9e36-796932caf998.jpg)

流程：

1.判断是否登录

2.配置路由组件，目录下的 index.js 文件，将整个 App 组件标签采用 BrowserRouter 标签去包裹，这样整个 App 组件都在一个路由器的管理下。

3.在redux中获取 user信息，并创建删除user action，当权限过期，或者401时，退出时，删除user信息，使其回到login获取最新的user信息
