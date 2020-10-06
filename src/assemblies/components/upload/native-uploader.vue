<template>
  <div class="tw-nuploader">
    <slot name="left"></slot>

    <tw-media-view
      ref="mediaView"
      class="tw-filelist"
      stop-propagation>
      <div class="tw-filelist-item"
        v-for="(file,idx) in files"
        :key="idx">
        <slot name="file" :file="file">
          <img v-if="file.fileType==='image'"
            class="tw-filelist-thumbnail"
            :src="file.url"
            :data-src="file.url"
            :data-ext="file.ext">
          <i v-else
            class="tw-ico"
            :class="['x60 xr'+file.fileType]"
            :data-src="file.url"
            :data-ext="file.ext">
          </i>
          <template v-if="file.fromNative && file.progress<1">
            <i class="tw-nuploader-imgcover"
              :style="{width: (1-file.progress)*100+'%'}">
            </i>
            <i class="tw-nuploader-imgtip">{{file.progress>0?`上传${(file.progress*100).toFixed(2)}%...`:'未上传'}}</i>
          </template>
        </slot>
        <div v-if="!readonly && deletable" class="tw-filelist-tools"
          @click="delFile(file)">
          <slot name="delete-icon">
            <i class="tw-ico xuldel3" title="删除"></i>
          </slot>
        </div>
      </div>
      <div v-if="!readonly && files.length<limit"
        class="tw-filelist-item xadd"
        @click="selectNative">
        <slot name="upload-btn">
          <a class="tw-addbtn" title="添加"></a>
        </slot>
      </div>
    </tw-media-view>

    <slot name="right"></slot>

    <!-- 弹出层：选择原生功能 -->
    <van-popup
      class="xuploader"
      v-model="nativePopup.visible"
      position="bottom"
      get-container="#app">
      <ul class="tw-nuploader-nvpopup">
        <li v-if="natives.includes('selectPhoto')"
          @click="sendNative('selectPhoto')">
          <i class="tw-ico xphotos"></i>
          <h4>相册</h4>
        </li>
        <li v-if="natives.includes('selectVideo')"
          @click="sendNative('selectVideo')">
          <i class="tw-ico xphotos"></i>
          <h4>选择视频</h4>
        </li>
        <li v-if="natives.includes('takePhoto')"
          @click="sendNative('takePhoto')">
          <i class="tw-ico xtpicture"></i>
          <h4>拍照</h4>
        </li>
        <li v-if="natives.includes('takeVideo')"
          @click="sendNative('takeVideo')">
          <i class="tw-ico xtpicture"></i>
          <h4>录像</h4>
        </li>
        <li v-if="natives.includes('takeAudio')"
          @click="sendNative('takeAudio')">
          <i class="tw-ico xrecord"></i>
          <h4>录音</h4>
        </li>
        <li v-if="natives.includes('takeSign')"
          @click="sendNative('takeSign')">
          <i class="tw-ico xtpicture"></i>
          <h4>签字</h4>
        </li>
      </ul>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'tw-native-uploader',

  props: {
    // 已上传文件列表
    value: {
      type: Array,
      default () {
        return []
      }
    },

    // 键映射
    keyMap: {
      type: Object,
      default () {
        return {
          url: 'localPath',
          ext: 'format'
        }
      }
    },

    // 文件基路径
    fileBaseUrl: {
      type: String,
      default: window.$app.fileBaseUrl
    },

    // 成功回调函数
    successHandler: {
      type: Function
    },

    // 上传的地址
    action: String,

    // 最大允许上传个数
    limit: {
      type: [Number, Object],
      default: 1
    },

    // 是否开启只读状态
    readonly: {
      type: Boolean,
      default: false
    },

    // 文件名
    fileName: String,

    // 是否自动上传
    autoUpload: {
      type: Boolean,
      default: true
    },

    // 删除提示
    deleteMsg: {
      type: String,
      default: '是否删除?'
    },

    // 文件是否可删除
    deletable: {
      type: Boolean,
      default: true
    },

    // 成员
    natives: {
      type: Array,
      default () {
        return ['selectPhoto', 'takePhoto', 'takeAudio']
      }
    }
  },

  data () {
    return {
      files: [],
      initFiles: [],
      uploadedFiles: new Map(),
      src: require('@images/demo/1.jpg'),
      nativePopup: {
        visible: false
      },
      limitResult: {
        image: 1,
        video: 1,
        audio: 1,
        sign: 1
      }
    }
  },

  computed: {
    types () {
      let result = []

      if (this.natives.includes('selectPhoto') || this.natives.includes('takePhoto')) {
        result.push('image')
      } else if (this.natives.includes('selectVideo') || this.natives.includes('takeVideo')) {
        result.push('video')
      } else if (this.natives.includes('takeAudio')) {
        result.push('audio')
      } else if (this.natives.includes('takeSign')) {
        result.push('sign')
      }

      return result
    }
  },

  methods: {
    init () {
      this.value.forEach(item => {
        this.handleLocalFile(item)
      })

      this.initFiles = [].concat(this.value)
      this.files = this.value.concat(this.files)

      this.types.forEach(type => {
        this.limitResult[type] = this.computeLimit(type)
      })
    },

    /**
    * 功能: 计算某一类型文件的最大个数
    * @param {String} type 类型 image-图片 video-视频 audio-音频
    */
    computeLimit (type) {
      return typeof this.limit === 'number' ? this.limit : this.limit[type] || 1
    },

    /**
    * 功能: 获取相关类型文件的数量
    * @param {String} type 类型 image-图片 video-视频 audio-音频
    * @return {Number} 文件数量
    */
    getFileNumberByType (type) {
      return this.files.filter(file => file.fileType === type).length
    },

    /**
    * 功能: 处理接口初始化时的文件
    * @param {Type} localFile 文件数据对象
    */
    handleLocalFile (localFile) {
      if (!localFile.url) {
        localFile.url = this.fileBaseUrl + localFile[this.keyMap.url]
      }

      if (!localFile.ext) {
        localFile.ext = localFile.url.substring(localFile.url.lastIndexOf('.') + 1)
      }

      if (!localFile.fileType) {
        localFile.fileType = this.$ui.extToFileType(localFile.ext, true)
      }
    },

    /**
    * 功能: 处理原生返回的文件
    * @param {Object} nativeFile 要操作的从native返回的文件数据对象
    */
    handleNativeFile (nativeFile) {
      nativeFile.isNative = true
      nativeFile.progress = 0
      nativeFile.onUploadProgress = this.handleUploadProgress
      nativeFile.status = 'ready'

      const CancelToken = this.$axios.CancelToken
      const source = CancelToken.source()
      nativeFile.axiosSource = source

      if (this.action) {
        nativeFile.uploadUrl = this.action
      }

      if (this.autoUpload) {
        this.upload(nativeFile)
      }

      this.files.push(nativeFile)
    },

    /**
    * 功能: 选择原生功能
    */
    selectNative () {
      if (this.natives.length === 1) {
        this.sendNative(this.natives[0])
      } else if (this.natives.length > 1) {
        this.nativePopup.visible = true
      }
    },

    /**
    * 功能: 调用原生功能
    * @param {String} nativeApi 功能接口名称
    */
    sendNative (nativeApi) {
      let vm = this
      let errorMsg = ''

      if (['selectPhoto', 'takePhoto'].includes(nativeApi) && this.limitResult.image <= this.getFileNumberByType('image')) {
        errorMsg = `最多上传${this.limitResult.image}张图片`
      } else if (['selectVideo', 'takeVideo'].includes(nativeApi) && this.limitResult.video <= this.getFileNumberByType('video')) {
        errorMsg = `最多上传${this.limitResult.video}个视频`
      } else if (nativeApi === 'takeAudio' && this.limitResult.audio <= this.getFileNumberByType('audio')) {
        errorMsg = `最多上传${this.limitResult.audio}个音频`
      } else if (nativeApi === 'takeSign' && this.limitResult.sign <= this.getFileNumberByType('sign')) {
        errorMsg = `最多上传${this.limitResult.sign}个签名`
      }

      if (errorMsg) {
        this.$ui.msg(errorMsg)
        return
      }

      if (nativeApi === 'selectPhoto') {
        this.$native.selectPhoto.params.maxCount = this.limitResult.image
        this.$native.selectPhoto.params.remainCount = this.limitResult.image - this.getFileNumberByType('image')
      }

      this.$native[nativeApi].send({
        fileName: this.fileName
      }).then(res => {
        if (['selectPhoto', 'takePhoto'].includes(nativeApi)) {
          res.data.forEach(item => {
            vm.handleNativeFile(item)
          })
        } else {
          vm.handleNativeFile(res.data)
        }

        vm.$emit('change', res.data, vm.files)
        vm.nativePopup.visible = false
      }).catch(e => {
        this.$ui.msg({
          type: 'error',
          message: `原生接口异常`
        })
      })
    },

    /**
    * 功能: 更新上传进度
    * @param {String} option 上传时的选项
    * @param {Number} loaded 已上传文件大小
    * @param {Number} total 文件总大小
    */
    handleUploadProgress (option, loaded, total) {
      option.progress = loaded / total
    },

    /**
    * 功能: 上传
    */
    upload (file) {
      let vm = this
      file.status = 'uploading'

      this.$native.upload(file).then((res) => {
        file.progress = 1
        file.status = 'success'

        let f = null
        if (typeof vm.successHandler === 'function') {
          f = vm.successHandler(res)
        } else {
          if (res.data.fileInfos && res.data.fileInfos[0]) {
            f = res.data.fileInfos[0]
          }
        }

        if (f) {
          vm.handleLocalFile(f)
          vm.uploadedFiles.set(file, f)
          vm.$emit('input', vm.initFiles.concat([...vm.uploadedFiles.values()]))
          vm.$emit('uploaded', vm.initFiles.concat([...vm.uploadedFiles.values()]), vm.files, f)
        } else {
          Promise.reject(new Error('上传失败'))
        }
      }).catch(e => {
        file.progress = 0
        file.status = 'error'

        this.$ui.msg({
          type: 'error',
          message: `文件${file.fileName}上传失败。`
        })
      })
    },

    /**
    * 功能: 手动上传原生选择的文件
    */
    submit () {
      this.files.forEach(file => {
        if (file.isNative) {
          this.upload(file)
        }
      })
    },

    /**
    * 功能: 删除文件
    * @param {Object} file 文件数据对象
    */
    delFile (file) {
      this.$ui.confirm({
        message: this.deleteMsg,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(() => {
        this.$ui.arr.del(this.files, file)

        if (file.isNative) {
          this.uploadedFiles.delete(file)

          if (file.status === 'uploading') {
            file.axiosSource.cancel('上传被取消.')
          }
        } else {
          this.$ui.arr.del(this.initFiles, file)
        }

        this.$emit('input', this.initFiles.concat([...this.uploadedFiles.values()]))
        this.$refs.mediaView.closeAll()
      })
    },

    /**
    * 功能: 关键所有媒体
    */
    closeMedia () {
      this.$refs.mediaView.closeActiveMedia()
    }
  },

  created () {
    this.init()
  },

  beforeDestroy () {
    this.$refs.mediaView.closeAll()
  },

  watch: {
    // 当通过v-modal绑定的value值改变时，需要显示出添加的文件
    value: {
      deep: true,
      handler (val, oldVal) {
        let vm = this

        if (val === oldVal) {
          val.filter(item => {
            if (!vm.initFiles.includes(item) && ![...this.uploadedFiles.values()].includes(item)) {
              this.handleLocalFile(item)
              this.files.push(item)
              this.initFiles.push(item)
            }
          })
        } else {
          this.initFiles.forEach(item => {
            this.$ui.arr.del(this.files, item)
          })

          this.initFiles = []

          val.filter(item => {
            if (![...this.uploadedFiles.values()].includes(item)) {
              this.handleLocalFile(item)
              this.initFiles.push(item)
            }
          })

          this.files = this.initFiles.concat(this.files)
        }
      }
    }
  }
}
</script>

<style lang="scss">
  @import "./native-uploader.scss";
</style>
