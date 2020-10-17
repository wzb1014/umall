<template>
  <div>
    <el-button type="primary" @click="info1">添加</el-button>
    <v-add :info='info' ref=add></v-add>
    <v-list @edit='edit'></v-list>
  </div>
</template>

<script>
import vAdd from "./component/add";
import vList from "./component/list";
export default {
  components: {
    vAdd,
    vList,
  },
  data(){
    return{
      info:{
        isshow:false,
        isAdd:true,
      }
    }
  },
  methods:{
    info1(){
      this.info.isshow=true;
      this.info.isAdd=true
    },
     edit(id){
      this.info.isshow=true;
      this.info.isAdd=false;
      this.$refs.add.look(id)
    },
  }
};
</script>

<style></style>
