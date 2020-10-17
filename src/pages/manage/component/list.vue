<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="用户编号" width="180">

      </el-table-column>
      <el-table-column prop="username" label="用户名称" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色" width="180">
      </el-table-column>
      <el-table-column prop="type" label="状态"> 


           <template slot-scope="scope">
        <el-button v-if="scope.row.status == 1" type="primary">启用</el-button>
        <el-button v-else type="info">禁用</el-button>
      </template>

        </el-table-column><el-table-column prop="status" label="操作"> 
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <del-btn @confirm="dele(scope.row.uid)"></del-btn>
      </template>
      </el-table-column>
    </el-table>
   <el-pagination background layout="prev, pager, next" :total="total" :page-size="size"
    @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
import {mapGetters,mapActions}  from 'vuex'
import { successAlert, warningAlert } from '../../../utils/alert';
import {reqManageDel,reqRoleDel,} from "../../../utils/request"

export default {
  computed: {
    ...mapGetters({
      list: "manage/list",
      size:"manage/size",
       total:"manage/total",
    })
  },
  methods: {
    ...mapActions({
      reqListAction: "manage/reqListAction",
      changePageAction:"manage/changePageAction",
      reqTotalAction:'manage/reqTotalAction'
    }),
     edit(id){
      this.$emit("edit",id)
    },
    changePage(e){
      this.changePageAction(e)
    },
    dele(uid) {
      //点了确定按钮
      reqManageDel(uid).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.reqListAction();
    this.reqTotalAction();
  },
  data() {
    return {
     
    };
  }
};
</script>

<style></style>
