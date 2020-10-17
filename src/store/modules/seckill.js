import {
  reqSeckillList
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
  reqSeckillActions(context) {
    reqSeckillList().then(res => {
      context.commit('changeList',res.data.list )
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
