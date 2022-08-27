import React from 'react'
import { Button, Form, Input } from 'antd';
import logo from './imgs/logo2.svg'
import './Login.less'


export default function Login() {
    const onFinish = (values) => {
        if(values){
            alert('向服务器发送登录请求')
        }
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        if(!errorInfo){
            alert('向服务器发送登录请求')
        }
        console.log('Failed:', errorInfo);
    };
    const [form] = Form.useForm();
    const nameValue = Form.useWatch('username', form);
    console.log(nameValue)
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
                        form={form}
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
