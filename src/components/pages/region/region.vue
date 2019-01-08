<template>
  <div class="region">
    <div v-if="region.length" class="choose_region">
      <h2 class="region_title">地区选择</h2>
      <search/>
    </div>
    <div class="region_content">
      <ul class="region_shortcuts" >
        <li v-for="(item,index) in region" :key="index">{{item.name}}</li>
      </ul>
      <div class='all_cities'  ref="all_cities">
        <div class="all_cities_scroll">
        <div class="region_panel" v-for="(item,index) in region" :key="index">
          <h3 class="region_tips">{{item.name}}</h3>
          <ul v-for="(items,index) in item.value" :key="index" class="region_cities">
            <li>{{items.location}}</li>
          </ul>
        </div>
        </div>
      </div>
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
    //设置地区的高度
    calHeight(){
      setTimeout(() =>{
          let height = this.$refs.all_cities.scrollHeight
          
        },20)
    },
    //获取地区
    getRegion() {
      let url,
        arr = [];
      //location=a&key=e82fb3f88fdf41898b945fda077cffbc&group=cn
      this.characters.forEach((item, index) => {
        if (index === 0) {
          //热门
          url = `https://search.heweather.net/top?group=cn`;
        } else {
          url = `https://search.heweather.net/find?location=${item}&number=20&group=cn`;
        }
        let promise = new Promise((resolve, reject) => {
          this.$axios.get(url).then(res => {
            let obj = {};
            obj.name = item;
            obj.value = res.data.HeWeather6[0].basic;
            resolve(obj);
          });
        });
        arr.push(promise);
      });
      Promise.all(arr).then(res => {
        this.region = res;
        this.calHeight()
        console.log(this.region);
      });
    }
  },
  mounted() {
    this.getRegion();
  }
};
</script>
<style scoped lang="scss">
.region_panel {
}
.region_cities {
  li {
    padding: 12px;
  }
}
.region_tips {
  padding: 10px;
  background: #ebebeb;
  text-transform: uppercase;
}
.region_content {
  width: 100%;
  height: 100%;
  position: fixed;
  text-align: left;
  background: #fff;
  color: #333;
  margin-top: 180px;
  overflow: hidden;
}
.all_cities{
  overflow: scroll;
  height: 100%;
}
.all_cities_scroll{
  overflow: scroll;
}
.region_shortcuts {
  position: absolute;
  z-index: 3;
  border-left: 1px solid #ebebeb;
  background: #fff;
  color: #333;
  height: 100%;
  right: 0;
  top: 0;
  padding-top: 10px;
  text-align: center;
  li {
    padding: 8px;
    font-size: 22px;
    text-transform: uppercase;
  }
}
.region {
  color: #fff;
}
.region_title {
  font-size: 40px;
}
.choose_region {
  position: fixed;
  width: 100%;
  z-index: 4;
  top: 30px;
}
</style>


