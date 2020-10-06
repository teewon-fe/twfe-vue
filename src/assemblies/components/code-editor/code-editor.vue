<template>
  <div class="tw-codeeditor">
    <!-- 工具区 -->
    <div v-if="toolBarVisibale" class="tw-codeeditor-tools">
      <a v-if="tools.includes('save')" class="tw-iconbtn" title="保存" @click="$emit('save')"><i class="tw-ico xsave"></i></a>
      <a v-if="tools.includes('run')" class="tw-iconbtn" title="编译" @click="$emit('run')"><i class="tw-ico xrun"></i></a>
      <a v-if="tools.includes('stop')" class="tw-iconbtn" title="停止" @click="$emit('stop')"><i class="tw-ico xstop"></i></a>
      <a v-if="tools.includes('format')" class="tw-iconbtn" title="格式化" @click="$emit('format')"><i class="tw-ico xformat"></i></a>
      <a v-if="tools.includes('submit')" class="tw-iconbtn" title="提交" @click="$emit('submit')"><i class="tw-ico xsubmit"></i></a>
      <a v-if="tools.includes('test')" class="tw-iconbtn" title="测试运行" @click="$emit('test')"><i class="tw-ico xcontinue"></i></a>
      <slot name="tools"></slot>
    </div>
    <!-- /工具区 -->

    <!-- 代码区 -->
    <div class="tw-codeeditor-body">
      <textarea ref="editor"></textarea>
    </div>
    <!-- /代码区 -->
  </div>
</template>

<script>
import 'codemirror/lib/codemirror.css'
import * as CodeMirror from 'codemirror/lib/codemirror'

// 引入codemirror预置代码模式
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/vue/vue'
import 'codemirror/mode/css/css'

export default {
  name: 'tw-code-editor',

  props: {
    // 编辑器内容
    value: {
      type: String
    },

    // 预设语言模式
    lang: {
      type: String,
      required: true
    },

    // 不显示工具栏
    toolBarVisibale: {
      type: Boolean,
      default: true
    },

    // 工具栏成员
    tools: {
      type: Array,
      default () {
        return ['save', 'run', 'stop', 'format', 'submit', 'test']
      }
    }
  },

  data () {
    return {
      // 编辑器
      editor: null,

      // 预设语言模式对应的mime值
      langMIME: {
        js: 'text/javascript',
        json: 'application/json',
        vue: 'script/x-vue',
        css: 'text/css',
        scss: 'text/x-scss'
      },

      changeFromInside: false
    }
  },

  methods: {
    /**
     * 功能: 初始化代码编辑器及绑定相应的事件
     */
    initEditor () {
      const editor = this.$refs.editor
      const vm = this

      // 编译器初始化
      this.editor = CodeMirror.fromTextArea(editor, {
        mode: this.langMIME[this.lang],
        extraKeys: { 'Ctrl-S': () => { this.$emit('save') } },
        lineNumbers: true,
        lineWrapping: true
      })

      this.$emit('created', this.editor)

      // 初始化编辑器内容
      this.editor.setValue(this.value)

      // 内容更改时同步更新value值
      this.editor.on('change', function () {
        vm.changeFromInside = true
        vm.$emit('input', vm.editor.getValue())
      })
    }
  },

  mounted () {
    this.initEditor()
  },

  watch: {
    value () {
      if (!this.changeFromInside) {
        this.editor.setValue(this.value)
      }

      this.changeFromInside = false
    }
  }
}
</script>

<style lang="scss">
  @import "./code-editor.scss";
</style>
