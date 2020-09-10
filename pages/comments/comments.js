const { default: api } = require("../../http/api")

// pages/comments/comments.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    flag:true,
    books:[]
  },
  // 周榜
  zhou(){
    this.data.index=0
    this.data.flag= true
    this.setData({
      flag:this.data.flag,
      index:this.data.index
    })
    this.rankInfo(this.data.id)
  },
  // 月榜
  yue(){
    this.data.index=1
    this.data.flag= false
    this.setData({
      flag:this.data.flag,
      index:this.data.index
    })
    this.rankInfo(this.data.monthRank)
  },
  // 总榜
  zong(){
    this.data.index=2
    this.data.flag= false
    this.setData({
      flag:this.data.flag,
      index:this.data.index
    })
    this.rankInfo(this.data.totalRank)
  },
  // 排名详情请求数据
  rankInfo(id){
    api.rankInfo(id).then(res=>{
     res.ranking.books.map(item=>{
        item.cover = 'https://statics.zhuishushenqi.com' + item.cover
      })
      this.setData({
        books:res.ranking.books
      })
      console.log(res)
    }).catch(err=>{})
  },
  // 跳转详情页
  xiangqing(e){
    console.log(e)
    let id = e.currentTarget.dataset.item._id
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.rankInfo(options.id)
    console.log(options)
    wx.setNavigationBarTitle({
      title: options.title,
    })
    this.setData({
      id:options.id,
      monthRank:options.monthRank,
      totalRank:options.totalRank
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