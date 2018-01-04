<template>
    <div class="page_compare">
        <el-row :gutter="20" class="border">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="接口地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="RAP地址">
                    <el-input v-model="form.rapAddress"></el-input>
                </el-form-item>
                <!-- 是否需要登录，是否app接口 -->
                <el-form-item>
                    <el-button type="primary" @click="compareData">COMPARE</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row :gutter="20" class="border">
            <el-col :span="10" class="pad20 grid-content bg-purple-dark part"></el-col>
            <el-col :span="1" class="pad20 grid-content bg-purple-dark">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </el-col>
            <el-col :span="10" class="pad20 grid-content bg-purple-dark part"></el-col>
        </el-row>
    </div>
</template>
<script>
import rapHead from 'common/raphead.vue'
import rapFooter from 'common/footer.vue'

export default {
    data() {
        return {
            form: {
                address: '',
                rapAddress: ''
            }
        }
    },
    computed: {

    },
    components: {
        rapHead,
        rapFooter
    },
    mounted() {
    },
    methods: {
        compareData() {

        }
    }
}
</script>
<style lang="scss">
@import '../../assets/styles/jsonformate.css';
.page_compare {
    padding: 70px;
    .part {
        border: 2px solid #000;
        height: 600px;
        overflow-y: scroll;
    }
    .el-input {
        max-width: 1000px;
    }
}
</style>