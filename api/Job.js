import callApi from '../helpers/callApi';

export default {
  getJobs() {
    return callApi({
      url: '/jobs.json',
      method: 'get',
    })
  }
}