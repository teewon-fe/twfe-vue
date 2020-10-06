import Vue from 'vue'
import upperCaseFirstLetter from '../../utils/upper-case-first-letter'
import assign from '../../utils/assign'
import propChain from '../../utils/prop-chain'
import toNative from '../../utils/toNative'

let $i18n = window.$i18n

/**
* 功能: 复制一个json对象
*/
function cloneJson (json) {
  return json !== null && typeof json === 'object' ? JSON.parse(JSON.stringify(json)) : {}
}

/**
* 功能: 复制一个api的选项
*/
function cloneApiOption (source, config = {}) {
  const result = cloneJson(source)
  let sourceParams = {}
  let sourceData = {}

  if (!result.request) {
    result.request = {}
  }

  if (result.request.params) {
    sourceParams = cloneJson(result.request.params)
  } else {
    result.request.params = {}
  }

  if (!result.response) {
    result.response = {}
  }

  if (result.response.data) {
    sourceData = cloneJson(result.response.data)
  } else {
    result.response.data = {}
  }

  Object.assign(result, cloneJson(config))
  let params = {}
  let data = {}

  if (config.request && config.request.params) {
    params = config.request.params
  }

  if (config.response && config.response.data) {
    data = config.response.data
  }

  result.request.params = Object.assign(sourceParams, params)
  result.response.data = Object.assign(sourceData, data)

  result.request.rules = source.request.rules
  result.request.debug = source.request.debug
  result.request.handler = source.request.handler
  result.response.debug = source.response.debug
  result.response.successHandler = source.response.successHandler
  result.response.exceptionHandler = source.response.exceptionHandler
  result.response.errorHandler = source.response.errorHandler
  result.beforeSend = source.beforeSend

  return result
}

/**
* 功能: 生成接口的取消请求、分页、加载的配置
*/
function genDplConfig (globalDpl, moduleDpl, localDpl) {
  let result = {
    cancelable: {
      enable: false,
      message: $i18n.t('plugins.apier.cancelableMessage')
    },

    debounce: {
      enable: false,
      message: $i18n.t('plugins.apier.debounceMessage')
    },

    pageInfo: {
      pageNumKey: 'pageNo',
      pageSizeKey: 'pageSize',
      totalKey: 'total',
      listKey: 'list'
    },

    loading: {
      enable: true,
      option: window.$app.appType === 'web' ? {
        lock: true,
        text: 'Loading...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      } : {
        message: 'Loading...'
      }
    }
  }

  Object.assign(result.cancelable, globalDpl.cancelable, moduleDpl.cancelable, localDpl.cancelable)
  Object.assign(result.debounce, globalDpl.debounce, moduleDpl.debounce, localDpl.debounce)
  Object.assign(result.pageInfo, globalDpl.pageInfo, moduleDpl.pageInfo, localDpl.pageInfo)
  Object.assign(result.loading, globalDpl.loading, moduleDpl.loading, localDpl.loading)

  return result
}

/**
* 功能: 生成一个空的vuex的store模块对象
*/
function genVuexModule () {
  return {
    namespaced: true,
    state: {},
    mutations: { },
    actions: { },
    getters: { }
  }
}

/**
* 功能: 生成一个api的state
*/
function genApiState (module, option) {
  let updateFrom = ''
  let { store, data, moduleName, stateName, apiName } = option
  let mutationName = `update${upperCaseFirstLetter(stateName)}`

  module.state[stateName] = cloneJson(data)

  module.mutations[mutationName] = function (state, payload) {
    if (updateFrom === 'api') {
      updateFrom = ''
    } else {
      updateFrom = 'vuex'
    }

    if (process.env.NODE_ENV === 'development' && option.debug) {
      option.debug(payload)
    }

    Object.assign(state[stateName], payload)
  }

  this[stateName] = cloneJson(data)
  Vue.observable(this[stateName])

  store.watch(() => {
    return this[stateName]
  }, (newVal, oldVal) => {
    if (updateFrom === 'vuex') {
      updateFrom = ''
    } else {
      updateFrom = 'api'
      store.commit(`${moduleName}/${apiName}/${mutationName}`, cloneJson(newVal))
    }
  }, { deep: true })

  store.watch((state) => {
    return state[moduleName] && state[moduleName][apiName] && state[moduleName][apiName][stateName]
  }, (newVal, oldVal) => {
    if (updateFrom === 'vuex') {
      Object.assign(this[stateName], cloneJson(newVal))
    }
  }, { deep: true })
}

