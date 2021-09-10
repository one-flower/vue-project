import request from '@utils/request'

export function getList (params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

export function getPoints (data) {
  return request({
    url: 'http://lavatorylmpro.tripln.top/api/as/lavatorylmpro/cgmap/selectMapList',
    method: 'post',
    data
  })
}

export function getFCPoints (params) {
  return request({
    url: '/api/as/dyc/fcaccountability/fcjwdulist',
    method: 'get',
    params
  })
}