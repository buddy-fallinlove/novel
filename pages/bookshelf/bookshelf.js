// pages/bookshelf/bookshelf.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [],
    flag: 0,
    id:''
  },
  // 点击是否删除
  xx(e){
    // let id = this.data.arr.id
    // this.setData({
    //   id:this.data.arr.id
    // })
    // wx.removeStorageSync('id')
    // console.log(this.data.arr)
    console.log(e)
    let index = e.currentTarget.dataset.index
    let ars = this.data.arr
    ars.splice(index,1)
    wx.setStorageSync('lol',ars)
    
   let app = wx.getStorageSync('lol')
   this.setData({
     arr:app
   })
  },
  // 点击事件显示与隐藏
  gou() {
    if (this.data.flag === 0) {
      this.setData({
        flag: 1
      })
    } else {
      this.setData({
        flag: 0
      })
    }
  },
  // 跳转到帮助页面
  goto() {
    wx.navigateTo({
      url: '/pages/help/help',
    })
  },
  // 跳转详情页
  date(e) {
    console.log(e)
    let id = e.currentTarget.dataset.item.id
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    // 取加入书架的数据
    let arr = wx.getStorageSync('lol')
    this.setData({
      arr:arr
    })
   console.log(arr)
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