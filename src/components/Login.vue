<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 表单区域 -->
      <div>
        <el-form
          label-width="0px"
          class="login_form"
          :model="loginForm"
          :rules="loginFormRoules"
          ref="loginFormRef"
        >
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input
              prefix-icon="iconfont icon-user"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <!-- 用户密码 -->
          <el-form-item prop="password">
            <el-input
              type="password"
              prefix-icon="iconfont icon-3702mima"
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item class="btns">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetLoginForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      //默认登录信息
      loginForm: {
        username: "admin",
        password: "123456"
      },
      // 表单验证
      loginFormRoules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在2-10个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入用户名密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在6-18个字符", trigger: "blur" }
        ]
      },
    };
  },
  methods: {
    //重置表单
    resetLoginForm () {
      //resetFields:element-ui提供的方法 重置表单
      // console.log(this)  当前表单对象
      this.$refs.loginFormRef.resetFields()
    },
    //表单登录预验证
    login () {
      this.$refs.loginFormRef.validate(  async valid => {
        // console.log(valid)
        if (!valid) return false
        // 发起登录请求
        // const result = await this.$http.post("login", this.loginForm)
        // 返回值为promise，可加await简化操作 相应的也要加async
        const { data : res } = await this.$http.post("login", this.loginForm)
        // 登录提示弹窗
        if (res.meta.status !== 200) return this.$message.error('登录失败')
        this.$message.success('登录成功')
        // console.log(res)
        // 1、将登陆成功之后的token, 保存到客户端的sessionStorage中; localStorage中是持久化的保存
        //   1.1 项目中出现了登录之外的其他API接口，必须在登陆之后才能访问
        //   1.2 token 只应在当前网站打开期间生效，所以将token保存在sessionStorage中
        window.sessionStorage.setItem('token', res.data.token)
        // 2、通过编程式导航跳转到后台主页, 路由地址为：/home
        this.$router.push ("/home")
      })
    }
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_container .login_box {
  width: 450px;
  height: 360px;
  background-color: rgb(252, 252, 252);
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  width: 130px;
  height: 130px;
  border: 1px solid #eeeeee;
  border-radius: 50%;
  padding: 10px;
  background-color: rgb(255, 255, 255);
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px;
  img {
    width: 100%;
    height: 100%;
    background-color: rgb(190, 186, 186);
    border-radius: 50%;
  }
}
.login_form {
  position: absolute;
  bottom: 60px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
