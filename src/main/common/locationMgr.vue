<template>
  <div class="location-map">
    <div id="mapContainer" />
    <div class="left-float-panel">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item name="1">
          <template slot="title">
            <b style="font-size:16px">&nbsp;&nbsp;&nbsp;&nbsp;我的常用地址</b>
          </template>
          <div>
            <template>
              <el-table :data="locations" max-height="660" style="width: 100%">
                <el-table-column
                  align="center"
                  :show-overflow-tooltip="true"
                  prop="address"
                  label="常用地址"
                  width="200"
                ></el-table-column>
                <el-table-column align="center" prop="contractor" label="联系人" width="100"></el-table-column>
                <el-table-column align="center" prop="phone" label="联系方式" width="auto"></el-table-column>
                <el-table-column fixed="right" prop label="操作" align="center" width="auto">
                  <template slot-scope="scope">
                    <el-button
                      v-if="!selector"
                      @click="onEdit(scope.$index)"
                      type="text"
                      size="small"
                    >编辑</el-button>
                    <el-button
                      v-if="selector"
                      @click="onChoice(scope.$index)"
                      type="text"
                      size="small"
                    >选择</el-button>
                    <el-button @click="deleteItem(scope.$index)" type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
          <!-- <div style="width:100%; text-align:center" v-if="changed">
            <el-button @click="onCommit" type="primary">提交</el-button>
          </div>-->
          <el-pagination
            :hide-on-single-page="total<=pageSize"
            layout="prev, pager, next"
            @current-change="onPageChange"
            @prev-click="prevClick"
            @next-click="nextClick"
            :page-size="pageSize"
            :total="total"
            class="tc mt10"
          ></el-pagination>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="search-box">
      <div>
        <el-input
          placeholder="输入关键字搜索地址"
          prefix-icon="el-icon-search"
          id="search"
          v-model="searchVal"
          clearable
        ></el-input>
        <el-button type="primary" @click="onConfirm">添加</el-button>
      </div>
      <div id="searchDisplay"></div>
    </div>
    <dialog-bar
      :editDialogShow="showDialog"
      dialogTitle="联系人"
      @onConfirm="submit"
      @onCancel="onEditCancel"
    >
      <el-form ref="currentLocation" :model="currentLocation" label-width="80px">
        <el-form-item label="地址" :show-overflow-tooltip="true">
          <p>{{currentLocation.address}}</p>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="currentLocation.contractor"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="currentLocation.phone"></el-input>
        </el-form-item>
      </el-form>
    </dialog-bar>
  </div>
</template>

<script>
import DialogBar from "./dialogBar.vue";
import { regPhone } from "../../assets/utils/commonReg.js";
require("../../assets/module/location.js");
var com = Window.com || {};
com.lightningdog = com.lightningdog || {};
com.lightningdog.rrq = com.lightningdog.rrq || {};
var _location = com.lightningdog.rrq.location;
var _event = com.lightningdog.rrq.event;

