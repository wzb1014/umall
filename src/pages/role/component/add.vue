<template>
  <div>
    <el-dialog
      :title="info.isAdd == true ? '添加' : '修改'"
      :visible.sync="info.isshow"
    >
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input
            v-model="form.rolename"
            autocomplete="off"
            placeholder="系统设置"
          ></el-input>
        </el-form-item>
        
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            ref="tree"
            :default-expanded-keys="[2, 3]"
       
            :props="{
        children: 'children',
        label: 'title'
      }"
          >
          </el-tree>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="qu">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd == true"
          >添 加</el-button
        >
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqRoleAdd,
  reqRoleDetail,
  reqRoleUpdate
} from "../../../utils/request.js";
import { successAlert, warningAlert } from "../../../utils/alert";
import { indexRoutes } from "../../../router/index";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
 
  computed: {
    ...mapGetters({
      //菜单list
      menuList: "menu/list"
    })
  },

  mounted() {
    this.reqRoleList();
    if(this.menuList.length==0){
      this.reqMenuListAction()
    }
  },
  data() {
    return {
      form: {
        rolename:"",
        menus: [],
        status: "1"
      },
    

      indexRoutes,
      formLabelWidth: "120px"
    };
  },

  methods: {
    ...mapActions({
      //请求菜单list
      reqMenuListAction: "menu/reqListAction",
      //角色的list
      reqRoleList: "role/reqListAction"
    }),
    ha() {
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    cancel() {
      this.info.isshow = false;
    },
    qu() {
      this.info.isshow = false;
      warningAlert("取消成功");
    },
    empty() {
      this.form = {
        rolename:'',
        menus:[],
        status: "1"
      };
    },
    look(id) {
      //发请求
      reqRoleDetail(id).then(res => {
        if (res.data.code == 200) {
          //这个时候form是没有id的
          this.form = res.data.list;
          this.form.id = id;
          this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus))
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //点击了添加按钮
    add() {
      this.form.menus=JSON.stringify(this.$refs.tree.getCheckedKeys())
      reqRoleAdd(this.form).then(res => {
        if (res.data.code == 200) {
          //成功
          successAlert(res.data.msg);

          //数据重置
          this.empty();

          //弹框消失
          this.cancel();
          this.info.isshow = false;

          //list数据要刷新
          this.reqRoleList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    update() {
      this.form.menus=JSON.stringify(this.$refs.tree.getCheckedKeys())
      reqRoleUpdate(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.reqRoleList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  }
};
</script>

<style></style>
