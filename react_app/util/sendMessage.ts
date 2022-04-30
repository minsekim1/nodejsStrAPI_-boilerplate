import { isAndroid, isIOS } from "react-device-detect";

// 안드로이드 웹뷰 관련
export type AndroidMsgTitleProps =
  | "rotateHorizontal"
  | "rotateVertical"
  | "backAble"
  | "backEnable"
  | "rotateAble"
  | "rotateEnable"
  | "finish"
  | "linking"
  | "inChat"
  | "outChat"
  | "loginKakao"
  | "deviceTokenUpdateToServer"
  | "getNotiData"
  | "isWifi"
  | "setMessageRoomId"
  | "downloadFile"
  | "loginApple"
  | "loginNaver";

export type MessageProps = {
  name: AndroidMsgTitleProps;
  body: string;
};

export type AndroidProps = {
  postMessage: (m: string) => {}; //android 웹뷰 명령 보내기
} | null;

//#region 푸쉬알림 react 로 전달하는 값 Type
export type androidPushEventType = {
  detail: {
    body: string; //알림텍스트 '2222',
    bodyArgs: null;
    bodyKey: null;
    notiCount: null;
    channelId: string | null; //(선택사항)안드로이드 알림채널 'alramChanl',
    clickAction: string | null;
    color: string | null;
    defaultSound: boolean; // 기본값: false,
    sound: "default";
    defaultVibrate: boolean; // 기본값: false,
    vibrateTiming: string | null;
    eventTime: string | null;
    image: string; //이미지 'https://picsum.photos/300/200',
    icon: string | null;
    link: string | null;
    tag: string; //키 'campaign_collapse_key_5276666435532768608',
    title: string; //알림제목 '1111',
  };
};
//#endregion
const AndroidSendMessage = (m: string) => {
  if (typeof window !== "undefined") {
    const w: any = window;
    const android: AndroidProps = w.Android;
    if (android) {
      android.postMessage(m);
      // 아래두줄 테스트 끝나면 지우기 안드로이드 LOGCAT 전용
      // const m_log = JSON.stringify({ name: 'log', body: m });
      // android.postMessage(m_log);
    }
  }
};
export const sendMessage = (message: MessageProps) => {
  const m = JSON.stringify({ name: message.name, body: message.body });
  if (isAndroid) {
    AndroidSendMessage(m);
    // AndroidSendMessage(' dhideStatus');
  } else if (isIOS) {
    const w: any = window;
    w.webkit?.messageHandlers[message.name].postMessage(message.body); //LOCAL
  }
};
