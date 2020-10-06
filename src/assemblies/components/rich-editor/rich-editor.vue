<template>
  <div class="tw-richeditor">
    <div ref="editorBox" class="tw-richeditor-body">
      <!-- 富文本插件用法详见:http://ueditor.baidu.com/website/index.html -->
    </div>
    <div v-if="maxLength>0" class="tw-richeditor-footer">
      <div class="tw-richeditor-footer-left">
        <slot name="footer-left">
        </slot>
      </div>
      <div class="tw-richeditor-footer-right">
        <span class="animated infinite" :class="{shake: shakingError, 'text-error': shakingError}">{{text.length}}</span>
        <span>/{{maxLength}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tw-rich-editor',

  props: {
    value: {
      type: String,
      default: ''
    },

    option: {
      type: Object,
      default: null
    },

    // 编辑器高度
    height: {
      type: Number,
      default: 420
    },

    // 最大文本长度
    maxLength: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      editor: null,
      content: '',
      text: '',
      shakingError: false
    }
  },

  methods: {
    /**
    * 功能: 初始化编辑器
    */
    init () {
      this.$nextTick(() => {
        if (this.editor) return

        const editorEl = document.createElement('script')
        const uid = 'editor' + this._uid

        let option = {
          pasteplain: true,
          initialFrameWidth: this.$el.offsetWidth,
          initialFrameHeight: parseInt(this.height) || 420,
          autoHeightEnabled: false
        }

        editorEl.setAttribute('id', uid)
        this.$refs.editorBox.appendChild(editorEl)
        this.editor = window.UM.getEditor(uid, Object.assign(option, this.option))

        // 写入初始值
        this.editor.setContent(this.value)

        // 内容发生改变时触发change事件
        const vm = this
        this.editor.addListener('contentChange', function () {
          const plainText = this.getContentTxt()

          vm.content = this.getContent()

          if (vm.maxLength > 0 && plainText.length > vm.maxLength) {
            vm.shakingError = true

            setTimeout(() => {
              vm.shakingError = false
            }, 600)

            this.setContent(vm.value)
          } else {
            vm.$emit('input', vm.content)
            vm.$emit('change', vm.content)
            vm.text = plainText
          }
        })
      })
    }
  },

  mounted () {
    this.init()
  },

  beforeDestroy () {
    // 注销ueditor
    if (this.editor !== null) {
      this.editor.destroy()
    }
  },

  watch: {
    value (newVal, oldVal) {
      // 新值等于当前的内容值，不更新编辑器内容，
      // 以免在输入时编辑器中光标被重新定位到文档最前面
      if (newVal === this.content) return

      // 当值变化时实时更新编辑器内容
      if (this.editor) {
        this.editor.setContent(newVal)
        this.text = this.editor.getContentTxt()
      }
    }
  }
}
</script>
