import React,{useState,useEffect} from 'react'
import { Card,Button,List } from 'antd'
import { connect } from 'react-redux'
import {useNavigate,useParams} from 'react-router-dom'
import './Detail.less'
import pic from './upload/pro1.webp'
import {reqProdById} from '../../api'
const {Item} = List


function Detail(props) {

    const [categoryId,setCategoryId] = useState('')
    const [desc,setDesc] = useState('')
    const [detail,setDetail] = useState('')
    const [imgs,setImgs] = useState([])
    const [name,setName] = useState('')
    const [price,setPrice] = useState('')
    const history = useNavigate()
    const back = ()=>{
        history(-1)
    }
    const params = useParams()
    const id = params.id
    useEffect(()=>{
        console.log(id)
        const reduxProdList = props.productList
        if(reduxProdList.length !== 0){
            let result = reduxProdList.find((item)=>{
                return item._id === id
            })
            if(result){
                console.log(result)
                const {categoryId,desc,detail,imgs,name,price} = result
                setCategoryId(categoryId)
                setDesc(desc)
                setDetail(detail)
                setImgs(imgs)
                setName(name)
                setPrice(price)
            }
        }
        else getProdById(id)
    },[])

    const getProdById = async(id)=>{
        let result = await reqProdById(id)
        console.log(result)
        // const {status,data,msg} = result
        // if(status === 0) {
        //     const {categoryId,desc,detail,imgs,name,price} = data
        //     this.setState({categoryId,desc,detail,imgs,name,price})
        // }
    }
    return (
            <div>
                <Card title={
                    <div className='left-top'>
                        <Button type="link" size="small" onClick={()=>{back()}}>
                            <span>商品详情</span>
                        </Button>
                    </div>
                }>
                    <List>
                        <Item>
                            <span className='prod-name'>商品名称</span>
                            <span>{name}</span>
                        </Item>
                        <Item>
                            <span className='prod-name'>商品描述</span>
                            <span>{desc}</span>
                        </Item>
                        <Item>
                            <span className='prod-name'>商品价格</span>
                            <span>{price}</span>
                        </Item>
                        <Item>
                            <span className='prod-name'>所属分类</span>
                            <span>{name}</span>
                        </Item>
                        <Item>
                            <span className='prod-name'>商品图片</span>
                            {
                                imgs.map((item,index)=>{
                                    return <img key={index} src={pic} alt="商品图片"/>
                                })
                            }
                        </Item>
                        <Item>
                            <span className='prod-name'>商品详情</span>
                            <span dangerouslySetInnerHTML={{__html:detail}}></span>
                        </Item>
                    </List>
                </Card>
            </div>
    )
}

export default connect(
    state => ({productList:state.productList})
)(Detail)