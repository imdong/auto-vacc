import Vue from 'vue'
import Vuex from 'vuex'
import electronStore from '@/library/electronStore'

// 清除所有定时器
function clearIntervalAll(tasks) {
  Object.values(tasks).forEach((task) => {
    if (task.timer) {
      clearInterval(task.timer)
      task.timer = null
    }
  })
}
// 还原所有任务的所有用户状态
function resetStatus(tasks) {
  Object.values(tasks).forEach((task) => {
    task.users.forEach((user) => {
      user.status = ''
    })
  })
}

Vue.use(Vuex)

const VuexInstance = new Vuex.Store({
  state: {
    tasks: {} // 任务列表，使用对象存储方便监听
  },
  mutations: {
    init(state) {
      const tasks = electronStore.get('tasks')
      if (tasks) {
        // 每次软件重新打开 要置空所有定时器记录 并清空任务状态和用户状态
        clearIntervalAll(tasks)
        resetStatus(tasks)
        state.tasks = tasks
      }
    },
    setTasks(state, payload) {
      Vue.set(state.tasks, payload.propertyName, payload.value) // 触发监听
    },
    clearTasks(state, payload) {
      // 清空之前 要清除所有定时器
      clearIntervalAll(state.tasks)
      state.tasks = []
    }
  },
  actions: {
  },
  modules: {
  }
})

// 初始化 store
VuexInstance.commit('init')

// 监听 tasks 有变化 更新到本地持久化存储（保存在本地的一个文件，即使软件重开、更新也不会丢失）
VuexInstance.watch(state => {
  return state.tasks
}, value => {
  console.log('触发electronStore')
  electronStore.set('tasks', value)
}, {
  deep: true
})

export default VuexInstance
