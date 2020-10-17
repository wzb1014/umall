import { data } from 'autoprefixer'
import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'

Vue.prototype.$imgPre="http://localhost:3000"
let baseUrl ='/api'

axios.interceptors.response.use(res=>{
    console.group('=====本次请求路径是:'+res.config.url)
    console.log(res);
    console.groupEnd()


    return res;
})

export const reqMenuAdd=(params)=>{
    return axios({
        url:baseUrl+"/api/menuadd",
        method:"post",
        data:qs.stringify(params)
    })
}

export const reqMenuList=()=>{
    return axios({
        url:baseUrl+"/api/menulist",
        method:"get",
        params:{
            istree:true,
        }
    })
}

export const reqMenuDel=(id)=>{
    return axios({
        url:baseUrl+"/api/menudelete",
        method:"post",
        data:qs.stringify({id:id})
    })
}

//1条
export const reqMenuDetail=(id)=>{
    return axios({
        url:baseUrl+"/api/menuinfo",
        method:"get",
        params:{
            id:id
        }
    })
}

//修改
export const reqMenuUpdate=(params)=>{
    return axios({
        url:baseUrl+"/api/menuedit",
        method:"post",
        data:qs.stringify(params)
    })
}




//==============role================
export const reqRoleAdd=(params)=>{
    return axios({
        url:baseUrl+"/api/roleadd",
        method:"post",
        data:qs.stringify(params)
    })
}

export const reqRoleList=(data)=>{
    return axios({
        url:baseUrl+"/api/rolelist",
        method:"get",
        data:qs.stringify(data)
    })
}

export const reqRoleDel=(id)=>{
    return axios({
        url:baseUrl+"/api/roledelete",
        method:"post",
        data:qs.stringify({id:id})
    })
}
export const reqRoleDetail=(id)=>{
    return axios({
        url:baseUrl+"/api/roleinfo",
        method:"get",
        params:{
            id:id
        }
    })
}

export const reqRoleUpdate=(params)=>{
    return axios({
        url:baseUrl+"/api/roleedit",
        method:"post",
        data:qs.stringify(params)
    })
}

/*******************管理员***********************/




//添加
export const reqManageAdd=(params)=>{
    return axios({
        url:baseUrl+"/api/useradd",
        method:"post",
        data:qs.stringify(params)
    })
}

//列表 params={page:1,size:10}
export const reqManageList=(params)=>{
    return axios({
        url:baseUrl+"/api/userlist",
        method:"get",
        params:params
    })
}

//管理员总数
export const reqManageCount=()=>{
    return axios({
        url:baseUrl+"/api/usercount",
    })
}



//删除
export const reqManageDel=(uid)=>{
    return axios ({
        url:baseUrl+'/api/userdelete',
        method:"post",
        data:qs.stringify({uid:uid})
    })
}


//1条
export const reqManageDetail=(uid)=>{
    return axios({
        url:baseUrl+"/api/userinfo",
        method:"get",
        params:{
            uid:uid
        }
    })
}

//修改
export const reqManageUpdate=(params)=>{
    return axios({
        url:baseUrl+"/api/useredit",
        method:"post",
        data:qs.stringify(params)
    })
}


/*******************商品管理***********************/




//添加
export const reqCateAdd = (params) => {
    let data = new FormData()
    /*
    data.append("pid",1)
    data.append("catename","123")
    data.append("img",File)
    data.append("status",1)
    */
    for (let i in params) {
        data.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: data
    })
}

//列表 params={page:1,size:10}
export const reqCateList=(params)=>{
    return axios({
        url:baseUrl+"/api/catelist",
        method:"get",
        params:params
    })
}


//删除
export const reqCateDel=(id)=>{
    return axios ({
        url:baseUrl+'/api/catedelete',
        method:"post",
        data:qs.stringify({id:id})
    })
}


//1条
export const reqCateDetail=(id)=>{
    return axios({
        url:baseUrl+"/api/cateinfo",
        method:"get",
        params:{
            id:id
        }
    })
}

//修改
export const reqCateUpdate = (params) => {
    let data = new FormData()
    for (let i in params) {
        data.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: data
    })
}


/*******************规格管理***********************/




