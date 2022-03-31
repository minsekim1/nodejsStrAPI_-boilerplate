import _ from 'lodash';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import Info from '../../../components/templates/options/info/Info';
import { getUserDataQuery } from '../../../utils/apollo/useUserQuery';
export default function Page() {
  const router = useRouter();
  const userData = getUserDataQuery();
  useEffect(() => {
    // 비로그인일시 되돌려보냄
    if (!userData || !userData.data) {
      router.replace('/auth');
    } else {
    }
  }, [user]);
  if (user.id === null) return <></>;
  return <Info />;
}
