<!--
    created by zhaozhisheng on 08/15/2017
 -->
<template>
    <div class="page">
        <rap-head></rap-head>
        <div class="part_main">
            <p class="page_title">
                
            </p>
            <p class="btn" @click="goPage('main')">
            </p>
        </div>
        <!-- <joy-cooper></joy-cooper> -->
    </div>
</template>
<script>
import rapHead from '../common/raphead.vue'
import joyCooper from '../joy/cooperation.vue'
export default {
    name: 'welcome',
    data() {
        return {

        }
    },
    computed: {

    },
    components: {
        rapHead,
        joyCooper
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
<style lang="scss" scoped>
.part_main {
    height: 800px;
    padding: 100px;
    margin: 0 auto;
}
.page_title {
    width: 900px;
    height: 260px;
    margin: 30px auto;
    background: url('../../assets/images/logo.png') 0 center no-repeat;
    background-size: cover;
}
.btn {
    width: 210px;
    height: 94px;
    margin: 30px auto;
    background: url('../../assets/images/enter.png') 0 center no-repeat;
    background-size: cover;
}
</style>
