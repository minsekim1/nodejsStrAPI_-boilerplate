import { isAndroid, isIOS } from 'react-device-detect';
import { putFetch } from '../api/config';
import { UserProps } from '../types';

//#region sendMessage Defalut
// 안드로이드 웹뷰 관련
// export type AndroidMsgTitleProps =
//   | 'rotateHorizontal'
//   | 'rotateVertical'
//   | 'backAble'
//   | 'backEnable'
//   | 'rotateAble'
//   | 'rotateEnable'
//   | 'finish'
//   | 'linking'
//   | 'inChat'
//   | 'outChat'
//   | 'loginKakao'
//   | 'deviceTokenUpdateToServer'
//   | 'getNotiData'
//   | 'isWifi'
//   | 'setMessageRoomId'
//   | 'downloadFile'
//   | 'loginApple';
export type AndroidMsgTitleProps =
  | 'deviceTokenUpdateToServer'
  | 'downloadFile'
  | 'linking'
  | 'backAble'
  | 'backEnable'
  | 'finish'
  | 'getNotiData';
export type MessageProps = {
  name: AndroidMsgTitleProps;
  body: string;
};
export const sendMessage = (message: MessageProps) => {
  const m = JSON.stringify({ name: message.name, body: message.body });
  if (isAndroid) AndroidSendMessage(m);
  else if (isIOS) window.webkit?.messageHandlers[message.name].postMessage(message.body); //LOCAL
};

export type AndroidProps = {
  postMessage: (m: string) => {}; //android 웹뷰 명령 보내기
} | null;
export const AndroidSendMessage = (m: string) => {
  const Window: any = window;
  if (typeof Window !== 'undefined') {
    const android: AndroidProps = Window.Android;
    if (android) {
      android.postMessage(m);
      // 아래두줄 테스트 끝나면 지우기 안드로이드 LOGCAT 전용
      // const m_log = JSON.stringify({ name: 'log', body: m });
      // android.postMessage(m_log);
    }
  }
};
//#endregion

//#region Native Functions
export const deviceTokenUpdateToServer = async (deviceToken: any, platform: 'ios' | 'android') => {
  //string | {token:string}
  const parsedToken = isIOS ? deviceToken.slice(deviceToken.indexOf('Optional(') + 10, deviceToken.length - 2) : deviceToken.detail.token;

  const user = await localStorage.getItem('cache/user');

  if (user) {
    const userParsed: any = JSON.parse(user);
    putFetch(`/users/${userParsed.id}`, {
      device_type: platform,
      device_token: parsedToken,
    });
  }

  // setDeviceToken(parsedToken);
};
//#endregion

export const getAndroidPushMessage = async (data: any, func: any) => {
  //string | {token:string}
  const notificationId: string = data.detail.notificationId; //숫자로옴
  const { url, mission_id } = JSON.parse(data.detail.clickActionJson);
  // InApp이면 router.push 아니면 window.open
  // const isInApp = url && typeof url === 'string' && !url.includes('https://');
  if (url) func(url);
};

export const getiOSPushMessage = async (data: any, func: any) => {
  //string | {token:string}
  if (data === '') return;
  window.webkit?.messageHandlers['resetNotiData'].postMessage('');
  const parsedData = JSON.parse(data);
  //{"type":"Option(message)","id":"Option(2051)"}
  const type = parsedData.type.split('(')[1].slice(0, parsedData.type.split('(')[1].length - 1);
  const id = parsedData.id.split('(')[1].slice(0, parsedData.id.split('(')[1].length - 1);
  func(id, true);
};
