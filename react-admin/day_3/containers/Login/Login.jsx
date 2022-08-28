import React, {useEffect} from 'react'
import { Button, Form, Input, message } from 'antd';
import { connect } from 'react-redux';
import { createDemo1Action,createDemo2Action } from '../../redux/action_creators/test_action';
import { reqLogin } from '../../api';
import logo from './imgs/logo2.svg'
import './Login.less'


function Login(props) {

    useEffect(()=>{
        console.log(props.test);
    })
    const onFinish = async(values) => {
        const {username, password} = values
        // console.log(values) {username:xxx, password:xxx}
        // reqLogin(username,password)
        // .then((result)=>{
        //     console.log(result.data);
        // })
        // .catch((reason)=>{
        //     console.log(reason);
        // })
        // 精简写法
        let result = await reqLogin(username,password)
        const {status,msg,data} = result
        if (status === 0){
            console.log(data);
            // 跳转到admin
        } else {
            message.warning(msg,1)
        }
    };
    const onFinishFailed = (errorInfo) => {
        message.error('表单输入有误，请检查！',1)
    };
    // 点击登录按钮的回调
    const handleSubmit = (event) => {
        // 阻止提交事件
        event.preventDefault();
        
    }

    
    
    return (
        <div className='login'>
            <header>
                <img src={logo} alt="" />
                <h1>商品管理系统</h1>
            </header>
                <section>
                    <h1>用户登录</h1>
                    <Form
                        className='login-form'
                        name="basic"
                        labelCol={{
                            span: 5,
                        }}
                        wrapperCol={{
                            span: 26,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        onSubmit={handleSubmit}
                        >
                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={[
                                { required: true, whitespace: true, message: '用户名必须输入' },
                                { min: 4, message: '用户名至少4位' },
                                { max: 12, message: '用户名最多12位' },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    validator: (rule, value,) => {
                                        if(!value) {
                                            return Promise.reject(new Error('密码必须输入'))
                                            } else if (value.length<4) {
                                            return Promise.reject(new Error('密码长度不能小于4位'))
                                            } else if (value.length>12) {
                                            return Promise.reject(new Error('密码长度不能大于12位'))
                                            } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                                            return Promise.reject(new Error('密码必须是英文、数字或下划线组成'))
                                            } else {
                                            return Promise.resolve(); // 验证通过
                                            }
                                          // callback('xxxx') // 验证失败, 并指定提示的文本
                                    },
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            className="login-form-button"
                        >
                            <Button type="primary" htmlType="submit">
                            Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
        </div>
    )
}

export default connect(
    state => ({test:state.test}),
    {
        demo1:createDemo1Action,
        demo2:createDemo2Action
    }
)(Login)