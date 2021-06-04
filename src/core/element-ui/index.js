import Vue from 'vue'
import { Button, Table, TableColumn, MessageBox, Form, FormItem, Input, InputNumber, Select, DatePicker, TimePicker, Option, Message, Dialog, Alert } from 'element-ui'
import './style.scss'

const components = [
  Button,
  Table,
  InputNumber,
  TableColumn,
  MessageBox,
  Dialog,
  TimePicker,
  Alert,
  Form, FormItem, Input, Select, DatePicker, Option
]

components.forEach(component => {
  Vue.component(component.name, component)
})

Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
