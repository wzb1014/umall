<template>
  <div>
    <div>
      <v-list @edit="edit"></v-list>
      <v-add ref="add" :info="info"></v-add>
    </div>
  </div>
</template>

<script>
import vList from "./components/list";
import vAdd from "./components/add";
export default {
  data() {
    return {
      info: {
        isshow: false,
        isAdd: true
      }
    };
  },
  components: {
    vList,
    vAdd
  },
  methods: {
    edit(id) {
      this.info.isshow = true;
      this.$refs.add.look(id);
    }
  }
};
</script>

<style></style>
