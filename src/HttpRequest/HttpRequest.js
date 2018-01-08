import axios from 'axios';
class HttpRequest {
  static webRequest = function (method='post',url,data,withCredentials = true,){
    return axios({
      method: method,
      url: url,
      data: data,
      withCredentials:withCredentials
    })
  }
}
export default HttpRequest;
