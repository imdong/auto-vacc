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
      </template>
    </el-form>

    <template #footer v-if="form.reusTrueName">
      <el-button @click="show = false">取 消</el-button>
      <el-button type="primary" @click="ok">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
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
        reusTrueName: ''
      },
      rules: {
        token: [{ required: true, message: '用户token必填' }]
      },
      loadingBtnCheckToken: false
    }
  },
  computed: {
    config({ type }) {
      return configEnums[type]
    }
  },
  methods: {
    open({ row, appId = '' }) {
      return new Promise((resolve, reject) => {
        if (row) {
          // todo：编辑功能未做，因为就保存一个 token 不需要编辑，变更 token 可以删除旧的 重新添加即可
          this.type = 'edit'
        } else {
          this.type = 'add'
        }
        this.appId = appId
        this.show = true

        this.reject = reject
        this.resolve = resolve
      })
    },
    async checkToken() {
      try {
        this.loadingBtnCheckToken = true
        const res = await VaccH5.getUserInfo({
          token: this.form.token,
          appId: this.appId
        }).finally(() => {
          this.loadingBtnCheckToken = false
        })
        this.form.reusId = res.registerUser[0].reusId // 预约接口需要用到这个参数
        this.form.reusTrueName = res.registerUser[0].reusTrueName
      } catch (e) {
        this.$message.error('校验失败请确认token是否正确或已过期重新获取')
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
      this.reject = null
      this.resolve = null
    }
  }
}

</script>

<style lang="scss" module="s">

</style>
