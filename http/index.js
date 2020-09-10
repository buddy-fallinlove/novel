const Fly = require("../lib/fly/wx")
const fly = new Fly()
// 配置基础路径
fly.config.baseURL = 'https://api.zhuishushenqi.com'

// 响应拦截器
fly.interceptors.response.use((response) =>{
  // 只将请求结果的data字段返回
  return response.data
})
module.exports = fly