<template>
  <div>
    <template>
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="id" label="编号" width="180"> </el-table-column>
        <el-table-column prop="title" label="轮播图标题" width="180">
        </el-table-column>
        <el-table-column prop="img" label="图片"> </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status == 1" type="primary">启用</el-button>
            <el-button v-else type="info">禁用</el-button>
          </template> </el-table-column><el-table-column prop="status" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
            <del-btn @confirm="dele(scope.row.id)"></del-btn>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
var x=10;
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { reqBannerDel } from "../../../utils/request";
export default {
  computed: {
    ...mapGetters({
      list: "banner/list"
    })
  },
  methods: {
    ...mapActions({
      reqListAction: "banner/reqListAction"
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    dele(id) {
      //点了确定按钮
      reqBannerDel(id).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.reqListAction();
          //重新获取总数
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  },
  mounted() {
    this.reqListAction();
  }
};
</script>

<style></style>
