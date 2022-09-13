import React,{useState,useEffect} from 'react'
import {Card,Button,Table,Modal,message,Form,Input,Tree} from 'antd'
import dayjs from 'dayjs';
import {reqRoleList,reqAddRole,reqAuthRole} from '../../api'
import menuList from '../../config/menu_config'
import {connect} from 'react-redux'
const {Item} = Form
const { TreeNode } = Tree;


// function Role(props) {

//     const [form] = Form.useForm();

//     const [role,setRole] = useState({
//         isShowAdd: false, // 是否显示添加界面
//         isShowAuth: false, // 是否显示设置权限界面
//         roleList:[],
//         menuList,
//         checkedKeys: [],//选中菜单
//         _id: ''//当前操作的角色id
//     })

//     const dataSource = role.roleList

//     const columns = [
//         {
//             title: '角色名称',
//             dataIndex: 'name',
//             key: 'name'
//         },
//         {
//             title: '创建时间',
//             dataIndex: 'create_time',
//             key: 'create_time',
//             render:(time)=>{return dayjs(time).format('YYYY年 MM月 DD日 HH:mm:ss')}
//         },
//         {
//             title: '授权时间',
//             dataIndex: 'auth_time',
//             key: 'auth_time',
//             render:(time)=> time ? dayjs(time).format('YYYY年 MM月 DD日 HH:mm:ss') : ''
//         },
//         {
//             title: '授权人',
//             dataIndex: 'auth_name',
//             key: 'auth_name'
//         },
//         {
//             title: '操作',
//             key: 'option',
//             render: (item) => <Button type='link' onClick={()=>{showAuth(item._id)}}>设置权限</Button>
//         }
//     ]
//     // treeData是属性菜单的源数据
//     const treeData = role.menuList

//     useEffect(()=>{
//         getRoleList()
//         setTimeout(() => {
//             form.resetFields();
//         });
//     })

//     const getRoleList = async ()=>{
//         let result = await reqRoleList()
//         const {status,data,msg} = result
//         if(status === 0) setRole({roleList:data})
//     }


//     // 新增角色--确认按钮
//     const handleOk = ()=>{
//         form.validateFields().then((values)=>{
//             let result = reqAddRole(values)
//             const {status,data,msg} = result
//             if(status===0){
//                 message.success('新增角色成功')
//                 getRoleList()
//                 setRole({isShowAdd:false})
//             }
//             else message.error(msg)
//         })
//     }

//     // 新增角色--取消按钮
//     const handleCancel = ()=>{
//         setRole({isShowAdd:false})
//     }

//     // 授权弹窗--确认按钮
//     const handleAuthOk = async()=>{
//         const {_id,checkedKeys} = role
//         const {username} = props
//         let result = await reqAuthRole({_id,menus:checkedKeys,auth_name:username})
//         const {status,data,msg} = result
//         if(status === 0){
//             message.success('授权成功',1)
//             setRole({isShowAuth:false})
//             getRoleList()
//         }
//         else message.error(msg,1)

//     }

//     // 授权弹窗--取消按钮
//     const handleAuthCancel = ()=>{
//         setRole({isShowAuth:false})
//     }
    
//     // ------------------------

//     const onCheck = checkedKeys => {
//     setRole({ checkedKeys });
//     };
//     // 用于展示授权弹窗
//     const showAuth = (id)=>{
//         const {roleList} = role
//         let result = roleList.find((item)=>{
//             return item._id === id
//         })
//         if(result) setRole({checkedKeys:result.menus})
//         setRole({isShowAuth:true,_id:id})
//     }
//     // 用于展示新增弹窗
//     const showAdd = ()=>{
//         form.resetFields()
//         setRole({isShowAdd: true});
//     }

//     const renderTreeNodes = (data) =>
//     data.map(item => {
//         if (item.children) {
//         return (
//             <TreeNode title={item.title} key={item.key} dataRef={item}>
//             {renderTreeNodes(item.children)}
//             </TreeNode>
//         );
//         }
//         return <TreeNode key={item.key} {...item} />;
//         });

       
    

//     return (
//         <div>
//             <Card 
//             title={<Button type='primary' onClick={() => {showAdd()}}>
//                     新增角色
//                     </Button>}
//                     style={{width: '100%'}}
//                     >
//             <Table
//                 dataSource={dataSource}
//                 columns={columns}
//                 border
//                 pagination={{defaultPageSize: 5}}
//                 rowKey="_id"
//             />
//             </Card>
//             {/* 新增角色提示框 */}
//                 <Modal
//                     title="新增角色"
//                     visible={role.isShowAdd}
//                     onOk={handleOk}
//                     onCancel={handleCancel}
//                     okText="确认"
//                     cancelText="取消"
//                 >
//                     <Form
//                     form={form} 
//                     onSubmit={handleOk}
//                     >
//                         <Item
//                         name="roleName"
//                         initialValue={''}
//                         rules={[
//                             { required: true, whitespace: true, message: '角色名必须输入' },
//                         ]}
//                         >
//                         <Input
//                             placeholder="请输入角色名"
//                         />
//                         </Item>
//                     </Form>
//                 </Modal>
//             {/* 设置权限弹窗 */}
//                 <Modal
//                 title="设置权限"
//                 visible={role.isShowAuth}
//                 onOk={handleAuthOk}
//                 onCancel={handleAuthCancel}
//                 okText="确认"
//                 cancelText="取消"
//                 >
//                 <Tree
//                 checkable
//                 onCheck={onCheck}
//                 checkedKeys={role.checkedKeys}
//                 defaultExpandAll = {true}//默认展开所有节点
//                 >
//                 <TreeNode title='平台功能' key='top'>
//                     {renderTreeNodes(treeData)}
//                 </TreeNode>
//                 </Tree>
//                 </Modal>
//         </div>
//     )
// }

