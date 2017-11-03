import Vue from 'vue';
import VueResource from 'vue-resource';
import { getUrl } from 'src/libs/tools.js';
import goLogin from 'common/login/index.js';
Vue.use(VueResource);
Vue.http.options.emulateJSON = true;

export const _get = (url, data, callback, catchCallback) => {
    Vue.http.get(url, {
        params: data
    }).then((response) => {
        if (loginHandler(response.data)) {
            callback(response.data);
        }
    }, (response) => {
        if (!catchCallback) {
            console.log(response);
        } else {
            catchCallback();
        }
    });
};

export const _post = (url, data, callback, catchCallback) => {
    Vue.http.post(url, data).then((response) => {
        if (loginHandler(response.data)) {
            callback(response.data);
        }
    }, (response) => {
        if (!catchCallback) {
            console.log(response);
        } else {
            catchCallback(response);
        }
    });
};

export const creatAPI = (url, type, params, callback) => {
    if (type === 'post') {
        return _post(url, params, (data) => {
            callback && callback(data)
        });
    } else {
        return _get(url, params, (data) => {
            callback && callback(data)
        });
    }
};

function loginHandler(data) {
    if (!data.success && data.code === 'logout') {
        goLogin.create(() => {
            window.location.reload();
        });
        return false;
    } else {
        return true;
    }
}