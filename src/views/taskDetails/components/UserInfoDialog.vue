<!-- 用户信息对话框 -->
<template>
  <el-dialog
    :title="config.title"
    :visible.sync="show"
    @closed="closed">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="90px"
      size="small">
      <el-form-item label="用户token" prop="token">
        <el-input
          v-model.trim="form.token"
          :disabled="Boolean(form.reusTrueName)"
          clearable
          style="width: 300px;" />
        <el-button
          v-if="form.token && !form.reusTrueName"
          style="margin-left: 8px;"
          type="text"
          size="mini"
          :loading="loadingBtnCheckToken"
          @click="checkToken">校验</el-button>
      </el-form-item>

      <template v-if="form.reusTrueName">
        <el-form-item label="姓名" prop="reusTrueName">
          {{ form.reusTrueName }}
        </el-form-item>
        <el-form-item label="接种门诊" prop="depaId">
          <el-select
            v-model="form.depaId"
            filterable
            remote
            :remote-method="searchDepa"
            :loading="loadingSearchDepa"
            placeholder="输入关键词搜索"
            style="width: 300px;"
            @change="depaChange">
            <el-option
              v-for="item in depaOps"
              :key="item.depaId"
              :label="item.outpName"
              :value="item.depaId" />
          </el-select>
        </el-form-item>
        <el-form-item label="疫苗厂商" prop="corpName">
          {{ form.corpName }}
          <span v-if="form.corpName" style="margin-left: 6px;">
            (疫苗厂商每天都会变，具体以预约成功的为准)
          </span>
        </el-form-item>
      </template>
    </el-form>

    <template #footer v-if="form.reusTrueName">
      <el-button @click="show = false">取 消</el-button>
      <el-button type="primary" @click="ok">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { cloneDeep } from 'lodash'
import VaccH5 from '@/library/modules/vaccH5'

const configEnums = {
  add: {
    title: '新增人员'
  },
  edit: {
    title: '编辑人员'
  }
}
export default {
  data() {
    return {
      show: false,
      type: 'add', // add-新增 edit-编辑
      form: {
        token: '',
        reusTrueName: '',
        depaId: '',
        corpName: ''
      },
      rules: {
        token: [{ required: true, message: '用户token必填' }],
        depaId: [{ required: true, message: '请选择接种门诊' }],
        corpName: [{ required: true, message: '疫苗厂商不能为空，选择门诊自动带出，如没有带出关闭弹框重新新增或换一家门诊' }]
      },
      depaOps: [],
      loadingSearchDepa: false,
      loadingBtnCheckToken: false
    }
  },
  computed: {
    config({ type }) {
      return configEnums[type]
    }
  },
  methods: {
    open({ row, appId = '', bactCode = '' }) {
      return new Promise((resolve, reject) => {
        if (row) {
          this.type = 'edit'
          this.form = cloneDeep(row)
          this.searchDepa(row.outpName)
        } else {
          this.type = 'add'
        }
        this.bactCode = bactCode
        this.appId = appId
        this.show = true

        this.reject = reject
        this.resolve = resolve
      })
    },
    async checkToken() {
      this.loadingBtnCheckToken = true
      const res = await VaccH5.getUserInfo({
        token: this.form.token,
        appId: this.appId
      }).finally(() => {
        this.loadingBtnCheckToken = false
      })
      this.form.reusId = res.registerUser[0].reusId // 预约接口需要用到这个参数
      this.form.reusTrueName = res.registerUser[0].reusTrueName
    },
    // 搜索门诊
    async searchDepa(query) {
      try {
        if (query === '') {
          this.depaOps = []
        } else {
          this.loadingSearchDepa = true
          const res = await VaccH5.getDepaList({
            token: this.form.token,
            params: {
              outpName: query,
              bactCode: this.bactCode // 加了这个参数，请求才会返回 corpCode、corpName 参数
            }
          }).finally(() => {
            this.loadingSearchDepa = false
          })
          this.depaOps = res?.list || []
        }
      } catch (e) {
        e.msg && this.$message.error(e.msg)
      }
    },
    depaChange(depaId) {
      const target = this.depaOps.find(item => item.depaId === depaId)
      if (target) {
        this.form.corpName = target.corpName
        this.form.corpCode = target.corpCode
        this.form.outpName = target.outpName
      }
    },
    async ok() {
      await this.$refs.form.validate()
      this.resolve && this.resolve(this.form)
      this.show = false
    },
    closed() {
      this.form = this.$options.data().form
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
      this.appId = ''
      this.bactCode = ''
      this.depaOps = []
      this.reject = null
      this.resolve = null
    }
  }
}

</script>

<style lang="scss" module="s">

</style>
