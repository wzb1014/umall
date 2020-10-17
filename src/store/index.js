import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import menu  from "./modules/menu";
import role  from "./modules/role";
import cate from './modules/cate';
import specs from './modules/specs';
import goods from './modules/goods';
import banner from './modules/banner'
import member from './modules/member';
import seckill from './modules/seckill'
import { state, getters, mutations } from "./mutations";
import { actions } from "./acions";
import manage from "./modules/manage";
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,

  modules: {
    menu,
    role,
    manage,
    cate,
    specs,
    goods,
    member,
    banner,
    seckill,
  }
});