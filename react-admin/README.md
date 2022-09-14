day1 环境搭建 引入antd 创建login 和 admin 页面

day2 redux

day3 axios封装 接口测试 代理服务器

day4 路由跳转，本地存储，退出登录

day5 token 验证

day6 全屏插件，时间插件，用jsonp获取天气信息 获取路由pathname

day7 动态生成路由菜单，使用redux保存标题

day8 产品列表，包括（商品详情，商品新增，商品修改），引入富文本插件react-draft-wysiwyg，使用antd 文件上传组件

day9 角色创建，角色权限，用户创建，用户修改，用户权限授权，数据可视化 echarts,echarts-for-react





react库
antd
redux 
react-redux 
react-thunk
redux-devtools-extension



Redux + React-Redux + Redux-Thunk 在 React 实际项目开发中使用详解

安装 npm i redux react-redux redux-thunk

redux：核心库，完成store数据状态管理，reducer(触发会返回新的store替换老的store)管理，action(reducer我们不能直接触发，需要调用action来触发reducer)管理。
react-redux：用来简化在React中使用Redux的流程，其中Provider提供器，全局提供store状态，connect连接器，需要store状态的用他来连接。
redux-thunk：使redux的action能够写异步方法，本身action中是不能写异步方法的，用了redux-thunk才可以。

创建store相应文件(store、reducer、action、action-type)
1.创建store，并把reducer传入作为第一个参数，应用中间件redux-thunk作为第二个参数，具体代码如下

import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";

const store = createStore(reducer, applyMiddleware(thunk));

export default store;

2.创建了一个count的reducer，每次触发action的时候会把传过来的值作为第二个参数，第一个参数为老的state，reducer执行完毕返回新的state会替换老的state，其中我们还引入redux的combineReducers是用来合并多个reducer最终返回一个集成的reducer

import { combineReducers } from "redux";
import { COUNT_ADD, COUNT_REDUCE } from "./action-type";

const initCount = {
  count: 0,
};

function count(state = initCount, action) {
  switch (action.type) {
    case COUNT_ADD:
      return state.count + 1;
    case COUNT_REDUCE:
      return state.count - 1;
    default:
      return state;
  }
}

export default combineReducers({
  count,
});

3.每次我们想要改变store，都需要先触发action，另外我们用了redux-thunk后。可以在action中执行异步方法(如ajax数据请求等)，action去触发reducer发生store的改变。在此示例中，我的action比较简单，实际中大家的可能比较复杂，但是原理相同，一个action方法，执行相应逻辑(如ajax请求，或逻辑判断等)，最后返回一个action对象，reducer会根据action对象的type和data来执行相应的store更改

import { COUNT_ADD, COUNT_REDUCE } from "./action-type";

export const receiveCountAdd = () => ({ type: COUNT_ADD });

export const receiveCountReduce = () => ({ type: COUNT_REDUCE });

4.这里面是我们相应action对象的type，为什么我要做这么一个步骤，因为我们需要在action.js传递action对象的时候加上他，也要在reducer.js判断相应的type，避免因为type比较长比较复杂，两边不一致，程序也不会报错(因为reducer判断没有相应type就会走default)，所以我们设置一个常量作为type

// count自增
export const COUNT_ADD = 'COUNT_ADD'

// count自减
export const COUNT_REDUCE = 'COUNT_REDUCE'


组件中接收store及触发action改变store
在此之前我们要在全局用react-redux的Provider全局提供store状态，这里我们直接在index.js中使用它，并把store传递给他的属性store

import React from "react";
import ReactDOM from "react-dom";
import App from "./views/App";
import { Provider } from "react-redux";
import store from './store'

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById("root")
);

接下来我们就可以在组件中使用connect连接器获取我们需要的store以及相应的action了，首先引入connect和我们创建的相应action：receiveCountAdd，在暴露组件的使用connect，它是一个高阶函数(执行函数返回一个函数)，执行第一个函数时有两个参数(第一个为需要接收的state，这里我们是count，第二个为action，这里用的es6写法)，第二个函数再传入我们的组件名，做此步骤后，我们需要的store和action就会挂载到我们的props上，然后我们获取或者执行就非常简单了(见useEffect中)

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { receiveCountAdd } from "../../store/action";

function Article(props) {
  useEffect(() => {
    props.receiveCountAdd();
    console.log(props.count);
  }, []);
  return <div>文章信息</div>;
}

export default connect(
  (state) => ({ count: state.count }),
  { receiveCountAdd },
)(Article);



跨域
Proxy
借助第三方库:http-proxy-middleware
项目安装：npm install --save-dev http-proxy-middleware
在src目录下新建setupProxy.js文件,在js文件里写入配置:

const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
    app.use(
        '/api', // 指定需要转发的请求
        createProxyMiddleware({
        target: 'http://localhost:5000',//服务器的地址
        changeOrigin: true,
            pathRewrite(path) {
            return path.replace('/api', '');
            }
        })
    );
}

axios的post请求默认将参数转成json进而发送给服务器，如果需要转换为urlencoded，可以使用querystring

qs.stringify({username,password})

由于在比较新的node.js版本中已被弃用querystring，在名称上有所调整，功能基本没有太大变化，
将原来的querystring改为qs即可


react hooks 解决了函数式组件和类式组件的差异，让函数式组件拥有了类式组件所拥有的 state ，同时新增了一些 API ，让函数式组件，变得更加的灵活

1.useState  它让函数式组件能够维护自己的 state ，它接收一个参数，作为初始化 state 的值，赋值给 count，因此 useState 的初始值只有第一次有效，它所映射出的两个变量 count 和 setCount 我们可以理解为 setState 来使用

2.useEffect 相当于三个生命周期钩子，componentDidMount 、componentDidUpdata 、componentDidUnmount










react-router-dom@6

1.Navigate 组件被渲染，就会修改路径，切换视图，对应V5的Redirect

2.useNavigate 返回一个函数用来实现编程式导航, 对应类式组件的this.props.history