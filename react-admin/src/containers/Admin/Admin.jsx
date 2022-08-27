import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import { createDemo1Action } from '../../redux/action_creators/test_action'

function Admin(props) {
    useEffect(()=>{
        console.log(props.call)
    })
    return (
        <div>Admin</div>
    )
}
// 如下代码中所有key是控制容器组件传递给UI组件的key
// 如下代码中所有value是控制容器组件传递给UI组件的value
export default connect(
    state => ({call:state.test}),
    {
        demo1:createDemo1Action
    }
)(Admin)