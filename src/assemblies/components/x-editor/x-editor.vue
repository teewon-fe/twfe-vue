<template>
  <div class="tw-xeditor" :class="{xmounded: mountElement}">
    <div ref="menu"
      v-if="!mountElement || editorElement"
      class="tw-xeditor-menu"
      :id="`xe_${_uid}_menu`"
      :class="{xautohide:menuAutoHide}">
      <div class="tw-xeditor-menu-group">
        <a class="tw-popswitch xwauto"
          :id="`xe_${_uid}_font_size`"
          @mousedown.prevent>
          <span>字号</span>
        </a>
        <tw-poppane
          class="xeditor js-position"
          trigger="click"
          placement="bottom-left"
          :container-element="`#xe_${_uid}_font_size`"
          :switch="`#xe_${_uid}_font_size`">
          <ul class="tw-popmenu">
            <li class="tw-popmenu-item"
              v-for="(item,index) in fontSizes"
              :key="item"
              @mousedown.prevent
              @click="setFontSize(index+1)">
              {{item}}
            </li>
          </ul>
        </tw-poppane>
      </div>
      <div class="tw-xeditor-menu-group">
        <a title="加粗" :class="{xactive:status.bold}" @mousedown.prevent @click="exec('bold')"><i class="tw-ico xebold"></i></a>
        <a title="下划线" :class="{xactive:status.underline}" @mousedown.prevent @click="exec('underline')"><i class="tw-ico xeunderline"></i></a>
        <a title="斜体" :class="{xactive:status.italic}" @mousedown.prevent @click="exec('italic')"><i class="tw-ico xeital"></i></a>
        <a title="上传文件" @click="openUploadModal"><i class="tw-ico xeupload"></i></a>
        <a title="插入表格" @mousedown.prevent @click="tableModal.visible=true"> <i class="tw-ico xetable"></i></a>
        <a title="填空占位线" @mousedown.prevent @click="insertLine"><i class="tw-ico xeline"></i></a>
        <slot name="menu">
        </slot>
        <template v-if="false">
          <a><i class="tw-ico xeblank"></i></a>
          <a><i class="tw-ico xeformula"></i></a>
          <a><i class="tw-ico xeimg"></i></a>
          <a><i class="tw-ico xemind"></i></a>
          <a><i class="tw-ico xevoice"></i></a>
        </template>
      </div>
    </div>

    <!-- 占位区 -->
    <div v-if="!mountElement && characterCount===0" class="tw-xeditor-placeholder">{{placeholder}}</div>

    <!-- 编辑区 -->
    <div ref="editor"
      v-if="!mountElement"
      class="tw-xeditor-body js-xeditor-body"
      :class="{xborder: hasBorder}"
      contenteditable
      @mouseup="getSelection"
      @keyup="handleEditorKeyup"
      @keydown="handleEditorKeydown">
      <span>&nbsp;</span>
    </div>

    <!-- 编辑区 -->

    <!-- 弹窗:上传文件 -->
    <tw-modal class="xmedium xnomask"
      :visible.sync="uploadModal.visible"
      @close="closeUploadModal">
      <template slot="header">上传文件</template>
      <template slot="body">
        <div class="my-medium" style="width: 360px; margin-right: auto; margin-left: auto; ">
          <el-upload
            ref="upload"
            drag
            list-type="picture"
            :data="{branchCode: $app.user.branchCode}"
            :action="uploudParams.action"
            :accept="uploudParams.accept"
            :limit="1"
            :on-exceed="()=>{$ui.msg('一次只能选择一个文件。')}"
            :before-upload="beforeUpload"
            :before-remove="resetUploadParams"
            :on-success="handleUploadSuccess">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </div>
      </template>
      <template slot="footer">
        <a class="tw-btn xmain" @click="handleUploadConfirm">确定</a>
        <a class="tw-btn xweaking" @click="closeUploadModal">取消</a>
      </template>
    </tw-modal>

    <!-- 弹窗:表格 -->
    <tw-modal class="xnomask"
      :visible.sync="tableModal.visible">
      <template slot="header">添加表格</template>
      <template slot="body">
        <div class="my-medium text-center" style="width: 360px; margin-right: auto; margin-left: auto; ">
          <span>行数：</span>
          <el-input v-model.number="tableModal.rows" type="number" size="small" style="width: 60px;"></el-input>
          <span class="ml-medium">列数：</span>
          <el-input v-model.number="tableModal.cols" type="number" size="small" style="width: 60px;"></el-input>
        </div>
      </template>
      <template slot="footer">
        <a class="tw-btn xmain" @click="insertTable">确定</a>
        <a class="tw-btn xweaking" @click="tableModal.visible=false">取消</a>
      </template>
    </tw-modal>
  </div>
