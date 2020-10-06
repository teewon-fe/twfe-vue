<template>
  <div>
    <tw-modal
      class="xsmall"
      :visible.sync="importModal.visible"
      @close="closeImportModal">
      <template slot="header">模板导入</template>
      <template slot="body">
        <div>
          <div>
            <p v-if="templateUrl">
              <span>请参考模板形式提供导入文件</span>
              <a class="text-link" target="_blank" :href="templateUrl">下载模板</a>
            </p>

            <div class="tw-upload xmodal">
              <el-input class="tw-upload-txt" v-model="importModal.formData.fileName" readonly></el-input>
              <el-upload
                ref="upload"
                class="tw-upload-btn"
                accept = ".xls,.xlsx"
                :action="$app.fileUploadUrl"
                :data="{branchCode:$app.currentTenant}"
                :file-list="importModal.fileList"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="handleFileChange"
                :on-success="handleUploadSuccess"
                :on-error="handleUploadError">
                <a class="tw-btn xmain">选择文件导入</a>
              </el-upload>
            </div>
          </div>
        </div>
      </template>

      <template slot="footer">
        <a class="tw-btn xmain xlarge" @click="startUpload">确定</a>
        <a class="tw-btn xweaking xlarge" @click="closeImportModal">取消</a>
      </template>
    </tw-modal>

    <!--弹窗: 模板导入报错提示-->
     <tw-modal :visible.sync="errorModal.visible" class="xmedium" @close="closeErrorModal">
      <template slot="header">导入错误</template>
      <template slot="body">
        <div>
          <div>
            <p class="text-error" style="margin-bottom: 10px;">以下数据导入报错，请修改后重新导入</p>
            <!-- 数据表格 -->
            <el-table :data="errorModal.data" border max-height="400">
              <el-table-column
                type="index"
                width="55"
                label="序号">
              </el-table-column>

              <el-table-column
                prop="rowNum"
                label="行号" width="100">
              </el-table-column>

              <el-table-column
                prop="reason"
                label="错误原因">
              </el-table-column>
            </el-table>
            <!-- /数据表格 -->
          </div>
        </div>
      </template>

      <template slot="footer">
        <a class="tw-btn xweaking xlarge" @click="closeErrorModal">关闭</a>
      </template>
    </tw-modal>
    <!--/弹窗: 模板导入报错提示-->
  </div>
</template>

<script>
export default {
  name: 'tw-template-upload',

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    templateUrl: {
      type: String,
      default: ''
    },
    onSuccess: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      importModal: {
        visible: false,
        fileList: [],
        formData: {
          fileName: ''
        }
      },

      errorModal: {
        visible: false,
        data: []
      }
    }
  },

  methods: {
    /**
    * 功能: 上传文件之前改变文件的钩子函数
    */
    handleFileChange (file, filelist) {
      if (filelist.length > 1) {
        this.importModal.fileList = filelist.splice(1, 1)
      }

      this.importModal.formData.fileName = file.name
    },

    /**
    * 功能: 导入文件成功处理
    */
    handleUploadSuccess (response, file, fileList, type) {
      this.onSuccess(response.fileInfos[0], this)
      // this.$message.success(`文件: ${file.name}上传成功。`)
    },

    /**
    * 功能: 导入文件失败处理
    */
    handleUploadError (err, file, fileList) {
      this.$message.error(`文件: ${file.name}上传失败。`)
      console.log(err)
    },

    /**
    * 功能: 上传文件
    */
    startUpload () {
      if (this.importModal.formData.fileName === '') {
        this.$message.error('请选择一个文件上传')
        return
      }

      this.$refs.upload.submit()
    },

    /**
    * 功能: 显示错误弹窗
    * @param {Array} errData 错误信息数组
    */
    showErrMsg (errData) {
      this.errorModal.data = errData
      this.errorModal.visible = true
    },

    /**
    * 功能: 清除导入弹窗数据
    */
    clearData () {
      if (this.$refs.upload) {
        this.$refs.upload.clearFiles()
      }

      this.importModal.fileList = []
      this.importModal.formData.fileName = ''
    },

    /**
    * 功能: 关闭导入弹窗
    */
    closeImportModal () {
      this.importModal.visible = false
      this.$emit('update:visible', false)
    },

    /**
    * 功能: 关闭导入弹窗
    */
    closeErrorModal () {
      this.errorModal.data = []
      this.errorModal.visible = false
    }
  },

  watch: {
    visible: {
      immediate: true,
      handler (val) {
        if (this.importModal.visible !== val) {
          this.importModal.visible = val
        }

        this.clearData()
      }
    }
  }
}
</script>
