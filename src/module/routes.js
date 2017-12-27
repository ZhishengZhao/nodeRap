import App from './App.vue';
import mainpage from './mainpage/mainpage.vue';
import welcome from './mainpage/welcome.vue';
import joycenter from './joy/index.vue';
import detail from './detail/index.vue';
import NotFound from './404.vue';
import user_common from './views/user/common.vue';

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
        path: 'joycenter',
        component: joycenter,
        name: 'joycenter',
        meta: {
            title: '嘉年华'
        }
    }, {
        path: 'user_common',
        component: user_common,
        name: 'user_common',
        meta: {
            title: 'node rap'
        }
    }
    ]
}, {
    path: '*',
    component: NotFound,
    name: 'notfound',
    meta: {
        title: '我去，丢了'
    }
}];

export default configRoutes