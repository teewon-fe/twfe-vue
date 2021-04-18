<template>
  <div class="tw-report">
    <div class="tw-report-header">
      <div class="tw-report-header-logo">
        <img src="@images/logo.png">
        <h3>Front End Team</h3>
      </div>

      <div class="tw-report-header-title">
        <h4>前端日报</h4>
        <div>团队现有成员: {{$api.user.count.data.count}}</div>
        <div>统计日期: {{$ui.dateFormat($api.global.time.data.time, 'yyyy-mm-dd')}}</div>
      </div>

      <div class="tw-report-header-title xsub">
        <h4>
          <i class="tw-ico xproject dt-n1"></i>
          <span>项目统计</span>
        </h4>
        <div>进行中的项目: {{projects.length}}</div>
        <div>有风险的项目: {{riskyProjects.length}}</div>
      </div>

      <div class="tw-report-header-title xsub">
        <h4>
          <i class="tw-ico xspeed dt-n1"></i>
          <span>本月工时</span>
        </h4>
        <div>已排期工时: {{$api.project.mounthTaskTime.data.totalTime}}(人天)</div>
        <div>
          <span>月度总进度：</span>
          <el-progress v-if="$api.project.mounthTaskTime.data.totalTime > 0" style="display: inline-block; width: 100px;" :percentage="parseInt($api.project.mounthProgress.data.totalProgress / $api.project.mounthTaskTime.data.totalTime * 100)" color="#218fff"></el-progress>
        </div>
      </div>

      <div class="tw-report-header-time">
        <span>2021 牛年快乐</span>
      </div>
    </div>

    <h3 class="tw-report-title">前端青云榜<span class="text-secondary">(周榜)</span></h3>

    <ul class="tw-rank">
      <li class="tw-rank-item"
        :class="[`xno${idx}`]"
        v-for="(developer, idx) in $api.kpi.list.data.list"
        :key="developer.id">
        <div class="tw-rank-developer">
          <img v-if="idx === 0" src="./images/n1.png" />
          <img v-else-if="idx === 1" src="./images/n2.png" />
          <img v-else-if="idx === 2" src="./images/n3.png" />
          <i v-else class="tw-rank-no">{{idx+1}}</i>
          <h4>{{developer.user_name}}<span class="tw-rank-score">(230分)</span></h4>
        </div>

        <div class="tw-rank-progress-text">{{developer.doneTaskTime}} / {{developer.workdays}}(人天)</div>

        <div class="tw-rank-progress">
          <!-- <el-progress :percentage="project.progress" :format="format" :color="project.status==='risky'?'#f56c6c':'#218fff'"></el-progress> -->
          <el-progress :show-text="false" :stroke-width="8" :percentage="developer.progress" color="#c79118"></el-progress>
        </div>

        <div class="tw-rank-scoreitem xup">
          <label>完成工作量：</label>
          <span class="tw-rank-scoreitem-num">
            <i></i>
            <var>90</var>
            <span>分</span>
          </span>
        </div>

        <div class="tw-rank-scoreitem xdown">
          <label>转测延期天数：</label>
          <span class="tw-rank-scoreitem-num">
            <i></i>
            <var>-90</var>
            <span>分</span>
          </span>
        </div>

        <div class="tw-rank-scoreitem xup">
          <label>普通Bug数：</label>
          <span class="tw-rank-scoreitem-num">
            <i></i>
            <var>90</var>
            <span>分</span>
          </span>
        </div>

        <div class="tw-rank-scoreitem">
          <label>红线Bug数：</label>
          <span class="tw-rank-scoreitem-num">
            <i></i>
            <var>90</var>
            <span>分</span>
          </span>
        </div>

        <div class="tw-rank-scoreitem xup">
          <label>代码规范性：</label>
          <span class="tw-rank-scoreitem-num">
            <i></i>
            <var>90</var>
            <span>分</span>
          </span>
        </div>

        <div class="tw-rank-scoreitem xup">
          <label>需求评审：</label>
          <span class="tw-rank-scoreitem-num">
            <i></i>
            <var>90</var>
            <span>分</span>
          </span>
        </div>

        <div class="tw-rank-scoreitem xdown">
          <label>工作进度提交：</label>
          <span class="tw-rank-scoreitem-num">
            <i></i>
            <var>90</var>
            <span>分</span>
          </span>
        </div>

        <div class="tw-rank-scoreitem">
          <label>未及时处理的问题单：</label>
          <span class="tw-rank-scoreitem-num">
            <i></i>
            <var>90</var>
            <span>分</span>
          </span>
        </div>

        <div class="tw-rank-scoreitem xdown">
          <label>攻关性任务：</label>
          <span class="tw-rank-scoreitem-num">
            <i></i>
            <var>90</var>
            <span>分</span>
          </span>
        </div>

        <div class="tw-rank-scoreitem">
          <label>组内优化单：</label>
          <span class="tw-rank-scoreitem-num">
            <i></i>
            <var>90</var>
            <span>分</span>
          </span>
        </div>

        <div class="tw-rank-scoreitem xdown">
          <label>遗留问题优化：</label>
          <span class="tw-rank-scoreitem-num">
            <i></i>
            <var>90</var>
            <span>分</span>
          </span>
        </div>

        <div class="tw-rank-scoreitem">
          <label></label>
          <span class="tw-rank-scoreitem-num">
            <i></i>
            <var>90</var>
            <span>分</span>
          </span>
        </div>
      </li>
    </ul>

    <h3 class="tw-report-title">进行中的项目及进度</h3>

    <div class="tw-repoert-body">
      <table class="tw-table">
        <thead>
          <tr>
            <th style="width: 5em;">序号</th>
            <th>项目名称</th>
            <th style="width: 10em;">负责人</th>
            <th style="width: 180px;">进度</th>
            <th style="width: 10em;">总工时(人/天)</th>
            <!-- <th style="width: 7em;">项目状态</th> -->
            <th style="width: 15em;">下一里程碑</th>
            <!-- <th style="width: 6em;">操作</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(project,idx) in projects"
            :key="project.id">
            <td>{{idx+1}}</td>
            <td>
              <router-link :to="`/project-detail?id=${project.id}`" class="text-link">{{project.project_name}}</router-link>
            </td>
            <td>{{project.project_leader_name}}</td>
            <td class="pr-huge">
              <el-progress :percentage="project.progress" :color="project.status==='risky'?'#f56c6c':'#218fff'"></el-progress>
            </td>
            <td>{{project.task_time}}</td>
            <!-- <td>{{project.status}}</td> -->
            <td>{{project.next_time_node.text}}</td>
            <!-- <td>
              <a v-if="project.status!=='已完成'" class="text-link" @click="$api.project.close.send({id:project.id, status: 'done'}).then(()=>{$api.project.getProjects.send()})">关闭项目</a>
              <a v-else class="text-link" @click="$api.project.close.send({id:project.id, status: 'doing'}).then(()=>{$api.project.getProjects.send()})">开启项目</a>
            </td> -->
          </tr>
        </tbody>
      </table>
    </div>

    <h3 class="tw-report-title">项目风险</h3>

    <div class="tw-repoert-body">
      <table class="tw-table">
        <thead>
          <tr>
            <th style="width: 5em;">序号</th>
            <th>问题描述</th>
            <th style="width: 160px;">所属项目</th>
            <th style="width: 7em;">问题创建人</th>
            <th style="width: 10em;">问题处理人</th>
            <th style="width: 10em;">期待解决时间</th>
            <th style="width: 5em;">状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(issue,idx) in $api.kpi.issues.data.list" :key="issue.id">
            <td>{{idx + 1}}</td>
            <td>{{issue.descript}}</td>
            <td>{{issue.project_name}}</td>
            <td>{{issue.create_developer}}</td>
            <td>{{issue.handle_developer}}</td>
            <td>{{$ui.dateFormat(issue.resolve_time, 'yyyy-mm-dd')}}</td>
            <td>{{issue.stauts==='done'?'已完成':'进行中'}}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
