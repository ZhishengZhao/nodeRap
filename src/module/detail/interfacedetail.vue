<template>
<div class="area_interinfo mb20">
    <h3>接口详情</h3>
    <p>
        <span class="wd70 mr20">
            接口名称
        </span>
        <span>
            {{detail.name}}
        </span>
    </p>
    <p>
        <span class="wd70 mr20">
            请求类型
        </span>
        <span>
            {{detail.type}}
        </span>
    </p>
    <p>
        <span class="wd70 mr20">
            请求url
        </span>
        <span>
            {{detail.url}}
        </span>
    </p>
</div>
</template>
<script>
export default {
    props: {
        detail: {
            type: Object
        }
    },
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
* {
    box-sizing: border-box;
}
.mb20 {
    margin-bottom: 20px;
}
</style>