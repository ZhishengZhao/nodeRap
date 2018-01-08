module.exports = {
    // 获取目标值
    getUrlParam: function(paramName) {
        var reg = new RegExp('(^|&)' + paramName + '=([^&]*)(&|$)');
        var r = window.location.search.substr(1).replace('%20', '').match(reg);
        if (r !== null) {
            return unescape(r[2]);
        }
        return null;
    },
    // 正则校验
    isValidEmail: function(email) {
        return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(email);
    }
};