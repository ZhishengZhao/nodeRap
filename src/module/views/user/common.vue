<!--
    created by zhaozhisheng on 26/12/2017
 -->
<template>
    <div>
        <rap-head></rap-head>
        <!-- <h1>HELP CENTER</h1> -->
        <rap-dialog v-show="dialog_reset__show">
            <div slot="content">
                <h2>User Info</h2>
                <!-- <input type="text" class="input__login" v-model="form.name" placeholder="用户名"> -->
                <input type="password" class="input__login" v-model="form.pwd" placeholder="新密码">
                <input type="password" class="input__login" v-model="form.pwdconfirm" placeholder="确认密码">
                <input type="hidden" v-model="toke2">
                <el-button type="primary" @click="resetPassword">确定</el-button>
            </div>
        </rap-dialog>
    </div>
</template>
<script>
import rapDialog from 'src/components/dialog/index.vue'
import rapHead from 'common/raphead.vue'
import { user, userProject } from 'api/api.js'
import { getUrlParam } from 'src/libs/utils.js'
import {
    userNameCheck,
    passwordCheck,
    emailCheck
} from 'src/libs/fomatecheck.js'
export default {
    name: 'common',
    data() {
        return {
            type: '',
            token: '',
            toke2: '',
            dialog_reset__show: false,
            outTime: 600000,
            form: {
                name: '',
                email: '',
                pwd: '',
                pwdconfirm: ''
            }
        }
    },
    computed: {
    },
    components: {
        rapHead,
        rapDialog
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            this.type = getUrlParam('type')
            if (this.type === 'reset') {
                this.dialog_reset__show = true
            }
            this.token = getUrlParam('token')
            this.token2 = getUrlParam('token2')
            this.tokenValidCheck()
        },
        tokenValidCheck() {
            let nowTime = new Date().getTime()
            let token = this.token
            let tokenTime = token.substr(this.token.length - 13)

            if ((nowTime - tokenTime) > this.outTime || !this.token2) {
                this.$alert('该邮件已失效，去重新找吧')
                this.$router.push({
                    path: '/'
                })
            }
        },
        resetPassword() {
            if (!passwordCheck(this.form.pwd) || !passwordCheck(this.form.pwdconfirm)) {
                this.$alert('密码格式错误，请重新输入')
                return
            } else if (this.form.pwd !== this.form.pwdconfirm) {
                this.$alert('密码不一致，请重新输入')
                return
            }

            user.resetPwd({
                token: this.token2,
                pwd: this.form.pwd
            }, (data) => {
                this.dialog_reset__show = false
                if (data.success) {
                    this.$alert('重置成功')
                } else {
                    this.$alert(data.desc || '系统错误，请稍后再试')
                }
                setTimeout(() => {
                    this.$router.push({
                        path: '/'
                    })
                }, 2000)
            })
        }
    }
}
</script>
<style lang="scss">
h1 {
    text-align: center;
}
.input__login {
    display: block;
    width: 400px;
    height: 50px;
    line-height: 50px;
    text-indent: 10px;
    margin: 10px auto;
    border: 1px solid rgba(50,58,69,.2);
    border-radius: 5px;
    font-size: 18px;
}
.btn__full {
    width: 400px;
    height: 50px;
    line-height: 50px;
    font-size: 25px;
    text-align: center;
    margin: 10px auto;
    background: #ccc;
    border-radius: 20px;
}
</style>