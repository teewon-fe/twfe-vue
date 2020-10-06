<template>
  <main ref="aaa"
    class="tw-body xheader xfooter">
    <div class="tw-body-inner xscroll">

      <!-- 固定tab选项 -->
      <van-tabs v-model="activeTab"
        sticky
        :offset-top='$ui.toRemPx(44)'
        class="xfix xmidline">
        <van-tab title="作业"
          name="operation">概况</van-tab>
        <van-tab title="试题"
          name="learn">
          <div class="tw-card xfull">
            <tw-questions-and-nums
              :questions="$api.ui.demo.data.questions"
              :nums="$api.ui.demo.data.questionNumbers"
              view-type="correct"
              :page-size="10">
              <template v-slot="{question}">
                <tw-question-mobile
                  v-model="question.data.studentAnswers"
                  :data="question.data"
                  :questionNo="`${question.questionNo}`"
                  answer-from-scan
                  view-type="correct"
                  initAnalysisVisibel
                  @upload="(value)=>{question.data.studentAttachments=value}">

                  <!-- 子试题: 综合题、听力题才有子试题 -->
                  <template v-if="question.children"
                    v-slot:body>
                    <tw-question-mobile
                      v-model="child.studentAnswers"
                      v-for="(child, childIndex) in question.children"
                      :key="`${index}-${childIndex}`"
                      :data="child"
                      :questionNo="`${question.questionNo}.${childIndex+1}`"
                      view-type="correct"
                      @upload="(value)=>{question.data.studentAttachments=value}">
                    </tw-question-mobile>
                  </template>
                </tw-question-mobile>
              </template>
            </tw-questions-and-nums>
          </div>
        </van-tab>
        <van-tab title="Tree"
          name="exam">
          <div class="tw-title xmarkline xnb mt-small mb-step">
            <h3 class="tw-title-left">
              <span>单选树</span>
            </h3>
          </div>
          <div class="tw-card xfull mb-huge">
            <tw-tree v-model="$api.ui.demo.params.str"
              :data="$api.ui.demo.data.tree"
              only-select-leaf
              name-key="name"
              value-key="id">
            </tw-tree>
          </div>
          <div class="tw-title xmarkline xnb mt-small mb-step">
            <h3 class="tw-title-left">
              <span>多选树</span>
            </h3>
          </div>
          <div class="tw-card xfull mb-huge">
            <tw-tree
              multiple
              v-model="$api.ui.demo.params.arr"
              :data="$api.ui.demo.data.tree"
              name-key="name"
              value-key="id"
              only-select-leaf
              :expanded-values="aaa"
              :disabledValues="['002-001']"
              @load="(data)=>{data.children=[{id:'a', name: '节点1-1', children: [{id: 'a-1', name: '节点1-1-1'}]}]}">
            </tw-tree>
          </div>
        </van-tab>
        <van-tab title="原生功能"
          name="knowledge">
          <div id="media"></div>
          <div class="tw-card xfull">
            <div class="tw-title xmarkline xnb mt-small mb-step">
              <h3 class="tw-title-left">
                <span>设备功能</span>
              </h3>
            </div>
            <div class="mb-tiny"><a class="tw-btn xmain" @click="selectPhoto">打开相册</a></div>
            <div class="mb-tiny"><a class="tw-btn xmain" @click="selectVideo">选择视频</a></div>
            <div class="mb-tiny"><a class="tw-btn xmain" @click="$native.takePhoto.send()">拍照</a></div>
            <div class="mb-tiny"><a class="tw-btn xmain" @click="$native.takeVideo.send()">录像</a></div>
            <div class="mb-tiny"><a class="tw-btn xmain" @click="takeAudio">录音</a></div>
            <div class="mb-tiny"><a class="tw-btn xmain" @click="$native.takeSign.send()">签字</a></div>
            <div class="mb-tiny"><a class="tw-btn xmain" @click="$native.share.send({
              link: 'http://192.168.115.239:9001/1.pdf',
              title: '分享测试',
              thumbnail: '',
              description: '分享测试',
              content: '分享测试',
              extendParam: '',
              localHandle: 'y'
            })">分享</a></div>
            <div class="mb-tiny"><a class="tw-btn xmain" @click="$native.print.send({url:'http://192.168.115.239:9001/1.pdf'})">打印</a></div>
            <div class="mb-tiny"><a class="tw-btn xmain" @click="$native.scan.send()">扫描</a></div>
            <div class="mb-tiny"><a class="tw-btn xmain" @click="$native.download.send({url:'http://192.168.115.239:9001/1.pdf'}).then((res)=>{debugger;$ui.msg(res.localPath)})">下载</a></div>
            <div class="mb-tiny"><a class="tw-btn xmain" @click="$native.cancelDownload.send({url:'http://192.168.115.239:9001/1.pdf'})">取消下载</a></div>

            <div class="tw-title xmarkline xnb mt-small mb-step">
              <h3 class="tw-title-left">
                <span>应用功能</span>
              </h3>
            </div>
            <div class="mb-tiny"><a class="tw-btn xmain" @click="$native.back.send()">返回校比邻</a></div>
          </div>
        </van-tab>
        <van-tab title="考试"
          name="exam">考试内容</van-tab>
        <van-tab title="知识点"
          name="knowledge">知识点内容</van-tab>
      </van-tabs>
      <!-- /固定tab选项 -->

      <div class="tw-card xfull py-step px-0">
        <van-grid :border="false"
          :column-num="4">
          <van-grid-item>
            <i class="tw-ico xselflearn"></i>
            <div class="text-weaking text-small mt-step">自学
            </div>
          </van-grid-item>
          <van-grid-item>
            <i class="tw-ico xanalysis"></i>
            <div class="text-weaking text-small mt-step">
              学习分析</div>
          </van-grid-item>
          <van-grid-item>
            <i class="tw-ico xwrongset"></i>
            <div class="text-weaking text-small mt-step">错题本
            </div>
          </van-grid-item>
          <van-grid-item>
            <i class="tw-ico xcrank"></i>
            <div class="text-weaking text-small mt-step">
              班级排行榜</div>
          </van-grid-item>
        </van-grid>
      </div>

      <div class="tw-title xmarkline xnb mt-small mb-step">
        <h3 class="tw-title-left">
          <span>任务列表</span>
        </h3>
        <div class="tw-title-right">
          <a class="text-weaking"
            @click="filterModal.visible = true">筛选<i class="tw-ico xfilter ml-step"></i></a>
        </div>
      </div>
      <van-list v-model="loading"
        :finished="finished"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多了"
        @load="onLoad">
        <div slot="default">
          <a class="tw-flex tw-card xfull">
            <!--注意图标切换 语文-xchinese  数学-xmatch 英语-xenglish 生物-xbiobogy 化学-xchemistry 历史-xhistory 物理-xphysics 政治-xpolitics 多学科-xsmulti--->
            <i class="tw-ico xchinese"></i>
            <div class="tw-flex-body ml-tiny">
              <div class="text-medium mr-tiny">语文作业
                <i class="tw-tag xsmall xactive ml-step">线上</i>
              </div>
              <div><span class="text-small text-secondary">发布时间：01-08
                  15：30 </span><span class="text-highlight2 text-tiny ml-small">进行中</span>
              </div>
            </div>
            <div class="align-self-center">
              <span class="text-weaking">已作答</span>
            </div>
          </a>
          <a class="tw-flex tw-card xfull">
            <!--注意图标切换 语文-xchinese  数学-xmatch 英语-xenglish 生物-xbiobogy 化学-xchemistry 历史-xhistory 物理-xphysics 政治-xpolitics 多学科-xsmulti--->
            <i class="tw-ico xmath"></i>
            <div class="tw-flex-body ml-tiny">
              <div class="text-medium mr-tiny">数学作业<i class="tw-tag xsmall xactive ml-step">扫描</i>
              </div>
              <div><span class="text-small text-secondary">发布时间：01-08
                  15：30 </span><span class="text-weaking text-tiny ml-small">已结束</span>
              </div>
            </div>
            <div class="align-self-center">
              <span class="text-mwarning">未作答</span>
            </div>
          </a>
          <a class="tw-flex tw-card xfull">
            <!--注意图标切换 语文-xchinese  数学-xmatch 英语-xenglish 生物-xbiobogy 化学-xchemistry 历史-xhistory 物理-xphysics 政治-xpolitics 多学科-xsmulti--->
            <i class="tw-ico xsmulti"></i>
            <div class="tw-flex-body ml-tiny">
              <div class="text-medium mr-tiny">化学考试 <i class="tw-tag xsmall xactive ml-step">考试</i>
              </div>
              <div><span class="text-small text-secondary">发布时间：01-08
                  15：30 </span></div>
            </div>
            <div class="align-self-center">
              <span class="text-mwarning">B3</span>
            </div>
          </a>
        </div>
      </van-list>

      <!--按钮尺寸-->
      <div class="tw-card xfull">
        <div class="tw-title xmarkline xnb">
          <h3 class="tw-title-left">
            <span>按钮尺寸</span>
            <span class="tw-title-note">(副标题文本)</span>
          </h3>
          <div class="tw-title-right">标题右侧内容</div>
        </div>
        <a class="tw-btn xmain">主按钮</a> <a class="tw-btn xweaking">弱化按钮</a>
        <br>
        <a class="tw-btn xsecondary mt-tiny">次按钮</a>

        <br>
        <a class="tw-btn xadd mt-tiny">添加按钮</a>

        <p class="mt-tiny">大尺寸</p>
        <a class="tw-btn xmain xlarge">提交</a>

        <p class="mt-tiny">小尺寸</p>
        <a class="tw-btn xmain xsmall">主按钮</a> <a class="tw-btn xweaking xsmall">弱化按钮</a><a class="tw-btn xsecondary xsmall">全选</a>
        <a class="tw-btn xadd xsmall">添加按钮</a>
      </div>
      <!--/按钮尺寸-->

      <!--提示信息-->
      <div class="tw-card xfull">
        <div class="tw-title xmarkline xnb">
          <h3 class="tw-title-left">
            <span>提示信息</span>
          </h3>
        </div>
        <a class="tw-btn xsecondary xsmall"
          @click="showToast">toast</a>
        <br>
        <a class="tw-btn xsecondary xsmall mt-tiny"
          @click="showToast1">toast有成功提示图标</a>
        <br>
        <a class="tw-btn xsecondary xsmall mt-tiny"
          @click="showToast2">toast有失败提示图标</a>
        <br>
        <a class="tw-btn xsecondary mt-tiny"
          @click="showMessage1">弹窗提示（一个按钮）</a>
        <br>
        <a class="tw-btn xsecondary mt-tiny"
          @click="showMessage2">弹窗提示（两个按钮）</a>
      </div>
      <!--/提示信息-->

      <!--表格-->
      <div class="tw-card xfull">
        <div class="tw-title xmarkline xnb">
          <h3 class="tw-title-left">
            <span>表格1（基本表格）</span>
          </h3>
        </div>
        <table class="tw-mtable">
          <thead>
            <th>知识点</th>
            <th style="width:25%">题目</th>
            <th style="width:15%">得分率</th>
            <th style="width:15%">提升率</th>
          </thead>
          <tbody>
            <tr>
              <td>文字过多换行文字过多换行文字过多换行文字过多换行文字过多换行</td>
              <td>1,2,10</td>
              <td>95%</td>
              <td>98%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--/表格-->

      <!--表格2-->
      <div class="tw-card xfull">
        <div class="tw-title xmarkline xnb">
          <h3 class="tw-title-left">
            <span>表格2（表头两行显示）</span>
          </h3>
        </div>
        <table class="tw-mtable xth2">
          <thead>
            <th>知识点</th>
            <th style="width:25%">题目</th>
            <th style="width:15%">我的<br>得分率</th>
            <th style="width:15%">班级<br>得分率</th>
          </thead>
          <tbody>
            <tr>
              <td>几何证明</td>
              <td>1,2,10</td>
              <td>95%</td>
              <td>98%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--/表格2-->

      <!--暂无数据-->
      <div class="tw-card xfull">
        <div class="tw-title xmarkline xnb">
          <h3 class="tw-title-left">
            <span>暂无数据</span>
          </h3>
        </div>
        <div class="tw-mnodata">
          <img src="@images/nodata2.png"
            alt="">
          <p>暂无数据</p>
        </div>
      </div>
      <!--/暂无数据-->

      <!--上拉筛选弹窗-->
      <van-popup v-model="filterModal.visible"
        position="bottom">
        <div class="tw-popoup xfooter">
          <div class="tw-popoup-title">
            <div class="tw-popoup-title-left text-secondary">取消</div>
            <div class="tw-popoup-title-body">选择班级</div>
            <div class="tw-popoup-title-right text-link">确定</div>
          </div>
          <div class="tw-popoup-body">
            <p class="text-medium">科目</p>
            <tw-tag-filter class="xmobile"
              multiple
              v-model="$api.ui.demo.params.arr"
              :options="$api.ui.demo.data.list"
              :keyMap="{text: 'name',value: 'id'}">
            </tw-tag-filter>
            <van-divider class="m-0" />

            <p class="text-medium my-tiny">提交日期</p>
            <div class="tw-datebox pb-tiny">
              <label class="tw-datebox-input"
                @click="filterModal.dateVisible1 = true">{{$ui.dateFormat(filterModal.date1, 'yyyy-mm-dd')}}</label>
              <span class="tw-datebox-line"></span>
              <label class="tw-datebox-input"
                @click="filterModal.dateVisible2 = true">{{$ui.dateFormat(filterModal.date2, 'yyyy-mm-dd')}}</label>
            </div>

            <van-divider class="m-0" />
            <p class="text-medium mt-tiny">类型</p>
            <div class="mt-step">
              <tw-tag-filter class="xmobile"
                multiple
                v-model="$api.ui.demo.params.arr"
                :options="[{id: '01',name: '考试'},
                    {id: '02',name: '作业'}]"
                :keyMap="{text: 'name',value: 'id'}">
              </tw-tag-filter>
              <van-divider class="m-0" />
            </div>

            <div class="mt-tiny">
              <van-field v-model="$api.ui.demo.params.str"
                placeholder="请输入要搜索的标题" />
            </div>
          </div>

          <div class="tw-popoup-footer">
            <div class="tw-popoup-footer-item">
              <a class="tw-btn xweaking"
                @click="filterModal.visible= false">取消</a>
            </div>
            <div class="tw-popoup-footer-item">
              <a class="tw-btn xmain"
                @click="filterModal.visible= false">确认</a>
            </div>
          </div>
        </div>
      </van-popup>
      <!--/上拉筛选弹窗-->
    </div>

    <!-- 第二层弹出时间控件 -->
     <van-popup v-model="filterModal.dateVisible1"
        position="bottom">
        <van-datetime-picker v-model="filterModal.date1"
          @confirm="confirmHandle"
          @cancel="filterModal.dateVisible1 = false"
          type="date" />
      </van-popup>

      <van-popup v-model="filterModal.dateVisible2"
        position="bottom">
        <van-datetime-picker v-model="filterModal.date2"
          @confirm="confirmHandle"
          @cancel="filterModal.dateVisible2 = false"
          type="date" />
      </van-popup>
    <!-- / 第二层弹出时间控件 -->

    <!-- 页脚 -->
    <tw-ghost contract="#app">
      <footer class="tw-footer">
        <div class="tw-footer-item">
          <a class="tw-icobtn">
            <i class="tw-ico xupload"></i>
            <p>上传到</p>
          </a>
        </div>
        <div class="tw-footer-item">
          <a class="tw-btn xmain">去提交</a>
        </div>
        <!-- <div class="tw-footer-item xbtn">
          <div class="tw-footer-item-inner">
            <span></span>
          </div>
        </div> -->
      </footer>
    </tw-ghost>
    <!-- /页脚 -->
  </main>