</template>

<script>

export default {
  name: 'tw-xeditor',

  props: {
    value: {
      type: String,
      required: true
    },

    // 占位字符
    placeholder: {
      type: String,
      default: '请输入内容'
    },

    // 上传设置
    uploud: {
      type: Object,
      default () {
        return {}
      }
    },

    // 字体尺寸选择列表
    fontSizes: {
      type: Array,
      default () {
        return ['12px', '14px', '16px', '18px']
      }
    },

    // 填空线默认的宽度
    blankSpcaces: {
      type: Number,
      default: 1
    },

    // 菜单是否自动隐藏
    menuAutoHide: {
      type: Boolean,
      default: false
    },

    // 默认文本颜色
    foreColor: {
      type: String,
      default: '#333'
    },

    // 编辑区是否显示边框
    hasBorder: {
      type: Boolean,
      default: true
    },

    // 指定了挂载点时，编辑器不会生成编辑区，而是会以挂载点元素做为编辑区
    mountElement: [Object, String],

    // 挂载点识别的dataset名称，在挂载元素上通过data-key="value"的形式指定
    mountDatasetKey: {
      type: String,
      default: 'id'
    },

    // 滚动元素
    scrollElement: {
      type: [Object, String],
      default: 'body'
    }
  },

  data () {
    return {
      contentText: '',
      uid: 'xeditor',
      fontSize: '',
      selection: null,
      range: null,
      status: {
        bold: false,
        italic: false,
        underline: false
      },
      uploudParams: {
        fileBaseUrl: this.$app.fileBaseUrl,
        action: this.$app.fileUploadUrl,
        accept: 'image/*',
        exts: ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'svg'],
        maxSize: 10,
        limit: 1
      },
      uploadModal: {
        visible: false,
        isImage: false,
        fileUrl: ''
      },
      tableModal: {
        visible: false,
        rows: 3,
        cols: 3
      },
      imgModal: {
        visible: false
      },
      startScal: {
        x: 0,
        y: 0,
        w: 0,
        h: 0
      },
      lineChanger: null,
      imgChanger: null,
      editorElement: null,
      editorMousedownElement: null
    }
  },

  computed: {
    // 字数
    characterCount () {
      return this.contentText.replace(/[\s\r\n]/gm, '').length
    },

    // 滚动元素
    scrollEl () {
      if (typeof this.scrollElement === 'string') {
        if (this.scrollElement === 'body') {
          return window
        } else {
          return document.querySelector(this.scrollElement)
        }
      } else if (this.scrollElement === window || this.scrollElement instanceof Element) {
        return this.scrollElement
      } else {
        return null
      }
    }
  },

  methods: {
    /**
    * 功能: 初始化
    */
    init (content) {
      Object.assign(this.uploudParams, this.uploud)
      this.exec('styleWithCSS', true)
      this.selection = document.getSelection()
      this.initIeEvent()
      this.initImage()
      this.initLine()

      if (content) {
        this.editorElement.innerHTML = content
      }
    },

    /**
    * 功能: 初始化IE事件
    */
    initIeEvent () {
      document.removeEventListener('mscontrolselect', this.ieControlselect)
      document.addEventListener('mscontrolselect', this.ieControlselect)
    },

    /**
    * 功能: 阻止IE的选择控制元素
    */
    ieControlselect (event) {
      event.preventDefault()
    },

    /**
    * 功能: 指定了挂载元素时的初始化
    */
    initEditorMount () {
      if (typeof this.mountElement === 'string' || this.mountElement instanceof Element) {
        this.$ui.event.delegateOff(document, 'click.xeditor', true)
        this.$ui.event.delegate(document, 'click.xeditor', this.mountElement, true, this.mountEditor, this.unmountEditor)

        document.removeEventListener('mousedown', this.saveMouseDownElement)
        document.addEventListener('mousedown', this.saveMouseDownElement)

        if (this.scrollEl) {
          this.scrollEl.removeEventListener('scroll', this.computeEditorOffset)
          this.scrollEl.addEventListener('scroll', this.computeEditorOffset)
        }
      } else {
        throw new TypeError('The "mountElement" prop must be a css selector or Element.')
      }
    },

    /**
    * 功能: 挂载编辑器到挂载点
    */
    mountEditor (mountElement, event) {
      let isMounted = this.$ui.el.prop.get(mountElement, 'isMounted')

      if (isMounted) {
        return
      }

      this.$ui.el.prop.add(mountElement, 'isMounted', true)

      // 取消掉前一个元素的挂载及注销相关事件
      if (this.editorElement) {
        this.unmountEditor(event)
      }

      this.editorElement = mountElement
      this.editorElement.contentEditable = true
      this.editorElement.classList.add('tw-xeditorbody')
      this.editorElement.classList.add('js-xeditor-body')

      if (this.hasBorder) {
        this.editorElement.classList.add('xborder')
      }

      if ([-1, 0].includes(this.editorElement)) {
        this.editorElement.tabIndex = 1
      }

      this.editorElement.focus()
      this.editorElement.addEventListener('mouseup', this.getSelection)
      this.editorElement.addEventListener('keyup', this.handleEditorKeyup)
      this.editorElement.addEventListener('keydown', this.handleEditorKeydown)

      this.init()
      this.genRange()
      this.changeValue()
      this.computeEditorOffset()
      this.$emit('mounted', this.editorElement.dataset[this.mountDatasetKey], this.editorElement)
    },

    /**
    * 功能: 根据挂载点计算编辑器的位置
    */
    computeEditorOffset () {
      if (this.editorElement) {
        this.$nextTick(() => {
          if (this.$refs.menu) {
            let offset = this.editorElement.getBoundingClientRect()
            this.$el.style.width = offset.width + 'px'
            this.$el.style.top = offset.top - this.$refs.menu.offsetHeight + 1 + 'px'
            this.$el.style.left = offset.left + 'px'
          }
        })
      }
    },

    /**
    * 功能: 在编辑器鼠标按下时，记录其是哪一个元素触发的事件
    */
    saveMouseDownElement (event) {
      this.editorMousedownElement = event.target
    },

    /**
    * 功能: 取消挂载
    */
    unmountEditor (event) {
      // 取消挂载的点击事件，不能是来自于编辑器本身
      if (this.editorElement && !this.$el.contains(event.target) && !this.editorElement.contains(this.editorMousedownElement)) {
        this.editorElement.classList.remove('tw-xeditorbody')
        this.editorElement.classList.remove('js-xeditor-body')

        if (this.hasBorder) {
          this.editorElement.classList.remove('xborder')
        }

        this.editorElement.removeEventListener('mouseup', this.getSelection)
        this.editorElement.removeEventListener('keyup', this.handleEditorKeyup)
        this.editorElement.removeEventListener('keydown', this.handleEditorKeydown)

        this.$ui.el.prop.del(this.editorElement, 'isMounted')
        this.editorElement.contentEditable = false
        this.$emit('unmounted', this.editorElement.dataset[this.mountDatasetKey], this.editorElement)
        this.editorElement = null
      }

      this.editorMousedownElement = null
    },

    /**
    * 功能: 编辑器内容改变
    */
    changeValue () {
      let value = this.editorElement.innerHTML
      this.contentText = this.editorElement.innerText
      this.$emit('input', value, this.contentText)
      this.$emit('change', value, this.contentText)

      // 解决chorme浏览器直接插入连线后再删除，文字会是白色的bug
      if (this.contentText.replace(/[\s\n\r]/gm, '').length === 0) {
        this.exec('foreColor', this.foreColor)
      }
    },

    /**
    * 功能: 编辑器输入时生成选区并改变绑定值
    */
    handleEditorKeyup (event) {
      this.genRange()
      this.changeValue()
    },

    /**
    * 功能: 清空拖动控制点
    */
    handleEditorKeydown (event) {
      if (this.lineChanger) {
        this.lineChanger.clear()
      }
    },

    /**
    * 功能: 执行相关命令
    */
    exec (cmd, args = null) {
      if (cmd === 'insertHTML') {
        if (this.range) {
          this.selection.removeAllRanges()
          this.selection.addRange(this.range)
          this.selection.collapseToEnd()
        } else {
          this.genRange()
        }

        try {
          if (document.queryCommandEnabled(cmd)) {
            document.execCommand(cmd, false, args)
          }
        } catch (e) {
          // ie11, ie10
          let div = document.createElement('div')
          div.innerHTML = args

          let nodes = div.childNodes
          let i, len

          for (i = 0, len = nodes.length; i < len; i++) {
            let node = nodes[i]

            this.range.insertNode(node)
          }
        }
      } else {
        document.execCommand(cmd, false, args)
      }

      this.genStatus()
    },

    /**
    * 功能: 移动光标
    */
    moveCaret (el, position) {
      this.genRange()

      if (position === 'after') {
        this.range.selectNode(el)
        this.range.collapse(false)
      } else if (position === 'inner-before') {
        this.range.selectNodeContents(el)
        this.range.collapse(true)
      } else if (position === 'inner-after') {
        this.range.selectNodeContents(el)
        this.range.collapse(false)
      }
    },

    /**
    * 功能: 生成选区
    */
    genRange () {
      if (this.selection.rangeCount > 0) {
        this.range = this.selection.getRangeAt(0)
      } else {
        this.range = document.createRange()
        this.range.setStartAfter(this.editorElement.lastChild)
        this.selection.addRange(this.range)
      }
    },

    /**
    * 功能: 生成状态
    */
    genStatus () {
      Object.assign(this.status, {
        bold: false,
        italic: false,
        underline: false
      })

      for (const key in this.status) {
        if (document.queryCommandState(key)) {
          this.status[key] = true
        }
      }
    },

    /**
    * 功能: 获取选区及状态
    */
    getSelection (event) {
      this.genRange()
      this.genStatus()
    },

    /**
    * 功能: 设置字体大小
    * @param {Number} sizeIndex 浏览器默认字号
    */
    setFontSize (sizeIndex) {
      this.exec('styleWithCSS', false)
      this.exec('fontSize', sizeIndex)

      let fontEls = this.editorElement.querySelectorAll('font')

      let i, len
      for (i = 0, len = fontEls.length; i < len; i++) {
        let fontEl = fontEls[i]
        fontEl.style.fontSize = this.fontSizes[parseInt(fontEl.size) - 1]
        fontEl.size = ''
      }

      this.exec('styleWithCSS', true)
    },

    /**
    * 功能: 处理图片缩放
    */
    handleImageScal (event) {
      this.currImg.style.width = this.startScal.w + event.pageX - this.startScal.x + 'px'
      this.currImg.style.height = this.startScal.h + event.pageY - this.startScal.y + 'px'
      this.setImageScalBoxStyle()
      this.changeValue()
    },

    /**
    * 功能: 让图片可手动缩放尺寸
    */
    initImage () {
      if (this.imgChanger) {
        this.imgChanger.destroy()
      }

      let offset = { w: 0, h: 0 }

      this.imgChanger = new this.$ui.XYChanger({
        target: '.js-xeditor-body img',

        start (start, target) {
          offset = {
            w: target.offsetWidth,
            h: target.offsetHeight
          }
        },

        update (change, target) {
          target.style.width = offset.w + change.x + 'px'
          target.style.height = offset.h + change.y + 'px'
        },

        controler: {
          title: '可拖动控制点设置图片尺寸',
          container: this.editorElement
        }
      })
    },

    /**
    * 功能: 插入图片
    * @param {String} imgUrl 图片url
    */
    insertImage (imgUrl) {
      let img = `<img src="${imgUrl}" />`

      this.exec('insertHTML', img)
      this.genImageSize()
      this.changeValue()
    },

    /**
    * 功能: 给每张插入的图片一个原始尺寸，解决后端渲染会出现崩溃的bug
    */
    genImageSize () {
      let images = [...this.editorElement.querySelectorAll('img')]

      for (const img of images) {
        img.addEventListener('load', function () {
          if (!img.style.width) {
            img.style.width = img.offsetWidth + 'px'
          }

          if (!img.style.height) {
            img.style.height = img.offsetHeight + 'px'
          }
        })
      }
    },

    /**
    * 功能: 在文件上传之前的处理
    * @param {Object} file 当前操作的文件对象
    * @return 返回false或被reject的Promise该文件会停止上传
    */
    beforeUpload (file) {
      if (file.size > this.uploudParams.maxSize * 1024 * 1024) {
        this.$ui.msg(`文件大小不能超过${this.uploudParams.maxSize}M`)
        return false
      }

      const ext = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase()
      if (!this.uploudParams.exts.includes(ext)) {
        this.$ui.msg(`上传附件格式不支持，请重新选择上传。`)
        return false
      }
    },

    /**
    * 功能: 还原上传文件相关参数
    */
    resetUploadParams () {
      this.uploadModal.fileUrl = ''
      this.uploadModal.isImage = false
    },

    /**
     * 功能： 打开文件上传弹窗
     */
    openUploadModal () {
      this.resetUploadParams()
      this.uploadModal.visible = true
    },

    /**
     * 功能： 关闭文件上传弹窗
     */
    closeUploadModal () {
      this.$refs.upload.abort()
      this.uploadModal.visible = false
    },

    /**
     * 功能： 点击文件上传的确认按钮
     */
    handleUploadConfirm () {
      if (this.uploadModal.isImage) {
        this.insertImage(this.uploadModal.fileUrl)
      } else {
        // noop
      }

      this.uploadModal.visible = false
    },

    /**
     * 功能： 处理文件上传成功
     */
    handleUploadSuccess (response, file, fileList) {
      const ext = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase()
      const imageExts = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'svg']

      if (response.fileInfos[0]) {
        this.uploadModal.fileUrl = this.uploudParams.fileBaseUrl + response.fileInfos[0].localPath

        if (imageExts.includes(ext)) {
          this.uploadModal.isImage = true
        } else {
          this.uploadModal.isImage = false
        }
      } else {
        // noop
      }
    },

    /**
    * 功能: 添加表格
    */
    insertTable () {
      let table = `<table class="tw-xeditor-table"><tbody>`

      for (let i = 0; i < this.tableModal.rows; i++) {
        table += '<tr>'
        for (let j = 0; j < this.tableModal.cols; j++) {
          table += '<td><br></td>'
        }
        table += '</tr>'
      }

      table += '</tbody></table>'
      this.exec('insertHTML', table)

      this.changeValue()
      this.tableModal.visible = false
    },

    /**
    * 功能: 让填空线可以拖动
    */
    initLine () {
      let vm = this
      let startSpacings = 0

      if (this.lineChanger) {
        this.lineChanger.destroy()
      }

      this.lineChanger = new this.$ui.XYChanger({
        target: '.tw-xeditor-line',

        start (start, target) {
          startSpacings = target.textContent.length / 12
        },

        update (change, target) {
          let spacings = parseInt(startSpacings + (change.x / 36))

          spacings = spacings < vm.blankSpcaces ? vm.blankSpcaces : spacings

          target.innerHTML = '- - - - - - '.repeat(spacings)

          vm.selection = document.getSelection()
          vm.selection.removeAllRanges()
        },

        controler: {
          title: '可左右拖动控制点设置填空线宽度',
          className: 'xlr xline',
          container: 'target'
        }
      })
    },

    /**
    * 功能: 获取当前选区的父填空线
    * @params {Range} 选区
    * @return null-无父填空区 element-父填空区元素
    */
    getParentLine (range) {
      if (range) {
        let parent = range.startContainer

        while (parent && parent !== this.$el.editor) {
          if (parent.nodeType === 1 && parent.classList.contains('tw-xeditor-line')) {
            return parent
          }

          parent = parent.parentNode
        }
      }

      return null
    },

    /**
    * 功能: 插入填空线，用【- -】等当填充字符的原因是为了解决chrome与ie的换行排版问题
    */
    insertLine () {
      // Take care that you don't add contenteditable="false"
      const line = `<u class="tw-xeditor-line">${'- - - - - - '.repeat(this.blankSpcaces)}</u>&nbsp;&nbsp;`
      let parentLine = this.getParentLine(this.range)

      while (parentLine) {
        this.moveCaret(parentLine, 'after')
        parentLine = this.getParentLine(this.range)
      }

      this.exec('insertHTML', line)

      this.genRange()
      this.changeValue()
    }
  },

  mounted () {
    if (this.mountElement) {
      this.initEditorMount()
    } else {
      this.editorElement = this.$refs.editor
      this.init(this.value)
    }
  },

  beforeDestroy () {
    if (this.range) {
      this.range.detach()
    }

    if (this.lineChanger) {
      this.lineChanger.destroy()
    }

    if (this.imgChanger) {
      this.imgChanger.destroy()
    }

    document.removeEventListener('mscontrolselect', this.ieControlselect)

    if (this.mountElement) {
      this.$ui.event.delegateOff(document, 'click.xeditor', true)
      document.removeEventListener('mousedown', this.saveMouseDownElement)

      if (this.scrollEl) {
        this.scrollEl.removeEventListener('scroll', this.computeEditorOffset)
      }
    }
  }
}
</script>
