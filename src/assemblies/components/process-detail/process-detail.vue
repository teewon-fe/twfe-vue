<template>
  <div>
     <!-- 弹窗:查看详情 -->
    <tw-modal :visible.sync="detailVisible" weaking class="xmedium" @close="closeDialog">
      <template slot="header">
        查看详情
      </template>
      <template slot="body" v-if="detailData">
        <div class="tw-score-tips">+<strong>{{detailData.responseEntity.df}}</strong></div>
        <div class="tw-form-item">
          <label class="u-title must">维度名称：</label>
          <span>{{detailData.responseEntity.zbmc}}</span>
        </div>
        <div class="tw-form-item">
          <label class="u-title must">发布应用：</label>
          <span>{{detailData.responseEntity.yyly}}</span>
        </div>
        <div class="tw-form-item">
          <label class="u-title must">发布人：</label>
          <span>{{detailData.responseEntity.fbrxm}}</span>
        </div>
        <div class="tw-form-item">
          <label class="u-title must">学生：</label>
          <span>{{detailData.responseEntity.xsxm}}</span>
        </div>
        <div class="tw-form-item">
          <label class="u-title must">发布时间：</label>
          <span>{{detailData.responseEntity.cjsj}}</span>
        </div>

        <!--自定义表单查看详情-->
          <div class="tw-form-item" v-for="(item, index) in configData.fomConfigurationAttribute" :key="index">
            <template v-if="item.showtype === 'upload'">
              <label class="u-title must">{{item.columnnamedescription}}：</label>
              <ul class="tw-imgbox">
                <li v-for="(img,idx) in genImageList(detailData.responseEntity.detail[item.columnname])" :key="idx" @click="viewBigImg(idx)">
                  <img :src="img.url" alt="">
                </li>
              </ul>
            </template>
            <template v-else>
              <label class="u-title must">{{item.columnnamedescription}}:</label>
              <span>{{detailData.responseEntity.detail[item.columnname]}}</span>
            </template>
          </div>
      <!---/自定义表单查看详情-->
      </template>
    </tw-modal>
    <!-- /弹窗:查看详情 -->

   <tw-previewer :visible.sync="viewPicModal.visible" :initIndex="viewPicModal.index" :images="imgArr" />
  </div>
</template>
<script>
export default {
  name: 'tw-process-detail',
  props: {
    params: {
      type: Object
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      imgArr: [],
      viewPicModal: {
        visible: false
      },
      detailVisible: false,
      detailParams: this.$api.getStoryDetail.mapParams(),
      detailData: this.$api.getStoryDetail.mapData(),
      configParams: this.$api.getConfiguration.mapParams('detail'),
      configData: this.$api.getConfiguration.mapData('detail')
    }
  },
  methods: {
    genImageList (localPaths) {
      if (this.imgArr.length === 0) {
        this.imgArr = localPaths.split(',').map((item, index) => ({
          url: this.$app.fileBaseUrl + item,
          name: '图片' + index
        }))
      }
      return this.imgArr
    },
    viewBigImg (index) {
      this.viewPicModal.visible = true
      this.viewPicModal.index = index
    },
    /****
     * 处理数据
     */
    handlerData () {
      this.$api.getStoryDetail.send()
      this.$api.getConfiguration.send('detail')
    },
    /****
     * 关闭弹窗
     */
    closeDialog () {
      this.$emit('close')
    }
  },
  watch: {
    visible: {
      handler (val) {
        if (val) {
          this.detailVisible = val
          Object.assign(this.detailParams, this.params)
          Object.assign(this.configParams, this.params)
          this.handlerData()
        }
      }
    }
  },
  created () {
    window.pd = this
  }

}
</script>
<style lang="scss" scoped>
.tw-attachment-list{
  .u-img{
    display: inline-flex;
    width: 80px;
    height: 80px;
    & + .u-img{
      margin-left: 20px;
    }
    img{
      width: 100%;
    }
  }
}
.tw-modal-window{
  .tw-modal-window-body{
    position: relative;
  }
  .tw-score-tips{
    display: inline-block;
    position: absolute;
    width: 52px;
    height: 52px;
    line-height: 50px;
    text-align: center;
    background-color:darkorange;
    color: #fff;
    border-radius: 3px;
    right: 20px;
    top:60px;
    strong{
      font-size: 24px;
    }
  }
}
.tw-img-swiper{
  display: flex;
  align-items: center;
  width:100%;
  height:450px;
  overflow:hidden;
  text-align:center;
  background-color: #fff;
  display:flex;
  -webkit-box-align:center;
  align-items:center;
  -webkit-box-pack:center;
  justify-content:center;
  img{
    max-width:100%;
  }
}
.tw-imgbox{
  display: inline-block;
  vertical-align: top;
}
.tw-imgbox li {
  float: left;
  & +li{
    margin-left: 10px;
  }
  img{
    width:80px;
    height: 80px;
  }
}
</style>>
