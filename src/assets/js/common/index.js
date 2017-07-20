import CryptoJS from 'libs/encrypt'
/**
 * [密码加密]
 * @param  {[string]} password [密码]
 * @return {[string]}          [加密后的密码]
 */
var getEncryptedPsw = (password) => {
    var aixuedaiAeskey = 'YWl4dWVkYWk0MDAtODY3MQ==' // aixuedai400-8671
    let key = CryptoJS.enc.Base64.parse(aixuedaiAeskey)
    let iv = CryptoJS.enc.Base64.parse(aixuedaiAeskey)

    return CryptoJS.AES.encrypt(password, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    }).toString()
}

/**
 *  即将做废。用上面的----
 */

var pwdMixin = {
    methods: {
        getEncryptedPsw(password) {
            var aixuedaiAeskey = 'YWl4dWVkYWk0MDAtODY3MQ==' // aixuedai400-8671
            let key = CryptoJS.enc.Base64.parse(aixuedaiAeskey)
            let iv = CryptoJS.enc.Base64.parse(aixuedaiAeskey)

            return CryptoJS.AES.encrypt(password, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.ZeroPadding
            }).toString()
        }
    }
}

/**
 * [浏览器参数分割]
 * @param  {[string]} str [浏览器search]
 * @return {[object]}     [{key:value}]
 */
/* globals location */
var parseQuery = (query = location.search) => {
    var res = {}
    query = query.trim().replace(/^(\?|#|&)/, '')
    if (!query) {
        return res
    }
    query.split('&').forEach(function(param) {
        var parts = param.replace(/\+/g, ' ').split('=')
        var key = decodeURIComponent(parts.shift())
        var val = parts.length > 0 ? decodeURIComponent(parts.join('=')) : null

        if (res[key] === undefined) {
            res[key] = val
        } else if (Array.isArray(res[key])) {
            res[key].push(val)
        } else {
            res[key] = [res[key], val]
        }
    })
    return res
}

export {
    pwdMixin,
    parseQuery,
    getEncryptedPsw
}