export default {
  name: 'page-analysis',

  computed: {
    projects () {
      return this.$api.project.getProjects.data.list.map(item => {
        return item.project
      })
    },

    riskyProjects () {
      return this.projects.filter(item => item.status === 'risky')
    }
  },

  created () {
    this.$api.project.getProjects.reset().send({
      status: 'doing',
      pageNo: ''
    })
    this.$api.user.count.reset().send()
    this.$api.global.time.send()
    this.$api.project.mounthTaskTime.send()
    this.$api.project.mounthProgress.send()

    if (this.$route.query.ym) {
      this.$api.kpi.list.send({
        ym: this.$router.query.ym
      })
    } else {
      this.$api.kpi.list.send()
    }

    this.$api.kpi.issues.send({ type: 'issue' })
  }
}
</script>

<style lang="scss">
  .tw-report {
    width: 1200px;
    margin: 0 auto;
  }

  .tw-report-header {
    position: relative;
    display: flex;
    align-items: center;
    height: 180px;
    padding: 0 20px;
    color: #d2d4c2;
    background: url("./images/bg.png") no-repeat center center / 100% 100%;
  }

  .tw-report-header-logo {
    position: relative;
    width: 140px;
    height: 140px;
    padding: 40px 0;
    background: #7986cb;
    color: #fff;
    text-align: center;
    border-radius: 50%;
  }

  .tw-report-header-logo > img {
    border-top-left-radius: 50%;
  }

  .tw-report-header-logo > h3 {
    padding-left: 34px;
    font-size: 12px;
    white-space: nowrap;
  }

  .tw-report-header-title {
    line-height: 1.7;
    margin-left: 20px;
  }

  .tw-report-header-title > h4 {
    font-size: 25px;
    color: #ead8af;
  }

  .tw-report-header-title.xsub {
    line-height: 1.4;
    margin-left: 250px;
  }

  .tw-report-header-title.xsub > h4 {
    font-size: 18px;
    color: #fff;
  }

  .tw-report-header .el-progress__text {
    color: #fff;
  }

  .tw-report-header-time {
    position: absolute;
    right: 10px;
    bottom: 10px;
    color: #fff;
  }

  .tw-report-title {
    padding: 15px 0;
    font-size: 22px;
  }

  .tw-repoert-body {
    padding: 20px;
    background: #fff;
  }

  .tw-rank {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -0.5%;
  }

  .tw-rank-item {
    position: relative;
    width: 32%;
    height: 260px;
    padding: 15px;
    margin: 0 0.66% 15px;
    background: #fff;
    border-radius: 5px;
    overflow: hidden;

    &::before {
      position: absolute;
      right: -80px;
      width: 200px;
      height: 20px;
      color: #fff;
      text-align: center;
      font-size: 12px;
      font-weight: bold;
      letter-spacing: .5em;
      transform: rotate(45deg);
    }

    &.xno0::before {
      content: "榜首";
      background: #ffb600;
    }

    &.xno1::before {
      content: "榜眼";
      background: #b4c4ce;
    }

    &.xno2::before {
      content: "探花";
      background: #ed8d35;
    }
  }

  .tw-rank-developer {
    margin-bottom: 10px;
    text-align: center;
  }

  .tw-rank-developer > img {
    height: 30px;
    margin-right: 10px;
    border-radius: 5px;
  }

  .tw-rank-developer > h4 {
    display: inline-block;
    font-size: 18px;
    font-weight: bold;
    vertical-align: middle;
  }

  .tw-rank-no {
    display: inline-block;
    width: 25px;
    height: 25px;
    line-height: 25px;
    margin-right: 10px;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: bold;
    background: #f7cd92;
    color: #fff;
    vertical-align: middle;
    border-radius: 6px;
  }

  .tw-rank-progress {
    margin-bottom: 10px;
  }

  .tw-rank-progress-text {
    margin-bottom: 5px;
    font-size: 12px;
    color: #666;
  }

  .tw-rank-scoreitem {
    display: inline-flex;
    width: 47%;
    margin-bottom: 5px;
    color: #4f5d79;
    justify-content: space-between;
    font-size: 12px;
  }

  .tw-rank-scoreitem:nth-child(2n) {
    margin-right: 3%;
  }

  .tw-rank-scoreitem:nth-child(2n + 1) {
    margin-left: 3%;
  }

  .tw-rank-scoreitem-num {
    color: #8b97af;
  }

  .tw-rank-scoreitem var {
    font-style: normal;
    font-size: 110%;
  }

  .tw-rank-scoreitem.xup i,
  .tw-rank-scoreitem.xdown i {
    position: relative;
    display: inline-block;
  }

  .tw-rank-scoreitem.xup i {
    top: 3px;
    width: 16px;
    height: 16px;
    background: url("./images/up.png");
  }

  .tw-rank-scoreitem.xup var {
    color: #ffb600;
  }

  .tw-rank-scoreitem.xdown i {
    top: 1px;
    width: 10px;
    height: 10px;
    background: url("./images/down.png");
  }

  .tw-rank-scoreitem.xdown var {
    color: #fb6c84;
  }

  .tw-rank-score {
    font-size: 20px;
    color: #d39400;
    font-weight: 400;
    text-align: center;
  }
</style>
