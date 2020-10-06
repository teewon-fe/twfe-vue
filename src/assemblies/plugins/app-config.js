import { mapMutations } from 'vuex'

export default {
  install (Vue, options = {}) {
    Vue.mixin({
      computed: {
        $app () {
          return this.$store.state.app
        },
        $user () {
          return this.$store.state.user
        }
      },

      methods: {
        ...mapMutations({
          $setApp: 'setApp',
          $setUser: 'setUser'
        })
      }
    })
  }
}
