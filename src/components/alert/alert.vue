<!--
    created by zhaozhisheng on 02/11/2017
 -->
<template>
    <rap-dialog id="login_component">
        <template slot="content">
            <slot name="title"></slot>
            <slot name="content"></slot>
            <slot name="btn">
                <p></p>
            </slot>
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