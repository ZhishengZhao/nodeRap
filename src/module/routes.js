// const App = resolve => require('./App.vue', resolve);
// const detail = resolve => require('./detail/index.vue', resolve);

import App from './App.vue';
import detail from './detail/index.vue';
import request from './detail/request.vue';
import mainpage from './mainpage/mainpage.vue';
import welcome from './mainpage/welcome.vue';
// const request = resolve => require('./detail/request.vue', resolve);

let configRoutes = [{
    path: '/pages',
    component: App,
    children: [{
        path: 'welcome',
        component: welcome,
        name: 'welcome',
        meta: {
            title: '欢迎页'
        }
    },{
        path: 'mainpage',
        component: mainpage,
        name: 'mainpage',
        meta: {
            title: '首页'
        }
    },{
        path: 'detail',
        component: detail,
        name: 'rapDetail',
        meta: {
            title: '详情页'
        }
    },{
        path: 'requestData',
        component: request,
        name: 'requestData',
        meta: {
            title: '请求接口'
        }
    }]
}];

export default configRoutes