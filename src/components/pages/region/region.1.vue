<template>
  <div class="region">
    <div v-if="region.length" class="choose_region">
      <h2 class="region_title">地区选择</h2>
      <div class="search">
        <!--  <el-input placeholder="请输入地址" v-model="searchRegionVal" @change="searchRegion"></el-input> -->
        <el-autocomplete
          class="inline-input"
          v-model="searchRegionVal"
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          value-key='name'
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
export default {
  components: { loading },
  data() {
    return {
      region: [],
      hotRegion: [],
      searchRegionVal: ""
    };
  },
  methods: {
    querySearch(queryString, cb) {
      let restaurants = this.restaurants;
      let results = restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    loadAll() {
      return [
        { name: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" },
        {
          name: "Hot honey 首尔炸鸡（仙霞路）",
          address: "上海市长宁区淞虹路661号"
        },
        {
          name: "新旺角茶餐厅",
          address: "上海市普陀区真北路988号创邑金沙谷6号楼113"
        },
        { name: "泷千家(天山西路店)", address: "天山西路438号" },
        {
          name: "胖仙女纸杯蛋糕（上海凌空店）",
          address: "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"
        },
        { name: "贡茶", address: "上海市长宁区金钟路633号" },
        {
          name: "豪大大香鸡排超级奶爸",
          address: "上海市嘉定区曹安公路曹安路1685号"
        },
        {
          name: "茶芝兰（奶茶，手抓饼）",
          address: "上海市普陀区同普路1435号"
        },
        { name: "十二泷町", address: "上海市北翟路1444弄81号B幢-107" },
        { name: "星移浓缩咖啡", address: "上海市嘉定区新郁路817号" },
        { name: "阿姨奶茶/豪大大", address: "嘉定区曹安路1611号" },
        { name: "新麦甜四季甜品炸鸡", address: "嘉定区曹安公路2383弄55号" },
        {
          name: "Monica摩托主题咖啡店",
          address: "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F"
        },
        {
          name: "浮生若茶（凌空soho店）",
          address: "上海长宁区金钟路968号9号楼地下一层"
        },
        { name: "NONO JUICE  鲜榨果汁", address: "上海市长宁区天山西路119号" },
        { name: "CoCo都可(北新泾店）", address: "上海市长宁区仙霞西路" },
        {
          name: "快乐柠檬（神州智慧店）",
          address: "上海市长宁区天山西路567号1层R117号店铺"
        },
        {
          name: "Merci Paul cafe",
          address: "上海市普陀区光复西路丹巴路28弄6号楼819"
        },
        {
          name: "猫山王（西郊百联店）",
          address: "上海市长宁区仙霞西路88号第一层G05-F01-1-306"
        },
        { name: "枪会山", address: "上海市普陀区棕榈路" },
        { name: "纵食", address: "元丰天山花园(东门) 双流路267号" },
        { name: "钱记", address: "上海市长宁区天山西路" },
        { name: "壹杯加", address: "上海市长宁区通协路" },
        {
          name: "唦哇嘀咖",
          address: "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元"
        },
        { name: "爱茜茜里(西郊百联)", address: "长宁区仙霞西路88号1305室" },
        {
          name: "爱茜茜里(近铁广场)",
          address:
            "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺"
        },
        {
          name: "鲜果榨汁（金沙江路和美广店）",
          address: "普陀区金沙江路2239号金沙和美广场B1-10-6"
        },
        {
          name: "开心丽果（缤谷店）",
          address: "上海市长宁区威宁路天山路341号"
        },
        { name: "超级鸡车（丰庄路店）", address: "上海市嘉定区丰庄路240号" },
        { name: "妙生活果园（北新泾店）", address: "长宁区新渔路144号" },
        { name: "香宜度麻辣香锅", address: "长宁区淞虹路148号" },
        {
          name: "凡仔汉堡（老真北路店）",
          address: "上海市普陀区老真北路160号"
        },
        { name: "港式小铺", address: "上海市长宁区金钟路968号15楼15-105室" },
        { name: "蜀香源麻辣香锅（剑河路店）", address: "剑河路443-1" },
        { name: "北京饺子馆", address: "长宁区北新泾街道天山西路490-1号" },
        {
          name: "饭典*新简餐（凌空SOHO店）",
          address: "上海市长宁区金钟路968号9号楼地下一层9-83室"
        },
        {
          name: "焦耳·川式快餐（金钟路店）",
          address: "上海市金钟路633号地下一层甲部"
        },
        { name: "动力鸡车", address: "长宁区仙霞西路299弄3号101B" },
        { name: "浏阳蒸菜", address: "天山西路430号" },
        { name: "四海游龙（天山西路店）", address: "上海市长宁区天山西路" },
        {
          name: "樱花食堂（凌空店）",
          address: "上海市长宁区金钟路968号15楼15-105室"
        },
        { name: "壹分米客家传统调制米粉(天山店)", address: "天山西路428号" },
        {
          name: "福荣祥烧腊（平溪路店）",
          address: "上海市长宁区协和路福泉路255弄57-73号"
        },
        {
          name: "速记黄焖鸡米饭",
          address: "上海市长宁区北新泾街道金钟路180号1层01号摊位"
        },
        { name: "红辣椒麻辣烫", address: "上海市长宁区天山西路492号" },
        {
          name: "(小杨生煎)西郊百联餐厅",
          address: "长宁区仙霞西路88号百联2楼"
        },
        { name: "阳阳麻辣烫", address: "天山西路389号" },
        {
          name: "南拳妈妈龙虾盖浇饭",
          address: "普陀区金沙江路1699号鑫乐惠美食广场A13"
        }
      ];
    },
    searchRegion() {
      
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
    this.restaurants = this.loadAll();
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
#app {
  background: #333;
}
</style>