//添加
export const reqSpecsAdd = (params) => {
    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data: qs.stringify(params)
    })
}


//规格总数
export const reqSpecsCount = () => {
    return axios({
        url: baseUrl + "/api/specscount",
    })
}





//列表 params={page:1,size:10}
export const reqSpecsList = (params) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method: "get",
        params: params
    })
}



//删除
export const reqSpecsDel = (id) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify({ id: id })
    })
}


//1条
export const reqSpecsDetail = (id) => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

//修改
export const reqSpecsUpdate = (params) => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(params)
    })
}

//================== 商品管理 =============================


//添加
export const reqGoodsAdd=(form)=>{
    let data = new FormData()
    for (let i in form) {
        data.append(i, form[i])
    }
    return axios ({
        url:baseUrl+'/api/goodsadd',
        method:'post',
        data:data

    })
}

//商品总数
export const reqGoodsCount=()=>{

    return axios ({
        url:baseUrl+'/api/goodscount',
        methods:'get',

    })
}

//列表
export const reqGoodsList=(params)=>{
    return axios ({
        url:baseUrl+'/api/goodslist',
        methods:'get',
        params: params
    })
}

//删除
export const reqGoodsDel=(params)=>{
    return axios ({
        url:baseUrl+'/api/goodsedit',
        method: "post",
        data: qs.stringify(params)
    })
}



export const reqGoodsUpdate = (form) => {
    let data = new FormData()
    for (let i in form) {
        data.append(i, form[i])
    }
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: data
    })
}




//详情
export const reqGoodsDetail=(params)=>{
return axios ({
    url:baseUrl+'/api/goodsinfo',
    method: "get",
    params: params
})
}

//==================会员管理=========================
//添加
export const reqMemberList=()=>{
    return axios ({
        url:baseUrl+'/api/memberlist',
        method:'get',
    })
}

//获取一条
export const reqMemberDetail=(uid)=>{
    return axios ({
        url:baseUrl+'/api/memberinfo',
        method:'get',
        params:{uid}
    })
}

//会员修改

export const reqMemberUpdate=(data)=>{
    return axios ({
        url:baseUrl+'/api/memberedit',
        method:'POST ',
        data:data
    })
}



//登录
export const reqLogin = (params) => {
    return axios({
        url: baseUrl + "/api/userlogin",
        method: "post",
        data: qs.stringify(params)
    })
}

//==================轮播图管理=========================

//列表
export const reqBannerAdd=(form)=>{
    let data = new FormData()
    for (let i in form) {
        data.append(i, form[i])
    }
    return axios ({
        url:baseUrl+"/api/banneradd",
        method:'post',
        data:data
    })
}

//轮播图列表
export const reqBannerList=(params)=>{
    return axios ({
        url:baseUrl+'/api/bannerlist',
        method:'GET',
        params:params
    })
}
//一条
export const reqBannerDetail=(id)=>{
    return axios ({
        url:baseUrl+'/api/bannerinfo',
        method:'get',
        params:{id}
    })
}
//修改
export const reqBannerUpdate=(form)=>{
    let data = new FormData()
    for (let i in params) {
        data.append(i, params[i])
    }
    return axios({
        url:baseUrl+'/api/banneredit',
        method:'post',
        data:data
    })
}
//轮播图删除
export const reqBannerDel=(id)=>{
    return axios({
        url:baseUrl+'/api/bannerdelete',
        method:'post',
        data:{id}
    })
}

/*============限时秒杀=======================*/
export const reqSeckillAdd=(data)=>{
    return axios ({
        url:baseUrl+'/api/seckadd',
        method:'post',
        data:data
    })
}

//秒杀
export const reqSeckillList=()=>{
    return axios ({
        url:baseUrl+'/api/secklist',
        method:'get'
    })
}
//秒杀获取（一条）
export const reqSeckillInfo=(id)=>{
    return axios ({
        url:baseUrl+'/api/seckinfo',
        method:'get',
        params:{id}
    })
}

///秒杀修改
export const reqSeckillUpdate=(data)=>{
    return axios ({
        url:baseUrl+'/api/seckedit',
        method:'post',
        data:data
    })
   
}