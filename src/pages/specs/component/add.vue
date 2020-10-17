<template>
  <div>
    <el-dialog
      :title="info.isAdd == true ? '添加' : '修改'"
      :visible.sync="info.isshow"
    >
      <el-form :model="form">
        <el-form-item label="规格名称" :label-width="formLabelWidth">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="规格属性"
          v-for="(item, index) in attrArr"
          :key="index"
          :label-width="formLabelWidth">
          <div class="con">
            <div class="input-wrap">
              <el-input v-model="item.value" autocomplete="off"></el-input>
            </div>
            <el-button type="primary" v-if="index == 0" @click="addAttr">新增规格属性</el-button>
            <el-button type="danger" v-else @click="del(index)">删除</el-button>
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

    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changePageAction"
    >
    </el-pagination>
  </div>
</template>

<script>
import {reqSpecsAdd,reqSpecsDetail,reqSpecsUpdate,reqSpecsDel} from "../../../utils/request.js";
import { successAlert, warningAlert } from "../../../utils/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],

  computed: {
    ...mapGetters({
      list: "specs/list",
      total: "specs/total",
      size: "specs/size"
    })
  },

  data() {
    return {
      attrArr: [{ value: "" }, { value: "" }],

      form: {
        specsname: "",
        attrs: "",
        status: 1
      },
      formLabelWidth: "120px"
    };
  },

  methods: {
    ...mapActions({
      reqListAction: "specs/reqListAction",
      reqTotalAction: "specs/reqTotalAction",
      changePageAction: "specs/changePageAction"
    }),

    //新增规格属性
    addAttr() {
      this.attrArr.push({ value: "" });
    },
    //删除规格属性
    del(index) {
      this.attrArr.splice(index, 1);
    },

    cancel() {
      this.info.isshow = false;
    },
    qu() {
      this.info.isshow = false;
      warningAlert("取消成功");
    },
    empty() {
      this.attrArr = [{ value: "" }, { value: "" }];
      this.form = {
        specsname: "",
        attrs: "",
        status: 1
      };
    },

    look(id) {
      //发请求
      reqSpecsDetail(id).then(res => {
        if (res.data.code == 200) {
          //这个时候form是没有id的
          this.form = res.data.list[0];
          //'['s','l','m']'--->[{value:'s'},{value:'l'},{value:'m'}]
          this.attrArr = JSON.parse(this.form.attrs).map(item => ({
            value: item
          }));
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    //点击了添加按钮
    add() {
      // [{value:'s'},{value:'l'},{value:'xl'}]  ---map-->['s','l','xl']
      this.form.attrs = JSON.stringify(this.attrArr.map(item => item.value));
      reqSpecsAdd(this.form).then(res => {
        if (res.data.code == 200) {
          //成功
          successAlert(res.data.msg);

          //数据重置
          this.empty();

          //弹框消失
          this.cancel();

          //list数据要刷新
          this.reqListAction();
          this.reqTotalAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    update() {
      this.form.attrs = JSON.stringify(this.attrArr.map(item => item.value));
      reqSpecsUpdate(this.form).then(res => {
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
  },
  mounted() {}
};
</script>

<style scoped>
.con {
  display: flex;
}
.input-wrap {
  flex: 1;
}
</style>
