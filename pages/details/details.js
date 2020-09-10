const { default: api } = require("../../http/api")

// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    flag:true,
    value:'',
    id:'',
   obj:{},
   app:[],
   books:[],
   docs:[],
   lol:[],
   bookshelf:[],
   fleg:0
  },
    // 开始阅读跳转路由
    yuedu(e){
      // console.log(e)
      this.setData({
        _id:this.data.obj._id,
        title:this.data.obj.title
      })
      wx.navigateTo({
        url: `/pages/read/read?_id=${this.data._id}&title=${this.data.title}`,
      })
    },
      // 加入书架点击事件
      shujia(){
        // 给flag赋值
        this.setData({
          fleg:1
        })
        let lol = this.data.bookshelf
        let obj = {}
        // console.log(this.data.obj)
        obj.cover = this.data.obj.cover
        obj.title = this.data.obj.title
        obj.id = this.data.obj._id
        lol.push(obj)
        // 去重
        let hash = {}
        lol = lol.reduce((item, next) => {
          hash[next.title] ? '' : hash[next.title] = true && item.push(next)
          return item
        }, [])
        wx.setStorageSync('lol',lol)
        console.log(lol)
      },

  // 详情赋值操作
  xiangqing(){
    this.data.index = 0
    this.data.flag = true
    this.setData({
      index:this.data.index,
      flag:this.data.flag
    })
  },
  // 评价赋值操作
  pingjia(){
    this.data.index = 1
    this.data.flag = false
    this.setData({
      index:this.data.index,
      flag:this.data.flag
    })
  },
   // 短评
   shortReviews(){
    api.shortReviews(this.data.id).then(res=>{
      res.docs.map(item=>{
        item.author.avatar = `https://statics.zhuishushenqi.com` +  item.author.avatar
      })
      this.setData({
        docs:res.docs
      })
      console.log(res)
    }).catch(err=>{})
   },
   // 书籍详情
  bookInfos(){
    api.bookInfo(this.data.id).then(res=>{
      res.cover = 'https://statics.zhuishushenqi.com' + res.cover
      this.setData({
        obj:res,
        cover:res.cover,
        value:res.rating.score,
      })
      // 判断是否已加入书架
    let add = wx.getStorageSync('lol')
    if(add){
      let index = add.findIndex(item=>{
        return item.title === this.data.obj.title
      }) 
      if(index < 0){
        this.setData({
          lol:add,
          fleg:0
        })
      }else{
        this.setData({
          lol:add,
          fleg:1
        })
      }
    }
      console.log(this.data.obj)
    }).catch(err=>{})
  },
  // 相关推荐
    getadd(){
      api.relatedRecommendedBooks(this.data.id).then(res=>{
        res.books.map(item=>{
          item.cover = `https://statics.zhuishushenqi.com` + item.cover
        })
        let index = Math.floor(Math.random() * (res.books.length - 2))
        this.setData({
          books:res.books.slice(index,index + 3),
          app:res.books
        })
        console.log(res)
      }).catch(err=>{})
    },
    // 相关推荐刷新换一换
    shuaxin(){
      let index = Math.floor(Math.random() * (this.data.app.length - 2))
      this.setData({
        books:this.data.app.slice(index,index + 3)
      })
    },
    // 换一换跳转详情
    tiao(e){
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
    // 取数据再给它赋值
    let lol = wx.getStorageSync('lol')
    if(lol){
      this.setData({
        bookshelf:lol
      })
    }
    console.log(options)
    this.setData({
      id:options.id
    })
    this.bookInfos()
    this.getadd()
    this.shortReviews()
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