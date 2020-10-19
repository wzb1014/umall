<template>
  <div>

      <v-add :info='info' ref=add></v-add>
      <v-list @edit='edit'></v-list>

  </div>
</template>
<script>
import vList from './components/list'
import vAdd from './components/add'
export default {
    components:{
        vList,
        vAdd
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
     edit(id){
      this.info.isshow=true;
      this.info.isAdd=false;
      this.$refs.add.look(id)
    },
  }
}
</script>

<style>

</style>