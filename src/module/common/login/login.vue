<!--
    created by zhaozhisheng on 02/11/2017
 -->
<template>
    <rap-dialog id="login_component">
        <template slot="content" v-show="show">
            <h2>Welcome {{showTxt}}</h2>
            <section v-show="actionLogin">
                <input type="text" class="input__login" v-model="form.name" placeholder="用户名">
                <input type="password" class="input__login" v-model="form.pwd" placeholder="密码">
                <p>
                    <input type="checkbox">&nbsp;记住密码
                    <span class="fr" @click="findPwd">忘记密码</span>
                </p>
                <p class="btn__full" @click="doLogin">登录</p>
                <p class="tip--switchlogin" @click="actionLogin = false">要是没账户的话，先注册一个吧</p>
            </section>
            <section v-show="!actionLogin">
                <input type="text" class="input__login" v-model="form.name" placeholder="用户名">
                <input type="text" class="input__login" v-model="form.email" placeholder="邮箱">
                <input type="password" class="input__login" v-model="form.pwd" placeholder="密码">
                <input type="password" class="input__login" v-model="form.pwdconfirm" placeholder="确认密码">
                <p @click="registerByTel"> 手机号注册 </p>
                <p class="btn__full" @click="doLogin">注册</p>
                <p class="tip--switchlogin" @click="actionLogin = true">有账号的话直接登录吧</p>
            </section>
        </template>
    </rap-dialog>
</template>
<script>
import rapDialog from 'src/components/dialog/index.vue'
import { user } from '../../api/api.js'
import goLogin from './index.js'
export default {
    name: 'login_component',
    props: ['callback', 'show'],
    data() {
        return {
            form: {
                name: '',
                email: '',
                pwd: '',
                pwdconfirm: ''
            },
            actionLogin: true
        }
    },
    computed: {
        showTxt() {
            return this.actionLogin ? 'Back' : 'to Join Us'
        }
    },
    components: {
        rapDialog
    },
    mounted() {

    },
    methods: {
        doLogin() {
            let action = this.actionLogin ? 'login' : 'register'

            user[action](this.form, (data) => {
                goLogin.destroy()
                if (data.success) {
                    console.log('登陆/注册成功，跳转主页')
                    this.callback()
                } else {
                    this.$alert(data.desc || '系统异常 稍后再试')
                }
            })
        },
        findPwd() {

        },
        registerByTel() {

        }
    }
}
</script>
<style lang="scss">
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
.tip--switchlogin {
    text-align: center;
    color: #7f7f7f;
}
.padleft5 {
    padding-left: 5px;
}
</style>