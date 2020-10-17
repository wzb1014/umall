<template>
  <div>
    <template>
      <el-table :data="list" border style="width: 100%">
        <el-table-column prop="title" label="活动名称" width="180">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="180">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status == 1" type="primary">启用</el-button>
            <el-button v-else type="info">禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
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
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions({
      reqSeckillActions: "seckill/reqSeckillActions"
    })
  },
  computed: {
    ...mapGetters({
      list: "seckill/list"
    })
  },
  mounted() {
    this.reqSeckillActions();
  },
  data() {
    return {};
  }
};
</script>

<style></style>
