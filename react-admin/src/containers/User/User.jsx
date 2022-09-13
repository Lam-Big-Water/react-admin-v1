import React, {useState,useEffect}from 'react';
import {Button, Card, Form, Input, message, Modal, Select, Table} from "antd";
import dayjs from "dayjs";
import {PAGE_SIZE} from '../../config'
import {reqUserList,reqAddUser} from '../../api'
const {Option} = Select;
const {Item} = Form

export default function User(props) {

    const [isShowAdd,setIsShowAdd] = useState(false)
    const [userList,setUserList] = useState([])
    const [roleList,setRoleList] = useState([])
    const [form] = Form.useForm()


    useEffect(()=>{
        getUserList()
        setTimeout(() => {
            form.resetFields();
        });
    },[])

    const getUserList = async()=>{
        let result = await reqUserList()
        const {status,data,msg} = result
        if (status === 0) {
            setUserList(data.users.reverse())
            setRoleList(data.roles)
        }
    }

    // 新增用户弹窗----确定按钮回调
    const handleOk = ()=>{
        form.validateFields().then((values)=>{
            reqAddUser(values)
            .then((result)=>{
                const {status,data,msg} = result
                if(status === 0){
                    message.success('添加用户成功')
                    let newUserList = [...userList]
                    newUserList.unshift(data)
                    setUserList(newUserList)
                    setIsShowAdd(false)
                }
                else message.error(msg,1)
            })
        })
    }
    // 新增用户弹窗----取消按钮回调
    const handleCancel = ()=>{
        setIsShowAdd(false)
    }
    

    const dataSource = userList

        const columns = [
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username'
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email'
            },
            {
                title: '电话',
                dataIndex: 'phone',
                key: 'phone'
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                key: 'create_time',
                render: time => dayjs(time).format('YYYY年 MM月 DD日 HH:mm:ss')
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                key: 'role_id',
                render:(id)=>{
                    let result = roleList.find((item)=>{
                        return item._id === id
                    })
                    if(result) return result.name
                }
            },
            {
                title: '操作',
                key: 'operator',
                render: (item) => {
                    return (
                        <div>
                            <Button type="link">修改</Button>
                            <Button type="link">删除</Button>
                        </div>
                    );
                },
                width: "25%",
                align: 'center'
            }
        ];

    return (
        <div>
            <Card title={
                <Button type="primary" onClick={() => {setIsShowAdd(true);form.resetFields()}}>
                    新增用户
                </Button>
            }>
            <Table bordered={true}
                rowKey="_id"
                dataSource={dataSource}
                columns={columns}
                pagination={{defaultPageSize:PAGE_SIZE}}
                />
            </Card>
            {/* 添加用户的模态框 */}
            <Modal 
            title="添加用户" 
            visible={isShowAdd}
            okText="确认" 
            cancelText="取消" 
            onOk={handleOk}
            onCancel={handleCancel}
            >
            <Form form={form} labelCol={{md: 4}} wrapperCol={{md: 16}}>
                <Item
                label="用户名"
                name="username"
                initialValue={''}
                rules={[
                    { required: true, whitespace: true, message: '角色名必须输入' },
                ]}
                >
                <Input
                    placeholder="请输入用户名"
                />
                </Item>
                <Item
                label="密码"
                name="password"
                initialValue={''}
                rules={[
                    { required: true, whitespace: true, message: '密码必须输入' },
                ]}
                >
                <Input
                    placeholder="请输入密码"
                />
                </Item>
                <Item
                label="手机号"
                name="phone"
                initialValue={''}
                rules={[
                    { required: true, whitespace: true, message: '手机号必须输入' },
                ]}
                >
                <Input
                    placeholder="请输入手机号"
                />
                </Item>
                <Item
                label="邮箱"
                name="email"
                initialValue={''}
                rules={[
                    { required: true, whitespace: true, message: '邮箱必须输入' },
                ]}
                >
                <Input
                    placeholder="请输入邮箱"
                />
                </Item>
                <Item
                label="角色"
                name="role_id"
                initialValue={''}
                rules={[
                    { required: true, whitespace: true, message: '必须选择一个角色' },
                ]}
                >
                <Select>
                        <Option value="">请选择一个角色</Option>
                        {
                            roleList.map((item)=>{
                                return <Option key={item._id} value={item._id}>{item.name}</Option>
                            })
                        }
                </Select>
                </Item>
            </Form>
            </Modal>
            {/* 修改用户的模态框 */}
            <Modal title={`修改用户`} visible={false} okText="确认" cancelText="取消">
                <Form>
                    修改用户
                </Form>
            </Modal>
        </div>
    )
}
