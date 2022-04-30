import { useEffect } from "react";
import { API_URL } from "../util/fetch";
import { sendMessage } from "../util/sendMessage";

export default function useSNSLogin() {
  const loginKakao = () => sendMessage({ name: "loginKakao", body: "" });
  const loginApple = () => sendMessage({ name: "loginApple", body: "" });
  const loginNaver = () => sendMessage({ name: "loginNaver", body: "" });

  useEffect(() => {
    const w: any = window;
    w.addEventListener("loginKakao", (d: any) => kakaoLoginAndSign(d, "android"));
    w.addEventListener("loginNaver", (d: any) => naverLoginAndSign(d, "android"));
    w.loginKakaoIOS = (d: any) => kakaoLoginAndSign(d, "ios");
    w.loginAppleIOS = loginAppleLoginAndSign;
    return () => {
      w.removeEventListener("loginKakao", (d: any) => kakaoLoginAndSign(d, "android"));
      w.removeEventListener("loginNaver", (d: any) => naverLoginAndSign(d, "android"));
    };
  }, []);
  return { loginKakao, loginApple, loginNaver };
}

// 애플로그인시 identifier 파싱함수
const loginAppleLoginAndSign = (data: any) => {
  data = JSON.parse(data);
  const userIdentifier: string = data.userIdentifier; //000731.aa.0821 이런식
  //로그인 시도 실패하면 회원가입 패널 띄우기.
  login(userIdentifier + "@A");
  alert(userIdentifier);
};

// 카카오로그인시 이메일 파싱함수
const kakaoLoginAndSign = (d: any, platform: "android" | "ios") => {
  let params;
  if (platform === "android") {
    if (!d || !d.detail || !d.detail.id) return;
    // param :: fetch 할때 id랑 token_type 은 빼도 됌
    params = {
      id: d.detail.id,
      expiresAt: d.detail.expiresAt,
      access_token: d.detail.accessToken,
      refresh_token: d.detail.refreshToken,
      token_type: null,
      refresh_token_expires_in: d.refreshTokenExpiresAt,
      expires_in: d.accessTokenExpiresAt,
    };
  } else {
    const token_data = d.slice(d.indexOf("accessToken:"), d.indexOf("scope:")).split(":");
    params = {
      id: d.slice(d.indexOf("id:Optional(") + 12, d.indexOf(")email:")),
      email: d.slice(d.indexOf(")email:Optional(") + 18, d.indexOf('")"') - 1),
      access_token: token_data[1].slice(2, token_data[1].indexOf('", expire')),
      expires_in: token_data[2].split(".")[0],
      refresh_token: token_data[6].slice(2, token_data[6].indexOf('", refresh')),
      refresh_token_expires_in: token_data[7].split(".")[0],
    };
  }
  //로그인 시도 실패하면 회원가입 패널 띄우기.
  login(params.id + "@K");
  alert(JSON.stringify(params));
};
// 네이버로그인시 이메일 파싱함수
const naverLoginAndSign = (d: any, platform: "android" | "ios") => {
  let params;
  if (platform === "android") {
    if (!d || !d.detail) return;
    // param :: fetch 할때 id랑 token_type 은 빼도 됌
    params = {
      id: d.detail.response.id,
      expiresAt: d.detail.expiresAt,
      access_token: d.detail.accessToken,
      refresh_token: d.detail.refreshToken,
      token_type: d.detail.tokenType, //'bearer'
      email: d.detail.response.email,
      refresh_token_expires_in: null,
      expires_in: null,
    };
  } else {
    const token_data = d.slice(d.indexOf("accessToken:"), d.indexOf("scope:")).split(":");
    params = {
      id: d.slice(d.indexOf("id:Optional(") + 12, d.indexOf(")email:")),
      email: d.slice(d.indexOf(")email:Optional(") + 18, d.indexOf('")"') - 1),
      access_token: token_data[1].slice(2, token_data[1].indexOf('", expire')),
      expires_in: token_data[2].split(".")[0],
      refresh_token: token_data[6].slice(2, token_data[6].indexOf('", refresh')),
      refresh_token_expires_in: token_data[7].split(".")[0],
    };
  }
  alert(JSON.stringify(params));
  //로그인 시도 실패하면 회원가입 패널 띄우기.
  login(params.id + "@N");
  // window.location.href = "http://172.30.1.43:3000";
};

//#region login 공용 로그인함수
const login = (email: string) => {
  fetch(`${API_URL}/auth/login/sns`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  })
    .then((response) => response.json())
    .then((d: any) => {
      if (d.success && d.data.result && d.data && d.data.token) {
        alert("로그인 가능 ^^" + JSON.stringify(d)); //d.data에 모든 유저데이터 들어옴.
        const jwt_token = d.data.token; //<- 이걸로 API 호출하십쇼
        alert(jwt_token);
      } else {
        alert("회원가입 먼저 하시오~");
        //rotuer.push 받던지 or
        //권장 window 사용. => router 쓰면 훅 들어가서 함수 자체 독립성 저해.
        window.location.href = "http://172.30.1.43:3000";
      }
    });
};
//#endregion
