import { useRouter } from 'next/router';
import { useEffect } from 'react';

// 리코일의 로딩 관리. <Suspense/> 대신.
// https://blog.woolta.com/categories/1/posts/209
// state : 비동기 상태를 나타내며 hasValue(값이 존재하는 상태), loading(로딩중), hasError(에러발생) 3가지 상태가 존재합니다.
// if(user.state === 'hasError' )
// contents : 비동기 통신의 결과값입니다.
// const user = useRecoilValueLoadable(userState);

export default function App() {
  const router = useRouter();

  useEffect(() => {
    const tokenCheck = async () => {
      const token = await localStorage.getItem('recoil/cache/token');
      if (!token) router.replace(`/auth`);
      else router.replace(`/main/home`);
    };
    tokenCheck();
  }, []);
  return null;
}
