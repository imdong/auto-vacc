import Vue from 'vue'
import './element-ui'
import fetch from './fetch'
import './style/index.scss'

[
  fetch
].forEach(item => {
  Vue.use(item)
})
