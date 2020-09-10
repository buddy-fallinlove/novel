const { default: api } = require("../../http/api")

// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotWords:[],
    newhotWord: [],
    value:'',
    books:[],
    flag:0,
    app:[],
    list:[],
    id:''
  },
  // 跳转到详情页
  details(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  },
    // 刷新换一换
    gethotWord(){
      wx.showLoading({
        title: '加载中。。。',
      })
      // 请求搜索热词
      api.hotWord().then(res =>{
        let arr = []
        // 取随机颜色 用于搜索热词的随机背景颜色
        res.newHotWords.map(item => {
          console.log(res)
          // console.log(res)
            let obj = {}
            let r = Math.floor(Math.random() * 256);
            let g = Math.floor(Math.random() * 256);
            let b = Math.floor(Math.random() * 256);
            let color = "rgb(" + r + ',' + g + ',' + b + ")";
            obj.color = color
            obj.title = item
            arr.push(obj)
        })
        // 把经过加功的整个arr在赋值给了发请求拿到的这两个数组 两个都一样都有想要的数据
        this.setData({
            hotWords: arr,
            newhotWord: arr
        })
        console.log(this.data.hotWords)
        // console.log(this.data.newhotWord)
        // 随机搜索热词 让搜索热词随机显示个数
        let index = 0
        index = Math.floor(Math.random() * (this.data.hotWords.length));
        this.setData({
            hotWords: this.data.newhotWord.slice(index),
        })
        this.data.hotWords.map(item => {
            let r = Math.floor(Math.random() * 256);
            let g = Math.floor(Math.random() * 256);
            let b = Math.floor(Math.random() * 256);
            let color = "rgb(" + r + ',' + g + ',' + b + ")";
            item.color = color
        })
        wx.hideLoading()
        // console.log(this.data.hotWords)
      })
    },
    
  // help(){
  //   this.data.newhotWord.map(item=>{
  //     this.setData({
  //       id:item.book
  //     })
  //   })
  //   wx.navigateTo({
  //     url: `/pages/details/details?id=${this.data.id}`,
  //   })
  //   console.log(this.data.newhotWord)
  // },
   //搜索热词,随机色
  //  gethotWord(){
  //   wx.showLoading({
  //     title: '加载中...',
  //   })
  //     api.hotWord().then(res=>{
  //       console.log(res)
  //       wx.hideLoading()
  //       let arr = []
  //       res.hotWords.map(item => {
  //         let obj = {}
  //         let r = Math.floor(Math.random() * 256);
  //         let g = Math.floor(Math.random() * 256);
  //         let b = Math.floor(Math.random() * 256);
  //         let color = "rgb(" + r + ',' + g + ',' + b + ")";
  //         obj.color = color
  //         obj.title = item
  //         arr.push(obj)
  //       })
  //       this.setData({
  //         hotWords: arr,
  //         newhotWord: res.newHotWords
  //       }) 
  //       console.log(this.data.newhotWord)
        
  //     }).catch(err=>{})
  //  },
   //随机数
  // change() {
  //   let index = 0
  //   index = Math.floor(Math.random() * (this.data.hotWords.length));
  //   this.setData({
  //     hotWords: this.data.newhotWord.slice(index),
  //   })
  //   this.data.hotWords.map(item => {
  //     let r = Math.floor(Math.random() * 256);
  //     let g = Math.floor(Math.random() * 256);
  //     let b = Math.floor(Math.random() * 256);
  //     let color = "rgb(" + r + ',' + g + ',' + b + ")";
  //     item.color = color
  //   })
  // },

  // value等于空的时候回到搜索换一换页面
  onsearch(e){
    // console.log(e)
    if(e.detail.value === ''){
      this.setData({
        flag:0
      })
    }
  },
  // 跳转搜索数据页面
  shoushuo(e){
    console.log(e)
    this.setData({
      value:e.currentTarget.dataset.item
    })
    api.bookSearch(this.data.value).then(res=>{
      wx.hideLoading()//数据出来了就不再加载
      res.books.map(item=>{
        item.cover = 'https://statics.zhuishushenqi.com' + item.cover
      })
      this.setData({
        books:res.books,
        flag:1
      })
      console.log(res)
    }).catch(err=>{})
  },
  // 书籍搜索 (分类，书名，作者名)
  search(e){
    console.log(e.detail.value)
    this.setData({
      value:e.detail.value
    })
    wx.showLoading({
      title: '加载中...',
    })
    api.bookSearch(this.data.value).then(res=>{
      wx.hideLoading()//数据出来了就不再加载
      res.books.map(item=>{
        item.cover = 'https://statics.zhuishushenqi.com' + item.cover
      })
      this.setData({
        books:res.books,
        flag:1
      })
        // 历史记录
        this.data.list.push(e.detail.value)
        this.setData({
          list:this.data.list
        })
      console.log(res)
    }).catch(err=>{})
  },
  // 清空搜索历史记录
  qingkong(){
    this.setData({
      list:0
    })
    // wx.showModal({
    //   title:"确认是否删除"
    // })
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
   this.gethotWord()
  
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