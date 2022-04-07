// 이메일 체크 정규식
export function isEmail(asValue: string | null) {
  if (typeof asValue !== "string") return false;
  var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}

// 핸드폰 번호 체크 정규식
export function isCelluar(asValue: string | null) {
  if (typeof asValue !== "string") return false;
  var regExp = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
  return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}

//비밀번호 체크 정규식
export function isPassword(asValue: string | null) {
  if (typeof asValue !== "string") return false;
  var regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d$!@#$%^&*()]{6,}$/; //  6 ~ 20자 영문, 숫자 조합
  return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}

export function isPhone(asValue: string | null) {
  if (typeof asValue !== "string") return false;
  var regExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}
export function isNumber(asValue: string | null) {
  if (typeof asValue !== "string") return false;
  var regExp = /\d{6}/;
  return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}
