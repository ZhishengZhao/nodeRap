<template>
    <div class="page_compare">
        <el-row :gutter="20" class="border">
            <el-col :span="11" class="pad20 grid-content bg-purple-dark part">
                <textarea class="size_text" v-model="rapData" name="" id="" cols="30" rows="10"></textarea>
            </el-col>
            <el-col :span="1" class="pad20 grid-content bg-purple-dark">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </el-col>
            <el-col :span="11" class="pad20 grid-content bg-purple-dark part">
                <textarea class="size_text" v-model="realData" name="" id="" cols="30" rows="10"></textarea>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="border">
            <el-form ref="form" :model="form" label-width="80px">
                <!-- <el-form-item label="接口地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="RAP地址">
                    <el-input v-model="form.rapAddress"></el-input>
                </el-form-item> -->
                <!-- 是否需要登录，是否app接口 -->
                <el-form-item>
                    <el-button type="primary" @click="compareData">COMPARE</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row :gutter="20">
            <div class="area_result" > <!-- v-html="compareResult" -->
                {{compareResult}}
            </div>
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
            },
            rapData: null,
            realData: null,
            compareResult: '<p>11111</p>',
            resultArr: []
        }
    },
    computed: {
        // compareResult() {
        //     return this.resultArr.map((item) => {
        //         return '<p>' + item + '</p>'
        //     }).join('') + '<p>11111</p>'
        // }
    },
    watch: {
        resultArr(val) {
            console.log('fuck you', val)
            this.compareResult = val.map((item) => {
                return '<p>' + item + '</p>'
            }).join('') + '<p>11111</p>'
            console.log(this.compareResult)
        }
    },
    components: {
        rapHead,
        rapFooter
    },
    mounted() {
    },
    methods: {
        compareData() {
            let {rapData, realData} = this.$data
            // console.log('输入数据：', rapData, realData)
            if (typeof rapData == 'string') {
                rapData = JSON.parse(rapData)
            }

            if (typeof realData == 'string') {
                realData = JSON.parse(realData)
            }

            console.log('即将开始比对')
            this.compare(rapData, realData)
            // this.resultArr = []
            // let rapKeys = Object.keys(rapData).sort()
            // let realKeys = Object.keys(realData).sort()

            // let result = []
            // rapKeys.map((key) => {
            //     if (realData.hasOwnProperty(key)) {
            //     // if (realData[key]) {
            //         if (this.isObject()) {

            //         }
            //     } else {
            //         result.push('key ' + key + ' is missing from realData')
            //     }
            // })
        },
        compare(rapData, realData, key) {
            console.log('rapData, realData, key')
            console.log(rapData, realData, key)
            let _this = this
            let rapDataType = this.getType(rapData), 
                realDataType = this.getType(realData)
            
            if (rapDataType == realDataType) {
                if (rapDataType == 'object') {
                    console.log('object compare')
                    let rapKeys = Object.keys(rapData)

                    rapKeys.forEach((key => {
                        if (realData.hasOwnProperty(key)) {
                            this.compare(rapData[key], realData[key], key)
                        } else {
                            console.log('字段缺失')
                            _this.resultArr.push('key ' + key + ' is missing in realData')
                            console.log('this.resultArr', _this.resultArr)
                        }
                    }))
                } else if (rapDataType == 'array') {
                    if (this.sameVoList(rapDataType)) {
                        
                    }

                    // if (!rapData.length) {

                    // }

                    // if (!realData.length) {

                    // }
                } else {
                    console.log('其他字符类型，不用对比')
                }
            } else {
                this.resultArr.push('key ' + key + '\'s Type diff between rap and real:')
            }
        },
        sameVoList(list) {
            // 校验是否数组内都是同构对象，暂时默认true
            return true
        },
        jsonConvert(obj) {
            if (typeof obj == 'string') {
                // obj.
            } else {
                return obj
            }
        },
        getType(data) {
            if (data) {
                let type = typeof data 
                if (type == 'object') {
                    if (data.toString() == '[object Object]') {
                        return 'object'
                    } else {
                        return 'array'
                    }
                } else {
                    return type
                }
            } else {
                return null
            }
        },
        isObject(obj) {

        }, 
        isArray(arr) {

        },
        isNumOrStr(param) {

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
        height: 400px;
        // overflow-y: scroll;
    }
    .el-input {
        max-width: 1000px;
    }
    .size_text {
        width: 100%;
        height: 100%;
    }
}
</style>