import request from '@utils/request'

export function login (data) {
  return request({
    url: '/api/uc/sc/loginService/userLogin',
    method: 'post',
    data
  })
}

export function logout (data) {
  return request({
    url: '/api/ac/sc/loginService/userLogOut',
    method: 'post',
    data
  })
}

export function getInfo (key) {
  return request({
    url: '/api/ac/sc/systemUserService/info',
    method: 'get',
    params: { key }
  })
}

export function getMenuTypeList () {
  return request({
    url: '/api/as/sc/menu/userMenuList',
    method: 'post',
    // data: {
    //   is_show: '1',
    //   parent_ids: '0,1'
    // }
  })
}

export function getMenuList (data) {
  return request({
    url: '/api/as/sc/menu/getMenu2List',
    method: 'post',
    data
    // data: {
    //   is_show: '1',
    //   parent_ids: '0,1'
    // }
  })
}
