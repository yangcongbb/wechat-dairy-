//index.js
//获取应用实例
var QQMapWX = require('../../qqmapsdk/qqmap-wx-jssdk.js');
var that = this, qqmapsdk;
qqmapsdk = new QQMapWX({
  key: 'MTXBZ-J7KKU-6TTVA-BZBL3-52IAF-WSB26'
}); 
Page({
  onLoad: function () {
    wx.getLocation({  //获取当前地址
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log(latitude,longitude)
        //根据经纬度获取所在城市
        qqmapsdk.reverseGeocoder({
          location: { latitude: latitude, longitude: longitude },
          success: function (res) {
            //address 城市
            that.setData({ address: res.result.address_component.city })
            wx.showToast({
              title: `当前位置： ` + that.data.address,
              icon: 'none'
            });
          }
        });
      }
    })
  }
})