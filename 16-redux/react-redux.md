# react-redux

> 目的

* 记录下之后练习react-redux的一些细节
* redux和react-redux肯定是要安装的

> 练习

1. src下新建的store，里面的index.js
    * 需要安装`yarn add redux-devtools-extension -D`,这个是使用redux开发工具，在f12种可以调试使用
    * 需要安装`yarn add redux-thunk -S`,这是一个把同步dispatch变成异步dispatch的中间件
    * store下reducer文件夹下user的代码
        ```js
        let user = [];

        export default (state=user, action) => {
            switch(action.type){
                case "ADD_USER":
                    return [...state, {
                        id: Date.now(),
                        name: action.payload.name,
                        age: (Math.random() * 10 + 1) | 0,
                    }];
                case "UPDATE_USER":
                    return [...state, ...action.payload]    
                default: 
                    return state;
            }
        }
        ```
    * store下index.js的代码
        ```js
        import {createStore, combineReducers, applyMiddleware} from 'redux'

        import {composeWithDevTools} from 'redux-devtools-extension'

        import thunk from 'redux-thunk'

        import user from './reducer/user'

        const store = createStore(
            combineReducers({
                user
            }),
            // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
            composeWithDevTools(
                applyMiddleware(thunk)
            )
        )

        export default store;        
        ```

2. 解决跨域问题，在src下新建一个setupProxy.js,需要安装`yarn add http-proxy-middleware -S`
    ```js
    // setupProxy.js
    const proxy = require('http-proxy-middleware');

    module.exports = function(app) {
        app.use(
            proxy('/api', {
                target: 'http://localhost:7777/',
                pathRewrite: {
                    '^/api': ''
                }
            })
        );
    };
    ```
3. 前端User组件，主要看下connect怎么使用，connect后，state的数据和dispatch都会挂在this.props上
    * 具体代码如下
        ```js
        import React from 'react'

        import {connect} from 'react-redux'

        import axios from 'axios'

        class User extends React.Component{
            constructor(props){
                super(props);
                this.inputEl = null;
                this.addUser = this.addUser.bind(this);
            }

            async componentDidMount(){
                async function updateAction(dispatch){
                    let res = await axios({
                        url: "/api/users"
                    })
                    dispatch({
                        type: "UPDATE_USER",
                        payload: res.data
                    })
                }
                this.props.dispatch(updateAction)
            }

            addUser(){
                let name = this.inputEl.value;
                this.props.dispatch({
                    type: "ADD_USER",
                    payload: {
                        name
                    }
                })
                this.inputEl.value = "";
            }
            render(){
                let {user} = this.props;
                return (
                    <div>
                        <h1>User</h1>
                        <input type="text" ref={el => this.inputEl = el}/> <button onClick={this.addUser}>add</button>
                        <ul>
                            {user.map(item => (<li key={item.id}>{item.name} - {item.age}</li>))}
                        </ul>
                    </div>
                )
            }
        }

        export default connect(state => {
            return {
                user: state.user,
            }
        })(User);        
        ```    

4. 这里还是在贴下react前端项目中，src下的index.js里的一些代码，来看下react-redux第一步该怎么用
    ```js
    import React from 'react';
    import ReactDOM from 'react-dom';
    import './index.css';
    import App from './App';
    import * as serviceWorker from './serviceWorker';
    import {BrowserRouter} from 'react-router-dom'
    import {Provider} from 'react-redux'

    import store from './store'


    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>, 
        document.getElementById('root')
    );

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.unregister();
    ```        