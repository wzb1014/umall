<template>
  <div>
    <el-dialog
      :title="info.isAdd == true ? '添加' : '修改'"
      :visible.sync="info.isshow"
    >
      <el-form :model="form">
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input
            v-model="form.title"
            autocomplete="off"
            placeholder="系统设置"
          ></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="formLabelWidth">
          <el-select
            v-model="form.pid"
            placeholder="请选择上级菜单"
            @change="ha"
          >
            <el-option
              label="顶级菜单"
              :value="0"
              :label-width="formLabelWidth"
            ></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>

        <el-form-item
          label="菜单图标"
          v-if="form.type == 1"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.icon" placeholder="请选择上级菜单">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" v-else :label-width="formLabelWidth">
          <el-select v-model="form.url" placeholder="请选择上级菜单">
            <el-option
              v-for="item in indexRoutes"
              :key="item.path"
              :label="item.name"
              :value="'/' + item.path"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
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
  reqMenuAdd,
  reqMenuDetail,
  reqMenuUpdate
} from "../../../utils/request.js";
import { successAlert, warningAlert } from "../../../utils/alert";
import { indexRoutes } from "../../../router/index";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "menu/list"
    })
  },

  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1
      },

      icons: [
        "el-icon-s-tools",
        "el-icon-user",
        "el-icon-camera",
        "el-icon-message-solid"
      ],
      indexRoutes,
      formLabelWidth: "120px"
    };
  },

  methods: {
    ...mapActions({
      reqListAction: "menu/reqListAction"
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
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1
      };
    },
    look(id) {
      //发请求
      reqMenuDetail(id).then(res => {
        if (res.data.code == 200) {
          //这个时候form是没有id的
          this.form = res.data.list;
          this.form.id = id;
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //点击了添加按钮
    add() {
      reqMenuAdd(this.form).then(res => {
        if (res.data.code == 200) {
          //成功
          successAlert(res.data.msg);

          //数据重置
          this.empty();

          //弹框消失
          this.cancel();

          //list数据要刷新
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    update() {
      reqMenuUpdate(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  }
};
</script>

<style></style>
