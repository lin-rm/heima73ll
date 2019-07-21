<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <el-table :data="comments">
        <el-table-column width="400" label="标题" prop="title"></el-table-column>
        <el-table-column label="总平均数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column width="120" label="状态">
            <template slot-scope='scope'>
                {{scope.row.comment_status ? '正常' : '关闭'}}
            </template>
        </el-table-column>
        <el-table-column width="120" label="操作">
            <template slot-scope='scope'>
                <el-button @click="toggleStatus(scope.row)" v-if="!scope.row.comment_status" type="success" size="mini">打开评论</el-button>
                <el-button @click="toggleStatus(scope.row)" v-else type="danger" size="mini">关闭评论</el-button>
            </template>
        </el-table-column>
      </el-table>
      <el-pagination
      style="margin-top: 20px"
      background
      layout="prev, pager, next"
      :page-size="reqParams.per_page"
      :current-page="reqParams.page"
      @current-change="pager"
      :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      comments: [],
      reqParams: {
        page: 1,
        per_page: 20,
        response_type: 'comment'
      },
      total: 0
    }
  },
  created () {
    this.getComments()
  },
  methods: {
    toggleStatus (row) {
      const text1 = '您确认要打开评论吗？'
      const text2 = '关闭后用户无法对改文章进行评论，您确认要关闭吗？'
      this.$confirm(row.comment_status ? text2 : text1, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: { data } } = await this.$http.put('comments/status?article_id=' + row.id, {
          allow_comment: !row.comment_status
        })
        this.$message.success('修改状态成功')
        // 更新视图
        row.comment_status = data.allow_comment
      }).catch(() => {})
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getComments()
    },
    async getComments () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.comments = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>
</style>
