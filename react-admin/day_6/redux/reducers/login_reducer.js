import {SAVE_USER_INFO,DELETE_USER_INFO} from '../action_types'

let user = JSON.parse(localStorage.getItem('user'))

// 默认值
let initState = {
    user: user || '',
    isLogin: user ? true : false
}
// 创建了一个test的reducer，每次触发action的时候会把传过来的值作为第二个参数，第一个参数为老的state，reducer执行完毕返回新的state会替换老的state
export default function test(preState = initState,action) {
    const {type,data} = action
    let newState
    switch (type) {
        case SAVE_USER_INFO:
            newState = {user:data,isLogin:true}
            return newState
        case DELETE_USER_INFO:
            newState = {user:'',isLogin:false}
            return newState
        default:
            return preState
    }
}