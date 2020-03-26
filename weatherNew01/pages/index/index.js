//index.js

var QQMapWX = require('../../qqmapsdk/qqmap-wx-jssdk.js');
var util = require('../../utils/util.js');
Page({
  data: {
    height: 20,
    focus: false,
    histories: [],
    tempFilePaths: '',
    tempVideoPaths: '',
    color:''
  },

  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'value',
      success: function (res) {
        that.setData({
          histories: res.data
        })
      }
    })
  },
  chooseimage: function (e) {
    var that = this;
    wx.showActionSheet({
      itemList: ['图片', '视频'],
      success: function (res) {
        if (res.tapIndex == 0) {
          wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
              that.setData({
                tempFilePaths: res.tempFilePaths,
                tempVideoPaths:''
              })
            }
          })
        } else {
            wx.chooseVideo({
              sourceType: ['album', 'camera'],
              maxDuration: 60,
              camera: 'back',
              success: function (res) {
                that.setData({
                  tempVideoPaths: res.tempFilePath,
                  tempFilePaths:''
                })
              }
            })
          }
        }
      })
  },
  bindFormSubmit: function (e) {
    var that = this;
    console.log(e.detail.value.textarea);
    var value = e.detail.value.textarea;
    var histories = that.data.histories;
    var tempFilePaths = that.data.tempFilePaths;
    var tempVideoPaths = that.data.tempVideoPaths;
    var date = that.data.date;
    var info = that.data.info;
    var address = that.data.address;
    var color = that.data.color;
    histories.push({
      date: date, info: info, value: value, address: address, tempFilePaths: tempFilePaths,tempVideoPaths:tempVideoPaths,color:color
    })
    wx.setStorage({
      key: "value",
      data: histories,
    })

  },
  chooseColor:function(e){
    var that = this;
      wx.showActionSheet({
        itemList: ['红','蓝','黑'],
        success:function(res){
          if(res.tapIndex == 0){
            that.setData({
              color:'red'
            })
          } else if (res.tapIndex == 1){
            that.setData({
              color: 'blue'
            })
          } else if (res.tapIndex == 2){
            that.setData({
              color: 'black'
            })
          }
        }
      })
  },
  onShow: function () {
    var DATE = util.formatDate(new Date());
    this.setData({
      date: DATE,
    });
    wx.setStorage({
      key: "DATE",
      data: DATE
    })
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'MTXBZ-J7KKU-6TTVA-BZBL3-52IAF-WSB26'
    });
    var that = this,
      qqmapsdk;

    wx.getLocation({ //获取当前地址
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            //address 城市
            that.setData({
              address: res.result.address_component.city
            })
            const str = that.data.address
            var jianchen = str.substring(0, str.length - 1)
            console.log(jianchen)
            console.log(that.data.address)
            wx.showToast({
              title: `当前位置： ` + that.data.address,
              icon: 'none'
            });
            wx.request({
              url: 'https://apis.juhe.cn/simpleWeather/query?key=66ba19d397e59b95e99f8822744e1611&city=' + jianchen,
              header: {
                'content-type': 'application/json' // 默认值
              },
              success(res) {
                console.log(res.data)
                that.setData({
                  info: res.data.result.realtime.info
                })
              }
            })
          }
        });
      }
    })
  },
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
    this.setData({
      concent: e.detail.value,
    })
  },
  //点击按钮时得到里面的值
  evaSubmit: function (e) {
    this.setData({
      focus: 'false',
      concent1: this.data.concent,
    })
    console.log(this.data.concent)
  }
})

