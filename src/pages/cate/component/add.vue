<template>
  <div>
    <el-dialog
      :title="info.isAdd == true ? '添加' : '修改'"
      :visible.sync="info.isshow"
    >
      <el-form :model="form">
        <el-form-item label="上级分类" :label-width="formLabelWidth">
          <el-select
            v-model="form.pid"
            placeholder="请选择上级菜单"
          >
            <el-option
              label="顶级菜单"
              :value="0"
              :label-width="formLabelWidth"
            ></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input
            v-model="form.catename"
            autocomplete="off"
            placeholder="系统设置"
          ></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="formLabelWidth">
          <div class="el-k">
            <h3>+</h3>
            <img class="img"  v-if="imgUrl" :src="imgUrl" alt="" />
            <input class="my-input"  v-if="info.isshow" type="file" @change="getFile" />
          </div>
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
  reqCateAdd,
  reqCateDetail,
  reqCateUpdate
} from "../../../utils/request.js";
import { successAlert, warningAlert } from "../../../utils/alert";
import { indexRoutes } from "../../../router/index";
import { mapGetters, mapActions } from "vuex";


export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "cate/list"
    })
  },

  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      imgUrl: "",
      form: {
        pid: 0,
        catename: "",
        img: null,
        status: 1
      },

      formLabelWidth: "120px"
    };
  },

  methods: {
    ...mapActions({
      reqListAction: "cate/reqListAction"
    }),
    getFile(e){
        let file = e.target.files[0];
        
        if(file.size>2*1024*1024){
            warningAlert('文件不能超过2M')
            return;
        }

        let imgExtArr=['.jpg','.png','.gif','jpeg'];
        let extname=file.name.slice(file.name.lastIndexOf('.'));
        if(!imgExtArr.some(item=>item==extname)){
            warningAlert("文件格式不正确")
        return;
        }
       
       this.imgUrl=URL.createObjectURL(file)
       this.form.img=file;
       
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
        catename: "",
        img: null,
        status: 1
      };
      this.imgUrl=""
    },
    look(id) {
      //发请求
      reqCateDetail(id).then(res => {
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
      reqCateAdd(this.form).then(res => {
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
      reqCateUpdate(this.form).then(res => {
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

<style scoped>
.el-k {
  width: 100px;
  height: 100px;
  border: 1px dashed;
}
.el-k h3 {
  font-size: 30px;
  text-align: center;
  line-height: 100px;
}
.el-k .my-input {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
  opacity: 0;
}
.el-k .img {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
