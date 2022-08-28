import {TEST1,TEST2} from '../action_types'

// 默认值
let initState = 'hello'
// 创建了一个test的reducer，每次触发action的时候会把传过来的值作为第二个参数，第一个参数为老的state，reducer执行完毕返回新的state会替换老的state
export default function test(preState = initState,action) {
    const {type,data} = action
    let newState
    switch (type) {
        case TEST1:
            newState = preState + data
            return newState
        case TEST2:
            newState = preState + data + '!'
            return newState
        default:
            return preState
    }
}