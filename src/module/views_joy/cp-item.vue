<template>
    <div ref="cpRef" class="cp-container" :style="{'transform': 'rotate('+ cpRotateDegreeX +'deg)'}" @touchmove.prevent="cpTouchMove($event)" @touchstart.eprevent="cpTouchStart($event)" @touchend.prevent="cpTouchEnd($event)">
        <div class="cp-item">
            <!-- <p :style="{'transform': 'translate(0px, ' + curMoveDistance  + 'px) translateZ(0px)'}"></p> -->
        </div>
    </div>
</template>
<script>
/* global AXD, axdApp */
import 'libs/axdApp.js'
export default {
    name: 'bankbind',
    props: {
        turn: {
            type: String,
            default: '+'
        },
        run: {
            type: String,
            default: 'close'
        }
    },
    data() {
        return {
            /* cp position & degree */
            cpStartX: 0,
            cpStartY: 0,
            cpStartDegree: 0,
            cpRotateDegreeX: 0,
            cpRotateDegreeY: 0,
            curMoveDistance: 0,
            turnSpeed: 3,
            timer: 0
        }
    },
    computed: {
        cpParams() {
            let cp = this.$refs.cpRef
            let width = cp.offsetWidth
            let height = cp.offsetHeight
            let clientWidth = document.body.clientWidth
            let clientHeight = window.screen.height
            let positionLeft = cp.offsetLeft
            let positionTop = cp.offsetTop
            let centerX = positionLeft + width / 2
            let centerY = positionTop + height / 2
            console.log('原始参数', {
                radius: width / 2,
                centerX: centerX,
                centerY: centerY
            })
            return {
                radius: width / 2,
                centerX: centerX,
                centerY: centerY
            }
        }
    },
    components: {},
    created() {
        // this.init()
        // 关闭浏览器侧滑
        axdApp.send({
            module: 'webview',
            method: 'setSwipeBackEnable',
            params: {
                canSwipeBack: false
            },
            callback: function(data) {}
        })
        axdApp.send({
            module: 'webview',
            method: 'setNativeRefreshEnable',
            params: {
                enable: false
            },
            callback: function(data) {}
        })
    },
    mounted() {
        if (this.run == 'open') {
            this.autoRun(this.turn)
        }
        // this.autoRun(this.turn)
    },
    methods: {
        cpTouchStart(e) {
            let position = this.translatePosition(e.touches[0].pageX, e.touches[0].pageY)
            this.cpStartX = position.x
            this.cpStartY = position.y
            this.cpStartDegree = this.cpRotateDegreeX
        },
        cpTouchMove(e) {
            let x = this.cpStartX
            let y = this.cpStartY

            if ((this.getSqure(x) + this.getSqure(y)) > this.getSqure(this.cpParams.radius)) {
                console.log('超出操作区域')
                return false
            }

            let newPostion = this.translatePosition(e.touches[0].pageX, e.touches[0].pageY)
            let moveX = newPostion.x
            let moveY = newPostion.y
            console.log(moveX, moveY, this.cpStartX, this.cpStartY, this.cpRotateDegreeX)
            let deg = this.cpStartDegree + this.getEngle(this.cpStartY, this.cpStartX) - this.getEngle(moveY, moveX)
            this.cpRotateDegreeX = deg
        },
        cpTouchEnd(e) {

        },
        translatePosition(x, y) {
            x = x - this.cpParams.centerX
            y = this.cpParams.centerY - y

            return {
                x: x,
                y: y
            }
        },
        getSqure(n) {
            return n * n
        },
        getEngle(y, x) {
            // x = Math.abs(x)
            // y = Math.abs(y)
            return Math.atan2(y, x) * 180 / Math.PI
        },
        autoRun(direction) {
            this.timer = setInterval(() => {
                if (direction === '+') {
                    this.cpRotateDegreeX += this.turnSpeed
                } else {
                    this.cpRotateDegreeX -= this.turnSpeed
                }
            }, 30)
        }
    }
}
</script>
<style lang="scss">
@import 'src/assets/styles/aui-vars.scss';
@import 'src/assets/styles/rem.scss';
@import 'src/assets/styles/mixins.scss';
$designWidth: 750;
.cp-container {
    -webkit-tap-highlight-color: transparent;
    position: absolute;
    // left: px2rem(50);
    // top: px2rem(50);
    width: px2rem(200);
    height: px2rem(200);
    .cp-item {
        -webkit-tap-highlight-color: transparent;
        width: 100%;
        height: 100%;
        // border-radius: 50%;
        // border: 2px solid black;
        // text-align: center;
        // line-height: px2rem(200);
        // font-size: px2rem(100);
        // p {
        //     width: px2rem(80);
        //     height: px2rem(80);
        //     margin: px2rem(60);
        //     background-color: red;
        //     border-radius: 50%;
        // }
    }
}
</style>
