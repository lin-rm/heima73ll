<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <el-table :data="tableData">
        <el-table-column width="300" label="标题"></el-table-column>
        <el-table-column label="总平均数"></el-table-column>
        <el-table-column label="粉丝评论数"></el-table-column>
        <el-table-column width="150" label="状态"></el-table-column>
        <el-table-column width="150" label="操作"></el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang='less'>
</style>
