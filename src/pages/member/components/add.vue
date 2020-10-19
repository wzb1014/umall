<template>
  <div>
    <el-dialog
      title="编辑"
      :visible.sync="info.isshow"
      width="70%"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="手机号">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item label="状态" label-width="80px">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>

        <el-form>
          <el-button @click="qu">取 消</el-button>

          <el-button type="primary" @click="update">修 改</el-button>
        </el-form>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { reqMemberDetail, reqMemberUpdate } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        nickname: "",
        phone: "",
        password: "",
        status: "1"
      }
    };
  },
  methods: {
    empty() {
      this.form = {
        nickname: "",
        phone: "",
        password: "",
        status: "1"
      };
    },
    cancel() {
      this.info.isshow = false;
    },
    look(id) {
      //发请求
      reqMemberDetail(id).then(res => {
        if (res.data.code == 200) {
          //这个时候form是没有id的
          this.form = res.data.list;
          this.form.id = id;
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    update() {
      reqMemberUpdate(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    qu() {
      this.info.isshow = false;
      warningAlert("取消成功");
    }
  }
};
</script>

<style></style>
