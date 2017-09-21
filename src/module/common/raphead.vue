<!--
    created by zhaozhisheng on 07/17/2017
 -->
<template>
    <div class="rap_head">
        <div class="wid1080">
            <img class="logo" src="./img/logo1.png" alt="" @click="goMainPage">
            <!-- <a class="logo_title" href="javascript:;">Heioray</a> -->
        </div>
    </div>
</template>
<script>
export default {
    name: 'head',
    data() {
        return {}
    },
    computed: {

    },
    components: {},
    mounted() {

    },
    methods: {
        goMainPage() {
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="scss" scoped>
a {
    text-decoration: none;
    color: #fff;
}

.rap_head {
    width: 100%;
    height: 80px;
    background-color: #3B3E43;
    padding: 15px 0;
}

.wid1080 {
    width: 1080px;
    margin: 0 auto;
}

.logo_title {
    font-size: 36px;
    line-height: 80px;
}

.logo {
    width: 226px;
}
</style>