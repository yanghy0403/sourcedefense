// import logo from './logo.svg';

import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import config from './router/router'
import 'antd/dist/antd.css';
import './assets/style/global.scss'

import Login from './component/login.jsx'
import Register from './component/register.jsx';

//router为匹配到的路由组件,里面的内容必须return，不return就找不到渲染的组件
let router = config.routes.map((item, key) => {
  let user = JSON.parse(sessionStorage.getItem('user'));
  return <Route exact={item.exact} path={item.path} key={key} render={
    props => {
      //判断登录信息存不存在，不存在重定向到登录页
     
      if(user && user.username){
          if (item.children) {
            return <item.component {...props} routes={item.children} />
          } else {
            return <item.component {...props} />
          }
        }else{
          return <Redirect to="/login"/>
        }
    }
  } />
})


function App() {
   return (
    <Router>
      <Switch>
         {/* 登录页必须放在外面，否则重定向的时候找不到login组件 */}
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        { router } 
     
      </Switch>
    </Router>


  );
}

export default App;
