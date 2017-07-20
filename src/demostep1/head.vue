<!--
    created by zhaozhisheng on 07/17/2017
 -->
<template>
    <div class="rap_head">
        <div class="wid1080">
            <img class="logo" src="" alt="">
            <a class="logo_title" href="###">一个XXX的rap接口系统</a>
        </div>
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark bor20">
                <h1>A Simple Rap System with Node, MongoDB, Vue & Webpack</h1>
            </div></el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name: 'head',
    data() {
        return {
            }
    },
    computed: {

    },
    components: {
    },
    mounted() {
        
    },
    methods: {

    }
}
</script>
<style lang="scss">
// @import '../assets/reset.scss';
a {
    text-decoration: none;
    color: #fff;
}
.rap_head {
    display: none;
    width: 100%;
    height: 80px;
    background-color: #20A0FF;
}
.wid1080 {
    width: 1080px;
    margin: 0 auto;
}
.logo_title {
    font-size: 36px;
    line-height: 80px;
}
</style>
