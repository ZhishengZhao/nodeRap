<template>
    <div class="area_interinfo">
        <h3>接口详情</h3>
        <hr class="mb20">
        <p>
            <span class="wd100 fs16 mr20">
                接口名称：
            </span>
            <span>
                {{detail.name}}
            </span>
        </p>
        <p>
            <span class="wd100 fs16 mr20">
                请求类型：
            </span>
            <span>
                {{detail.type}}
            </span>
        </p>
        <p>
            <span class="wd100 fs16 mr20">
                请求地址：
            </span>
            <span>
                {{detail.url}}
            </span>
        </p>
        <div class="block_preview">
            <a :href="url">
                预览
            </a>
        </div>
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
        url() {
            return 'http://localhost:3000/rap/mock/' + this.detail.projectId + this.detail.url
        }
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

.area_interinfo {
    position: relative;
    width: 770px;
    height: 150px;
    h3 {
        font-size: 20px;
    }
    p {
        line-height: 30px;
        font-size: 16px;
        padding-left: 100px;
        span {
            font-weight: bold;
        }
    }
    .mb20 {
        margin-bottom: 10px;
    }

    .wd100 {
        display: inline-block;
        width: 90px;
    }
    .block_preview {
        position: absolute;
        left: 5px;
        top: 44px;
        width: 80px;
        height: 80px;
        border: 4px solid #000;
        border-radius: 10px;
        text-align: center;
        padding-left: 0;
        a {
            font-size: 30px;
            line-height: 72px;
            text-decoration: none;
            color: #000;
        }
    }
}
</style>