let map;
export default {
  data() {
    return {
      selector: false,
      activeName: "1",
      searchVal: "",
      pageSize: 5,
      curPage: 1,
      total: 0,
      editOrAdd: "",
      changed: false,
      onChoose: function(location) {},
      currentLocation: {
        longitude: "",
        onEditConfirmlatitude: "",
        address: "",
        province: "",
        county: "",
        area: "",
        phone: "",
        contractor: ""
      },
      locations: [],
      showDialog: false
    };
  },
  mounted() {
    if (this.choose) {
      this.onChoose = this.choose;
      this.selector = true;
    }
    this.initMap();
    this.bindListEvent();
    this.bindAddEvent();
    this.bindEdtiEvent();
    this.bindDeleteEvent();
    this.listApiFetch();
  },
  methods: {
    initMap() {
      var _this = this;
      AMapUI.loadUI(["misc/PositionPicker", "misc/PoiPicker"], function(
        PositionPicker,
        PoiPicker
      ) {
        map = new AMap.Map("mapContainer", {
          zoom: 14,
          scrollWheel: true
        });

        var poiPicker = new PoiPicker({
          //city:'北京',
          input: "search"
        });

        poiPicker.on("poiPicked", function(poiResult) {
          console.log(poiResult);
          _this.currentLocation.longitude = poiResult.item.location.lng;
          _this.currentLocation.latitude = poiResult.item.location.lat;
          map.panTo([
            _this.currentLocation.longitude,
            _this.currentLocation.latitude
          ]);
        });

        var positionPicker = new PositionPicker({
          mode: "dragMap",
          map: map
        });
        positionPicker.on("success", function(positionResult) {
          _this.searchVal = positionResult.address;
          _this.currentLocation.address = positionResult.address;
          _this.currentLocation.longitude = positionResult.position.lng;
          _this.currentLocation.latitude = positionResult.position.lat;
          _this.currentLocation.province =
            positionResult.regeocode.addressComponent.province;
          _this.currentLocation.county =
            positionResult.regeocode.addressComponent.city;
          _this.currentLocation.area =
            positionResult.regeocode.addressComponent.district;
          console.log(_this.currentLocation);
        });

        positionPicker.start();
      });
    },
    afterOption(tips) {
      this.$message({
        message: tips,
        type: "success"
      });
      this.currentLocation.contractor = "";
      this.currentLocation.phone = "";
      this.listApiFetch();
    },
    bindDeleteEvent() {
      _event.on(
        "delAddress",
        "com.lightningdog.rrq.location",
        "del",
        (event, data) => {
          this.afterOption("已删除");
        }
      );
    },
    bindEdtiEvent() {
      _event.on(
        "editAddress",
        "com.lightningdog.rrq.location",
        "edit",
        (event, data) => {
          this.afterOption("修改成功");
        }
      );
    },
    bindAddEvent() {
      _event.on(
        "addAddress",
        "com.lightningdog.rrq.location",
        "add",
        (event, data) => {
          this.afterOption("添加成功");
        }
      );
    },
    deleteItem(index) {
      this.changed = true;
      this.$confirm("是否删除该地址？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let id = this.locations[index].id;
          if (id) _location.del(id);
        })
        .catch(() => {});
    },
    submit() {
      let title = ["contractor", "phone", "address"];
      let tips = ["请输入联系人姓名", "请输入联系电话", "请选择地址"];
      let self = this;
      let pass = title.every((item, index) => {
        if (!this.currentLocation[item].length) {
          this.$message({
            message: tips[index],
            type: "error"
          });
          return false;
        }
        return true;
      });
      if (!pass) return;

      if (!regPhone(this.currentLocation.phone)) {
        this.$message({
          message: "请输入正确手机号码！",
          type: "error"
        });
        return;
      }
      this.showDialog = false;
      this.changed = true;
      this.$loading({
        text: "加载中"
      });
      _location[this.editOrAdd](this.currentLocation);
    },
    bindListEvent() {
      _event.on(
        "onAddressList",
        "com.lightningdog.rrq.location",
        "list",
        (event, data) => {
          if (data && data.list) {
            let arr = data.list;
            this.total = data.total;
            this.locations = arr;
          }
        }
      );
    },
    onPageChange(e) {
      this.curPage = e;
      this.listApiFetch();
    },
    nextClick(e) {
      this.curPage = e++;
    },
    prevClick(e) {
      this.curPage = e--;
    },
    listApiFetch() {
      _location.list({
        pageNum: this.curPage,
        pageSize: this.pageSize
      });
    },
    onChoice(index) {
      this.showDialog = true;
      this.currentLocation = this.locations[index];
      if (this.onChoose) {
        this.onChoose(this.currentLocation);
      }
    },
    onEdit(index) {
      this.showDialog = true;
      this.editOrAdd = "edit";
      this.currentLocation = this.locations[index];
    },
    onEditCancel(val) {
      this.showDialog = false;
      this.listApiFetch();
    },
    onConfirm() {
      this.editOrAdd = "add";
      this.showDialog = true;
      this.changed = true;
      if (this.onChoose) {
        this.onChoose(this.currentLocation);
      }
    },
    onCommit() {
      this.changed = false;
    }
  },
  components: {
    DialogBar
  },
  props: {
    choose: Function
  }
};
</script>

<style lang="scss" scoped>
.location-map {
  width: 100%;
  height: 100%;
  position: relative;
  #mapContainer {
    width: 100%;
    height: 100%;
  }
  .left-float-panel {
    width: 570px;
    position: absolute;
    top: 80px;
    left: 20px;
    box-shadow: 5px 2px 6px #e2e2e2;
    max-height: 660px;
    overflow-y: auto;
  }
  .search-box {
    position: absolute;
    left: 50%;
    top: 20px;
    transform: translateX(-50%);
    .el-input {
      width: 315px;
      float: left;
    }
  }
}
</style>