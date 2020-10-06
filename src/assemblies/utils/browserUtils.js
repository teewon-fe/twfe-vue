/**
 * 获取浏览器相关的工具类
 */
import cookieUtils from '@utils/cookie'
export default {
  /**
   * 获取地址栏参数
   */
  getLocationParam: function (key) {
    let str = window.location.href
    let arr = str.substr(str.indexOf('?') + 1).split('&')
    var val = ''
    if (arr && arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        let obj = arr[i]
        let num = obj.indexOf('=')
        if (num > 0) {
          let paramKey = obj.substring(0, num)
          let paramVal = obj.substr(num + 1)
          if (key === paramKey) {
            val = paramVal
          }
        }
      }
    }
    return val
  },
  userCookieSet: function (accessToken, user) {
    cookieUtils.set('common_current_token', accessToken)
    cookieUtils.set('common_current_userid', user.userId)
    cookieUtils.set('common_org_id', user.orgId)
    cookieUtils.set('common_login_name', user.realName)
    cookieUtils.set('common_tenant_id', user.branchCode)
    cookieUtils.set('common_org_name', user.orgName)
    cookieUtils.set('common_role_id_list', user.roleIdList)
    cookieUtils.set('common_area_name', user.areaName)
    cookieUtils.set('common_area_id', user.areaId)
  },
  userCookieDelete: function () {
    cookieUtils.set('common_current_token', '')
    cookieUtils.delete('common_current_userid')
    cookieUtils.delete('common_org_id')
    cookieUtils.delete('common_login_name')
    cookieUtils.delete('common_tenant_id')
    cookieUtils.delete('common_org_name')
    cookieUtils.delete('common_role_id_list')
    cookieUtils.delete('common_area_name')
    cookieUtils.delete('common_area_id')
  },
  validateResponseList: function (response) {
    if (response && response.data && response.data.pageInfo && response.data.pageInfo.list) {
      return true
    } else {
      return false
    }
  },
  getSchoolSectionByType (schoolType) {
    if (schoolType === '1' || schoolType === '4') {
      return 'PRIMARY_SCHOOL'
    } else if (schoolType === '2' || schoolType === '5') {
      return 'JUNIOR_HIGH_SCHOOL'
    } else if (schoolType === '3') {
      return 'HIGH_SCHOOL'
    } else if (schoolType === '6') {
      return 'KINDERGARTEN'
    } else if (schoolType === '7') {
      return 'SECONDARY_VOCATIONAL_SCHOOL'
    }
  },
  getObjectByAttributeInList (attributeName, attributeValue, list) {
    for (let i = 0; i < list.length; i++) {
      if (list[i][attributeName] === attributeValue) {
        return list[i]
      }
    }
  },

  getObjectByAttributeInList1 (attributeValue, list) {
    for (let i = 0; i < list.length; i++) {
      if (list[i] === attributeValue) {
        return list[i]
      }
    }
  }

}
