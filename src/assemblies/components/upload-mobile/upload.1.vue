<template>
  <!-- 用法: http://element-cn.eleme.io/#/zh-CN/component/upload -->
  <div class="tw-upload" :class="{xpicture: listType==='picture', xdisabled: disabled}">
    <el-upload
      ref="upload"
      list-type="picture"
      :showFileList="false"
      :action="action"
      :headers="headers"
      :multiple="multiple"
      :data="data"
      :name="name"
      :withCredentials="withCredentials"
      :drag="drag"
      :accept="accept"
      :onSuccess="onSuccess"
      :onError="onError"
      :onProgress="uploadFile"
      :onChange="changeFile"
      :beforeUpload="beforeUpload"
      :autoUpload="autoUpload"
      :fileList="files"
      :httpRequest="httpRequest"
      :disabled="disabled"
      :limit="limit"
      :onExceed="handleExcess">
      <template slot="trigger"><slot name="trigger"></slot></template>
      <template><slot></slot></template>
      <template><slot name="tip"></slot></template>
    </el-upload>
    <ul class="tw-upload-list" :class="{xtext: listType==='text'}">
      <li class="tw-upload-list-item"
        v-for="file in files"
        :key="file.uid"
        :title="file.name">
          <!-- 文本式 -->
          <div v-if="listType==='text'" class="tw-upload-file xtext">
            <div class="tw-upload-file-imgbox" @click="preview(file)">
              <img v-if="file.fileType==='image'"
                :src="file.url" />
              <i v-else
                class="tw-ico"
                :class="['x40 xr'+file.fileType]"
                @click="preview(file)"></i>
              <i class="tw-upload-percentage"
              :style="{left: file.percentage + '%'}">
              </i>
            </div>
            <div class="tw-upload-file-name" @click="preview(file)">
              <span>{{file.name}}</span>
            </div>
            <div v-if="!disabled" class="tw-upload-file-tools">
              <a class="tw-ico xuldel2" @click="removeFile(file)"></a>
            </div>
          </div>
          <!-- /文本式 -->

          <!-- 卡片式 -->
          <div v-else
            class="tw-upload-file"
            @click="preview(file)">
            <img v-if="file.fileType==='image'"
              :src="file.url" />
            <i v-else
              class="tw-ico"
              :class="['x60 xr'+file.fileType]">
            </i>
            <i class="tw-upload-percentage"
              :style="{left: file.percentage + '%'}">
            </i>
            <a v-if="!disabled" class="tw-ico xuldel1" @click.stop="removeFile(file)"></a>
          </div>
          <!-- /卡片式 -->
      </li>
      <li ref="upload-btn-box"
        v-if="listType==='picture-card'"
        class="tw-upload-list-item">
      </li>
    </ul>

    <tw-previewer
      :visible.sync="previewerVisible"
      :images="images"
      :initIndex="previewerIndex" />
  </div>
</template>

<script>
import extToFileType from '@utils/extToFileType.js'

export default {
  name: 'tw-upload',

  props: {
    action: String,
    headers: Object,
    multiple: Boolean,
    data: Object,
    name: {
      type: String,
      default: 'file'
    },
    withCredentials: {
      type: Boolean,
      default: false
    },
    showFileList: {
      type: Boolean,
      default: true
    },
    drag: {
      type: Boolean,
      default: false
    },
    accept: String,
    onPreview: Function,
    onRemove: Function,
    onSuccess: Function,
    onError: Function,
    onProgress: Function,
    onChange: Function,
    beforeUpload: Function,
    beforeRemove: Function,
    listType: {
      type: String,
      default: 'card'
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    fileList: {
      type: Array,
      default () {
        return []
      }
    },
    httpRequest: Function,
    disabled: {
      type: Boolean,
      default: false
    },
    limit: Number,
    onExceed: Function
  },

  data () {
    return {
      files: [],
      file: null,
      uploadList: [],
      previewerVisible: false,
      previewerIndex: 0
    }
  },

  computed: {
    images () {
      return this.fileList.filter(file => file.fileType === 'image')
    }
  },

  methods: {
    /**
    * 功能: 文件列表被改变的处理
    * @param {Object} file 当前操作的文件对象
    * @param {Object} fileList 所有文件列表
    */
    changeFile (file, fileList) {
      this.file = file
      this.uploadList = fileList

      if (typeof this.onChange === 'function') {
        this.onChange(file, fileList)
      }
    },

    /**
    * 功能: 文件上传时的处理
    * @param {Object} event 上传的事件(progress)对象
    * @param {Object} file 当前操作的文件对象
    * @param {Object} fileList 所有文件列表
    */
    uploadFile (event, file, fileList) {
      const currentFile = this.files.filter((item) => {
        return item.uid === file.uid
      })

      currentFile[0].percentage = file.percentage
      if (typeof this.onProgress === 'function') {
        this.onProgress(event, file, fileList)
      }
    },

    /**
    * 功能: 删除文件前的处理
    * @param {Object} file 文件列表中的文件
    */
    removeFile (file) {
      const fileIndex = this.files.indexOf(file)
      const currentFile = this.uploadList[fileIndex]

      const doRemove = () => {
        let fileList = this.uploadList

        this.$refs.upload.abort(currentFile)
        fileList.splice(fileIndex, 1)
        this.$emit('update:fileList', this.files)
        this.files.splice(fileIndex, 1)

        if (typeof this.onRemove === 'function') {
          this.onRemove(currentFile, fileList)
        }
      }

      if (typeof this.beforeRemove === 'function') {
        const before = this.beforeRemove(currentFile, this.uploadList)

        if (before && before.then) {
          before.then(() => {
            doRemove()
          })
        } else if (before !== false) {
          doRemove()
        }
      } else {
        doRemove()
      }
    },

    /**
    * 功能: 选择的文件超过限制数时的处理
    * @param {Object} files 当前选择的文件列表
    * @param {Object} fileList 所有文件列表
    */
    handleExcess (files, fileList) {
      this.$message.warning(`选择的文件超出最大数限制，请重新选择。`)

      if (typeof this.onExceed === 'function') {
        this.onExceed(files, fileList)
      }
    },

    /**
    * 功能: 预览处理
    * @param {Object} file 文件列表中的文件
    */
    preview (file) {
      if (file.fileType === 'image') {
        for (let i = 0; i < this.images.length; i++) {
          if (this.images[i].uid === file.uid) {
            this.previewerIndex = i
            break
          }
        }

        this.previewerVisible = true
      } else {
        window.open(file.url)
      }

      const fileIndex = this.files.indexOf(file)
      const currentFile = this.uploadList[fileIndex]

      if (typeof this.onPreview === 'function') {
        this.onPreview(currentFile, this.uploadList)
      }
    }
  },

  mounted () {
    // 复制upload的方法
    this.$el.clearFiles = this.$refs.upload.clearFiles
    this.$el.abort = this.$refs.upload.abort
    this.$el.submit = this.$refs.upload.submit

    // picture-card模式时，上传按钮放在文件列表的最后位置
    if (this.listType === 'picture-card') {
      this.$refs['upload-btn-box'].appendChild(this.$refs.upload.$el)
    }
  },

  watch: {
    fileList: {
      immediate: true,
      handler (fileList) {
        this.files = fileList.map(item => {
          item.fileType = extToFileType(item.name)
          return item
        })
      }
    }
  }
}
</script>
