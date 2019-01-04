<template>
  <div class="region">
    <div v-if="region.length" class="choose_region">
      <h2 class="region_title">地区选择</h2>
      <search/>
    </div>
    <loading v-if="!region.length"></loading>
  </div>
</template>
<script>
import loading from "@/base/loading/loading";
import Search from "@/components/pages/region/search";
export default {
  components: { loading, Search },
  data() {
    return {
      region: [],
      hotRegion: [],
      characters: [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z"
      ],
    };
  },
  methods: {
    //热门地区
    handleHotRegion(arr) {
      arr.forEach((item, index) => {
        if (item.cities.length == 1) {
          //直辖市
          this.hotRegion.push(item.name);
        }
      });
    },
    //处理地区,重新排序
    handleRegion() {
      console.log(this.region);
    },
    //获取地区
    getRegion() {
      //location=a&key=e82fb3f88fdf41898b945fda077cffbc&group=cn  
      this.characters.forEach((item, index) => {
        let url = `https://search.heweather.net/find?location=${item}`;
        this.$axios.get(url).then(res => {
          this.region.push(res.data.HeWeather6)
        });
      });
/* 
      url += `location=a`;
        this.$axios.get(url).then(res => {
          this.region.push(res.data.HeWeather6)
          
        }); */
      console.log(this.region)
      //let url = `http://dou.fudayiliao.com/order/region`;
      /* this.$axios.get(url).then(res => {
        this.region = res.data;
        this.handleRegion();
        this.handleHotRegion(this.region);
      }); */
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
</style>


