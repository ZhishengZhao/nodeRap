<!--
    created by zhaozhisheng on 07/17/2017
 -->
<template>
    <div class="page">
        <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light">
                <!-- <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="date" label="日期" width="180">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" width="180">
                    </el-table-column>
                    <el-table-column prop="address" label="地址">
                    </el-table-column>
                </el-table> -->


                <el-table
    :data="tableData"
    border
    @cell-mouse-enter="handleMouseEnter"
    @cell-mouse-leave="handleMouseOut"
    style="width: 100%">
    <el-table-column
      label="日期"
      width="180">
      <template scope="scope">
      <span v-if="!scope.row.editFlag">{{ scope.row.name }}</span>
      <span v-if="scope.row.editFlag" class="cell-edit-input"><el-input v-model="inputColumn1" placeholder="请输入内容"></el-input></span>
      <span v-if="!scope.row.editFlag" style="margin-left:10px;" class="cell-icon"  @click="handleEdit(scope.row)">  <i class="el-icon-edit"></i> </span>
      <span v-if="scope.row.editFlag"  style="margin-left:10px;"  class="cell-icon"  @click="handleSave(scope.row)">  <i class="el-icon-document"></i> </span>
      </template>
    </el-table-column>
  </el-table>
            </div></el-col>
        </el-row>
        <div class="area_json">
            <textarea v-model="tarjson"></textarea>
        </div>
        <div class="area_btns">
            <p class="btn_operate btn_edit" @click="p_edit">edit</p>
            <p class="btn_operate btn_save" @click="p_save">save</p>
        </div>
        <div>
            <p>
                {{backdata}}
            </p>
        </div>
    </div>
</template>
<script>
import { _get, _post } from '../store/base.js'
export default {
    filters: {},
    data() {
        return {
            tarjson: '',
            backdata: '',
            // tableData: [{
            //     date: '2016-05-02',
            //     name: '王小虎',
            //     address: '上海市普陀区金沙江路 1518 弄'
            // }, {
            //     date: '2016-05-04',
            //     name: '王小虎',
            //     address: '上海市普陀区金沙江路 1517 弄'
            // }, {
            //     date: '2016-05-01',
            //     name: '王小虎',
            //     address: '上海市普陀区金沙江路 1519 弄'
            // }, {
            //     date: '2016-05-03',
            //     name: '王小虎',
            //     address: '上海市普陀区金沙江路 1516 弄'
            // }],
            tableData:[
        {
          name:"test",
          editeFlage:false
        },
        {
          name:"test",
          editeFlage:false
        },
        {
          name:"test",
          editeFlage:false
        },
        {
          name:"test",
          editeFlage:false
        },
      ],
      inputColumn1:"", //第一列的输入框,
            data: [{
              label: '一级 1',
              children: [{
                label: '二级 1-1',
                children: [{
                  label: '三级 1-1-1'
                }]
              }]
            }, {
              label: '一级 2',
              children: [{
                label: '二级 2-1',
                children: [{
                  label: '三级 2-1-1'
                }]
              }, {
                label: '二级 2-2',
                children: [{
                  label: '三级 2-2-1'
                }]
              }]
            }, {
              label: '一级 3',
              children: [{
                label: '二级 3-1',
                children: [{
                  label: '三级 3-1-1'
                }]
              }, {
                label: '二级 3-2',
                children: [{
                  label: '三级 3-2-1'
                }]
              }]
            }],
            defaultProps: {
              children: 'children',
              label: 'label'
            }
        }
    },
    computed: {

    },
    components: {
    },
    mounted() {
        
    },
    methods: {
        p_save() {
            let params = {
                json: this.tarjson
            }
            _post('http://localhost:3000/rap/save', params, (data) => {
                console.log('return data is: ' + data)
            })
        },
        p_edit() {
            // _post('http://localhost:3000/rap/edit', {}, (data) => {
            //     console.log('return  edit editdata is: ' + data)
            //     this.backdata = data.result
            // })

            _post('http://localhost:3000/rap/edit', {}, (data) => {
                console.log('return  edit editdata is: ' + data)
                this.backdata = data.result
            })
        },
        handleNodeClick(data) {
            console.log(data);
          },
          handleEdit:function(row){
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
// import 'element-ui/lib/theme-default/index.css'
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
// $designWidth: 750;
// @function px2rem( $px) {
//     @return $px*320/$designWidth/20 + rem;
// }
</style>
