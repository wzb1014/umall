import {reqManageList,reqManageCount} from "../../utils/request"
const state = {
    // 菜单的list
    list:[],
    size: 2,
    total:0,
    page:1,
}
const mutations = {
    //修改list
    changeList(state,arr){
        state.list=arr;
    },
    changeTotal(state,num){
        state.total=num;
    },
    changePage(state,page){
        state.page=page
    }
}



const actions = {
    //页面请求
    reqListAction(context) {
        //发请求
        reqManageList(
            { page: context.state.page, size: context.state.size }
        ).then(res => {
            let list = res.data.list ? res.data.list : []
            context.commit("changeList", list)
        })
    },
    reqTotalAction(context){
        reqManageCount().then(res=>{
            context.commit("changeTotal",res.data.list[0].total)
        })
    },
    changePageAction(context,page){
        //修改页码
        context.commit("changePage",page)
        //发起list请求
        context.dispatch('reqListAction')
    },
    
}

const getters = {
    list(state){
        return state.list
    },
    size(state) {
        return state.size
    },
    total(state){
        return state.total;
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true

}

