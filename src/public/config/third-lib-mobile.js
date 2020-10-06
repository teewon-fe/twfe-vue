/*
 * 功能: 引入系统要使用的第三方组件
 * http://192.168.102.233:83/#/doc/guid/project
 */

import Vue from 'vue'

import {
  Button,
  Cell,
  CellGroup,
  Toast,
  Dialog,
  NavBar,
  Tabbar,
  TabbarItem,
  Grid,
  GridItem,
  Image,
  List,
  Row,
  Col,
  Popup,
  Divider,
  DatetimePicker,
  Field,
  Slider,
  Tab,
  Tabs,
  Uploader,
  Rate,
  ImagePreview,
  Progress,
  Swipe,
  SwipeItem,
  TreeSelect,
  DropdownMenu,
  DropdownItem,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Radio,
  Collapse,
  CollapseItem,
  Loading,
  Search,
  PullRefresh
} from 'vant'

Vue.use(Button)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Toast)
Vue.use(NavBar)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Image)
Vue.use(List)
Vue.use(Row)
Vue.use(Col)
Vue.use(Popup)
Vue.use(Divider)
Vue.use(DatetimePicker)
Vue.use(Field)
Vue.use(Slider)
Vue.use(Uploader)
Vue.use(Rate)
Vue.use(Tab).use(Tabs)
Vue.use(ImagePreview)
Vue.use(Progress)
Vue.use(Swipe).use(SwipeItem)
Vue.use(TreeSelect)
Vue.use(DropdownMenu).use(DropdownItem)
Vue.use(Checkbox).use(CheckboxGroup)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Collapse).use(CollapseItem)
Vue.use(Dialog)
Vue.use(Loading)
Vue.use(Search)
Vue.use(PullRefresh)

let msgs = {
  msg: Toast,
  msgBox: Dialog.alert,
  confirm: Dialog.confirm,
  alert: Dialog.alert,
  loading: Toast.loading
}

export default msgs
