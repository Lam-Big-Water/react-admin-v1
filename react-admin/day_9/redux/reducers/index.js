import { combineReducers } from "redux";
import loginReducer from './login_reducer';
import menuReducer from './menu_reducer';
import productReducer from '../reducers/product_reducer'
import categoryReducer from './category_reducer'



// 引入redux的combineReducers是用来合并多个reducer最终返回一个集成的reducer
export default combineReducers({
    userInfo:loginReducer,
    title:menuReducer,
    productList:productReducer,
    categoryList:categoryReducer

})