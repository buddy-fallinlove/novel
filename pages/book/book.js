// pages/book/book.js
// 请求要引api
import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      index: 0,
      flag:true,
      female:[],
      male:[],
      press:[],
      man:'男生',
      girl:'女生',
      publish:'出版',
      female1:[],
      male1:[],
  },
  // 分类赋值操作
  fenlei(){
    this.data.index=0
    this.data.flag= true
    this.setData({
      flag:this.data.flag,
      index:this.data.index
    })
  },
  // 排行赋值操作
  paihang(){
    this.data.index=1
    this.data.flag= false
    this.setData({
      flag:this.data.flag,
      index:this.data.index
    })
  },
  // 排名详情传id
  boy(e){
    console.log(e)
    let id = e.currentTarget.dataset.item._id
    let monthRank = e.currentTarget.dataset.item.monthRank
    let totalRank = e.currentTarget.dataset.item.totalRank
    let title = e.currentTarget.dataset.item.title
    wx:wx.navigateTo({
      url: `/pages/comments/comments?id=${id}&monthRank=${monthRank}&totalRank=${totalRank}&title=${title}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 分类数据请求接口
    // 获取大分类
    api.getCats().then(res =>{

      // console.log(res)
      this.setData({
        female:res.female,
        male:res.male,
        press:res.press
      })
    }).catch(err=>{})

    // 排名分类
    api.rankCategory().then(res=>{
      console.log(res)
      //静态资源地址拼接图片,女生
      res.female.map(item=>{
        item.cover = 'https://statics.zhuishushenqi.com' + item.cover
      })
       //静态资源地址拼接图片,男生
      res.male.map(item=>{
        item.cover = 'https://statics.zhuishushenqi.com' + item.cover
      })
      this.setData({
        // 女生只要6个
        female1:res.female.splice(0,6),
        // 男生也只要6个
        male1:res.male.splice(0,6),
      })
    }).catch(err=>{})
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