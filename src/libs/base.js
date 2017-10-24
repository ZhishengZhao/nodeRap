import Vue from 'Vue';
import VueResource from 'vue-resource';
import { getUrl } from './tools.js';
Vue.use(VueResource);
Vue.http.options.emulateJSON = true;

export const _get = (url, data, callback, catchCallback) => {
    url = getUrl(url);
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
    url = getUrl(url);
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

// function getUrl(url) {
//     var origin = window.location.origin.split(':');
//     origin.pop();
//     origin.join('');
//     url = origin.join(':') + ':3000/' + url;
//     return url;
// }