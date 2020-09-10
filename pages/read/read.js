const { default: api } = require("../../http/api")
var wxParse = require('../../lib/wxParse/wxParse.js')
// pages/read/read.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj:{}
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options._id)
    console.log(options.title)
     // 书籍章节 根据书源id
    api.bookChapters(options._id).then(res=>{
      // 章节内容
      api.chapterContent(res.chapters[0].link).then(res=>{
        this.setData({
          obj:res.chapter.body
        })
        let that=this;
        let body =res1.chapter.body
        let title =res1.chapter.title
        wxParse.wxParse('body', 'html', body, that, 5)
        wxParse . wxParse('title', 'html', title, that, 5)
 
        console.log(res)
      }).catch(err=>{})
      console.log(res)
    }).catch(err=>{})
    // 书名
    wx.setNavigationBarTitle({
      title: options.title,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})