<template>
  <div class="common-content">
    <div>
      <position :positions="this.positions" />
    </div>
    <div class="common-content-detail">
      <location-mgr />
    </div>
  </div>
</template>

<script>
import LocationMgr from "../common/locationMgr.vue";
import Position from "../common/position.vue";

export default {
  name: "myLocation.vue",
  data() {
    return {
      positions: Window.getCurrentLocation("3-6")
    };
  },
  components: {
    LocationMgr,
    Position
  }
};
</script>

<style scoped lang="scss">
.common-content-detail {
  width: 100%;
  height: 100%;
  padding: 0;
}
</style>