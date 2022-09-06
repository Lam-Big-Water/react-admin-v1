import React,{useState,useEffect} from 'react'
import { Card,Table,Button,Modal,message,Form,Input} from 'antd';
import {PlusCircleOutlined,ExclamationCircleOutlined} from '@ant-design/icons'
import {reqCategoryList,reqAddCategory,reqUpdateCategory} from '../../api'
import { PAGE_SIZE } from '../../config';
const {Item} = Form;


export default function Category() {

    const [categoryList,setCategoryList] = useState([])//商品列表
    const [visible,setVisible] = useState(false)//控制弹窗的展示或隐藏
    const [operType,setOperType] = useState('') //操作类型
    const [isLoading,setIsLoading] = useState(true)//是否处于加载中
    const [modalCurrentValue,setModalCurrentValue] = useState('')//弹窗显示的值--用于数据回显
    const [modalCurrentId,setModalCurrentId] = useState('')

    const dataSource = categoryList

        const columns = [
        {
            title: '分类',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '操作',
            key: 'address',
            render: (item)=>{return <Button type='link' onClick={()=>{showUpdate(item)}}>修改分类</Button>},
            width: '25%',
            align: 'center'
        },
        ];

        useEffect(()=>{
            getCategoryList()
            setTimeout(() => {
                form.resetFields();
            });
        },[modalCurrentValue])

        // 获取商品分类列表
        const getCategoryList = async()=>{
            let result = await reqCategoryList()
            setIsLoading(false)
            const {status,data,msg} = result
            if(status === 0) setCategoryList(data.reverse()) 
            else message.error(msg,1)
        }

        // 展示弹窗--新增
        const showAdd = () => {
            setOperType('add')
            setModalCurrentValue('')
            setModalCurrentId('')
            setVisible(true)
            };

        // 展示弹窗--修改
        const showUpdate = (item) => {
            const {_id,name} = item
            setModalCurrentValue(name)
            setModalCurrentId(_id)
            setOperType('update')
            setVisible(true)
            };


        const toAdd = async (values)=>{
            let result = await reqAddCategory(values)
            console.log(result)
            const {status,data,msg} = result
            if(status === 0){
                message.success('新增商品分类成功')
                let categoryList = [...categoryList]
                categoryList.unshift(data)
                setCategoryList(categoryList)
                setVisible(false);//隐藏弹窗
                form.resetFields()
            }
            if(status === 1) message.error(msg,1)
        }

        const toUpdate = async(categoryObj)=>{
            let result = await reqUpdateCategory(categoryObj)
            const {status,msg} = result
            if(status === 0) {
                message.success('更新分类成功',1)
                getCategoryList()
                setVisible(false)
                form.resetFields()
            }else{
                message.error(msg,1)
            }
        }

        // const onFinish = (values) => {
        //     console.log('Success:', values);
        // };
        // // 点击弹窗ok的回调
        // const handleOk = () => {
        //     onFinish(async(values)=>{
        //         console.log(values)
        //         if(operType === 'add') toAdd(values)
        //         if(operType === 'update') {
        //             const categoryId = modalCurrentId
        //             const categoryName = values.categoryName
        //             const categoryObj = {categoryId,categoryName}
        //             toUpdate(categoryObj)
        //         }
        //     })
        // };

        const [form] = Form.useForm();
        // 点击弹窗ok的回调
        const handleOk = () => {
            form.validateFields().then((values)=>{
                if(operType === 'add') toAdd(values)
                if(operType === 'update') {
                    const categoryId = modalCurrentId
                    const categoryName = values.categoryName
                    const categoryObj = {categoryId,categoryName}
                    toUpdate(categoryObj)
                }
            })
        };

        

        // 点击弹窗cancel的回调
        const handleCancel = () => {
            setVisible(false)
            form.resetFields()
        };


    return (
        <div>
            <Card
            extra={<Button type='primary' onClick={showAdd}><PlusCircleOutlined />添加</Button>}
            >
            <Table dataSource={dataSource}
            columns={columns}
            bordered
            rowKey="_id"
            pagination={{pageSize:PAGE_SIZE,showQuickJumper:true}}
            loading={isLoading}
            />
            </Card>
            <Modal
            forceRender
            title={operType === 'add' ? '新增分类' : '修改分类'}
            visible={visible}
            okText = '确定'
            cancelText = '取消'
            onOk={handleOk}
            onCancel={handleCancel}
            >
                <Form 
                form={form} 
                className="login-form"
                >
                    <Item
                    label="分类名"
                    name="categoryName"
                    initialValue={modalCurrentValue}
                    rules={[
                        { required: true, whitespace: true, message: '分类名必须输入' },
                        
                    ]}
                    >
                    <Input
                        placeholder="请输入分类名"
                    />
                    </Item>
                </Form>
            </Modal>
        </div>
    )
}
