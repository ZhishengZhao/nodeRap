<template>
    <div class="innercon">
        <div class="container">
            <div class="side front">
            </div>
            <div class="side back">
            </div>
            <div class="side left">
            </div>
            <div class="side right">
            </div>
            <div class="side top">
            </div>
            <div class="side bottom">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'cubUnit',
    data() {
        return {
            rotateDegreeX: 0,
            rotateDegreeY: 0
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
@import 'src/assets/reset.scss';
@import 'src/assets/styles/rem.scss';
$designWidth: 750;

* {
    border-sizing: border-box;
}


img {
    max-width: px2rem(1080) !important;
}

/* 骰子构成部分 */


.innercon {
    display: inline-block;
    width: px2rem(200);
    height: px2rem(200);
    float: left;
    -webkit-transform: translateZ(-px2rem(100));
    transform: translateZ(-px2rem(100));
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    transform-origin: px2rem(100) px2rem(100);
    transform: rotateX(0deg) rotateY(0deg);
    -webkit-perspective: px2rem(1200);
    perspective: px2rem(1200);
}

.container {
    top: 0;
    left: 0;
    margin: 0;
    position: absolute;
    -webkit-transform: translateZ(-px2rem(100));
    transform: translateZ(-px2rem(100));
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    transform-origin: px2rem(100) px2rem(100);
}

.side {
    width: px2rem(200);
    height: px2rem(200);
    position: absolute;
    transform-origin: 50% 50% 0;
    border-radius: px2rem(26);
}

.side_mask:after {
    content: '';
    width: px2rem(200);
    height: px2rem(200);
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, .1);
    border-radius: px2rem(26);
}

.front {
    -webkit-transform: translateZ(px2rem(100));
    transform: translateZ(px2rem(100));
    background-color: #ff0000;    
    background-size: cover;
}

.back {
    -webkit-transform: rotateY(180deg) translateZ(px2rem(100));
    transform: rotateY(180deg) translateZ(px2rem(100));
    background-color: #ffff00;
    background-size: cover;
}

.left {
    -webkit-transform: rotateY(-90deg) translateZ(px2rem(100));
    transform: rotateY(-90deg) translateZ(px2rem(100));
    background-color: #000;
    background-size: cover;
}

.right {
    -webkit-transform: rotateY(90deg) translateZ(px2rem(100));
    transform: rotateY(90deg) translateZ(px2rem(100));
    background-color: #00ff00;
    background-size: cover;
}

.top {
    -webkit-transform: rotateX(90deg) translateZ(px2rem(100));
    transform: rotateX(90deg) translateZ(px2rem(100));
    background-color: #0000ff;
    background-size: cover;
}

.bottom {
    -webkit-transform: rotateX(-90deg) translateZ(px2rem(100));
    transform: rotateX(-90deg) translateZ(px2rem(100));
    background-color: #00ffff;
    background-size: cover;
}
</style>
