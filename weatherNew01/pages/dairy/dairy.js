// pages/dairy/dairy.js
Page({
    data: {
      date: "",
      info:"",
      value:"",
      address:"",
      histories:[],
      tempFilePaths:'',
      tempVideoPaths:'',
      color:''
    },
    onLoad: function(options) {
      console.log(options.index)
      this.setData({
        date:options.date,
        info: options.info,
        value:options.value,
        address:options.address,
        index:options.index,
        tempFilePaths: options.tempFilePaths,
        tempVideoPaths:options.tempVideoPaths,
        color:options.color
      })
  },
  onReady: function () {
    this.setData({
      value: this.data.value
    })
  },
  bindViewTap: function (e) {
    wx.navigateBack({
      url: '../logs/logs'
    })
  },
  onShow: function() {
    var that = this;
    wx.getStorage({
      key: 'value',
      success: function(res) { 
        that.setData({
          histories: res.data
        })
      }
    })
  }

})