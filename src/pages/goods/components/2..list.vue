<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="date" label="商品编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="name" label="商品名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="address" label="商品价格"> </el-table-column>
      <el-table-column prop="address" label="市场价格"> </el-table-column>
      <el-table-column prop="address" label="图片"> </el-table-column>
      <el-table-column prop="address" label="是否新品"> </el-table-column>
      <el-table-column prop="address" label="是否热卖"> </el-table-column>

      <el-table-column prop="type" label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="primary"
            >启用</el-button
          >
          <el-button v-else type="info">禁用</el-button>
        </template> </el-table-column
      ><el-table-column prop="status" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
};
</script>

<style></style>
