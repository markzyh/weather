<template>
  <div class="index">
    <h1 class="today">{{today}}</h1>
    <h2 class="local_title">{{city}}市-{{area}}区</h2>
    <h3 class="weather_status">
      {{nowweatherStatus}}
      <span>{{nowWindDir}}</span>
      <span>{{nowWindSc}}级</span>
    </h3>
    <h4 class="now_tmp">{{nowTmp}}℃</h4>
    <!-- <h5 class="update_time">更新时间:{{updateTime}}</h5> -->
    <div class="weather_forecast">
      <h3 class="forecast_title">未来七天天气预报</h3>
      <!-- <ul class="">
        <li></li>
      </ul>-->
      <swiper
        :options="swiperOption"
        ref="mySwiper"
        @someSwiperEvent="callback"
        class="forecast_list"
      >
        <!-- slides -->
        <swiper-slide class="weather_details" v-for="(item,index) in forecastWeather" :key="index" ref='slider'>
          <h3 class="day">今天</h3>
          <h4 class="date">{{item.date}}</h4>
          <p class="day_status">{{item.cond_txt_d}}</p>
          <p class="tmp_max">{{item.tmp_max}}℃</p>
          <p class="tmp_min">{{item.tmp_min}}℃</p>
          <p class="night_status">{{item.cond_txt_n}}</p>
          <p class="wind_dir">{{item.wind_dir}}</p>
          <p class="wind_sc">{{item.wind_sc}}级</p>
          <p class="air_qlty">良</p>
        </swiper-slide>
        <canvas id="canvas" ref="canvas" class="tem_canvas"></canvas>
      </swiper>
    </div>
  </div>
</template>
<script>
//import {_getNowWeather} from '@/api/ajax'
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  components: {
    swiper,
    swiperSlide
  },
  name: "IndexPage",
  data() {
    return {
      diff: 16,
      HEIGHT: 200, //画布高度
      //ONE_HEIGHT = HEIGHT / diff / 2,
      WIDTH: 80,
      RADIUS: 3,
      PADDING: 10,
      today: "", //当天
      city: "上海", //本地市
      area: "宝山", //本地区
      nowweather: [], //当前天气信息
      forecastWeather: [], //未来7天信息
      nowweatherStatus: "",
      nowWindDir: "", //风向
      nowWindSc: "", //风力
      nowTmp: "", //温度
      updateTime: "", //更新时间
      highTemp: [],
      lowTemp: [],
      week: [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ],
      swiperOption: {
        slidesPerView: 4
      }
    };
  },
  methods: {
    //温度折线图
    canvas() {
      c.beginPath(arr, color);
      //画点
      for (let i = 0; i < arr.length; i++) {
        c.moveTo(
          this.WIDTH * i + this.PADDING,
          -arr[i] * this.ONE_HEIGHT + this.HEIGHT
        );
        c.fillText(
          arr[i] + "℃",
          this.WIDTH * i,
          -arr[i] * this.ONE_HEIGHT + this.HEIGHT - this.PADDING
        );
        c.arc(
          this.WIDTH * i + this.PADDING,
          -arr[i] * this.ONE_HEIGHT + this.HEIGHT,
          this.RADIUS,
          0,
          2 * Math.PI,
          true
        );
      }
      c.fillStyle = color;
      c.fill();
      //划线
      for (let j = 0; j <= arr.length; j++) {
        c.moveTo(
          this.WIDTH * j + this.PADDING,
          -arr[j] * this.ONE_HEIGHT + HEIGHT
        );
        c.lineTo(
          this.WIDTH * (j + 1) + this.PADDING,
          -arr[j + 1] * this.ONE_HEIGHT + this.HEIGHT
        );
      }
      c.strokeStyle = color;
      c.stroke();
    },
    callback() {},
    handleForecastWeather() {
      let length = this.forecastWeather.length;
      for (let i = 0; i < length; i++) {
        this.highTemp.push(this.forecastWeather[i].tmp_max)
        this.lowTemp.push(this.forecastWeather[i].tmp_min)
      }
    },
    handleNowWeather() {
      if (this.nowweather.length != 0) {
        let nowweather = this.nowweather;
        this.nowweatherStatus = nowweather.now.cond_txt;
        this.nowWindDir = nowweather.now.wind_dir;
        this.nowWindSc = nowweather.now.wind_sc;
        this.nowTmp = nowweather.now.tmp;
        this.updateTime = nowweather.update.loc;
      }
    },
    //未来7天天气
    getForecastWeather(area, city) {
      let response = this._getForecastWeather(area, city);
      if (response) {
        response.then(res => {
          this.forecastWeather = res.data.HeWeather6[0].daily_forecast;
          this.handleForecastWeather();
          console.log(this.forecastWeather);
        });
      }
    },
    //当前天气
    getNowWeather(area, city) {
      let response = this._getNowWeather(area, city);
      if (response) {
        response.then(res => {
          this.nowweather = res.data.HeWeather6[0];
          console.log(this.nowweather);
          this.handleNowWeather();
        });
      }
    },
    getToday() {
      let now = new Date();
      let year = now.getFullYear();
      let month = this.checkTen(now.getMonth() + 1);
      let date = this.checkTen(now.getDate());
      let day = this.week[now.getDay()];
      this.today = `${year}-${month}-${date} ${day}`;
    },
    checkTen(num) {
      if (num > 10) {
        return num;
      } else {
        return "0" + num;
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    this.getToday();
    this.getNowWeather(this.area, this.city);
    this.getForecastWeather(this.area, this.city);
    let canvas = document.getElementById("canvas");
    //let c = canvas.getContext("2d");
    setTimeout(() =>{
    console.log(this.$refs.slider[0])

    },2000)
    console.log(canvas.offsetWidth)

    //this.swiper.slideTo(3, 1000, false)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
.tem_canvas {
  width: 400px;
  height: 200px;
  border: 1px solid #000;
  position: absolute;
  top: 280px;
}
.weather_details {
  h3,
  h4 {
    font-size: 26px;
    font-weight: normal;
    margin-top: 20px;
  }
  p {
    font-size: 20px;
    margin-top: 20px;
  }
  .night_status {
    margin-top: 300px;
  }
}
.forecast_title {
  font-size: 40px;
  text-align: center;
  margin: 60px;
}
.forecast_list {
  display: flex;
  background: rgba(0, 0, 0, 0.5);
  padding: 30px 0;
  position: relative;
}
.now_tmp {
  font-size: 60px;
  margin: 20px 0;
}
.update_time {
  font-size: 12px;
  font-weight: normal;
  display: block;
}
.index {
  color: #fff;
}
.local_title {
  text-align: center;
  font-size: 36px;
  margin: 40px 0;
  color: #fff;
  text-transform: uppercase;
}
.weather_status {
  font-size: 30px;
  span {
    margin: 0 0 0 30px;
  }
}
</style>
