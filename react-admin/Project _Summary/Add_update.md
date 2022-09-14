一.add_updata页面

1.使用 useState 进行状态初始化，以及修改。

const [isFull,setScreen] = useState(false)

2.使用 useEffect 用于组件更新时，需要立即执行的函数

useEffect(() => { console.log('被调用了'); return () => { console.log('我要被卸载了'); } }, [count])

3.使用 useRef 返回一个可变的ref对象，可以保存任何类型的值:dom、对象等任何可变值

4.使用useNavigate，useParams，进行页面跳转，获取url中的ID参数

const history = useNavigate()

const back = ()=>{ history(-1) }

const params = useParams()

const id = params.id
