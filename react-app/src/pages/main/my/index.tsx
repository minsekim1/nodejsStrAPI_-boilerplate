import _ from 'lodash';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import User from '../../../components/templates/user/User';
import { getUserDataQuery } from '../../../utils/apollo/useUserQuery';

// import Alarm from '../../components/templates/options/Alarm';
export default function Page() {
  const router = useRouter();
  const userData = getUserDataQuery();
  useEffect(() => {
    const userCheck = () => {
      if (!userData.loading && !userData.data) {
        alert('탈퇴한 회원입니다.');
        router.push('/auth');
      }
    };
    const tokenCheck = async () => {
      const token = await localStorage.getItem('recoil/cache/token');
      if (!token) router.replace(`/auth`);
    };
    userCheck();
    tokenCheck();
  }, [router]);
  if (!userData || !userData.data) return <></>;
  return <User userData={userData} />;
}
