<template>
  <div class="region">
    <div v-if="region.length" class="choose_region">
      <h2 class="region_title">地区选择</h2>
      <div class="search">
        <el-input  placeholder="请输入地址"><el-button slot="append" icon="el-icon-search"></el-button></el-input>
      </div>
    </div>
    <loading v-if="!region.length"></loading>
  </div>
</template>
<script>
import loading from "@/base/loading/loading";
export default {
  components: { loading },
  data() {
    return {
      region: [],
      hotRegion: []
    };
  },
  methods: {
    searchRegion(){

    },
    //热门地区
    handleHotRegion(arr) {
      arr.forEach((item, index) => {
        if (item.cities.length == 1) {
          //直辖市
          this.hotRegion.push(item.name);
        }
      });
      console.log(this.hotRegion);
    },
    //处理地区,重新排序
    handleRegion() {
      console.log(this.region);
    },
    //获取地区
    getRegion() {
      let response = this._getRegion();
      if (response) {
        response.then(res => {
          this.region = res.data;
          this.handleRegion();
          this.handleHotRegion(this.region);
        });
      }
    }
  },
  mounted() {
    this.getRegion();
  }
};
</script>
<style lang="scss">
.region {
  color: #fff;
}
.region_title {
  font-size: 40px;
}
.search {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin: 30px auto;
  height: 40px;
  line-height: 40px;
  input {
    //appearance: none;
    //border: none;
    background-color: #fff;
    //width: 400px;
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
  }
  span {
    display: inline-block;
    width: 100px;
    background: #fff;
    height: 42px;
    line-height: 42px;
    color: #333;
    border: 1px solid #999;
  }
}
</style>


