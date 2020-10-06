import elEn from 'element-ui/lib/locale/lang/en'
import cutter from '@comps/cutter/i18n/cutter-en'
import apier from '@plugins/apier/i18n/apier-en'

const list = [
  cutter,
  apier
]

export default Object.assign({ ...elEn }, ...list)
