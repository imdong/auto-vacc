<!-- 首页 -->
<template>
  <div :class="s.container">
    <h3 :class="s.title">自动预约新冠疫苗任务列表</h3>
    <div :class="s['btn-wrap']">
      <el-button type="primary" @click="add">添加任务</el-button>
      <el-button type="primary" @click="clearTasks">清空所有任务</el-button>
    </div>
    <el-table
      :data="tableData"
      stripe
      border
      max-height="300"
      style="width: 100%;">
      <el-table-column
        v-for="(col, index) in columns"
        :key="index"
        v-bind="col" />
      <el-table-column
        label="操作"
        width="240"
        #default="{ row, $index }">
        <el-button
          type="text"
          size="mini"
          @click="handleTask(row)">
          {{ row.timer ? '停止任务' : '开始任务' }}
        </el-button>
        <el-button
          type="text"
          size="mini"
          @click="viewLogs(row)">
          运行日志
        </el-button>
        <el-button
          type="text"
          size="mini"
          @click="view(row)">查看</el-button>
        <el-button
          type="text"
          size="mini"
          :disabled="Boolean(row.timer)"
          @click="edit(row)">编辑</el-button>
        <el-button
          type="text"
          size="mini"
          class="btn--red"
          @click="del($index)">删除</el-button>
      </el-table-column>
    </el-table>

    <footer>
      <el-button
        type="text"
        @click="openLink('https://github.com/iamobj/auto-vacc')">
        开源地址：https://github.com/iamobj/auto-vacc
      </el-button>
    </footer>

    <!-- 日志弹框 -->
    <DialogLog ref="DialogLog" />
  </div>
</template>

<script>
import { shell } from 'electron'
import { mapState, mapMutations } from 'vuex'
import DayJs from '@/library/dayJs'
import VaccH5 from '@/library/modules/vaccH5'
import { compareTime } from '@/library/utils.js'
import { DialogLog } from './components'

