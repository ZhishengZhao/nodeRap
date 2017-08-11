// const App = resolve => require('./App.vue', resolve);
// const detail = resolve => require('./detail/index.vue', resolve);

import App from './App.vue'
import detail from './detail/index.vue'


let configRoutes = {
    path: '/pages',
    component: App,
    children: {
        path: 'detail',
        component: detail,
        name: 'rapDetail',
        meta: {
            title: '详情页'
        }
    }
};

export default configRoutes