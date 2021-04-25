<template>
  <main class="tw-body">
    <div class="tw-body-inner xcontainer">
        <div class="tw-crm">
          <router-link class="tw-crm-link" to="/issue">问题列表</router-link>
          <i class="tw-crm-arrow"></i>
          <span class="tw-crm-self ml-step">{{$route.query.id ? '修改':'新建'}}问题</span>
        </div>

      <!-- 基本信息 -->
      <tw-scope :data="submitApi.params">
        <template v-slot="params">
          <el-form
            ref="form"
            label-width="11em"
            size="medium"
            :model="params"
            :rules="submitApi.rules">
            <div class="tw-card pl-medium pr-huge pb-medium">
              <div class="tw-title">
                <h3 class="tw-title-left text-default">问题信息</h3>
              </div>

              <el-row :gutter="20">
                <el-col>
                  <el-form-item
                    prop="descript"
                    label="问题描述:">
                    <el-input v-model="params.descript"></el-input>
                  </el-form-item>
                </el-col>

                <el-col>
                  <el-form-item
                    prop="type"
                    label="问题类型:">
                    <el-select v-model="params.type">
                      <el-option v-for="item in $dic.issueType"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <!-- <el-col>
                  <el-form-item
                    prop="type"
                    label="所属项目:">
                    <el-select v-model="params.project_id"
                      filterable
                      clearable
                      @change="(val)=>{params.project_name=$dic.select($api.project.getDoingProjects.data.list, val, 'project_name')}">
                      <el-option v-for="project in $api.project.getDoingProjects.data.list"
                        :key="project.id"
                        :label="project.project_name"
                        :value="project.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col> -->

                <el-col>
                  <el-form-item
                    prop="handle_developer"
                    label="问题处理人:">
                    <el-select v-model="params.handle_developer" filterable allow-create clearable>
                      <el-option v-for="item in $api.user.getUsernames.data.list"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col>
                  <el-form-item
                    prop="resolve_time"
                    label="期待解决时间:">
                    <el-date-picker
                      v-model="params.resolve_time"
                      value-format="yyyy-MM-dd"
                      format="yyyy-MM-dd"
                      type="date">
                    </el-date-picker>
                  </el-form-item>
                </el-col>

                <el-col>
                  <el-form-item
                    prop="status"
                    label="状态:">
                    <el-select v-model="params.status">
                      <el-option v-for="item in $dic.issueStatus"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <!-- <el-col>
                  <el-form-item
                    prop="remark"
                    label="备注:">
                    <el-input type="textarea" v-model="params.remark"></el-input>
                  </el-form-item>
                </el-col> -->
              </el-row>
            </div>
            <!-- /基本信息 -->
          </el-form>
        </template>
      </tw-scope>

      <div v-fix:bottom class="tw-fixbtns">
        <a class="tw-btn xmedium xmain" @click="submitApi.send().then((data)=>{$router.back()})">保存</a>
        <a class="tw-btn xmedium xweaking" @click="$router.back()">返回</a>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'page-new-issue',

  data () {
    return {
      submitApi: {}
    }
  },

  methods: {
    submit () {

    }
  },

  created () {
    if (this.$route.query.id) {
      this.submitApi = this.$api.kpi.updateIssue
      this.submitApi.reset()
      Object.assign(this.submitApi.params, this.$route.params)
    } else {
      this.submitApi = this.$api.kpi.addIssue
      this.submitApi.reset()
    }

    this.$api.project.getDoingProjects.send()
    this.$api.user.getUsernames.send()
  }
}
</script>

<style lang="scss">

</style>
