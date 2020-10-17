<template>
  <div>

      <v-add></v-add>
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
      this.$refs.add.look(id)
      console.log(id);
    },
  }
}
</script>

<style>

</style>