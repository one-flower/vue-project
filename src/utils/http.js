import axios from 'axios'
import api from '../api'
import { Message } from 'element-ui';
import router from '@router'

//axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

export default async (fun, { requestType, err, ...data } = {}) => {

  const method = requestType ? requestType : 'post';

  const url = api[fun] == undefined ? fun : api[fun];

  const config = {
    method,
    url,
  };

  //把空属性去掉。
  Object.keys(data).forEach(key => {
    if (data[key] === undefined || data[key] === '') {
      delete data[key];
    } else {
      let v = data[key];
      if (typeof (v) == 'string') {
        data[key] = v.trim();
      }
    }
  });

  if (method == 'get') {
    config['params'] = data;
  } else {
    config['data'] = data;
  }

  try {

    let res = await axios(config);

    return new Promise((resolve) => {

      if (res.data.errcode === 1001) {
        router.push({
          name: 'login',
        });
      } else if (res.data.errcode == 0) {
        resolve(res.data.data)
      } else {
        if (err) {
          err(res.data)
          //resolve(res.data)
        } else {
          if (res.data.errcode == 1002) {
            Message({
              message: '请点击右上角 "退出" 按钮后重新登录',
              type: 'error',
              duration: 5 * 1000
            })
          } else {
            Message({
              message: res.data.errmsg,
              type: 'error',
              duration: 5 * 1000
            })
          }
        }
      }
    })
  } catch (err) {
    console.log('异常');
    console.log(err);
    // router.push({ 
    // 	name: 'login', 
    // });
  }

}
