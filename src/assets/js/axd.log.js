import {
    log
} from 'src/store/api'
/* globals sessionStorage */
var logMixin = {
    data() {
        return {
            userPhone: ''
        }
    },
    mounted() {
        window.onerror = this.handleErr
        if (aixuedai.isUavoApp === 'y') {
            axdApp.send({
                module: 'user',
                method: 'getInfo',
                params: {},
                callback: function(res) {
                    this.userPhone = res.data.phone

                    // alert(this.userPhone)
                }
            })
        }
    },
    computed: {
        online() {
            let hostname = window.location.hostname
            return hostname.indexOf('m.aixuedai.com') >= 0 || hostname.indexOf('app.aixuedai.com') >= 0
        }
    },
    methods: {
        log(msg = '', type = '') {
            // online false 默认为开发环境，;
            // 如果是线上环境，信息不输出(可以通过window.axdlog查看);
            let ua = ',ua=' + navigator.userAgent
            let userId = 'userId=' + sessionStorage.getItem('userId') || aixuedai.userId
            let userPhone = ',userPhone=' + this.userPhone
            msg = userId + userPhone + msg + ua
            if (this.online) {
                log({
                    msg: msg,
                    type: type
                }, (res) => {
                    //  console.log('日志已发送 。。。。')
                })
            } else {
                console.log(msg)
            }
            //  alert(msg)
        },
        handleErr(msg, url, lineNo, columnNo, error) {
            var string = msg.toLowerCase()
            var substring = 'script error'
            if (string.indexOf(substring) > -1) {
                console.log('Script Error: See Browser Console for Detail')
            } else {
                var message = [
                    'Message: ' + msg,
                    'URL: ' + url,
                    'Line: ' + lineNo,
                    'Column: ' + columnNo,
                    'Error object: ' + JSON.stringify(error)
                ].join(' - ')

                // alert(message)
                this.log(message, 'error')
            }
            return false
        }
    }
}

export default logMixin
