/**
 * 在所有的vue组件中注入快速访问与设置api启动配置信息与用户信息的计算属性与方法
 */
import { mapMutations } from 'vuex'

export default {
  install (Vue, options = {}) {
    Vue.mixin({
      computed: {
        $user () {
          return this.$store.state.user
        }
      },

      methods: {
        ...mapMutations({
          $setUser: 'setUser'
        })
      }
    })
  }
}