/**
* 功能: 生成一个api对象
*/
function genApi (config) {
  let { store, apiName, moduleName } = config

  let module = genVuexModule()
  module.state[apiName] = {}

  genApiState.call(this, module, {
    store,
    apiName,
    moduleName,
    stateName: 'params',
    data: config.request.params,
    debug: config.request.debug
  })

  genApiState.call(this, module, {
    store,
    apiName,
    moduleName,
    stateName: 'data',
    data: config.response.data,
    debug: config.response.debug
  })

  config.store.registerModule([moduleName, apiName], module)
}

/**
* 功能: 生成一个api对象
*/
function createApi (store, moduleName, apiName, apier) {
  let option = this._option
  let pageable = option.pageable || false

  if (pageable) {
    if (option.globaConfig.response.pageDataKey) {
      option.globaConfig.response.dataKey = option.globaConfig.response.pageDataKey
    }

    if (apier._modules[moduleName]._config.response && apier._modules[moduleName]._config.response.pageDataKey) {
      apier._modules[moduleName]._config.response.dataKey = apier._modules[moduleName]._config.response.pageDataKey
    }
  }

  this._config = Object.assign({}, {
    store,
    moduleName,
    apiName,
    pageable,
    once: option.once || false,
    url: option.url,

    axios: Object.assign({
      noAuthRequired: true,
      url: option.url
    }, option.axios),

    dependency: Object.assign({
      before: [],
      after: []
    }, option.dependency),

    request: Object.assign({
      mode: 'body',
      removeEmptyItem: true,
      params: {}
    }, option.request),

    beforeSend: option.beforeSend,

    message: option.message || {},

    response: Object.assign({
      dataKey: pageable ? 'data.pageInfo' : 'data.responseEntity',
      codeKey: 'data.serverResult.resultCode',
      successCode: '200',
      appendKey: 'list',
      data: {}
    }, option.globaConfig.response, apier._modules[moduleName]._config.response || {}, option.response)
  })

  Object.assign(this._config, genDplConfig(option.globaConfig, apier._modules[moduleName]._config, {
    cancelable: option.cancelable || {},
    debounce: option.debounce || {},
    pageInfo: option.pageInfo || {},
    loading: option.loading || {}
  }))

  // set base url
  if (apier._modules[moduleName]._config.baseUrl) {
    this._config.axios.baseURL = option.baseUrl || apier._modules[moduleName]._config.baseUrl
  }

  this._config.appendKey = pageable ? this._config.pageInfo.listKey : this._config.response.appendKey

  // set vue instance
  Object.defineProperties(this, {
    vm: {
      get () {
        if (this._vm) {
          return this._vm
        } else {
          return new Error('Unable to access vm property When calling api in a non-vue instance.')
        }
      }
    },
    rules: {
      get () {
        return this._config.request.rules || null
      }
    }
  })

  genApi.call(this, this._config)
}

/**
 * 从参数对象中映射相应的值到请求参数
 * @param {Object} from  参数对象
 * @param {Boolean, Object} syncMap 映射关系
 */
function syncFromMap (from, syncMap) {
  if (typeof syncMap === 'boolean') {
    assign.same(this.params, from, true, false, true)
  }

  if (typeof syncMap === 'object') {
    for (const [syncKey, paramKey] of Object.entries(syncMap)) {
      propChain.set(this.params, paramKey, toNative(propChain.get(from, syncKey), typeof propChain.get(this.params, paramKey)))
    }
  }
}

export {
  cloneJson,
  cloneApiOption,
  createApi,
  syncFromMap
}
