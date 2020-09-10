const fly = require('./index')

export default {
  //获取大分类
  getCats(){
    return fly.get(`/cats/lv2/statistics`)
  },
   //获取小类
   getMinor(){
     return fly.get(`/cats/lv2`)
   },
    //获取分类书籍  @param gender 性别排行（male）type 排行类型（hot）major 大类 minor 小类  start 分页开始 
    getCatsBooks (gender, type, major, minor, start) {
      if (minor) {
        return fly.get(`/book/by-categories?gender=${gender}&type=${type}&major=${major}&minor=${minor}&start=${start}&limit=20`)
      } else {
        return fly.get(`/book/by-categories?gender=${gender}&type=${type}&major=${major}&start=${start}&limit=20`)
      }
    },
    // 书籍详情
    bookInfo (id) { // @param book_id 书籍id
      return  fly.get(`/book/${id}`)
    },
    // 相关推荐
    relatedRecommendedBooks (id) { // @param book_id 书籍id
      return fly.get(`/book/${id}/recommend`)
    },
    // 作者名下的书籍
    authorBooks (author) {   // @param author 作者名
      return fly.get(`/book/accurate-search?author=${author}`)
    },
    // 书源  注意：第一个优质书源为收费源
    bookSources (book_id) {  // @param book_id 书籍id
      return  fly.get(`/atoc?view=summary&book=${book_id}`)
    },
     // 书籍章节 根据书源id
     bookChapters (id) {  // @param id 书源id
      return  fly.get(`/atoc/${id}?view=chapters`)
    },
     // 书籍章节 根据书id
     bookChaptersBookId (book_id) {
      return fly.get(`/mix-atoc/book_id=${book_id}?view=chapters`)
    },
     // 章节内容
     chapterContent (link) {  // @param link 章节link
      return fly.get(`https://chapter2.zhuishushenqi.com/chapter/${encodeURIComponent(link)}`)
    },
     //搜索热词
     hotWord(){
      return  fly.get(`/book/hot-word`)
     },
      // 书籍搜索 (分类，书名，作者名)
    bookSearch (content) { //@param content 搜索内容
      return fly.get(`/book/fuzzy-search?start=0&limit=50&v=1&query=${content}`)
    },
     // 排名分类
     rankCategory (){
       return fly.get(`/ranking/gender`)
     },
     // 排名详情
    rankInfo (id) { //@param rank_id 分类ID
      return fly.get(`/ranking/${id}`)
    },
     // 讨论
     discussions (book_id) {  // @param book_id 书籍id
      return fly.get(`/post/by-book?book=${book_id}`)
    },
    // 短评
    shortReviews (id) {  // @param book_id 书籍id    完整接口 ?book=5816b415b06d1d32157790b1&limit=20&total=true&start=0&sortType=hottest
      return fly.get(`/post/short-review?book=${id}&total=true&sortType=newest`)
    },
     //长评
     bookReviews (book_id) {  // @param book_id 书籍id
      return fly.get(`/post/review/by-book?book=${book_id}`)
    },
    lists (){
      return  fly.get(`/book-list`)
    },
    detail (id) {  // @param id 书单id
      return fly.get(`/book-list/${id}`)
    },
}