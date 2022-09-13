import React from 'react'
import { Menu } from 'antd';
import { connect } from 'react-redux';
import {Link,useLocation} from 'react-router-dom'
// 商品数据
import menuLst from '../../../config/menu_config'
import logo from '../../../static/imgs/logo2.png'
import { createSaveTitleAction } from '../../../redux/action_creators/menu_action';
import './Left_Nav.less'
const { SubMenu,Item } = Menu;


function Left_Nav(props) {
    
    const location = useLocation()

    const hasAuth = (item)=>{
        // 获取当前用户可以看到的菜单的数组
        const {menus,username} = props
        console.log(props.menus);
        console.log(item);
        if(username === 'admin') return true
        else if(!item.children){
            return menus.find((item2)=>{return item2 === item.key})
        }else if (item.children){
            return item.children.some((item3)=>{return menus.indexOf(item3.key) !== -1})
        }

        // 校验菜单权限
        // return true
    }


    const createMenu = (target)=>{
        return target.map((item)=>{
              // 没有数组
            if(hasAuth(item)){
                if(!item.children){
                    return (
                        <Item key={item.key} onClick={()=>{props.saveTitle(item.title)}}>
                            <Link to={item.path}>
                                <span>{item.title}</span>
                            </Link>
                        </Item>
                    )
                } else { 
                     // 有数组
                    return (
                        <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <span>{item.title}</span>
                            </span>
                        }
                        >
                            {/* 将数组再次传入函数 */}
                        {createMenu(item.children)}
                        </SubMenu>
                    )
                }
            }
        })
    }

    return (
        <div>
            <header className='nav-header'>
                <img src={logo} alt="" />
                <h1>商品管理系统</h1>
            </header>
            <Menu
            selectedKeys={location.pathname.indexOf('product') !== -1 ? 'product': location.pathname.split('/').reverse()[0]}
            defaultOpenKeys={location.pathname.split('/').splice(2)}
            mode="inline"
            theme="dark"
            >
            {
                createMenu(menuLst)
            }
            </Menu>
        </div>
    )
}

export default connect (
    state => ({
        menus:state.userInfo.user.role.menus,
        username:state.userInfo.user.username
    }),
    {
        saveTitle: createSaveTitleAction
    }

)(Left_Nav)