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
        "热门",
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
      ]
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
      let url,
        arr = [],obj = {}
      //location=a&key=e82fb3f88fdf41898b945fda077cffbc&group=cn
      this.characters.forEach((item, index) => {
        if (index === 0) {
          //热门
          url = `https://search.heweather.net/top?group=cn`;
        } else {
          url = `https://search.heweather.net/find?location=${item}`;
        }
        let promise = new Promise((resolve, reject) => {
          this.$axios.get(url).then(res => {
            resolve(res.data.HeWeather6[0].basic)
            /* let obj = {};
            obj[item] = res.data.HeWeather6[0].basic;
            //this.region.push(obj) */
          });
        });
        arr.push(promise)
        /* promise.then(res =>{
          obj[item] = res;
          this.region.push(obj)
        }) */
      });

      Promise.all(arr).then(res =>{
        console.log(res)
        this.region.push(res)
        console.log(this.region);
      })
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


