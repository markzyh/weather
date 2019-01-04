<template>
  <div class="region">
    <div v-if="region.length" class="choose_region">
      <h2 class="region_title">地区选择</h2>
      <div class="search">
        <!--  <el-input placeholder="请输入地址" v-model="searchRegionVal" @change="searchRegion"></el-input> -->
        <el-autocomplete
          class="suggestion_input"
          size="large"
          v-model="searchRegionVal"
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          value-key="name"
          select=""
          placeholder="请输入内容"
        ></el-autocomplete>
      </div>
    </div>
    <loading v-if="!region.length"></loading>
  </div>
</template>
<script>
import loading from "@/base/loading/loading";
import jsonp from "jsonp";
import { resolve } from "q";
export default {
  components: { loading },
  data() {
    return {
      test:true,
      region: [],
      hotRegion: [],
      searchRegionVal: "",
      suggestion: ""
    };
  },
  methods: {
    querySearch(queryString, cb) {

      this.getSuggestion(queryString).then(res => {
        console.log(res)
        cb(res);
      });
    },
    createFilter(queryString) {
      return suggestion => {
        return suggestion.name;
      };
    },
    getSuggestion(queryString) {
      let region = "全国";
      let ak = `SgI1XE1GyrcclnKtPWCjNOd5RVLMzcFs`;
      let keywords = queryString;
      let url = `http://api.map.baidu.com/place/v2/suggestion?query=${keywords}&region=${region}&city_limit=false&output=json&ak=${ak}`;
      let opts = "";
      return new Promise((resolve, reject) => {
        jsonp(url, opts, (err, data) => {
          if (!err) { 
            resolve(data.result);
          } else {
            reject(err);
          }
        });
      });
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
      let url = `https://easy-mock.com/mock/5bc6c497d50e8869d9d12d3e/example/getRegion`;
      this.$axios.get(url).then(res => {
        this.region = res.data;
        this.handleRegion();
        this.handleHotRegion(this.region);
      });
    }
  },
  mounted() {
    this.getRegion();
  }
};
</script>
<style scoped lang="scss">
.region {
  color: #fff;
}
.region_title {
  font-size: 40px;
}
.suggestion_input{
  width: 600px;
  height: 80px;
  line-height: 80px;
}
.el-input__inner{
  width: 4000px !important;
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
    appearance: none;
    border: none;
    
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
#app {
  background: #333;
}
</style>


