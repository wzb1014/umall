<template>
  <div>
    <template>
      <el-table :data="list" border style="width: 100%">
        <el-table-column prop="uid" label="用户编号" width="180">
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" width="180">
        </el-table-column>
        <el-table-column prop="phone" label="手机号"> </el-table-column>
      

        <el-table-column prop="type" label="状态">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status == 1" type="primary">启用</el-button>
            <el-button v-else type="info">禁用</el-button>
          </template> </el-table-column><el-table-column prop="status" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
            <!-- <del-btn @confirm="dele(scope.row.uid)"></del-btn> -->
          </template>
        </el-table-column>
      </el-table>



    </template>
  </div>
</template>

<script>
import {reqMemberList,reqMemberDetail,reqMemberUpdate} from '../../../utils/request'
import{mapGetters,mapActions} from 'vuex'
export default {
  data() {
    return {
     form:{
       uid:'',
       nickname:'',
       phone:'',
       password:'',
       status:'1',
     },
    };
  },
  computed:{
    ...mapGetters({
      list:'member/list'
    })
  },
  methods:{
    ...mapActions({
      reqListAction:'member/reqListAction'
    }),
    edit(uid){
      this.$emit('edit',uid)
    },
  },
  mounted(){
    this.reqListAction()
  }


};

</script>

<style></style>
