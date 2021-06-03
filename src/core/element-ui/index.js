import Vue from 'vue'
import { Button, Table, TableColumn, MessageBox, Form, FormItem, Input, InputNumber, Select, DatePicker, TimePicker, Option, Message, Dialog } from 'element-ui'

const components = [
  Button,
  Table,
  InputNumber,
  TableColumn,
  MessageBox,
  Dialog,
  TimePicker,
  Form, FormItem, Input, Select, DatePicker, Option
]

components.forEach(component => {
  Vue.component(component.name, component)
})

Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
