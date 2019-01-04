<template>
  <div class="search">
    <el-autocomplete
      popper-class="suggestion_list"
      class="suggestion_input"
      size="large"
      v-model="searchRegionVal"
      :fetch-suggestions="querySearch"
      :trigger-on-focus="false"
      value-key="location"
      select
      placeholder="请输入内容"
    >
      <i class="el-icon-close el-input__icon" slot="suffix" @click="cancelSearch"></i>
      <template slot-scope="{ item }">
        <div class="name">{{ item.location }}</div>
      </template>
    </el-autocomplete>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchRegionVal: "",
      suggestion: ""
    };
  },
  methods: {
    cancelSearch() {
      this.searchRegionVal = "";
    },
    querySearch(queryString, cb) {
      this.getSuggestion(queryString).then(res => {
        console.log(res);
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
      let url = `https://search.heweather.net/find?`;
      let key = "e82fb3f88fdf41898b945fda077cffbc";
      let location = queryString;
      let keywords = queryString;
      url += `location=${queryString}`;
      return new Promise((resolve, reject) => {
        this.$axios.get(url).then(res => {
          resolve(res.data.HeWeather6[0].basic);
        });
      });
    },
  },
  mounted() {
   
  }
};
</script>
<style scoped lang="scss">
.suggestion_list {
  li {
    padding: 10px 0 !important;
  }
  .name {
    padding: 10px 0;
  }
}

.suggestion_input {
  width: 600px;
  height: 80px;
  line-height: 80px;
}
.el-input__inner {
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

</style>


