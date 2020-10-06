<template>
  <div class="tw-body pt-medium">
    <div class="tw-body-inner">
      <!-- 面包屑 -->
      <div class="tw-crm">
        <a class="tw-crm-link"
          :href="$app.aiExam.index">考试中心</a>
        <i class="tw-crm-arrow"></i>
        <span class="tw-crm-self">选择试卷</span>
      </div>
      <!-- /面包屑 -->

      <!-- 过滤区 -->
      <div class="tw-flex xfilter">
        <div class="tw-flex-body">
          <tw-api-select :api="$api.ui.demo"
            option-value-vey="id"
            option-label-key="name"
            v-model="$api.ui.demo.params.str"
            placeholder="请选择班级">
          </tw-api-select>

          <el-date-picker class="ml-medium"
            v-model="$api.ui.demo.params.str"
            type="daterange"
            range-separator="至"
            placeholder="请选择布置作业时间"></el-date-picker>

          <tw-search class="xmedium ml-medium"
            v-model="$api.ui.demo.params.str"></tw-search>
        </div>
      </div>
      <!-- /过滤区 -->

      <div class="tw-body-inner-content">
        <div class="tw-title">
          <h3 class="tw-title-left">试题</h3>
        </div>

        <div>
          <tw-question
            class="xweaking"
            v-for="(question, index) in $api.ui.demo.data.questions"
            :key="index"
            :data="question"
            :question-no="`${index+1}`"
            toolbar-visible
            init-analysis-visibel
            :id="`question${question.id}`"
            :toolbar-members="['degree', 'type', 'analysis']"
            collapsed-analysis-label="作答统计"
            extended-analysis-label="作答统计"
            :analysis-members="['answer','knowledgePoints', 'avgScore','scoreRate', 'statistics', 'answer', 'analysis']">
            <!-- 子试题: 综合题、听力题才有子试题 -->
            <template v-if="question.children"
              v-slot:body>
              <tw-question
                class="xweaking"
                v-for="(child, childIndex) in question.children"
                :key="`${index}-${childIndex}`"
                :data="child"
                :question-no="`${index+1}-${childIndex+1}`"
                toolbar-visible
                init-analysis-visibel
                :toolbar-members="['degree', 'type', 'analysis']"
                collapsed-analysis-label="作答统计"
                extended-analysis-label="作答统计"
                :analysis-members="['answer','knowledgePoints', 'avgScore','scoreRate', 'statistics', 'answer', 'analysis']">
              </tw-question>
            </template>
            <!-- 试题：自定义按钮区 -->
            <template v-slot:analisis-btn-icon>
              <i class="tw-ico xvsummary"></i>
            </template>
            <template v-slot:toolbar-btns>
              <a class="tw-question-toolbtn">
                <i class="tw-ico xvdetail"></i>
                <span>做答详情</span>
              </a>
            </template>
          </tw-question>
        </div>

        <div class="tw-title">
          <h3 class="tw-title-left">主按钮</h3>
        </div>
        <a class="tw-btn xmain">发回</a>
        <a class="tw-btn xsecondary">创建考试</a>
        <a class="tw-btn xweaking">弱色按钮</a>

        <span class="ml-tiny"></span>

        <a class="tw-icobtn">
          <i class="tw-ico xcorrection"></i>
          <span>图标按钮</span>
        </a>
        <span class="tw-tag xlabel xsign">签名类</span>
        <span class="tw-tag xlabel xsubmit">提交类</span>
        <span class="tw-tag xlabel xview">查看类</span>

        <div class="tw-title mt-small">
          <h3 class="tw-title-left">小按钮</h3>
        </div>
        <a class="tw-btn xmain xsmall">主色按钮</a>
        <a class="tw-btn xsecondary xsmall">辅助按钮</a>
        <a class="tw-btn xweaking xsmall">弱色按钮</a>

        <div class="mt-small">
          <div class="tw-title mt-small">
            <h3 class="tw-title-left">排序按钮</h3>
          </div>

          <tw-sort-btn @default="$api.ui.demo.send()"
            @asc="$api.ui.demo.send()"
            @desc="$api.ui.demo.send()"></tw-sort-btn>
        </div>

        <div class="mt-small">
          <div class="tw-title mt-small">
            <h3 class="tw-title-left">排序按钮组</h3>
          </div>

          <tw-sort-group class="mb-tiny"
            @change="(val, sortKey)=>{$ui.msg('排序改变')}">
            <tw-sort-btn sort-key="zh">综合</tw-sort-btn>
            <tw-sort-btn class="ml-medium"
              sort-key="sj">时间</tw-sort-btn>
            <tw-sort-btn class="ml-medium"
              sort-key="rd">热度</tw-sort-btn>
          </tw-sort-group>
        </div>

        <div class="tw-title mt-small">
          <h3 class="tw-title-left">分页</h3>
        </div>
        <el-pagination background
          :page-size="paginationOne.pageSize"
          :pager-count="7"
          :current-page.sync="paginationOne.currentPage"
          layout="prev, pager, next,total"
          :total="paginationOne.total"></el-pagination>

        <div class="tw-title mt-small">
          <h3 class="tw-title-left">小分页</h3>
        </div> <span>共<span class="text-highlight mx-tiny text-bold">{{$api.ui.demo.data.total}}</span>题</span>
        <!-- 分页 -->
        <el-pagination class="xinline"
          small
          layout="prev,slot,  next"
          :page-size="$api.ui.demo.params.pageSize"
          :current-page.sync="$api.ui.demo.params.pageNum"
          :total="$api.ui.demo.data.total">
          <span>第 {{$api.ui.demo.params.pageNum}}/{{Math.ceil($api.ui.demo.data.total/$api.ui.demo.params.pageSize)}}页</span>
        </el-pagination>

        <div class="tw-title mt-small">
          <h3 class="tw-title-left">弹窗</h3>
        </div>
        <a class="tw-btn xmain"
          @click="modal.visible=true">打开弹窗（试卷保存成功三个按钮）</a>

        <div class="tw-title mt-small">
          <h3 class="tw-title-left">弹窗确认消息（两个按钮)</h3>
        </div>
        <a class="tw-btn xmain"
          @click="showSuccess">success</a>
        <a class="tw-btn xmain"
          @click="showInfo">info</a>
        <a class="tw-btn xmain"
          @click="showWarning">warning</a>
        <a class="tw-btn xmain"
          @click="showError">error</a>

        <div class="tw-title mt-small">
          <h3 class="tw-title-left">弹窗提示消息（一个按钮）</h3>
        </div>
        <a class="tw-btn xmain"
          @click="showSuccessTips">success</a>
        <a class="tw-btn xmain"
          @click="showInfoTips">info</a>
        <a class="tw-btn xmain"
          @click="showWarningTips">warning</a>
        <a class="tw-btn xmain"
          @click="showErrorTips">error</a>

        <div class="tw-title mt-small">
          <h3 class="tw-title-left">提示消息（无遮罩，在页面默认三秒消失、删除成功等）</h3>
        </div>
        <a class="tw-btn xmain"
          @click="showSuccessTips2">success</a>
        <a class="tw-btn xmain"
          @click="showInfoTips2">info</a>
        <a class="tw-btn xmain"
          @click="showWarningTips2">warning</a>
        <a class="tw-btn xmain"
          @click="showErrorTips2">error</a>

        <div class="tw-title mt-medium">
          <h3 class="tw-title-left">tab切换样式1</h3>
        </div>
        <tw-collapse-group disable-toggle-self>
          <ul class="tw-tabs">
            <li class="js-tab1">
              <a>我的组卷</a>
            </li>
            <li class="js-tab2">
              <a>校级共享</a>
            </li>
          </ul>
          <tw-collapse class="xtabs"
            switch=".js-tab1"
            default-open>
            <div>内容1</div>
          </tw-collapse>
          <tw-collapse class="xtabs"
            switch=".js-tab2">
            <div>内容2</div>
          </tw-collapse>
        </tw-collapse-group>

        <div class="tw-title mt-medium">
          <h3 class="tw-title-left">tab切换样式 右侧带内容</h3>
        </div>
        <tw-collapse-group disable-toggle-self>
          <ul class="tw-tabs">
            <li class="js-tab9">
              <a>我的组卷</a>
            </li>
            <li class="js-tab10">
              <a>校级共享</a>
            </li>
            <el-checkbox-group v-model="$api.ui.demo.params.arr">
              <el-checkbox label="未批改（0人）"></el-checkbox>
              <el-checkbox label="未批改（2人）"></el-checkbox>
              <el-checkbox label="未提交（0人）"></el-checkbox>
            </el-checkbox-group>
          </ul>
          <tw-collapse class="xtabs"
            switch=".js-tab9"
            default-open>
            <div>内容1</div>
          </tw-collapse>
          <tw-collapse class="xtabs"
            switch=".js-tab10">
            <div>内容2</div>
          </tw-collapse>
        </tw-collapse-group>

        <div class="tw-title mt-medium">
          <h3 class="tw-title-left">tab切换样式2</h3>
        </div>
        <tw-collapse-group disable-toggle-self>
          <ul class="tw-tabs xcard xmedium">
            <li class="js-nav1">
              <a>编辑</a>
            </li>
            <li class="js-nav2">
              <a>题目顺序</a>
            </li>
            <li class="js-nav3">
              <a>试卷样式</a>
            </li>
          </ul>
          <tw-collapse class="xtabs px-medium"
            switch=".js-nav1"
            default-open>
            <div>内容1</div>
          </tw-collapse>
          <tw-collapse class="xtabs px-medium"
            switch=".js-nav2">
            <div>内容2</div>
          </tw-collapse>
          <tw-collapse class="xtabs px-medium"
            switch=".js-nav3">
            <div>内容3</div>
          </tw-collapse>
        </tw-collapse-group>

        <div class="tw-title mt-medium">
          <h3 class="tw-title-left">tab切换样式3</h3>
        </div>
        <tw-collapse-group disable-toggle-self
          style="width:280px;">
          <ul class="tw-tabs xcardfull">
            <li class="js-nav4">
              <a>知识点</a>
            </li>
            <li class="js-nav5">
              <a>章节</a>
            </li>
          </ul>
          <tw-collapse class="xtabs px-medium"
            switch=".js-nav4"
            default-open>
            <div>内容1</div>
          </tw-collapse>
          <tw-collapse class="xtabs px-medium"
            switch=".js-nav5">
            <div>内容2</div>
          </tw-collapse>
        </tw-collapse-group>

        <div class="tw-title mt-medium">
          <h3 class="tw-title-left">表单</h3>
        </div>
        <!-- 用法: http://element.eleme.io/#/zh-CN/component/form -->
        <el-form class="xtip"
          ref="form"
          label-width="8em"
          size="medium"
          :model="form">
          <el-form-item class="xtip"
            prop="name"
            label="文本选项:"
            :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
            <el-input v-model="form.name"
              disabled></el-input>
            <el-tooltip :enterable="true"
              effect="light"
              content="表单提示"
              placement="top">
              <i class="tw-ico xtip"></i>
            </el-tooltip>
          </el-form-item>

          <el-form-item prop="type"
            label="下拉框选项:"
            :rules="[{validator: validateType, trigger: 'change'}]">
            <el-select multiple
              v-model="form.type"
              placeholder="请选择选项">
              <el-option v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="date"
            label="日期选择:"
            :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
            <!-- 用法: http://element.eleme.io/#/zh-CN/component/date-picker -->
            <el-date-picker v-model="form.date"
              type="date"
              placeholder="选择日期"></el-date-picker>
          </el-form-item>

          <el-form-item prop="group"
            label="选项组:"
            :rules="[{required: true, message: '不能为空', trigger: 'change'}]">
            <el-checkbox-group class="pt-tiny"
              v-model="form.group">
              <el-checkbox label="选项1"></el-checkbox>
              <el-checkbox label="选项2"></el-checkbox>
              <el-checkbox label="选项3"></el-checkbox>
              <el-checkbox label="选项4"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item>
            <tw-upload :action="$app.fileUploadUrl"
              accept=".jpg, .jpeg, .png, .gif"
              :fileList="$api.ui.demo.params.arr"
              list-type="picture-card"
              multiple
              :auto-upload="true"
              :before-upload="beforeUpload"
              :on-progress="uploadFile"
              :on-success="handleUploadSuccess"
              :on-error="handleUploadError">
              <a slot="trigger"
                class="tw-addbtn xsmall"></a>
            </tw-upload>
            <div class="text-weaking mt-step">（支持上传格式为jpg、png、gif的图片，限2M，如图片超过大小请先压缩后再上传。）</div>
          </el-form-item>

          <el-form-item label="添加附件:">
            <tw-upload :action="$app.fileUploadUrl"
              accept=".xls, .xlsx, .doc, .docx, .ppt, .pptx, .pdf"
              list-type="text"
              multiple
              :fileList="$api.ui.demo.params.arr"
              :auto-upload="true"
              :before-upload="beforeUpload"
              :on-progress="uploadFile"
              :on-success="handleUploadSuccess"
              :on-error="handleUploadError">
              <a slot="trigger"
                class="tw-btn xmain">添加附件</a>
              <div class="el-upload__tip">支持上传格式为Word、Excel、PPT、PDF的附件，限20M</div>
            </tw-upload>
          </el-form-item>

          <el-form-item>
            <a class="tw-btn xmain"
              @click="submitForm">提交</a>
            <a class="tw-btn xweaking"
              @click="resetForm">重置</a>
          </el-form-item>
        </el-form>

        <div class="tw-title mt-medium">
          <h3 class="tw-title-left">树样式</h3>
        </div>
        <el-tree :props="props"
          :data="data"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[2, 3]"
          :default-checked-keys="[5]"
          @check-change="handleCheckChange"></el-tree>

        <div class="tw-title mt-medium">
          <h3 class="tw-title-left">暂无数据</h3>
        </div>
        <tw-nodata>暂无数据</tw-nodata>
      </div>
    </div>

    <!-- 弹窗:名称 -->
    <tw-modal :visible.sync="modal.visible"
      class="xmessage">
      <template slot="header">弹窗标题</template>
      <template slot="body">
        <i class="tw-ico xsuccess xlarge mr-tiny"></i>试卷保存成功！
      </template>
      <template slot="footer">
        <a class="tw-btn xmain">确定</a>
        <a class="tw-btn xweaking">继续选题</a>
        <a class="tw-btn xweaking"
          @click="modal.visible=false">关闭</a>
      </template>
    </tw-modal>
    <!-- /弹窗:名称 -->
  </div>
