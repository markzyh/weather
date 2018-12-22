<template>
  <div class="index">
    <h2 class="local_title">{{city}}市-{{area}}区</h2>
    <h3 class="weather_status">{{weatherStatus}}</h3>
    <div class="weather_details">

    </div>
  </div>
</template>

<script>
//import {_getNowWeather} from '@/api/ajax'
export default {
  name: "IndexPage",
  data() {
    return {
      city: "上海",
      area: "宝山",
      nowweather: [],
      weatherStatus: ""
    };
  },
  methods: {
    handleWeather(){
        if(this.nowweather.length != 0){
            let nowweather = this.nowweather
            this.weatherStatus = nowweather.now.cond_txt
        }
    },
     getWeather(area, city) {
      let responseNow = this._getNowWeather(area,city);
      let responseForecast = ''
      if(responseNow){
        responseNow.then(res =>{
            this.nowweather = res.data.HeWeather6[0]
            //this.handleWeather()
            console.log(this.nowweather)
        })
      }
      
    }
  },
  mounted() {
    this.getWeather(this.area, this.city);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
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
.weather_status{
    font-size: 30px;
}
</style>
