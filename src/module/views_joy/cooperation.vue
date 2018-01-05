<!--
    created by zhaozhisheng on 08/18/2017
 -->
<template>
    <section class="cooperation">
        <div class="title">合作伙伴</div>
        <div class="ranking">（如果有机会的话）</div>
        <div class="container clearfix">
            <div class="cooper_con"><img src="https://official.layabox.com/public/img/cooperation/1.png"></div>
            <div class="cooper_con"><img src="https://official.layabox.com/public/img/cooperation/2.png"></div>
            <div class="cooper_con"><img src="https://official.layabox.com/public/img/cooperation/7.png"></div>
            <div class="cooper_con"><img src="https://official.layabox.com/public/img/cooperation/4.png"></div>
            <div class="cooper_con"><img src="https://official.layabox.com/public/img/cooperation/5.png"></div>
            <div class="cooper_con"><img src="https://official.layabox.com/public/img/cooperation/6.png"></div>
            <div class="cooper_con"><img src="https://official.layabox.com/public/img/cooperation/3.png"></div>
            <div class="cooper_con"><img src="https://official.layabox.com/public/img/cooperation/8.png"></div>
            <div class="cooper_con"><img src="https://official.layabox.com/public/img/cooperation/9.png"></div>
            <div class="cooper_con"><img src="https://official.layabox.com/public/img/cooperation/10.png"></div>
            <div class="cooper_con"><img src="https://official.layabox.com/public/img/cooperation/11.png"></div>
            <div class="cooper_con"><img src="https://official.layabox.com/public/img/cooperation/12.png"></div>
            <div class="cooper_con"><img src="https://official.layabox.com/public/img/cooperation/13.png"></div>
            <div class="cooper_con"><img src="https://official.layabox.com/public/img/cooperation/14.png"></div>
            <div class="cooper_con"><img src="https://official.layabox.com/public/img/cooperation/15.png"></div>
            <div class="cooper_con"><img src="https://official.layabox.com/public/img/cooperation/16.png"></div>
            <div class="cooper_con"><img src="https://official.layabox.com/public/img/cooperation/17.png"></div>
            <div class="col-lg-2 col-md-2 col-sm-4 col-xs-6"><img src="https://official.layabox.com/public/img/cooperation/18.png"></div>
        </div>
    </section>
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

    }
}
</script>
<style lang="scss" scoped>
.cooperation {
    position: relative;
    width: 100%;
    min-height: 420px;
    background-color: #3B3E43;
    border-bottom: 1px solid #282828;
    padding: 50px 0;
    .title {
        position: relative;
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: white;
        font-size: 40px;
        margin-bottom: 10px;
    }
}

.cooperation .ranking {
    width: 100%;
    min-height: 30px;
    line-height: 30px;
    color: white;
    text-align: center;
    margin-bottom: 40px;
}

.container {
    max-width: 930px;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    div {
        float: left;
    }
}

.cooper_con {
    position: relative;
    min-height: 1px;
    height: 50px;
    padding-right: 15px;
    padding-left: 15px;
    img {
        max-width: 150px;
        width: 100%;
        vertical-align: middle;
        border: 0;
    }
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: " ";
}

.clearfix:after {
    clear: both;
}
</style>