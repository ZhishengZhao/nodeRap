<!--
    created by zhaozhisheng on 08/11/2017
 -->
<template>
    <div>
        <div class="nine_unit">
            <cub-unit></cub-unit>
            <!-- <cub-unit></cub-unit>
            <cub-unit></cub-unit>
            <cub-unit></cub-unit>
            <cub-unit></cub-unit>
            <cub-unit></cub-unit>
            <cub-unit></cub-unit>
            <cub-unit></cub-unit>
            <cub-unit></cub-unit> -->
        </div>
        <!-- <div class="nine_unit">
            <cub-unit></cub-unit>
            <cub-unit></cub-unit>
            <cub-unit></cub-unit>
            <cub-unit></cub-unit>
            <cub-unit></cub-unit>
            <cub-unit></cub-unit>
            <cub-unit></cub-unit>
            <cub-unit></cub-unit>
            <cub-unit></cub-unit>
        </div>
        <div class="nine_unit">
            <cub-unit></cub-unit>
            <cub-unit></cub-unit>
            <cub-unit></cub-unit>
            <cub-unit></cub-unit>
            <cub-unit></cub-unit>
            <cub-unit></cub-unit>
            <cub-unit></cub-unit>
            <cub-unit></cub-unit>
            <cub-unit></cub-unit>
        </div> -->
    </div>
</template>
<script>
import cubUnit from 'joy/cubeUnit.vue'
export default {
    name: 'welcome',
    data() {
        return {

        }
    },
    computed: {
    },
    components: {
        cubUnit
    },
    mounted() {},
    methods: {
        
    }
}
</script>
<style lang="scss" scoped>
@import 'src/assets/reset.scss';
@import 'src/assets/styles/rem.scss';
$designWidth: 750;
.nine_unit {
    width: px2rem(395);
    height: px2rem(395);
}
</style>