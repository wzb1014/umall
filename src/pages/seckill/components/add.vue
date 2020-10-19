<template>
  <div>
    <el-dialog
      :title="info.isAdd == true ? '添加' : '修改'"
      :visible.sync="info.isshow"
    >
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input
            v-model="form.title"
            autocomplete="off"
            placeholder="系统设置"
          ></el-input>
        </el-form-item>
        <el-form-item label="活动时间" :label-width="formLabelWidth">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="开始日期"
              v-model="form.begintime"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2"></el-col>

          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="结束日期"
              v-model="form.endtime"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select v-model="form.first_cateid" placeholder="请选择分类">
            <el-option label="区域一" value="5"></el-option>
            <el-option label="区域二" value="6"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select v-model="form.second_cateid" placeholder="请选择分类">
            <el-option label="区域一" value="3"></el-option>
            <el-option label="区域二" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" :label-width="formLabelWidth">
          <el-select v-model="form.goodsid" placeholder="请选择商品">
            <el-option label="区域一" value="1"></el-option>
            <el-option label="区域二" value="2"></el-option>
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
  reqSeckillAdd,
  reqSeckillInfo,
  reqSeckillUpdate
} from "../../../utils/request.js";
import { successAlert, warningAlert } from "../../../utils/alert";
import { indexRoutes } from "../../../router/index";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "seckill/list"
    })
  },

  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      },
      formLabelWidth: "120px"
    };
  },

  methods: {
    ...mapActions({
      reqListAction: "seckill/reqSeckillActions"
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
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      };
    },
    look(id) {
      //发请求
      reqSeckillInfo(id).then(res => {
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
      this.form.begintime = this.form.begintime.getTime();
      this.form.endtime = this.form.endtime.getTime();
      reqSeckillAdd(this.form).then(res => {
        if (res.data.code == 200) {
          //成功
          console.log(this.form);
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
      reqSeckillUpdate(this.form).then(res => {
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
