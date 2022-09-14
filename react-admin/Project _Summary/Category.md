一.category页面

1.使用 useState 进行状态初始化，以及修改。

const [isFull,setScreen] = useState(false)

2.使用 useEffect 用于组件更新时，需要立即执行的函数

useEffect(() => { console.log('被调用了'); return () => { console.log('我要被卸载了'); } }, [count])

3.使用antd@4 form组件的 Form.useForm() 获取表格中的用户输入的信息，使用initialValue={any}对input的value赋初始值

const [form] = Form.useForm();

《Form form={form}》《/Form》

4.antd@4 form组件中的form.resetFields()需要包裹在setTimeout中，否则无法正常重置数据

5.创建redux action 保存category信息
