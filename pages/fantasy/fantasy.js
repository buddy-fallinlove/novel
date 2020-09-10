const {
  default: api
} = require("../../http/api")

// pages/fantasy/fantasy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: [{
        id: 'hot',
        name: '热门'
      },
      {
        id: 'new',
        name: '新书'
      },
      {
        id: 'reputation',
        name: '好评'
      },
      {
        id: 'over',
        name: '完结'
      },
      {
        id: 'monthly',
        name: 'VIP'
      }
    ],
    index1: 0,
    major: '',//大类
    minor: '', //小类
    type: 'hot', //排行类型
    start: 0,
    bookList: [], //书籍列表
    tags: [], //文章的标签
    six:'',
    namet:0,
    name:0,
  },
  // 跳转到详情页
  getto(e){
    console.log(e)
    let id = e.currentTarget.dataset.item._id
    let title = e.currentTarget.dataset.item.title
    wx.navigateTo({
      url: `/pages/details/details?id=${id}&title=${title}`,
    })
  },
   //点击上面一排导航事件
   add(e) {
    console.log(e)
    this.setData({
      name: e.currentTarget.dataset.index,
      type: e.currentTarget.dataset.item.id
    })
    this.getCatsBooks()
  },
  //点击下面一排导航事件
  abb(e) {
    console.log(e)
    this.setData({
      namet: e.currentTarget.dataset.index,
    })
    if (this.data.namet === 0) {
      this.setData({
        minor: ''
      })
    } else {
      this.setData({
        minor: e.currentTarget.dataset.item
      })
    }
    this.getCatsBooks()
  },
  // 获取小分类
  getMinors(){
     // 判断从书城的男生一栏点击进来的
    // male的值为男生的
    if (this.data.six === "male") {
      api.getMinor().then(res => {
        res.male.map(item => {
          item.mins.unshift('全部')
        })
        this.setData({
          male: res.male.slice(this.data.index, this.data.index1)
        })
        console.log(res)
      }).catch(err => {})
    }
     // 判断从书城的女生一栏点击进来的
    // male的值为女生的
    if (this.data.six === "female") {
      api.getMinor().then(res => {
        res.female.map(item => {
          item.mins.unshift('全部')
        })
        this.setData({
          male: res.female.slice(this.data.index, this.data.index1)
        })
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
     // 判断从书城的出版一栏点击进来的
    // male的值为出版的
    if (this.data.six === "press") {
      api.getMinor().then(res => {
        res.press.map(item => {
          item.mins.unshift('全部')
        })
        this.setData({
          male: res.press.slice(this.data.index, this.data.index1)
        })
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  // 获取分类书籍
  getCatsBooks() {
    console.log(this.data.type)
    console.log(this.data.six)
    console.log(this.data.major)
    console.log(this.data.start)
    api.getCatsBooks(this.data.six, this.data.type, this.data.major, this.data.minor, this.data.start).then(res => {
      res.books.map(item => {
        item.cover = 'https://statics.zhuishushenqi.com' + item.cover
        item.tags = item.tags.slice(0, 3)
      })
      this.setData({
        bookList: res.books,
      })
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 接收参数
    console.log(options)
    wx.setNavigationBarTitle({
      title: options.name,
    })
    this.setData({
      six: options.six,
      index: options.index,
      index1: Number(options.index) + 1,
      major: options.name
    })
    this.getMinors()
    this.getCatsBooks()
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