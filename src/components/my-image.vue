<template>
  <div class="image-container">
    <div class="img-btn" @click="openDialog()">
      <img :src="value||defaultImage" alt />
    </div>
    <el-dialog :visible.sync="dialogVisible" width="700px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image" v-loading="loading">
          <div style="margin-bottom:10px">
            <el-radio-group size="small" @change="toggleImage" v-model="reqParams.collect">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>
          <div
          class="img-item"
          :class="{selected:selectedImageUrl===item.url}"
          @click="selected(item.url)"
          v-for="item in images"
          :key="item.id"
          >
            <img :src="item.url" />
          </div>
          <el-pagination
          v-if="total>reqParams.per_page"
          background
          layout="prev, pager, next"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          @current-change="peger"
          :total="total"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            name="image"
            :show-file-list="false"
            :on-success="handleSuccess"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import defaultImage from '../assets/images/default.png'
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
      // value: defaultImage,
      defaultImage,
      headers: {
        Authorization:
          'Bearer ' +
          JSON.parse(window.sessionStorage.getItem('heima73ll')).token
      },
      loading: false,
      dialogVisible: false,
      activeName: 'image',
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      total: 0,
      imageUrl: null,
      images: [],
      selectedImageUrl: null
    }
  },
  methods: {
    confirmImage () {
      if (this.activeName === 'image') {
        if (!this.selectedImageUrl) return this.$message.info('请选择图片')
        // this.value = this.selectedImageUrl
        this.$emit('input', this.selectedImageUrl)
      } else {
        if (!this.imageUrl) return this.$message.info('请选择图片')
        // this.value = this.imageUrl
        this.$emit('input', this.imageUrl)
      }
      this.dialogVisible = false
    },
    handleSuccess (res) {
      this.imageUrl = res.data.url
    },
    openDialog () {
      this.dialogVisible = true
      this.selectedImageUrl = null
      this.imageUrl = null
      this.getImages()
    },
    async getImages () {
      this.loading = true
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
      this.loading = false
    },
    peger (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    toggleImage () {
      this.reqParams.page = 1
      this.getImages()
    },
    selected (url) {
      this.selectedImageUrl = url
    }
  }
}
</script>

<style scoped lang='less'>
.image-container {
  width: 150px;
  height: 120px;
  margin-right: 20px;
  display: inline-block;
}
.img-item {
  width: 150px;
  height: 120px;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-right: 10px;
  position: relative;

  &.selected {
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .3) url(../assets/images/selected.png) no-repeat center / 60px;
    }
  }

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
  }
}
.img-btn {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;

  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