function Role(props) {

    const [role,setRole] = useState({
        isShowAdd: false, // 是否显示添加界面
        isShowAuth: false, // 是否显示设置权限界面
        roleList:[],
        menuList,
        checkedKeys: [],//选中菜单
        _id: ''//当前操作的角色id
    })

    const [menu] = useState(menuList)

    useEffect(()=>{
        getRoleList()
    },[])

    const getRoleList = async ()=>{
        let result = await reqRoleList()
        const {status,data,msg} = result
        if(status === 0) setRole({roleList:data})
    }

    // 新增角色--确认按钮
    const handleOk = ()=>{
        form.validateFields().then((values)=>{
            console.log(values)
            reqAddRole(values)
            .then((result)=>{
                const {status,msg} = result
                if(status===0){
                    message.success('新增角色成功')
                    getRoleList()
                    setRole({isShowAdd:false})
                }
                else message.error('新增角色失败')
            })
            
        })
    }

    // 新增角色--取消按钮
    const handleCancel = ()=>{
        setRole({isShowAdd:false})
    }

    const handleAuthOk = async()=>{
        const {_id,checkedKeys} = role
        const {username} = props
        let result = await reqAuthRole({_id,menus:checkedKeys,auth_name:username})
        const {status,data,msg} = result
        if(status === 0){
            message.success('授权成功',1)
            setRole({isShowAuth:false})
            getRoleList()
        }
        else message.error(msg,1)

    }

    // 授权弹窗--取消按钮
    const handleAuthCancel = ()=>{
        setRole({isShowAuth:false})
    }

    // ------------------------

    const onCheck = checkedKeys => {
    setRole({ checkedKeys });
    };
    // 用于展示授权弹窗
    const showAuth = (id)=>{
        const {roleList} = role
        let result = roleList.find((item)=>{
            return item._id === id
        })
        if(result) setRole({checkedKeys:result.menus})
        setRole({isShowAuth:true,_id:id})
    }
    // 用于展示新增弹窗
    const showAdd = ()=>{
        form.resetFields()
        setRole({isShowAdd: true});
    }

    const renderTreeNodes = (data) =>
    data.map(item => {
        if (item.children) {
        return (
            <TreeNode title={item.title} key={item.key} dataRef={item}>
            {renderTreeNodes(item.children)}
            </TreeNode>
        );
        }
        return <TreeNode key={item.key} {...item} />;
        });

    const dataSource = role.roleList

    const columns = [
        {
            title: '角色名称',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
            key: 'create_time',
            render:(time)=>{return dayjs(time).format('YYYY年 MM月 DD日 HH:mm:ss')}
        },
        {
            title: '授权时间',
            dataIndex: 'auth_time',
            key: 'auth_time',
            render:(time)=> time ? dayjs(time).format('YYYY年 MM月 DD日 HH:mm:ss') : ''
        },
        {
            title: '授权人',
            dataIndex: 'auth_name',
            key: 'auth_name'
        },
        {
            title: '操作',
            key: 'option',
            render: (item) => <Button type='link' onClick={()=>{showAuth(item._id)}}>设置权限</Button>
        }
    ]

    const [form] = Form.useForm();
    const treeData = menuList
    console.log(menuList)
    console.log(treeData)
    console.log(menu)


    return (
        <div>
            <Card 
            title={<Button type='primary' onClick={() => {showAdd()}}>
                    新增角色
                    </Button>}
                    style={{width: '100%'}}
                    >
            <Table
                dataSource={dataSource}
                columns={columns}
                border
                pagination={{defaultPageSize: 5}}
                rowKey="_id"
            />
            </Card>
            {/* 新增角色提示框 */}
                <Modal
                    title="新增角色"
                    visible={role.isShowAdd}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText="确认"
                    cancelText="取消"
                >
                    <Form
                    form={form} 
                    onSubmit={handleOk}
                    >
                        <Item
                        name="roleName"
                        initialValue={''}
                        rules={[
                            { required: true, whitespace: true, message: '角色名必须输入' },
                        ]}
                        >
                        <Input
                            placeholder="请输入角色名"
                        />
                        </Item>
                    </Form>
                </Modal>
            {/* 设置权限弹窗 */}
                    <Modal
                    title="设置权限"
                    visible={role.isShowAuth}
                    onOk={handleAuthOk}
                    onCancel={handleAuthCancel}
                    okText="确认"
                    cancelText="取消"
                    >
                    <Tree
                    checkable = {true}
                    onCheck={onCheck}
                    checkedKeys={role.checkedKeys}
                    defaultExpandAll = {true}//默认展开所有节点
                    // antd4 改
                    treeData = {treeData}
                    >
                    <TreeNode title='平台功能' key='top'>
                    {renderTreeNodes(treeData)}
                    </TreeNode>
                    </Tree>
                </Modal>
        </div>
    )
}

export default connect(
    state =>({username:state.userInfo.user.username}),
    {

    }
)(Role)