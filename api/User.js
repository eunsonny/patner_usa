import callApi from '../helpers/callApi';

export default {
  getUserInfo(data) {
    return callApi({
      method: 'get',
      url: '/api/getUserInfo',
      params: data
    })
  }
}