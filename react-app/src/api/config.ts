export const API_URL = `http://localhost:1337/api`;
export const API_URL_Image = `http://localhost:1337`;
export const API_URL_NODEJS = `https://nodejs.circlinplus.co.kr:444`;
export const API_URL_M =
  typeof window != 'undefined' && !window.location.hostname.includes('localhost')
    ? 'https://dongwon.circlin.co.kr:447/api'
    : 'http://localhost:1337/api';

/**
 * 자주쓰는 fetch Method : 'GET' 를 줄여쓰기위해 쓰는 함수입니다.
 */
export const getFetch = (url: string) => {
  return new Promise((resolve) => {
    fetch(`${API_URL}${url}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((d) => d.json())
      .then((d) => {
        resolve(d);
      })
      .catch((e) => {
        alert('getFetch error' + url + ' ' + e.message);
      });
  });
};

/**
 * 자주쓰는 fetch Method : 'POST' 를 줄여쓰기위해 쓰는 함수입니다.
 * unstringify_data에는 {username:"홍길동", password:"압구정"} 처럼 원형으로 넣어주세요.
 */
type UrlProps =
  | '/users'
  | '/auth/local'
  | '/water-logs'
  | '/comments'
  | '/follow'
  | '/feeds'
  | '/mission/enter'
  | '/logs'
  | '/certs'
  | '/fcm'
  | '/monthly-comments';

export const postFetch = (url: UrlProps, unstringify_data: any, isNodeJS?: boolean) => {
  return new Promise((resolve) => {
    fetch(isNodeJS !== true ? `${API_URL}${url}` : `${API_URL_M}${url}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(unstringify_data),
    })
      .then((d) => d.json())
      .then((d) => resolve(d))
      .catch((e) => {
        alert('postFetch error' + url + ' ' + e.message);
      });
  });
};

// 데이터를 수정할떄 씁니다.
export const putFetch = (url: string, unstringify_data: any) => {
  return new Promise((resolve) => {
    fetch(`${API_URL}${url}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(unstringify_data),
    })
      .then((d) => d.json())
      .then((d) => resolve(d))
      .catch((e) => {
        alert('putFetch error' + url + ' ' + e.message);
      });
  });
};