export default {
  components: {
    DialogLog
  },
  data() {
    return {
      columns: [
        {
          label: '任务名',
          prop: 'taskName',
          showOverflowTooltip: true
        },
        {
          label: '执行间隔（秒）',
          prop: 'interval',
          width: 120
        },
        {
          label: '任务状态',
          showOverflowTooltip: true,
          formatter: this.formatStatus
        }
      ]
    }
  },
  computed: {
    ...mapState({
      tasks: 'tasks'
    }),
    tableData({ tasks }) {
      return Object.values(tasks)
    }
  },
  methods: {
    ...mapMutations({
      clearTasks: 'clearTasks',
      delTask: 'delTask'
    }),
    add() {
      this.$router.push({ name: 'taskDetails', params: { type: 'add' } })
    },
    edit(row) {
      this.$router.push({ name: 'taskDetails', params: { type: 'edit', obj: row } })
    },
    view(row) {
      this.$router.push({ name: 'taskDetails', params: { type: 'view', obj: row } })
    },
    del(index) {
      this.$delete(this.tasks, index + 1)
    },
    // 查看日志
    viewLogs(row) {
      this.$refs.DialogLog.open(row.logs)
    },
    // 任务状态字段显示 todo：时间紧迫状态没想到好方案，可以重新设计优化
    formatStatus(task) {
      const target = task.users.find(user => user.status.includes('失败'))
      if (target) {
        // 有失败的
        return task.timer ? '预约失败重试中，可点击查看按钮查看失败信息' : '预约失败，可点击查看按钮查看失败信息'
      }
      const target2 = task.users.every(user => user.status.includes('成功'))
      if (target2) {
        // 都成功
        return '预约成功,点击查看按钮查看对应用户具体成功信息'
      }

      return task.timer ? '自动预约中' : task.errorMsg
    },
    async handleTask(task) {
      if (task.timer) {
        // 如果有定时器 就是停止定时器
        this.stopInterval(task)
        return
      }
      // 开始任务前清空用户状态
      task.users.forEach(user => {
        user.status = ''
      })
      const targetTime = await this.ifHaveSurplus(task)
      this.handleReservation(task, targetTime)
    },
    // 检查是否有剩余的票
    ifHaveSurplus(task) {
      return new Promise((resolve, reject) => {
        const { interval, users, date, vaccCode, time } = task
        task.timer = setInterval(async() => {
          try {
            const times = await VaccH5.getOutpatientTimes({
              token: users[0].token,
              query: {
                depaId: users[0].depaId,
                date,
                vaccCode
              }
            })

            // 寻找时间段是设置的预约时间及之后且剩余库存数大于等于预约人数
            const targetTime = times.find(item => {
              const condition1 = item.restSurplus > users.length - 1
              const condition2 = time === item.ouatBeginTime || compareTime(time, item.ouatBeginTime)
              return condition1 && condition2
            })

            if (targetTime) {
              this.stopInterval(task)
              resolve(targetTime)
              this.setTaskLogs(task, {
                str: `${DayJs().format('YYYY-MM-DD HH:mm:ss')} 检查库存：【有符合要求的】`,
                json: times
              })
            } else {
              this.setTaskLogs(task, {
                str: `${DayJs().format('YYYY-MM-DD HH:mm:ss')} 检查库存：没有符合要求的`,
                json: times
              })
            }
          } catch (e) {
            this.setTaskLogs(task, {
              str: `${DayJs().format('YYYY-MM-DD HH:mm:ss')} 检查库存出错`,
              json: e
            })

            if (e.ecode === '201001800') {
              // token 错误 停止任务
              this.stopInterval(task)
              task.errorMsg = e.msg
            }
          }
        }, interval * 1000)
      })
    },
    // 处理预约
    handleReservation(task, targetTime) {
      const { users, date, vaccCode, appId } = task
      users.forEach(async (user) => {
        // 通过门诊名字重新请求拿到门诊最新信息，更新疫苗厂家，因为疫苗厂家每天都会有变化
        const depaList = await VaccH5.getDepaList({
          token: user.token,
          params: {
            outpName: user.outpName,
            bactCode: task.vaccCode
          }
        })
        const targetDepa = depaList?.list?.[0]
        if (targetDepa?.outpName === user.outpName && targetDepa?.corpCode) {
          // 门诊一样且有疫苗厂商代码（有时候请求接口没有返回这两个字段，原因待究），再更新疫苗厂商信息
          user.corpName = targetDepa.corpName
          user.corpCode = targetDepa.corpCode
        }

        const payload = {
          token: user.token,
          appId,
          params: {
            reusId: user.reusId,
            depaId: user.depaId,
            date,
            ouatId: targetTime.ouatId,
            vaccCodes: vaccCode,
            corpCode: user.corpCode
          }
        }
        try {
          const res = await VaccH5.reqReservation(payload)
          user.status = `${DayJs().format('YYYY-MM-DD HH:mm')} 预约${targetTime.ouatBeginTime}-${targetTime.ouatEndTime}成功：${JSON.stringify(res)}`

          this.setTaskLogs(task, {
            str: `${DayJs().format('YYYY-MM-DD HH:mm:ss')} ${user.reusTrueName}预约成功`,
            json: res
          })
        } catch (e) {
          this.setTaskLogs(task, {
            str: `${DayJs().format('YYYY-MM-DD HH:mm:ss')} ${user.reusTrueName}预约失败`,
            json: e
          })

          // 没有预约成功 清空定时器 继续重试
          this.stopInterval(task)
          this.handleTask(task)
          user.status = `${DayJs().format('YYYY-MM-DD HH:mm')} 预约失败：${JSON.stringify(e)}，请求参数${JSON.stringify(payload)}`
        }
      })
    },
    // 停止定时器
    stopInterval(task) {
      if (task.timer) {
        clearInterval(task.timer)
        task.timer = null
      }
    },
    // 写入任务日志 {str: ``, json: {}}
    setTaskLogs(task, payload) {
      if (task.logs) {
        if (task.logs.length === 50) {
          // 最多纪录50条日志
          task.logs.pop()
        }
        task.logs.unshift(payload)
      } else {
        task.logs = [payload]
      }
    },
    openLink(url) {
      shell.openExternal(url)
    }
  }
}

</script>

<style lang="scss" module="s">
.container {
  .title {
    text-align: center;
  }

  .btn-wrap {
    margin-bottom: 8px;
    text-align: right;
  }

  footer {
    text-align: center;
    margin-top: 88px;
  }
}
</style>
