<!-- 任务详情页 -->
<template>
  <div>
    <h2 :class="s['top-bar']">
      {{ config.title }}
    </h2>

    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
      size="small"
      :disabled="isView">
      <!-- <el-form-item label="任务名称" prop="taskName">
        <el-input
          v-model.trim="form.taskName"
          clearable
          style="width: 200px;" />
      </el-form-item> -->
      <el-form-item label="预约渠道" prop="appId">
        <el-select v-model="form.appId">
          <el-option
            v-for="ops in channelOps"
            :key="ops.value"
            v-bind="ops" />
        </el-select>
      </el-form-item>
      <el-form-item label="疫苗" prop="vaccCode">
        <el-select v-model="form.vaccCode">
          <el-option
            v-for="ops in vaccCodeOps"
            :key="ops.value"
            v-bind="ops" />
        </el-select>
      </el-form-item>
      <el-form-item label="预约日期" prop="date">
        <el-date-picker
          v-model="form.date"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择预约日期"
          :picker-options="{
            disabledDate(time) {
              const newDate = new Date()
              return time.getTime() < newDate.setDate(newDate.getDate() - 1)
            }
          }" />
        (选择当天或第二天，看放票时间，预约靠后的日期，还没放票，定时器没做限制，会一直刷票浪费性能)
      </el-form-item>
      <el-form-item label="预约时间" prop="time">
        <el-time-picker
          v-model="form.time"
          format="HH:mm"
          value-format="HH:mm"
          :clearable="false"
          :picker-options="{
            selectableRange: '08:00:00 - 18:00:00'
          }" />
        (预约这个时间之后的)
      </el-form-item>
      <el-form-item label="执行间隔" prop="interval">
        <el-input-number
          step-strictly
          :controls="false"
          v-model="form.interval" />
        (单位秒，多少秒刷一次)
      </el-form-item>
      <el-form-item label="预约人员" prop="users">
        <el-button
          type="primary"
          @click="addUser"
          style="margin-bottom: 8px;">新增</el-button>
        <span style="margin-left: 8px;">tips：多名人员，会安排一起预约同一个时间段的</span>
        <el-table
          :data="form.users"
          stripe
          border
          height="180"
          style="width: 100%;"
          @cell-dblclick="cellDblClick">
          <el-table-column
            v-for="(col,index) in columns"
            :key="index"
            v-bind="col" />
          <el-table-column
            width="90"
            label="操作"
            #default="{ $index }">
            <el-button
              type="text"
              size="mini"
              class="btn--red"
              @click="delUser($index)">删除</el-button>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>

    <div :class="s['btn-wrap']">
      <el-button
        v-if="!isView"
        type="primary"
        @click="save">保存</el-button>
    </div>

    <!-- 用户信息对话框 -->
    <UserInfoDialog ref="UserInfoDialog" />
  </div>
</template>

<script>
import { clipboard } from 'electron'
import { cloneDeep } from 'lodash'
import DayJs from '@/library/dayJs'
import { mapState, mapMutations } from 'vuex'
const UserInfoDialog = () => import('./components/UserInfoDialog')

const configEnum = {
  add: {
    title: '新增任务'
  },
  edit: {
    title: '编辑任务'
  },
  view: {
    title: '查看任务'
  }
}
export default {
  components: {
    UserInfoDialog
  },
  props: {
    type: {
      type: String,
      default: 'add' // add-新增 edit-编辑
    },
    obj: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      form: {
        // taskName: '',
        appId: 'app569d18f5',
        vaccCode: '5601',
        date: DayJs().format('YYYY-MM-DD'),
        time: DayJs().format('HH:mm'),
        interval: '10',
        users: []
      },
      rules: {
        taskName: [{ required: true, message: '任务名称必填' }],
        date: [{ required: true, message: '预约日期必选' }],
        time: [{ required: true, message: '预约时间必填' }],
        interval: [{ required: true, message: '执行间隔必填' }],
        users: [{ required: true, message: '预约人员至少要有一位' }]
      },
      columns: [
        {
          label: '姓名',
          prop: 'reusTrueName',
          width: 80
        },
        {
          label: 'token',
          prop: 'token',
          showOverflowTooltip: true
        },
        {
          label: '接种门诊',
          prop: 'outpName',
          width: 130,
          showOverflowTooltip: true
        },
        {
          label: '疫苗厂商',
          prop: 'corpName',
          width: 110,
          showOverflowTooltip: true
        },
        {
          label: '预约状态',
          prop: 'status',
          showOverflowTooltip: true
        }
      ],
      channelOps: [
        {
          label: '深圳卫健委公众号',
          value: 'app569d18f5'
        }
      ],
      vaccCodeOps: [
        {
          label: '新冠疫苗',
          value: '5601'
        }
      ]
    }
  },
  computed: {
    ...mapState(['tasks']),
    config({ type }) {
      return configEnum[type]
    },
    isView() {
      return this.type === 'view'
    }
  },
  watch: {
    obj: {
      immediate: true,
      deep: true,
      handler(v) {
        if (v.id) {
          this.form = cloneDeep(v)
        }
      }
    }
  },
  mounted() {
  },
  methods: {
    ...mapMutations({
      setTasks: 'setTasks'
    }),
    // 双击单元格
    cellDblClick(row, column, cell) {
      if (column.label === '操作') return

      const content = cell.querySelector('.cell').innerText
      if (content) {
        // 使用 electron 提供的系统级剪切板模块不需要考虑兼容问题
        clipboard.writeText(content)
        this.$message.success(`复制${column.label}成功`)
      }
    },
    async addUser() {
      // todo：新增没有去重
      const res = await this.$refs.UserInfoDialog.open({
        appId: this.form.appId,
        bactCode: this.form.vaccCode
      })
      this.form.users.unshift({
        status: '', // 加个预约状态字段
        ...res
      })
      this.$refs.form.validateField('users')
    },
    delUser(index) {
      this.form.users.splice(index, 1)
      this.$refs.form.validateField('users')
    },
    async save() {
      await this.$refs.form.validate()
      if (this.form.id) {
        // 修改
        this.handleEdit()
      } else {
        // 新增
        this.handleAdd()
      }
      this.$message.success('操作成功')
      this.$router.back()
    },
    // 处理新增任务
    handleAdd() {
      const taskName = this.generateTaskName(this.form) // 任务名
      const id = Object.keys(this.tasks).length + 1
      const task = {
        id,
        taskName,
        ...this.form,
        timer: null // 任务定时器
      }
      this.setTasks({
        propertyName: id,
        value: task
      })
    },
    // 处理编辑任务
    handleEdit() {
      this.form.taskName = this.generateTaskName(this.form)
      this.tasks[this.form.id] = this.form
    },
    // 生成任务名
    generateTaskName(form) {
      const names = form.users.reduce((str, item, index) => {
        if (form.users.length === index + 1) {
          // 最后一个不用再拼、
          return `${str}${item.reusTrueName}`
        } else {
          return `${str}${item.reusTrueName}、`
        }
      }, '')
      return `[${names}]-${form.date}`
    }
  }
}

</script>

<style lang="scss" module="s">
.top-bar {
  text-align: center;
}
.btn-wrap {
  text-align: center;
}
</style>
