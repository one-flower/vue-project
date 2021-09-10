import request from '@utils/request'

let url = 'http://sfqrc.xuantuyun.com/api/ac/sfpersonnelmanage/sfLargeScreenService/queryLargeScreen\n'

export function getDate (large, params) {
  return request({
    url: url + '?large=' + large,
    method: 'get',
    params
  })
}
