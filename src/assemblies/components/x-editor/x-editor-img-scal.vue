<template>
  <div class="tw-xeditor">
    <div class="tw-xeditor-menu">
      <div class="tw-xeditor-menu-group">
        <a class="tw-popswitch xwauto"
          :id="`xe_${_uid}_font_size`"
          @mousedown.prevent>
          <span>字号</span>
        </a>
        <tw-poppane
          class="xeditor js-position"
          trigger="click"
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
        <a><i class="tw-ico xeblank"></i></a>
        <a><i class="tw-ico xeformula"></i></a>
        <a><i class="tw-ico xeimg"></i></a>
        <a><i class="tw-ico xemind"></i></a>
        <a><i class="tw-ico xevoice"></i></a>
      </div>
    </div>

    <div ref="editor"
      class="tw-xeditor-body js-xeditor"
      contenteditable
      @mouseup="getSelection"
      @keyup="handleEditorKeyup"
      @keydown="handleEditorKeydown">
      <div><span>Hello</span> <span> World!</span></div>
      <div><span>Yes</span> <span> ok!</span></div>
      <div><span>Auth</span> <span> done!</span></div>
    </div>

    <textarea></textarea>

    <!-- 图片缩放附加容器 -->
    <div ref="imageScalBox"
      v-show="currImg"
      tabindex="1"
      title="可拖动图片右下角控件点缩放图片"
      class="tw-xeditor-imgscalbox"
      :style="imageScalBoxStyle"
      @mousedown.prevent
      @click.stop>
      <i class="tw-xeditor-imgscalbox-point" @mousedown.prevent="startScalImage"></i>
    </div>

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

    // 填空线默认的空格数
    blankSpcaces: {
      type: Number,
      default: 9
    }
  },

  data () {
    return {
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
      currImg: null,
      imageScalBoxStyle: null,
      startScal: {
        x: 0,
        y: 0,
        w: 0,
        h: 0
      },
      lineChanger: null
    }
  },

  methods: {
    /**
    * 功能: 初始化
    */
    init () {
      Object.assign(this.uploudParams, this.uploud)
      this.selection = document.getSelection()
      this.handleClickEditorImage()
      this.initIeEvent()
      this.initLine()
    },

    /**
    * 功能: 判断图片是否在editor中
    * @param {Node} el 要判断的元素
    */
    isEditorImg (el) {
      const images = document.querySelectorAll('.js-xeditor img')

      let i, len

      for (i = 0, len = images.length; i < len; i++) {
        if (images[i] === el) {
          return true
        }
      }

      return false
    },

    /**
    * 功能: 初始化IE事件
    */
    initIeEvent () {
      document.addEventListener('mscontrolselect', this.ieControlselect)
    },

    /**
    * 功能: 阻止IE的选择控制元素
    */
    ieControlselect (event) {
      event.preventDefault()
    },

    /**
    * 功能: 编辑器内容改变
    */
    changeValue () {
      let value = this.$refs.editor.innerHTML
      this.$emit('input', value)
      this.$emit('change', value)
    },

    /**
    * 功能: 设置图片缩放元素样式
    */
    setImageScalBoxStyle () {
      const offset = this.$ui.el.position(this.currImg)

      this.imageScalBoxStyle = {
        width: this.currImg.offsetWidth + 'px',
        height: this.currImg.offsetHeight + 'px',
        top: offset.top + 'px',
        left: offset.left + 'px'
      }
    },

    /**
    * 功能: 编辑器输入时生成选区并改变绑定值
    */
    handleEditorKeyup () {
      this.genRange()
      this.changeValue()
    },

    /**
    * 功能: 清空拖动控制点
    */
    handleEditorKeydown () {
      if (this.lineChanger) {
        this.lineChanger.clear()
      }
    },

    /**
    * 功能: 开始图片缩放
    */
    startScalImage (event) {
      this.startScal.x = event.pageX
      this.startScal.y = event.pageY
      this.startScal.w = this.currImg.offsetWidth
      this.startScal.h = this.currImg.offsetHeight

      document.addEventListener('mousemove', this.handleImageScal)
      document.addEventListener('mouseup', this.removeScalEvent)
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
    * 功能: 移除图片缩放事件
    */
    removeScalEvent () {
      document.removeEventListener('mousemove', this.handleImageScal)
      document.removeEventListener('mouseup', this.removeScalEvent)
    },

    /**
    * 功能: 图片处理
    */
    selectEditorImage (event) {
      if (this.isEditorImg(event.target)) {
        this.currImg = event.target
        this.setImageScalBoxStyle()

        this.$nextTick(() => {
          this.$refs.imageScalBox.focus()
        })
      } else {
        if (this.currImg) {
          this.unselectEditorImage()
        }
      }
    },

    /**
    * 功能: 全局委托点击编辑器中的图片事件
    */
    handleClickEditorImage () {
      document.addEventListener('click', this.selectEditorImage)
    },

    /**
    * 功能: 取消选择图片
    */
    unselectEditorImage () {
      this.currImg = null
      document.removeEventListener('mousemove', this.handleImageScal)
    },

    /**
    * 功能: 删除图片
    */
    deleteEditorImage () {
      if (this.selection && this.currImg) {
        this.exec('delete')
        this.unselectEditorImage()
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
    moveCaret (el, position = 'after') {
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
        this.range.setStartAfter(this.$refs.editor.lastChild)
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
    getSelection () {
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

      let fontEls = this.$refs.editor.querySelectorAll('font')

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
    * 功能: 插入图片
    * @param {String} imgUrl 图片url
    */
    insertImage (imgUrl) {
      let img = `<img src="${imgUrl}" />`

      this.exec('insertHTML', img)
      this.changeValue()
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
      let table = `<table><tbody>`

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

      this.lineChanger = new this.$ui.XYChanger({
        target: '.tw-xeditor-line',

        start (start, target) {
          startSpacings = target.textContent.length
        },

        update (change, target) {
          let spacings = parseInt(startSpacings + (change.x / 3))

          spacings = spacings < vm.blankSpcaces ? vm.blankSpcaces : spacings

          target.innerHTML = '&nbsp;'.repeat(spacings)

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
      let parent = range.startContainer

      while (parent && parent !== this.$el) {
        if (parent.nodeType === 1 && parent.classList.contains('tw-xeditor-line')) {
          return parent
        }

        parent = parent.parentNode
      }

      return null
    },

    /**
    * 功能: 插入填空线，用下划线字符当填空线
    */
    insertLine () {
      const line = `<u class="tw-xeditor-line">${'&nbsp;'.repeat(this.blankSpcaces)}</u>`
      const parentLine = this.getParentLine(this.range)

      if (parentLine) {
        this.moveCaret(parentLine)
      }

      this.exec('insertHTML', line)

      // this.moveCaret(line)
      this.changeValue()
    }
  },

  mounted () {
    this.init()
    this.exec('styleWithCSS', true)
  },

  beforeDestroy () {
    if (this.range) {
      this.range.detach()
    }

    document.removeEventListener('click', this.selectEditorImage)
    document.removeEventListener('mscontrolselect', this.ieControlselect)
  }
}
</script>

<style lang="scss">
  @import "./x-editor.scss";
</style>
