import { login, logout, getInfo, getMenuTypeList, getMenuList } from '@/api/user'
import { getToken, setToken, removeToken } from '@utils/auth'
import { transData } from '@utils'
import { resetRouter, constantRouterComponents, constantRoutes } from '@router'
import { menuData } from '@/mockdata/menu.js'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    menulist: [],
    menuTypeList: [],
    user: {}
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_MENUTYPELIST: (state, menuTypeList) => {
    state.menuTypeList = menuTypeList
  },
  SET_MENULIST: (state, menulist) => {
    state.menulist = menulist
  },
}

const actions = {
  // user login
  login ({ commit }, userInfo) {

    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        if (data.errcode === 1004) {
          reject(data.errmsg)
        } else {
          commit('SET_TOKEN', data.key)
          setToken(data.key)
          resolve()
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('暂无权限，请重新登录.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_USER', data)
        console.log(data);
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout ({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout({ key: state.token }).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  // get menuTypeList
  getMenuTypeList ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getMenuTypeList().then(response => {
        const { data } = response
        let mt = [...data]
        commit('SET_MENUTYPELIST', mt)
        resolve(mt)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get menulist
  getMenuList ({ commit, state }, pid) {
    return new Promise((resolve, reject) => {
      getMenuList({
        parent_ids: pid || '0,1,27'
      }).then(response => {
        const { data } = response
        // console.log('getMenuList')

        const result = transData(data, 'id', 'parent_id', 'children')

        // let m = []
        // menuData.forEach(item => {
        //   m.push({ ...item })
        // })

        // m.forEach(item => {
        //   item.component = constantRouterComponents[item.component]
        // })

        // const result = transData(m, 'id', 'parent_id', 'children')
        let result1 = constantRoutes.concat(result)
        result1.push({ path: '*', redirect: '/404', hidden: true })
        commit('SET_MENULIST', result1)
        resolve(result1)
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

