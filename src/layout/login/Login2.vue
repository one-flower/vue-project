<template>
  <div class="main">
    <el-form :model="loginData" ref="loginForm" :rules="rules" :inline="false" size="normal" class="login-form">
      <div class="head">
        <span>欢迎登录</span>
      </div>
      <el-form-item prop="username">
        <span class="icon">
          <i class="imguser"></i>
        </span>
        <el-input v-model="loginData.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="icon">
          <i class="imgpsd"></i>
        </span>
        <el-input v-model="loginData.password" ref="password" placeholder="请输入密码" :type="passwordType"
          :key="passwordType" tabindex="2" auto-complete="on">
        </el-input>
        <span class="icon-psd" @click="psdType">
          <i :class="passwordType === 'password' ? 'eye' : 'hide'"></i>
        </span>
      </el-form-item>
      <div class="button">
        <el-button type="primary" @click.native.prevent="login">登录</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import { validUsername } from '@utils/validate'

export default {
  name: '',
  components: {

  },
  props: {

  },
  data () {
    const validateusername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    return {
      loginData: {
        username: 'L0002',
        password: 'Te8*3810'
      },
      passwordType: 'password',
      rules: {
        username: [{ required: true, trigger: 'blur', validator: validateusername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      }
    }
  },
  created () {

  },
  mounted () {
  },
  methods: {
    login () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          // 调用vuex中的login方法 ，store/modules/user.js
          this.$store.dispatch('user/login', this.loginData).then(() => {
            // 对vue-router降低版本到3.0.7
            // this.$router.push({ path: this.redirect || '/' })
            this.$router.push({ path: this.redirect || '/' }, () => { })
            this.loading = false
          }).catch((err) => {
            this.$message({
              message: err || 'Error',
              type: 'error',
              duration: 5 * 1000
            })
            this.$router.push('/login')
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    psdType () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    }
  },
  computed: {

  }
}
</script>
<style lang="scss" scope>
// 变量设置
$bg_color: #2d3a4b;
$light_gray: #eee;
$cursor: #fff;
// 设置主背景
.main {
  width: 100vw;
  height: 100vh;
  background-color: $bg_color;
  overflow: hidden;
}
.login-form {
  position: relative;
  width: 400px;
  margin: 0 auto;
  transform: translate(0%, 50%);
  color: $light_gray;
  .head {
    margin-bottom: 25px;
    text-align: center;
    span {
      font-size: 20px;
    }
  }
  .icon {
    color: #979797;
    display: inline-block;
    width: 50px;
    height: 50px;
    text-align: center;
    overflow: hidden;
    .imguser {
      display: inline-block;
      vertical-align: middle;
      width: 25px;
      height: 25px;
      background: url("~@/assets/system/user.png") no-repeat;
      background-size: 100%;
      overflow: hidden;
    }
    .imgpsd {
      display: inline-block;
      vertical-align: middle;
      margin: auto;
      width: 25px;
      height: 25px;
      background: url("~@/assets/system/password.png") no-repeat;
      background-size: 100%;
      overflow: hidden;
    }
  }
  .icon-psd {
    color: #979797;
    display: inline-block;
    width: 50px;
    height: 50px;
    text-align: center;
    overflow: hidden;
    .eye {
      display: inline-block;
      vertical-align: middle;
      width: 25px;
      height: 25px;
      background: url("~@/assets/system/eye.png") no-repeat;
      background-size: 100%;
      overflow: hidden;
      cursor: pointer;
    }
    .hide {
      display: inline-block;
      vertical-align: middle;
      width: 25px;
      height: 25px;
      background: url("~@/assets/system/hide.png") no-repeat;
      background-size: 100%;
      overflow: hidden;
      cursor: pointer;
    }
  }
  .button {
    text-align: center;
  }
}

.el-input {
  overflow: hidden;
  display: inline-block;
  height: 50px;
  width: 290px;
  &__inner {
    height: 50px;
    color: $light_gray;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: rgba(0, 0, 0, 0.1);
  }
  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: $light_gray;
    caret-color: $cursor;
  }
}
.el-form-item {
  display: inline-block;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  color: #454545;
  width: 100%;
  height: 50px;
}
</style>
