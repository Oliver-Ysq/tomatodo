## 项目收获
1. 项目搭建：使用create-react-app脚手架，antd，typescript，sass，axios构建项目
2. don't repeat yourself：类似功能的抽离，UI组件化
### JS
1. async await的使用（配合axios）
### React
1. <Cpn {...obj}> ： 把obj的所有属性传入Cpn作为props
### React Router
1. withRouter
   - 坑点：组件的props打印出来为`{}`，于是google得到解答
   - 作用：把不是通过路由切换过来的组件中，将react-router 的 history、location、match 三个对象传入props对象上
   - 用法：
     ```
     import {withRouter} from 'react-router-dom'
     class Cpn extends Component{...}
     export default withRouter(Cpn)
     ``` 
2. exact
   - 作用：同样是为了增加准确性。当路由路径出现丝毫不同都会报错
3. history
   - this.props.history.push(url)
   - 作用：实现编程跳转
4. 如何在组件外部获取history进行跳转？？？？
  - 起初：使用pushstate，仅仅改变了url未进行跳转； 使用window.location.href='xx'强制跳转，但会刷新页面
  - 解决方法：在github中找到对应方法
  ```
  //history.js
  import { createBrowserHistory } from 'history';
  const history = createBrowserHistory();
  export default history;
  //index.js
  import history from './history.js'
  <Router history={history}>  //监听了history的变化
    <Route></Route>...
  </Router>
  ```
5. 路由配置
```
import { createBrowserHistory } from 'history';

const ENV = process.env.NODE_ENV;
let publicUrl:string = '';

if(ENV === 'development'){
	publicUrl = '/';
}else if(ENV === 'production'){
	publicUrl = '/jirengu-potato';
}


const history = createBrowserHistory({
	basename: publicUrl
});

export default history
```
### React Redux

### axios
1. create 创建一个axios对象
   ```
   const instance = axios.create({
   baseURL: 'xxx',
   headers: { 'value':key }
   });
   ```
2. interceptors 拦截器
   1. instance.interceptors.request.use(function,function)  //对get进行处理
      - 第一个参数为请求成功的回调，第二个为失败的回调。
      - 函数的参数为resolve或reject中传递的参数
   2.  instance.interceptors.response.use(function,function)  //对post进行处理
       - 参数同上
### SCSS
1. calc()
   - 例：`width: calc(50% - 8px)`， 可以实现**百分比**和**像素**混用
