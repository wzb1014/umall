<template>
  <div>
    <el-dialog
      :title="info.isAdd == true ? '添加' : '修改'"
      :visible.sync="info.isshow"
    >
      <el-form :model="form" :label-width="formLabelWidth">
      <el-form-item label="所属用户">
          <el-select
            v-model="form.roleid"
            placeholder="请选择"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

         <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input
            v-model="form.username"
            autocomplete="off"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
         <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            v-model="form.password"
            autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
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
  reqManageAdd,
  reqManageDetail,
  reqManageUpdate,
} from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
import { indexRoutes } from "../../../router/index";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],

  computed: {
    ...mapGetters({
      //菜单list
      roleList: "role/list"
    })
  },

  mounted() {
    this.reqRoleList();
 
  },
  data() {
    return {
      form: {
        roleid:"",
       username:"",
       password:"",
       status:1
      },

      indexRoutes,
      formLabelWidth: "120px"
    };
  },

  methods: {
    ...mapActions({
       reqRoleList: "role/reqListAction",
      reqManageList:"manage/reqListAction"
    }),
  
    cancel() {
      this.info.isshow = false;
    },
    qu() {
      this.info.isshow = false;
      warningAlert("取消成功");
    },
    empty() {
      this.form = {
       roleid:"",
       username:"",
       password:"",
       status:1
      };
    },
    look(id) {
      //发请求
      
      //发请求
      reqManageDetail(id).then((res) => {
        if (res.data.code == 200) {
          //这个时候form是没有id的
          this.form = res.data.list;
           //密码是加密过的，所以需要重置密码
          this.form.password=""
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //点击了添加按钮
    add() {
      reqManageAdd(this.form).then(res => {
        if (res.data.code == 200) {
          //成功
          successAlert(res.data.msg);

          //数据重置
          this.empty();

          //弹框消失
          this.cancel();
          this.info.isshow = false;

          //list数据要刷新
          this.reqManageList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    update() {
      reqManageUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.reqManageList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  }
};
</script>

<style></style>
