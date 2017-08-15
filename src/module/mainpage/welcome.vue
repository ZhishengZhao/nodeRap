<!--
    created by zhaozhisheng on 08/15/2017
 -->
<template>
    <div class="page">
        <p class="title">
            NODE & RAP
        </p>
        <p class="btn" @click="goPage('main')">
            进入首页
        </p>
    </div>
</template>
<script>
export default {
    name: 'welcome',
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
        goPage(params) {
            this.$router.push({
                path: 'mainpage'
            })
        }
    }
}
</script>
<style lang="scss">
.page {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
}
.title {
    text-align: center;
    font-size: 50px;
    font-weight: bold;
    // line-height: 200px;
    margin: 200px 100px 100px;
}
.btn {
    margin: 0 auto;
    width: 120px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #000;
    border-radius: 7px;
    text-align: center;
}
</style>
