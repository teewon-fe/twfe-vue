import * as global from './global'
import * as users from './users'
import * as projects from './projects'
import * as dic from './dic'
import * as kpi from './kpi'
import * as demo from './demo'

const publicApis = {
  global: {
    ...global
  },

  user: {
    ...users
  },

  dic: {
    ...dic
  },

  kpi: {
    ...kpi
  },

  project: {
    ...projects
  }
}

if (process.env.NODE_ENV === 'development') {
  publicApis.ui = { ...demo }
}

export default publicApis
