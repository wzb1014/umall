<template>
  <div>
    <template>
      <el-table :data="list" border style="width: 100%">
        <el-table-column prop="title" label="活动名称" width="180">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="180">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status == 1" type="primary"
              >启用</el-button
            >
            <el-button v-else type="info">禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row.id)"
              >编辑</el-button
            >
            <del-btn @confirm="dele(scope.row.id)"></del-btn>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import { successAlert, warningAlert } from "../../../utils/alert";
import {
  reqSeckillAdd,
  reqSeckillList,
  reqSeckillDele
} from "../../../utils/request";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      reqSeckillActions: "seckill/reqSeckillActions"
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    dele(id) {
      //点了确定按钮
      reqSeckillDele(id).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  },
  computed: {
    ...mapGetters({
      list: "seckill/list"
    })
  },
  mounted() {
    this.reqSeckillActions();
  }
};
</script>

<style></style>
