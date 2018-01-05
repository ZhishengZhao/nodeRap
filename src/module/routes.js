import App from './App.vue';
import welcome from './views/welcome.vue';
import mainpage from './views/project_list.vue';
import detail from './views/project_detail.vue';
import user_common from './views/common.vue';
import joycenter from './views_joy/index.vue';
import NotFound from './404.vue';

// -----------test--------

import compare from './detail/index_compare.vue';
import dCompare from './detail/demo_compare.vue';

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
        path: 'compare',
        component: compare,
        name: 'rapCompare',
        meta: {
            title: '接口校验'
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
    }, {
        path: 'demoCompare',
        component: dCompare,
        meta: {
            title: 'Demo Compare'
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