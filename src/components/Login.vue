<template>
<div class="login">
  <el-form ref="form" :rules="rules" :model="form" label-width="80px" status-icon>
    <img class="personImg" src="../assets/avatar.jpg" alt="图片加载失败">
    <el-form-item label="用户名：" prop="username">
      <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码：" prop="password">
      <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="loginBtn" @click="login">登录</el-button>
      <el-button @click="resetBtn">重置</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空！' },
          { min: 3, max: 6, message: '用户名必须为3-6位' }
        ],
        password: [
          { required: true, message: '密码不能为空！' },
          { min: 6, max: 12, message: '密码必须为6-12位' }
        ]
      }
    }
  },
  methods: {
    // 重置
    resetBtn () {
      this.$refs.form.resetFields()
    },
    // 登录
    login () {
      this.$refs.form.validate(isVal => {
        // 校验账户名和密码是否格式正确
        if (!isVal) return
        // 若输入格式正确则发送ajax请求
        axios({
          url: 'http://localhost:8888/api/private/v1/login',
          method: 'post',
          data: this.form
        }).then(res => {
          const { meta, data } = res.data
          if (meta.status === 200) {
            // 登录成功 发送成功的提示
            this.$message({
              type: 'success',
              message: meta.msg,
              duration: 1000
            })
            // 将token值保存在localStorage
            localStorage.setItem('token', data.token)
            // 登录成功后跳转到主页
            // this.$router.push('/index')
            // 也可用下面的方法 其中index为组件Index的name值
            this.$router.push('index')
          } else {
            // 登录失败 发送错误的提示
            this.$message.error(meta.msg)
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  overflow: hidden;
  height: 100%;
  background-color: #2d434c;
  .el-form {
    position: relative;
    width: 400px;
    padding: 20px;
    padding-top: 70px;
    margin: 0 auto;
    margin-top: 200px;
    background-color: #fff;
    border-radius: 20px;
  }
  .loginBtn {
    margin-right: 100px;
  }
  .personImg {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -100px;
    width: 150px;
    height: 150px;
    border: 5px solid #fff;
    border-radius: 50%;
  }
}
</style>
