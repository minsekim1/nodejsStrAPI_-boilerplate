import useSWR, { mutate } from 'swr';
import { API_URL, API_URL_M, postFetch } from './../api/config';
import createCache from '@emotion/cache';
import { useEffect, useState } from 'react';

export const SERVER_URL = 'https://dongwon.circlin.co.kr:446';
export function createEmotionCache() {
  return createCache({ key: 'css' });
}

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

// 이메일 체크 정규식
export function isEmail(asValue: string | null) {
  if (typeof asValue !== 'string') return false;
  var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}
// 핸드폰 번호 체크 정규식

export function isCelluar(asValue: string | null) {
  if (typeof asValue !== 'string') return false;
  var regExp = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
  return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}

//비밀번호 체크 정규식
export function isPassword(asValue: string | null) {
  if (typeof asValue !== 'string') return false;
  var regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d$!@#$%^&*()]{6,}$/; //  6 ~ 20자 영문, 숫자 조합
  return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}
export function isPhone(asValue: string | null) {
  if (typeof asValue !== 'string') return false;
  var regExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}
export function isNumber(asValue: string | null) {
  if (typeof asValue !== 'string') return false;
  var regExp = /\d{6}/;
  return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}

//숫자 3자리마다 콤마
export const comma = (num: any) => {
  var len, point, str;
  num = num + '';
  point = num.length % 3;
  len = num.length;
  str = num.substring(0, point);
  while (point < len) {
    if (str != '') str += ',';
    str += num.substring(point, point + 3);
    point += 3;
  }
  return str;
};

export function formatDate(str: string | null) {
  if (!str) return null;
  const date = new Date(str);
  let day = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()] + '요일';
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export function formatDateTime(str: string | null) {
  if (!str) return null;
  const date = new Date(str);
  let day = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()] + '요일';
  return `${date.getHours()}시 ${date.getMinutes()}분`;
}

export function formatDateFull(str: string | null) {
  if (!str) return null;
  const date = new Date(str);
  let day = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()] + '요일';
  return ` ${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
}

export function displayedAt(createdTime: number) {
  const milliSeconds = new Date().getTime() - createdTime;
  const seconds = milliSeconds / 1000;
  if (seconds < 60) return `방금 전`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;
  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}주 전`;
  const months = days / 30;
  if (months < 12) return `${Math.floor(months)}개월 전`;
  const years = days / 365;
  return `${Math.floor(years)}년 전`;
}

export function getDDay(date: string, go?: boolean) {
  const [day, setDay] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const doThing = (date: string) => {
    setInterval(() => {
      setDays(date);
    }, 1000);
  };
  const setDays = (date: string) => {
    // D-Day 날짜 지정
    const setDate = new Date(date);
    // D-day 날짜의 연,월,일 구하기
    const setDateYear = setDate.getFullYear();
    // getMonth 메서드는 0부터 세기 때문에 +1 해준다.
    const setDateMonth = setDate.getMonth() + 1;
    const setDateDay = setDate.getDate();

    // 현재 날짜를 new 연산자를 사용해서 Date 객체를 생성
    const now = new Date();

    // D-Day 날짜에서 현재 날짜의 차이를 getTime 메서드를 사용해서 밀리초의 값으로 가져온다.
    const distance = setDate.getTime() - now.getTime();

    // Math.floor 함수를 이용해서 근접한 정수값을 가져온다.
    // 밀리초 값이기 때문에 1000을 곱한다.
    // 1000*60 => 60초(1분)*60 => 60분(1시간)*24 = 24시간(하루)
    // 나머지 연산자(%)를 이용해서 시/분/초를 구한다.
    setDay(Math.floor(distance / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
  };
  // D-Day 날짜를 가져오고,
  // 삼항 연산자를 사용해서 값이 10보다 작을 경우에 대해 조건부 렌더링을 해준다.
  useEffect(() => {
    if (go) doThing(date);
  }, [date]);
  return { day, hours, minutes, seconds };
}
// export const init = (date: string) => {
//   // init 함수 생성해서 getDDay함수 호출하고,
//   getDDay(date);
//   // setInterval 메서드에서 getDDay함수를 1초(1000밀리초)마다 호출한다.
//   setInterval(getDDay, 1000);
// };
const options = {
  refreshInterval: 0,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useCustomSWR(apiUrl: string | null, name: string, isNodeJS?: boolean) {
  const url = apiUrl === null ? null : isNodeJS !== true ? `${API_URL}${apiUrl}` : `${API_URL_M}${apiUrl}`;

  const { data, error, isValidating, mutate } = useSWR(url, fetcher, options);
  console.log(data);

  function returnStates(data: any, error: any, mutate: any, isValidating: any) {
    return {
      [`${name}`]: {
        data: data,
        loading: !error && !data,
        error: error,
        mutate: mutate,
        isValidating: isValidating,
      },
    };
  }
  return returnStates(data, error, mutate, isValidating);
}

export const waterMissionId = 19;

type FCMProps = {
  platform: 'ios' | 'android';
  deviceToken: string;
  title: string;
  image: string | null;
  message: string;
  click_action_json: string;
};
export const sendFCMPushNotification = ({ platform, deviceToken, title, image, message, click_action_json }: FCMProps) => {
  // 내부로 이동할때
  // click_action_json => JSON.stringify({url:"/auth", mission_id:0})
  // 외부로 보낼때(https, http가 있으면 외부로감)
  // click_action_json => JSON.stringify({url:"https://www.naver.com/", mission_id:0})
  // mission_id는 없으면 0으로 보내기.(실제 url 외에 쓸모없음)
  const data = { platform, deviceToken, title, image, message, click_action_json };
  postFetch('/fcm', data, true).then((d) => console.log(d));
};

export const onNotiPush = async (func: any) => {
  func();
};
