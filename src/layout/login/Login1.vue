<template>
  <div class="main">
    <el-form :model="loginData" ref="form" :rules="rules" :inline="false" size="normal" class="login-form">
      <div class="head">
        <span>欢迎登录</span>
      </div>
      <el-form-item prop="">
        <span class="icon">
          <i class="imguser"></i>
        </span>
        <el-input v-model="loginData.userName" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="">
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
export default {
  name: '',
  components: {

  },
  props: {

  },
  data () {
    return {
      loginData: {
        userName: 'admin',
        password: '000000'
      },
      passwordType: 'password',
      rules: {

      }
    }
  },
  created () {

  },
  mounted () {
  },
  methods: {
    login () {

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
$light_gray: #979797;
$cursor: black;
// 设置主背景
.main {
  width: 100vw;
  height: 100vh;
  background: url("~@/assets/system/login-bg.png") no-repeat;
  background-size: 100%;
  overflow: hidden;
}

.login-form {
  position: absolute;
  width: 300px;
  top: 30%;
  left: 60%;
  transform: translate(-50% -50%);
  margin: 0 auto;
  padding: 15px 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  color: $light_gray;
  .head {
    margin-bottom: 25px;
    text-align: center;
    span {
      font-size: 20px;
    }
  }
  .icon {
    border-right: 1px solid rgba(0, 0, 0, 1);
    color: #979797;
    display: inline-block;
    width: 40px;
    height: 40px;
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
    width: 40px;
    height: 40px;
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
  height: 40px;
  width: 175px;
  &__inner {
    height: 40px;
    color: $light_gray;
    border: 1px solid rgba(0, 0, 0, 1);
    background: rgba(0, 0, 0, 1);
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
  border: 1px solid rgba(0, 0, 0, 1);
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  color: rgba(0, 0, 0, 1);
  width: 100%;
  height: 40px;
}
</style>
