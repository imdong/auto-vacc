<!-- 日志信息弹框 -->
<template>
  <el-dialog
    title="运行日志"
    :visible.sync="show"
    width="60%"
    @closed="closed">
    <el-alert
      title="有json格式内容的，双击可复制json数据，只纪录最新的50条"
      type="info"
      center
      show-icon
      :closable="false"
      style="margin-bottom: 4px;" />
    <div :class="s.wrap" v-if="logs.length">
      <p
        v-for="(item, index) in logs"
        :key="index"
        @dblclick="copy(item)">
        <span :class="s.text" :title="formatLog(item)">{{ formatLog(item) }}</span>
      </p>
    </div>
    <template v-else>
      暂无日志记录
    </template>

  </el-dialog>
</template>

<script>
import { clipboard } from 'electron'

export default {
  data() {
    return {
      show: false,
      logs: []
    }
  },
  methods: {
    open(logs = []) {
      this.logs = logs
      this.show = true
    },
    closed() {
      this.logs = []
    },
    copy(item) {
      if (item.json) {
        clipboard.writeText(JSON.stringify(item.json))
        this.$message.success('复制JSON成功')
      }
    },
    formatLog(item) {
      if (item.json) {
        return `${item.str} ${JSON.stringify(item.json)}`
      } else {
        return item.str
      }
    }
  }
}

</script>

<style lang="scss" module="s">
.wrap {
  max-height: 180px;
  overflow-y: scroll;
  p {
    margin: 0;
    padding: 3px 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    &:hover {
      background-color: #fdf5e6;
    }
    .text {
      flex: 1;
      width: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
