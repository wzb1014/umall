<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
    <el-dialog title="添加" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="formLabelWidth">
          <div class="my-upload">
            <h3>+</h3>
            <img class="img" :src="form.img" alt="" />
            <input class="my-input" @change="getFile" type="file" />
          </div>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth">
          <div>
            <el-button @click="qu">取 消</el-button>
            <el-button type="primary" @click="add">添 加</el-button>
            <!-- <el-button type="primary" >修 改</el-button> -->
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqBannerAdd,
  reqBannerDetail,
  reqBannerUpdate
} from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";
export default {
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        title: "",
        img: "",
        status: 1
      },
      formLabelWidth: "120px"
    };
  },
  computed: {
    ...mapGetters({
      list: "banner/list"
    })
  },
  methods: {
    ...mapActions({
      //请求菜单list
      reqListAction: "banner/reqListAction"
    }),

    getFile(e) {
      let file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        warningAlert("文件不能超过2M");
        return;
      }
      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    look(id) {
      //发请求
      this.dialogFormVisible=true,
      reqBannerDetail(id).then(res => {
        if (res.data.code == 200) {
          //这个时候form是没有id的
          this.form = res.data.list;
          this.form.id = id;
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    add() {
      console.log(this.form);
      reqBannerAdd(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.reqListAction();
          this.dialogFormVisible = false;
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    qu() {
      this.dialogFormVisible = false;
    }
  }
};
</script>

<style scoped>
.my-upload {
  width: 150px;
  height: 150px;
  border: 1px dashed #ccc;
  position: relative;
}

.my-upload h3 {
  text-align: center;
  line-height: 150px;
  font-size: 30px;
  font-weight: 400;
}

.my-upload .my-input {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
  opacity: 0;
}

.my-upload .img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
