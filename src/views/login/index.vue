<template>
    <div class="login-container">
        <el-card class="login_box">
            <img src="../../assets/images/logo_index.png" alt="">
            <el-form ref="loginForm" status-icon :model="loginForm" :rules="loginRules">
                <el-form-item prop="mobile">
                    <el-input v-model="loginForm.mobile" placeholder='请输入手机号'></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input v-model="loginForm.code" placeholder='请输入验证码' style="width:280px"></el-input>
                    <el-button style="float: right">发送验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="checked"></el-checkbox>我已阅读并同意 <el-link :underline="false" type="primary">用户协议</el-link> 和 <el-link :underline="false" type="primary">隐私条款</el-link>
                </el-form-item>
                <el-form-item>
                    <el-button type='primary' style="width: 100%" @click="login()"> 登 录 </el-button>
                </el-form-item>
            </el-form>

        </el-card>
    </div>
</template>

<script>
// import { async } from 'q'
export default {
  data () {
    const checkMobile = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不对'))
      }
    }
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      loginRules: {
        mobile: [
          { required: true, message: '手机号必填', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码必填', trigger: 'blur' },
          { len: 6, message: '必须是六位', trigger: 'blur' }

        ]
      },
      checked: true
    }
  },
  methods: {
    login () {
      // this.$refs.loginForm.validate((valid) => {
      //   if (valid) {
      //     this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
      //       .then(res => {
      //         const data = res.data
      //         console.log(data)
      //         window.sessionStorage.setItem('heima73ll', JSON.stringify(res.data.data))
      //         this.$router.push('/')
      //       })
      //       .catch(() => {
      //         this.$message.error('用户名或密码错误')
      //       })
      //   }
      // })
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          try {
            const res = await this.$http.post('authorizations', this.loginForm)
            window.sessionStorage.setItem('heima73ll', JSON.stringify(res.data.data))
            this.$router.push('/')
          } catch (err) {
            this.$message.error('用户名或密码错误')
          }
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.login-container {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;

    .login_box {
        width: 450px;
        height: 350px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        img {
            display: block;
            width: 200px;
            margin: 10px auto 30px;
        }
    }
    .el-checkbox {
        margin-right: 10px;
    }
}
</style>
