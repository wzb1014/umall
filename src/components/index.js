import Vue from "vue"
import delBtn from "./del.vue"
let obj={
    delBtn
}
for(let i in obj){
    Vue.component(i,obj[i])
}
