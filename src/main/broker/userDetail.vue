<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 17:26:48
 * @LastEditTime: 2019-08-13 16:50:06
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="coupon-list">
    <div>
      <Position :positions="positions" />
    </div>
    <div class="common-content-detail">
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <div>
            <ul class="clear">
              <li>姓名：隔壁老王</li>
              <li>电话：13456543456</li>
              <li>身份证号：6101111111111111</li>
              <li>年龄：6</li>
              <li>积分：6101111111111111</li>
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane label="身份证">
          <div class="certificate-img-bg">
            <img src="src/assets/images/bg.png" alt="正面照" />
            <img src="src/assets/images/bg.png" alt="反面照" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="驾照">
          <div class="certificate-img-bg">
            <img src="src/assets/images/bg.png" alt="正面照" />
            <img src="src/assets/images/bg.png" alt="正面照" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="车辆管理">
          <el-collapse accordion>
            <el-collapse-item v-for="(carItem,index) in carInfo" :title="carItem.title">
              <ul style="padding:10px">
                <li>车型：小型箱货</li>
                <li>发动机：汽油</li>
              </ul>
              <div class="info-box">
                <p>行驶证</p>
                <div>
                  <img src="src/assets/images/bg.png" alt="正面照" />
                  <img src="src/assets/images/bg.png" alt="正面照" />
                </div>
              </div>
              <div class="info-box">
                <p>车辆照片</p>
                <div>
                  <img src="src/assets/images/bg.png" alt="正面照" />
                  <img src="src/assets/images/bg.png" alt="正面照" />
                  <img src="src/assets/images/bg.png" alt="正面照" />
                  <img src="src/assets/images/bg.png" alt="正面照" />
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="市场信息">
          <div>
            <ul class="clear">
              <li>市场：西安市国亨市场</li>
              <li>常用车型：依维柯</li>
              <li>商铺位置：西安莲湖区大兴西路303号</li>
              <li>付费方式：</li>
              <li>协作方式：6101111111111111</li>
            </ul>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Position from "../common/position.vue";
import { debuglog } from "util";

export default {
  components: {
    Position
  },
  data() {
    return {
      positions: Window.getCurrentLocation(this.$route.query.location),
      account: null,
      carInfo: [
        {
          title: "法拉利",
          drivingLicense: [
            "src/assets/images/bg.png",
            "src/assets/images/bg.png"
          ],
          carPic: [
            "src/assets/images/bg.png",
            "src/assets/images/bg.png",
            "src/assets/images/bg.png",
            "src/assets/images/bg.png"
          ]
        },
        {
          title: "劳斯莱斯",
          drivingLicense: [
            "src/assets/images/bg.png",
            "src/assets/images/bg.png"
          ],
          carPic: [
            "src/assets/images/bg.png",
            "src/assets/images/bg.png",
            "src/assets/images/bg.png",
            "src/assets/images/bg.png"
          ]
        },
        {
          title: "劳斯莱斯",
          drivingLicense: [
            "src/assets/images/bg.png",
            "src/assets/images/bg.png"
          ],
          carPic: [
            "src/assets/images/bg.png",
            "src/assets/images/bg.png",
            "src/assets/images/bg.png",
            "src/assets/images/bg.png"
          ]
        },
        {
          title: "劳斯莱斯",
          drivingLicense: [
            "src/assets/images/bg.png",
            "src/assets/images/bg.png"
          ],
          carPic: [
            "src/assets/images/bg.png",
            "src/assets/images/bg.png",
            "src/assets/images/bg.png",
            "src/assets/images/bg.png"
          ]
        }
      ]
    };
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
ul {
  li {
    float: left;
    width: 33.33%;
    line-height: 40px;
    font-size: 16px;
  }
}
.certificate-img-bg {
  img {
    float: left;
    display: inline-block;
    padding: 30px 5%;
    width: 40%;
  }
}
.el-collapse-item-bg {
  height: 40px;
}
.info-box {
  clear: both;
  p {
    font-size: 18px;
    padding: 10px;
  }
  div {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    img {
      width: 40%;
      margin-bottom: 20px;
    }
  }
}
</style>