import { combineReducers } from "redux";
import testReducer from './test_reducer';


// 引入redux的combineReducers是用来合并多个reducer最终返回一个集成的reducer
export default combineReducers({
    test:testReducer
})