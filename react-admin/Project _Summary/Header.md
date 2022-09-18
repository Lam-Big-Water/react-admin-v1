一.Header页面

1.使用 useState 进行状态初始化，以及修改。

const [isFull,setScreen] = useState(false)

2.使用 useEffect 用于组件更新时，需要立即执行的函数

useEffect(() => {
    console.log('被调用了');
    return () => {
        console.log('我要被卸载了');
    }
}, [count])

3.使用 dayjs依赖 对时间的格式进行自定义

import dayjs from 'dayjs';

const [date,setTime] = useState(dayjs().format('YYYY年 MM月 DD日 HH:mm:ss'))

4.使用 screenfull依赖 实现全屏效果

import screenfull from 'screenfull/dist/screenfull';

5.使用 uselocation 获取路径参数

const location = useLocation();

let pathname = location.pathname

let pathKey = location.pathname.split('/').pop()

6.使用jsonp依赖 跨域获取天气信息

流程：

1.设置时间，天气，全屏，退出

2.截取location.pathname 参数，并用递归获取参数对应的中文标题








