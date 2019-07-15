<template>
  <!-- <div class="container">Home</div> -->
  <el-container class="home-container">
    <el-aside :width="collapse? '64px':'200px'" class="home-aside">
      <div class="logo" :class="{close:collapse}"></div>
      <el-menu
        :default-active="$route.path"
        background-color="#002233"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border-right: none"
        :collapse="collapse"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="fanns">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="home-header">
        <span class="el-icon-s-fold" @click='toggleMenu'></span>
        <span>江苏传智播客教育有限公司</span>
        <el-dropdown style="float:right" class="rig-selec">
          <span class="el-dropdown-link">
            <img style="vertical-align: middle" width="30" :src="avatar" alt="" />
            <strong>{{name}}</strong>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" @click.native="setting()">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" @click.native="logout()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      collapse: false,
      name: '',
      avatar: ''
    }
  },
  created () {
    const user = JSON.parse(window.sessionStorage.getItem('heima73ll'))
    this.name = user.name
    this.avatar = user.photo
  },
  methods: {
    toggleMenu () {
      this.collapse = !this.collapse
    },
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      // window.sessionStorage.getItem('heima73ll', null)
      window.sessionStorage.removeItem('heima73ll')
      this.$router.push('/setting')
    }
  }
}
</script>

<style scoped lang='less'>
.home-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;

  .home-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;

    .el-icon-s-fold {
      font-size: 26px;
      // vertical-align: middle;
      margin-right: 10px;
    }
    span {
      vertical-align: middle;
    }
    // .rig-selec .el-dropdown-link {
    //   font-weight: 700;
    // }
  }
  .home-aside {
    background-color: #002233;

    .logo {
      width: 100%;
      height: 60px;
      background: #002840 url(../../assets/images/logo_admin.png) no-repeat
        center / 140px auto;
    }
    .close {
      background: #002840 url(../../assets/images/logo_admin_01.png) no-repeat
        center / 36px auto;
    }
  }
}
</style>
