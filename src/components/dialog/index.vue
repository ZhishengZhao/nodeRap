<!--
    created by zhaozhisheng on 02/11/2017
 -->
<template>
    <div class="dialog__container">
        <div class="dialog__content">
            <slot name="content"></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'rapdialog',
    props: {

    }, 
    data() {
        return {

        }
    },
    watch: {

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
.dialog__container {
    .dialog__content {
        width: 440px;
        height: auto;
        padding-bottom: 20px;
        background: #fff;
        z-index: 30;
        padding: 20px;
        border-radius: 10px;
        font-size: 15px;
    }
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    .dialog__content {
        position: absolute;
        left: 50%;
        top: 50%;
        width: auto;
        height: auto;
        -webkit-transform: translate(-50%,-50%); 
        transform: translate(-50%,-50%);
    }
}
</style>