</template>

<script>
export default {
  name: 'ai-homework-demo',

  data () {
    return {
      aaa: ['002'],
      activeTab: '作业',
      abc: '333',
      loading: false,
      finished: false,
      error: false,
      list: [],
      filterModal: {
        visible: false,
        dateVisible1: false,
        dateVisible2: false,
        date1: new Date(),
        date2: new Date()
      }
    }
  },

  methods: {
    selectPhoto () {
      this.$native.selectPhoto.send({
        filename: '作业附件'
      }).then((resData) => {
        const img = document.createElement('img')
        img.src = resData[0].url
        document.getElementById('media').appendChild(img)
        this.$native.upload(resData[0])
      })
    },

    selectVideo () {
      this.$native.selectVideo.send().then((resData) => {
        const video = document.createElement('video')
        video.src = resData.url
        video.controls = true
        video.autoplay = true
        document.getElementById('media').appendChild(video)
        this.$native.upload(resData).then(res => {
        })
      })
    },

    takeAudio () {
      this.$native.takeAudio.send().then((resData) => {
        const audio = document.createElement('audio')
        audio.src = resData.url
        audio.controls = true
        audio.autoplay = true
        document.getElementById('media').appendChild(audio)
      })
    },

    /**
     * toast提示
     */
    showToast () {
      this.$ui.msg('toast提示')
    },

    /**
     * toast带成功图标提示
     */
    showToast1 () {
      this.$ui.msg({
        type: 'success',
        message: '保存成功' })
    },

    /**
     * toast带失败图标提示
     */
    showToast2 () {
      this.$ui.msg({
        type: 'fail',
        message: '保存失败' })
    },

    /**
     * message 1个按钮
     */
    showMessage1 () {
      this.$ui.alert({
        // title: '提示信息',
        message: '可能是拿错了答题卡或者图片模糊倾斜所致，请重试',
        confirmButtonText: '重拍'
      }).then(() => {
        // 点击确定处理
      })
    },

    /**
     * message 2个按钮
     */
    showMessage2 () {
      this.$ui
        .confirm({
          message: '未找到设备！',
          confirmButtonText: '连接设备',
          cancelButtonText: '取消'
        })
        .then(() => {
          // 点击确定处理
        })
        .catch(() => {
          // 点击取消处理
        })
    },

    destroyed () {
      debugger
    },

    /**
     * list 数据异步加载 请参考https://youzan.github.io/vant/#/zh-CN/list
     */
    onLoad () {
      setTimeout(() => {
        for (let i = 0; i < 7; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 14) {
          this.finished = true
        }
      }, 3000)
    },

    /**
     *时间确定方法
     */
    confirmHandle (val) {
      this.filterModal.dateVisible1 = false
      this.filterModal.dateVisible2 = false
    }
  },
  created () {
  }
}
</script>
