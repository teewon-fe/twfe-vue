<template>
  <div
    class="tw-loginbox"
    v-bottom="0"
    @click="focusInput">
    <div>登录或注册(请用真实姓名)</div>
    <div v-for="(cmd,idx) in cmdContent" :key="idx">{{cmd}}</div>
    <div>
      <span>$:</span>
      <input
        ref="input"
        class="tw-loginbox-input"
        :type="step==='enter-password'?'password':'text'"
        v-model="value"
        @keydown.enter="handleCmd" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-login',

  data () {
    return {
      cmdContent: ['请输入用户名'],
      step: 'enter-user',
      value: '',
      params: {
        username: '',
        password: '',
        mob: ''
      }
    }
  },

  methods: {
    focusInput () {
      this.$refs.input.focus()
    },

    nextCmd (text, hideEnter) {
      if (hideEnter) {
        this.cmdContent.push(`$:${'*'.repeat(this.value.length)}`)
      } else {
        this.cmdContent.push(`$:${this.value}`)
      }

      this.cmdContent.push(text)
      this.value = ''
    },

    handleLoginSuccess (data) {
      const globalDevGroup = (!data.role || data.role === this.$cnt.ROLE_TEAM_LEADER) ? data.userGroup : ''

      window.$ui.setDefaultHeaders({
        'token': data.token,
        'user-id': data.userId,
        'user-group': data.userGroup,
        'global-dev-group': globalDevGroup
      })

      window.$app.setAuth({
        username: this.$api.user.getSession.params.username,
        globalDevGroup: globalDevGroup,
        ...data
      }, null, 720)

      this.$router.push('/home')
    },

    login (params) {
      this.$api.user.getSession.send(params || this.params).then((data) => {
        this.handleLoginSuccess(data)
      }).catch(err => {
        if (err.resultCode === '3001') {
          // 用户名或密码错误
          this.nextCmd('密码错误，请重新输入用户名', true)
          this.step = 'enter-user'
        } else if (err.resultCode === '3002') {
          // 用户不存在，走注册逻辑
          this.nextCmd('请输入手机号码', true)
          this.step = 'enter-mob'
        }
      })
    },

    handleCmd () {
      let vm = this

      if (this.step === 'enter-user') {
        if (this.value.trim()) {
          this.params.username = this.value
          this.nextCmd('请输入密码')
          this.step = 'enter-password'
        } else {
          this.cmdContent.push('请输入用户名')
        }
      } else if (this.step === 'enter-password') {
        // 用户登录
        if (this.value.trim()) {
          this.params.password = btoa(this.value).replace(/=+$/g, '')
          this.login()
        } else {
          this.cmdContent.push('请输入用户密码')
        }
      } else if (this.step === 'enter-mob') {
        // 注册并登录
        if (this.value.trim()) {
          if (this.$ui.pattern.phone.test(this.value)) {
            this.params.mob = this.value
            this.$api.user.addUser.send(this.params).then(data => {
              vm.handleLoginSuccess(data)
            })
          } else {
            this.cmdContent.push('请输入正确的手机号码')
          }
        } else {
          this.cmdContent.push('第一次登录需输入手机号码')
        }
      }

      this.$nextTick(() => {
        window.scrollTo(0, document.documentElement.offsetHeight + 10)
      })
    }
  },

  mounted () {
    this.focusInput()
  },

  created () {
    if (this.$route.query.from === 'twfe') {
      this.login(this.$route.query)
    }
  }
}
</script>
<style lang="scss">
  @import "./login.scss";
</style>
