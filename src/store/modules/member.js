import {
  reqMemberList,
} from '../../utils/request'
const state = {
  list: []
}
const mutations = {
  //修改list
  changeList(state, arr) {
    state.list = arr;
  }
}
const actions = {
  reqListAction(context) {
    reqMemberList().then(res => {
      context.commit('changeList', res.data.list)
    })
  }
}
const getters = {
  list(state) {
    return state.list
  }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}
