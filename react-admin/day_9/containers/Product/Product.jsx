import React,{useState,useEffect} from 'react'
import {Card,Button,Icon,Select,Input,Table, message} from 'antd';
import { connect } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import {reqProductList,reqUpdateProdStatus,reqSearchProduct} from '../../api'
import {createSaveProductAction} from '../../redux/action_creators/product_action'
import { PAGE_SIZE } from '../../config';
const { Option } = Select;


function Product(props) {

    const [productList,setProductList] = useState([])
    const [current,setCurrent] = useState(1)
    const [total,setTotal] = useState('')
    const [keyWord,setKeyWord] = useState('')
    const [searchType,setSearchType] = useState('productName')
    const [isSearch,setIsSearch] = useState(true)
    const history = useNavigate()

    const dataSource = productList
    
    const columns = [
        {
            title: '商品名称',
            dataIndex: 'name',
            width: '20%',
            key: 'name',
        },
        {
            title: '商品描述',
            dataIndex: 'desc',
            key: 'desc',
        },
        {
            title: '价格',
            dataIndex: 'price',
            align: 'center',
            width: '10%',
            key: 'price',
            render: price=> '$' + price
        },
        {
            title: '状态',
            // dataIndex: 'status',
            align: 'center',
            width: '10%',
            key: 'status',
            render: (item)=>{
                return (
                    <div>
                        <Button 
                        type={item.status === 1 ? 'danger':'primary'}
                        onClick={()=>{updateProdStatus(item)}}
                        >
                            {item.status === 1 ? '下架':'上架'}
                        </Button>
                        <br/>
                        <span>{item.status === 1 ? '在售':'已停售'}</span>
                    </div>
                )
            }

        },
        {
            title: '操作',
            // dataIndex: 'opera',
            align: 'center',
            width: '10%',
            key: 'opera',
            render: (item)=>{
                return (
                    <div>
                        <Button type="link" onClick={()=>{history(`/admin/prod_about/product/detail/${item._id}`)}}>详情</Button><br/>
                        <Button type="link" onClick={()=>{history(`/admin/prod_about/product/add_update/${item._id}`)}}>修改</Button>
                    </div>
                )
            }
        },
    ];

    useEffect(()=>{
        getProductList()
    },[])// eslint-disable-line react-hooks/exhaustive-deps

    const getProductList = async(number=1)=>{
        let result
        if(isSearch){
            result = await reqSearchProduct(number,PAGE_SIZE,searchType,keyWord)
        }else{
            result = await reqProductList(number,PAGE_SIZE)
        }
        const {status,data} = result
        if(status === 0){
            setTotal(data.total)
            setProductList(data.list)
            setCurrent(data.pageNum)
             // 把获取的商品列表存入到redux中
            props.saveProduct(data.list)
        }
        else message.error('获取商品失败')
    }

    const updateProdStatus = async({_id,status})=>{
        let newProductList = [...productList]
        console.log(newProductList)
        if(status === 1) status = 2
        else status = 1
        let result = await reqUpdateProdStatus(_id,status)
        if(result.status === 0) {
            message.success('更新商品状态成功')
            newProductList = newProductList.map((item)=>{
                if(item._id === _id){
                    item.status = status
                }
                return item
            })
            setProductList(newProductList)
        }
        else message.error('更新商品状态失败')
    }

    const search = async()=>{
        setIsSearch(true)
        getProductList()
    }

    return (
        <div>
            <Card
            title={
                <div>
                    <Select
                    defaultValue="productName"
                    onChange={(value)=>{setSearchType(value)}}
                    >
                    <Option value="productName">按名称搜索</Option>
                    <Option value="productDesc">按描述搜索</Option>
                    </Select>
                    <Input
                    style={{margin:'0px 10px',width:'20%'}}
                    placeholder="请输入搜索关键字"
                    allowClear
                    onChange={(event)=>{setKeyWord(event.target.value)}}
                    />
                    <Button type='primary' onClick={search}>搜索</Button>
                </div>
                }
                extra={<Button type='primary' onClick={()=>{history('/admin/prod_about/product/add_update')}}>添加商品</Button>}
            >
            <Table 
            dataSource={dataSource}
            columns={columns}
            bordered
            rowKey='_id'
            pagination={{
                total:total,
                pageSize: PAGE_SIZE,
                current: current,
                onChange: getProductList
            }}
            />
            </Card>
        </div>
    )
}


export default connect(
    state => ({}),
    {
        saveProduct:createSaveProductAction
    }
)(Product)