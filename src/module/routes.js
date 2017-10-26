import App from './App.vue';

import mainpage from './mainpage/mainpage.vue';
import welcome from './mainpage/welcome.vue';
import register from './mainpage/register.vue';

import detail from './detail/index.vue';

import NotFound from './404.vue';

let configRoutes = [{
    path: '/',
    component: App,
    redirect: { name: 'welcome' },
    children: [{
        path: '',
        component: welcome,
        name: 'welcome',
        meta: {
            title: '欢迎页'
        }
    }, {
        path: 'mainpage',
        component: mainpage,
        name: 'mainpage',
        meta: {
            title: '首页'
        }
    }, {
        path: 'detail',
        component: detail,
        name: 'rapDetail',
        meta: {
            title: '详情页'
        }
    }, {
        path: 'register',
        component: register,
        name: 'register',
        meta: {
            title: '注册页面'
        }
    }]
}, {
    path: '*',
    component: NotFound,
    name: 'notfound',
    meta: {
        title: '我去，丢了'
    }
}];

export default configRoutes