<template>
  <div class="region">
    <div v-if="region.length" class="choose_region">
      <h2 class="region_title">地区选择{{test}}</h2>
      <search/>
    </div>
    <div class="region_content">
      <h3 class="fixed_region_tips" ref="fixedTips">{{fixedTips}}</h3>
      <ul class="region_shortcuts">
        <li
          v-for="(item,index) in region"
          :key="index"
          @click="chooseCitie(index)"
          :class="{active:shortcutIndex === index}"
        >{{item.name}}</li>
        <!--  <li v-for="(item,index) in region" :key="index" @click="chooseCitie(index)" :class="{active:shortcutIndex === index}"><a :href="'#cities'+index">{{item.name}}</a></li> -->
      </ul>
      <div class="all_cities" ref="all_cities" @touchmove="ontouchmove" @touchend="ontouchend">
        <div class="all_cities_scroll">
          <!-- <div class="region_panel" v-for="(item,index) in region" :key="index" :id="'cities'+index"> -->
          <div class="region_panel" v-for="(item,index) in region" :key="index" ref="region_panel">
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
      scrollY: -1,
      diffheight:0,
      heightArray: [],
      shortcutIndex: 0,
      WIDTH: 750, //设计稿宽度
      ONE_HEIGHT: "60", //每个城市的高度
      TIPS_HEIGHT: "60",
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
  computed: {
    test() {
      return this.diffheight;
    },
    fixedTips() {
      if (this.region.length > 0) {
        return this.region[this.shortcutIndex].name;
      }
    }
  },
  methods: {
    ontouchend() {
      /* for (let i = 0; i < this.heightArray.length; i++) {
        if (this.scrollY <= 0) {
          this.shortcutIndex = 0;
        }
        if (
          this.scrollY > this.heightArray[i] &&
          this.scrollY < this.heightArray[i + 1]
        ) {
          this.shortcutIndex = i + 1;
        }
      } */
    },
    ontouchmove() {
      let allcities = this.$refs.all_cities;
      this.scrollY = allcities.scrollTop; //Y轴滚动距离
      ///console.log(this.scrollY)
      //滚动距离在数组中的位置,左侧联动右侧
      for (let i = 0; i < this.heightArray.length; i++) {
        if (this.scrollY <= this.heightArray[0]) {
          this.shortcutIndex = 0;
        }
        if (
          this.scrollY > this.heightArray[i] &&
          this.scrollY < this.heightArray[i + 1]
        ) {
          this.shortcutIndex = i + 1;
        }
        /* 动画效果 */
        /* if (
          this.scrollY > this.heightArray[i] - this.TIPS_HEIGHT &&
          this.scrollY < this.heightArray[i]
        ) {
          this.diffheight =
            parseInt(this.TIPS_HEIGHT) -
            parseInt(this.heightArray[i] - this.scrollY); // 计算当前高度数组与滚动高度的差
          let fixedTips = this.$refs.fixedTips;
          console.log(this.diffheight);
          fixedTips.style.transform = `translateY(-${this.diffheight}px)`;

          //console.log(height)
        } */
      }
      //固定的tips动画效果
    },
    chooseCitie(index) {
      this.shortcutIndex = index;
      let allcities = this.$refs.all_cities;
      //console.log(allcities);
      allcities.scrollTop = this.heightArray[index - 1];
      console.log(this.heightArray[index]);
    },
    //设置地区的高度
    calHeight() {
      this.heightArray = [];
      let clientWidth = document.documentElement.clientWidth;
      let prop = this.WIDTH / clientWidth; //设计稿宽度除以实际宽度,比例
      this.ONE_HEIGHT = this.ONE_HEIGHT / prop;
      this.TIPS_HEIGHT = this.TIPS_HEIGHT / prop;
      setTimeout(() => {
        let regionPanel = this.$refs.region_panel;
        let length = regionPanel.length;
        let height = 0;
        for (let i = 0; i < length; i++) {
          let item = regionPanel[i];
          height += item.clientHeight;
          this.heightArray.push(height);
        }
        console.log(this.heightArray);
      }, 20);
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
        this.calHeight();
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
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
  }
}
.region_tips {
  height: 60px;
  line-height: 60px;
  padding-left: 10px;
  background: #ebebeb;
  text-transform: uppercase;
}

.fixed_region_tips {
  width: 100%;
  height: 60px;
  line-height: 60px;
  padding-left: 10px;
  background: #ebebeb;
  text-transform: uppercase;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
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
.all_cities {
  overflow: scroll;
  height: 100%;
}
.all_cities_scroll {
  overflow: scroll;
  padding-bottom: 300px;
  box-sizing: content-box;
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
  li.active {
    padding: 14px 8px;
    background: #3a8bcc;
    color: #fff;
  }
}
.region {
  color: #fff;
  box-sizing: border-box;
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


