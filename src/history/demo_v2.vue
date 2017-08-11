<!--
    created by zhaozhisheng on 07/17/2017
 -->
<template>
    <div class="rap_page">
        <rap-head></rap-head>
        <div class="content wid1080">
            <el-row :gutter="20">
                <el-col :span="6" class="pad20 grid-content bg-purple-dark bor20">
                    <div class="grid-content bg-purple">
                        <h3>接口列表</h3>
                        <el-button @click="openInterDialog" type="info">add</el-button>
                        <el-tree :data="interList" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                    </div>
                </el-col>
                <el-col :span="18" class="pad20 grid-content bg-purple-dark bor20">
                    <div class="grid-content bg-purple-light">
                        <div class="block">
                            <el-button type="info">编辑</el-button>
                            <el-button type="info">保存</el-button>
                        </div>
                        <div class="area_request">
                            <h3>请求参数</h3>
                            <el-table
                            border
                            @cell-dblclick = "goEditRequest"
                            :data="requestParams"
                            style="width: 100%">
                                <el-table-column
                                label="变量名"
                                prop="key"
                                width="180">
                                    <template scope="scope">
                                        <span v-if="!scope.row.editFlag">{{ scope.row.value }}</span>
                                        <span v-if="scope.row.editFlag" class="cell-edit-input"><el-input v-model="inputColumn1" placeholder="请输入内容"></el-input></span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                label="含义"
                                prop="comments"
                                width="180">
                                    <template scope="scope">
                                        <span v-if="!scope.row.editFlag">{{ scope.row.value }}</span>
                                        <span v-if="scope.row.editFlag" class="cell-edit-input"><el-input v-model="inputColumn1" placeholder="请输入内容"></el-input></span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                label="类型"
                                prop="type">
                                    <template scope="scope">
                                        <span v-if="!scope.row.editFlag">{{ scope.row.value }}</span>
                                        <span v-if="scope.row.editFlag" class="cell-edit-input"><el-input v-model="inputColumn1" placeholder="请输入内容"></el-input></span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                label="备注"
                                prop="value">
                                    <template scope="scope">
                                        <span v-if="!scope.row.editFlag">{{ scope.row.value }}</span>
                                        <span v-if="scope.row.editFlag" class="cell-edit-input"><el-input v-model="inputColumn1" placeholder="请输入内容"></el-input></span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="area_response">
                            <h3>响应参数</h3>
                            <el-table
                            border
                            @cell-dblclick = "goEditResponse"
                            :data="responseParams"
                            style="width: 100%">
                                <el-table-column
                                label="变量名"
                                prop="key"
                                width="180">
                                    <template scope="scope">
                                        <span v-if="!scope.row.editFlag">{{ scope.row.value }}</span>
                                        <span v-if="scope.row.editFlag" class="cell-edit-input"><el-input v-model="inputColumn1" placeholder="请输入内容"></el-input></span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                label="含义"
                                prop="comments"
                                width="180">
                                    <template scope="scope">
                                        <span v-if="!scope.row.editFlag">{{ scope.row.value }}</span>
                                        <span v-if="scope.row.editFlag" class="cell-edit-input"><el-input v-model="inputColumn1" placeholder="请输入内容"></el-input></span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                label="类型"
                                prop="type">
                                    <template scope="scope">
                                        <span v-if="!scope.row.editFlag">{{ scope.row.value }}</span>
                                        <span v-if="scope.row.editFlag" class="cell-edit-input"><el-input v-model="inputColumn1" placeholder="请输入内容"></el-input></span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                label="备注"
                                prop="value">
                                    <template scope="scope">
                                        <span v-if="!scope.row.editFlag">{{ scope.row.value }}</span>
                                        <span v-if="scope.row.editFlag" class="cell-edit-input"><el-input v-model="inputColumn1" placeholder="请输入内容"></el-input></span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="other">
            <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
              <el-form ref="form" :model="form" label-width="80px">
                  <el-form-item label="名称">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item label="请求类型">
                    <el-radio-group v-model="form.type">
                      <el-radio label="get"></el-radio>
                      <el-radio label="post"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="请求链接">
                    <el-input v-model="form.link"></el-input>
                  </el-form-item>              
                  <el-form-item label="说明">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="goAddInterface">确定</el-button>
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                  </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { _get, _post } from '../store/base.js'
import rapHead from './head.vue'
import rapFooter from './footer.vue'
export default {
    filters: {},
    data() {
        return {
            requestParams: [],
            responseParams: [],
            interList: [],
            defaultProps: {
              label: 'name'
            },
            dialogFormVisible: false,
            form: {
              name: '',
              type: '',
              link: '',
              desc: ''
            },
            curIterfaceId: '',
            editFlag: false
        }
    },
    computed: {

    },
    components: {
        rapHead,
        rapFooter
    },
    mounted() {
        this.getInterfaceList()
    },
    methods: {
        goEditRequest() {

        },
        goEditResponse() {

        },
        openInterDialog() {
            this.dialogFormVisible = true
        },
        goAddInterface() {
            // let inter = this.form
            let inter = {
                name: this.form.name,
                desc: this.form.desc,
                reqType: this.form.type,
                reqUrl: this.form.link,
                resParamsId: '',
                reqParamsId: ''
            }
            _post('http://localhost:3000/rap/addInterface', {inter}, (data) => {
                // this.backdata = data.result
                if (data && data.success) {
                    this.dialogFormVisible = false
                    this.getInterfaceList()
                }
            })
        },
        getInterfaceList() {
            _post('http://localhost:3000/rap/getInterfaceList', {}, (data) => {
                if (data && data.result && data.success) {
                    let i = 0
                    let temparr = []
                    for(; i < data.result.length; i++) {
                        temparr.push({
                            name: data.result[i].name,
                            id: data.result[i]._id
                        })
                    }
                    this.interList = temparr
                }
            })
        },
        handleNodeClick(data) {
            console.log(data);
            let iterId = data.id
            this.curIterfaceId = data.id
            let iterName = data.name
            this.getIterParams(iterId)
        },
        getIterParams() {

        },
        handleEdit:function(row){
            console.log('>>>>>>>>>>>>>>>>>>>>', row)
        //遍历数组改变editeFlag
        },
        handleSave:function(row){
            //保存数据，向后台取数据
        },
        handleMouseEnter:function(row, column, cell, event){
          cell.children[0].children[1].style.color="black";
        },
        handleMouseOut:function(row, column, cell, event){
          cell.children[0].children[1].style.color="#ffffff";
        }
    }
}
</script>
<style lang="scss">
* {
    box-sizing: border-box;
}
.wid1080 {
    width: 1080px;
    margin: 0 auto;
}
.area_json {
    textarea {
        width: 400px;
        height: 400px;
    }
    // margin: 0 auto;
}
.btn_operate {
    display: inline-block;
    width: 140px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin: 20px 30px;
    background: #ccc;
    border-radius: 15px;
}
.btn_ignore {

}

// .bor20 {
//     border: 2px solid #ccc;
//     border-radius: 20px;
// }
</style>
