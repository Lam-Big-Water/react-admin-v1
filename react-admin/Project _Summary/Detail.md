一.detail页面

1.使用 useState 进行状态初始化，以及修改。

const [isFull,setScreen] = useState(false)

2.使用 useEffect 用于组件更新时，需要立即执行的函数

useEffect(() => { console.log('被调用了'); return () => { console.log('我要被卸载了'); } }, [count])

3.使用useNavigate，useParams，进行页面跳转，获取url中的ID参数

const history = useNavigate()

const back = ()=>{
    history(-1)
}

const params = useParams()

const id = params.id

4.使用dangerouslySetInnerHTML={{_html:any}}, 对富文本文本进行还原
