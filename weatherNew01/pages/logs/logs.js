//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    histories: [],
    num:'',
    max:''
  },
  keyword:function(){
    var that = this;
    var histories = that.data.histories
    if(histories != null){
      var n = 0;
      for(var i = 0;i < histories.length;i++){
        if(null != histories[i]){
          n++;
        }
      }
    }
    var total = '';
    for(var i = 0;i < n;i++){
      var total1;
        total1 = that.data.histories[i].value
        total = total + total1
    }
    var str = total.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?|\、|\，|\；|\。|\？|\！|\“|\”|\‘|\’|\：|\（|\）|\─|\…|\—|\的|\了|\一|\·|\《|\》]/g, "");
    console.log(str)
    var obj = {};
    for(var i = 0;i < str.length;i++){
      var chars = str.charAt(i);
      if(obj[chars]){
        obj[chars]++;
      }else{
        obj[chars] = 1;
      }
    }
      console.log(obj)
      var max = 0,
      num = '';
      var k;
      for(k in obj){
        if(obj[k] > max){
          max = obj[k];
          num = k;
        }
      }
      console.log('最多的字符:'+ num);
      console.log('出现的次数:'+ max);
      that.setData({
        num:num,
        max:'重复次数：'+ max
      })
  },

  
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'value',
      success:function(res) {
        console.log(res.data)
        that.setData({
          histories:res.data,
        })
      }
    })
  },

  dairytapEvent: function (event) {
    wx.getStorage({
      key: 'value',
    })
    wx.navigateTo({
      url: '/pages/index/index?date='+date,
    })
  },

  handleTouchStart:  function (e)  {
        this.startTime  =  e.timeStamp;
  },

  handleTouchEnd:  function (e)  {
        this.endTime  =  e.timeStamp;
     
  },

  handleClick: function (e) {  
        if  (this.endTime  -  this.startTime  >  5000)  {
          handleLongPress:{
            wx.removeStorage({
              key: 'value',
              success: function (res) {
                console.log(res.data)
              },
            });
            this.setData({
              histories: null
            })
          }
        }
  }
})


