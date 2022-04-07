import _ from 'lodash';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import Profile from '../../components/templates/options/Profile';
import { getUserDataQuery } from '../../utils/apollo/useUserQuery';
export default function Page() {
  const router = useRouter();
  const userData = getUserDataQuery();
  useEffect(() => {
    // 비로그인일시 되돌려보냄
    if (!userData.loading && !userData.data) {
      router.replace('/auth');
    }
  }, []);
  if (!userData || !userData.data) return <></>;

  return <Profile userData={userData.data} refetch={userData.refetch} />;
}
