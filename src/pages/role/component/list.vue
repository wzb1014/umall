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
      <el-table-column prop="id" label="角色编号" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180">
      </el-table-column>
      <el-table-column prop="type" label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="primary">启用</el-button
          >
          <el-button v-else type="info">禁用</el-button>
        </template> </el-table-column
      ><el-table-column prop="status" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="dele(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { reqMenuDel, reqRoleDel } from "../../../utils/request";

export default {
  computed: {
    ...mapGetters({
      list: "role/list"
    })
  },
  methods: {
    ...mapActions({
      reqListAction: "role/reqListAction"
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    dele(id) {
      //点了确定按钮
      reqRoleDel(id).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  },
  mounted() {
    this.reqListAction();
  },
  data() {
    return {};
  }
};
</script>

<style></style>
