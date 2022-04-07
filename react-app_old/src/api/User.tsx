import { API_URL, postFetch } from './config';

export const createUser = (email: string, password: string, nickname: string) => {
  return new Promise((resolve) => {
    postFetch('/users', { email: email, username: email, password: password, nickname: nickname }).then((d) => resolve(d));
  });
};
export const loginUser = (email: string, password: string) => {
  /**
   identifier는 이메일과 같습니다.
   jwt토큰과 반환값은 유저입니다.
   {
	"jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjQ2MTM2MTkwLCJleHAiOjE2NDg3MjgxOTB9.vpWOeVnhR9LmhGjKKWRCgSCdudZ5DRLMZHTg3WgHC10",
	"user": {
		agree_push: null
		blocked: false
		confirmed: false
		createdAt: "2022-03-26T09:07:33.324Z"
		device_token: null
		device_type: null
		email: "tkarnrwl7862@naver.com"
		greeting: null
		id: 1
		nickname: null
		provider: "local"
		updatedAt: "2022-03-26T13:46:50.651Z"
		username: "tkarnrwl7862@naver.com"

	}
}
   */
  return new Promise((resolve) => {
    postFetch('/auth/local', { identifier: email, password: password }).then((d) => {
      resolve(d);
    });
  });
};