</template>

<script>
export default {
  name: 'ceb-home',

  data () {
    return {
      paginationOne: {
        total: 100,
        pageSize: 10,
        currentPage: 3
      },
      modal: {
        visible: false
      },
      // 表单选项
      options: [],

      // 级联选项
      cascaderOptions: [],

      cascaderProps: {
        value: 'id',
        label: 'name'
      },

      // 表单
      form: {
        name: '张三',
        type: '',
        date: '',
        group: []
      },
      // 树内容
      props: {
        children: 'children',
        label: 'label'
      },
      data: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ]
    }
  },

  methods: {
    /**
     * 功能: 获取下拉选项
     */
    getOptions () { },

    /**
     * 功能: 自定义验证类型
     * @param {Object} rule 验证规则对象
     * @param {Object} value 验证表单字段的值
     * @param {Object} callback 验证后的回调函数，可传入一个错误对象提示错误，也可直接调用表示验证通过
     */
    validateType (rule, value, callback) {
      if (value === '001') {
        callback(new Error('不能选择第一项'))
      } else {
        callback()
      }
    },

    /**
     * 功能: 提交表单
     */
    submitForm () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    /**
     * 功能: 重置表单
     */
    resetForm () {
      this.$refs['form'].resetFields()
    },
    /**
     * 功能: 在文件上传之前的处理
     * @param {Object} file 当前操作的文件对象
     * @return 返回false或被reject的Promise该文件会停止上传
     */
    beforeUpload (file) {
      console.log('beforeUpload')
    },

    /**
     * 功能: 文件上传时的处理
     * @param {Object} event 上传的事件(progress)对象
     * @param {Object} file 当前操作的文件对象
     * @param {Object} fileList 所有文件列表
     */
    uploadFile (event, file, fileList) {
      console.log('uploadFile')
    },

    /**
     * 功能: 文件上传成功后的处理
     * @param {Object} response 上传成功后返回的响应对象
     * @param {Object} file 上传成功的文件对象
     * @param {Object} fileList 所有文件列表
     */
    handleUploadSuccess (response, file, fileList) {
      console.log('succcess')
    },

    /**
     * 功能: 文件上传失败后的处理
     * @param {Object} err 上传失败的错误对象
     * @param {Object} file 当前操作的文件对象
     * @param {Object} fileList 所有文件列表
     */
    handleUploadError (err, file, fileList) {
      this.$message.warning(`文件: ${file.name}上传失败。`)
      console.log(err)
    },
    handleCheckChange (data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
    },

    /**
     * 成功确认提示
     */
    showSuccess () {
      this.$ui
        .confirm('试卷保存成功', '提示信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        })
        .then(() => {
          // 点击确定处理
        })
        .catch(() => {
          // 点击取消处理
        })
    },

    /**
     * info确认提示
     */
    showInfo () {
      this.$ui
        .confirm('这是一条普通信息', '提示信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        })
        .then(() => {
          // 点击确定处理
        })
        .catch(() => {
          // 点击取消处理
        })
    },
    /**
     * warning确认提示
     */
    showWarning () {
      this.$ui
        .confirm('确认删除此题？', '提示信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          // 点击确定处理
        })
        .catch(() => {
          // 点击取消处理
        })
    },
    /**
     * error确认提示
     */
    showError () {
      this.$ui
        .confirm('报错了', '提示信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        })
        .then(() => {
          // 点击确定处理
        })
        .catch(() => {
          // 点击取消处理
        })
    },
    /**
     * 成功提示
     */
    showSuccessTips () {
      // 信息提示(alert)
      this.$ui.alert('文案文案文案', '提示信息', {
        confirmButtonText: '知道了',
        type: 'success',
        callback: action => {
          this.$message({
            type: 'info',
            message: `提示信息`
          })
        }
      })
    },

    /**
     * info提示
     */
    showInfoTips () {
      this.$ui.alert('文案文案文案', '提示信息', {
        confirmButtonText: '知道了',
        type: 'info'
      })
    },
    /**
     * warning提示
     */
    showWarningTips () {
      this.$ui.alert('文案文案文案', '提示信息', {
        confirmButtonText: '知道了',
        type: 'warning'
      })
    },
    /**
     * error确认提示
     */
    showErrorTips () {
      this.$ui.alert('文案文案文案', '提示信息', {
        confirmButtonText: '知道了',
        type: 'error'
      })
    },
    /**
     * 成功提示
     */
    showSuccessTips2 () {
      this.$message({
        type: 'success',
        message: `删除成功`
      })
    },

    /**
     * info提示
     */
    showInfoTips2 () {
      this.$message({
        type: 'info',
        message: `这是一条信息`
      })
    },
    /**
     * warning提示
     */
    showWarningTips2 () {
      this.$message({
        type: 'warning',
        message: `这是一条警示信息`
      })
    },
    /**
     * error确认提示
     */
    showErrorTips2 () {
      this.$message({
        type: 'error',
        message: `这是一条错误消息`
      })
    }
  },

  created () {
    this.getOptions()
  }
}
</script>
