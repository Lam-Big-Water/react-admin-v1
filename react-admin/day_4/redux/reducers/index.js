import { combineReducers } from "redux";
import loginReducer from './login_reducer';


// 引入redux的combineReducers是用来合并多个reducer最终返回一个集成的reducer
export default combineReducers({
    userInfo:loginReducer
})