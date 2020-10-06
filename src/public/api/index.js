import * as users from './users'
import * as projects from './projects'
import * as dic from './dic'
import * as demo from './demo'

const publicApis = {
  user: {
    ...users
  },

  dic: {
    ...dic
  },

  project: {
    ...projects
  }
}

if (process.env.NODE_ENV === 'development') {
  publicApis.ui = { ...demo }
}

export default publicApis
