<template>
    <transition name="fade">
        <router-view class="view"></router-view>
    </transition>
</template>
<script>
export default {
    name: 'app',
    filters: {},
    data() {
        return {}
    },
    computed: {},
    components: {},
    created() {},
    mounted() {
    },
    watch: {},
    methods: {}
}
</script>
<style lang="scss">
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
.fr {
    float: right;
}
.wid1080 {
    width: 1080px;
    margin: 0 auto;
}
.content_top {
    padding: 20px;
}
.content {
    background: #f2f2f2;
    padding: 10px 20px 30px 20px;
    border-radius: 5px 5px 20px 20px;
}
.el-tree {
    background: #f2f2f2;
    border: none;
}
</style>
