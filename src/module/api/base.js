import Vue from 'Vue';
import VueResource from 'vue-resource';
import { getUrl } from '../../libs/tools.js';
Vue.use(VueResource);
Vue.http.options.emulateJSON = true;

export const _get = (url, data, callback, catchCallback) => {
    // url = getUrl(url);
    Vue.http.get(url, {
        params: data
    }).then((response) => {
        callback(response.data);
    }, (response) => {
        if (!catchCallback) {
            console.log(response);
        } else {
            catchCallback();
        }
    })
};

export const _post = (url, data, callback, catchCallback) => {
    // url = getUrl(url);
    // url = 'http://localhost:3000/' + url
    Vue.http.post(url, data).then((response) => {
        callback(response.data);
    }, (response) => {
        if (!catchCallback) {
            console.log(response);
        } else {
            catchCallback(response);
        }
    })
};

export const creatAPI = (url, type, params, callback) => {
    if (type === 'post') {
        return _post(url, params, (data) => {
            callback && callback(data)
        })
    } else {
        return _get(url, params, (data) => {
            callback && callback(data)
        })
    }
}