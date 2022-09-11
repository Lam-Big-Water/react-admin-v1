import React,{useState,useEffect,useRef} from 'react'
import {useNavigate,useParams} from 'react-router-dom'
import {Card,Form,Input,Button,Select,message} from 'antd'
import {connect} from 'react-redux'
import {reqCategoryList,reqAddProduct,reqProdById,reqUpdateProduct} from '../../api'
import PicturesWall from './Picture_wall'
import RichTextEditor from './Rich_text_editor'
const {Item} = Form
const { Option } = Select

function Add_update(props) {

    const [categoryList,setCategoryList] = useState([])
    const [product,setProduct] = useState({

        operaType: 'add',
        categoryId: '',
        name: '',
        desc: '',
        price: '',
        detail: '',
        imgs: [],
        _id: ''
    })
    const params = useParams()
    const id = params.id
    const pw = useRef()
    const fw = useRef()

    useEffect(()=>{
        const {categoryList,productList} = props
        console.log(categoryList)
        console.log(id)
        if(categoryList.length) {
            setCategoryList(categoryList)
            console.log(categoryList.length)
        }else{
            getCategoryList()
            console.log('null')
        }
        if(id) {
            setProduct({operaType:'update'})
            if(productList.length) {
                let result = productList.find((item)=>{
                    return item._id === id
                })
                if(result) {
                    setProduct({...result})
                    pw.current.setFileList(result.imgs)
                    fw.current.setRichText(result.detail)
                }
            }else{
                getProductList(id)
            }
        }
        setTimeout(() => {
            form.resetFields();
        });
    },[])
    const getCategoryList = async()=>{
        let result = await reqCategoryList()
        const {status,data,msg} = result
        console.log(data)
        if(status === 0) {
            setCategoryList({data})
            console.log(categoryList)
        }
        else message.error(msg)
    }

    const getProductList = async(id)=>{
        let result = await reqProdById(id)
        console.log(result)
        const {status,data} = result
        if(status === 0){
            setProduct({...data})
            pw.current.setFileList(data.imgs)
            fw.current.setRichText(data.detail)
        }
    }
    
    
    const [form] = Form.useForm();
    const handleSubmit = (event)=>{
        event.preventDefault()
        // 从picture——wall组件中取已经上传的图片数组
        let imgs = pw.current.getImgArr()
        // 从富文本组件中获取用户输入的文字转换为富文本的字符串
        let detail = fw.current.getRichText()
        const {operaType,_id} = product
        form.validateFields().then((values)=>{
            let result
            if(operaType === 'add') {
                result = reqAddProduct({...values,imgs,detail})
            }else{
                result = reqUpdateProduct({...values,imgs,detail,_id})
            }
            const {status,data,msg} = result
            if(status === 0) {
                message.success('操作成功')
                history("/admin/prod_about/product",{replace:true})
            }else{
                message.error(msg)
                console.log(msg)
            } 
        })
        
    }
    const history = useNavigate()
    const back = () =>{
        history(-1)
    }

    const {operaType} = product
    const {name} = product
    console.log(name)


    return (
        <div>
            <Card
            title = {
                <span>
                <Button onClick={() => back()}>
                </Button>
                <span>{operaType === 'update' ? '商品修改' : '商品添加'}</span>
                </span>
            }
            >
                <Form
                    form={form}
                    className='login-form'
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    autoComplete="off"
                    onSubmit={handleSubmit}
                    >
                    <Item
                    label="商品名称"
                    name="name"
                    initialValue={product.name || categoryList.name}
                    rules={[
                        { required: true, whitespace: true, message: '分类名必须输入' },
                    ]}
                    >
                    <Input
                        placeholder="请输入分类名"
                    />
                    </Item>

                    <Item
                        label="商品描述"
                        name="desc"
                        initialValue={product.desc || ''}
                        rules={[
                            { required: true, whitespace: true, message: '必须输入商品描述' },
                        ]}
                    >
                        <Input placeholder="请输入商品描述" autosize={{ minRows: 2, maxRows: 6 }}/>
                    </Item>
                    
                    <Item
                        label="商品价格"
                        name="price"
                        initialValue={product.price || ''}
                        rules={[
                            { required: true, whitespace: true, message: '必须输入商品价格' },
                            
                        ]}
                    >
                        <Input type='number' placeholder='请输入商品价格' addonAfter='元'/>
                    </Item>

                    <Item
                        label="商品分类"
                        name="categoryIds"
                        initialValue={product.categoryId || ''}
                        rules={[
                            { required: true, whitespace: true, message: '必须指定商品分类' },
                            
                        ]}
                    >
                        <Select>
                        <Option value="">请选择分类</Option>
                        {
                            categoryList.map((item)=>{
                                return <Option key={item._id} value={item._id}>{item.name}</Option>
                            })
                        }
                        </Select>
                    </Item>

                    <Item label="商品图片" wrapperCol={{md:12}}>
                    <PicturesWall ref={pw}/>
                    </Item>
                    <Item label="商品详情" wrapperCol={{md:16}}>
                    <RichTextEditor ref={fw}/>
                    </Item>
                    <Button type='primary' htmlType='submit' onClick={handleSubmit}>提交</Button>
                </Form>
            </Card>
        </div>
    )
}


export default connect(
    state =>({categoryList:state.categoryList,productList:state.productList}),
    {

    }
)(Add_update)