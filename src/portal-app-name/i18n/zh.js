import elZh from 'element-ui/lib/locale/lang/zh-CN'
import cutter from '@comps/cutter/i18n/cutter-zh'
import apier from '@plugins/apier/i18n/apier-zh'

const list = [
  cutter,
  apier
]

export default Object.assign({ ...elZh }, ...list)
