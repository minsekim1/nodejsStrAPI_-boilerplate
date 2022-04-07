/**
 * 자주쓰는 fetch Method : 'GET' 를 줄여쓰기위해 쓰는 함수입니다.
 */
const API_URL = "http://localhost:1337/api";
export const getFetch = (url: string) => {
  return new Promise((resolve) => {
    fetch(`${API_URL}${url}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((d) => d.json())
      .then((d) => {
        resolve(d);
      })
      .catch((e) => {
        alert("getFetch error" + url + " " + e.message);
      });
  });
};

/**
 * 자주쓰는 fetch Method : 'POST' 를 줄여쓰기위해 쓰는 함수입니다.
 * unstringify_data에는 {username:"홍길동", password:"압구정"} 처럼 원형으로 넣어주세요.
 */
type UrlProps = "/users" | "/auth/local" | "/chats";
export const postFetch = (url: UrlProps, unstringify_data: any, isNodeJS?: boolean) => {
  return new Promise((resolve) => {
    fetch(`${API_URL}${url}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(unstringify_data),
    })
      .then((d) => d.json())
      .then((d) => resolve(d))
      .catch((e) => {
        alert("postFetch error" + url + " " + e.message);
      });
  });
};
