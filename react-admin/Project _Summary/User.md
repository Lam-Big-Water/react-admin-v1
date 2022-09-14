一.user页面

1.使用 useState 进行状态初始化，以及修改。

const [isFull,setScreen] = useState(false)

2.使用 useEffect 用于组件更新时，需要立即执行的函数

useEffect(() => { console.log('被调用了'); return () => { console.log('我要被卸载了'); } }, [count])
