import request from '@/utils/request'
const api_name = '/admin/edu/teacher' // 接口公共部分
const base_url = 'http://www.ketaieduadmin.com'

export default {
  // 获取讲师分页列表
  getPageList(page, pageSize, searchObj) {
    return request({
      url: `${api_name}/${page}/${pageSize}`,
      method: 'get',
      params: searchObj,
      baseURL: `${base_url}`
    })
  },
  deleteById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'delete',
      baseURL: `${base_url}`
    })
  }
}
