import _ from 'lodash';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { loaderState } from '../../../recoil/modal';
import { useCustomSWR } from '../../../utils';
import Donation from '../../../components/templates/user/donation/Donation';
import { getUserDataQuery } from '../../../utils/apollo/useUserQuery';
export default function Page() {
  const router = useRouter();
  const userId = typeof router.query.id === 'string' ? Number(router.query.id) : -1;
  const userData = getUserDataQuery();
  const { donationData } = useCustomSWR(`/logs?filters[user_id]=${userId}&filters[donation][$null]&populate=*`, 'donationData');
  const setLoader = useSetRecoilState(loaderState);
  const loading = userData.loading || donationData.loading;
  useEffect(() => {
    if (!loading)
      setLoader((prev) => {
        return { ...prev, open: false };
      });
  }, [loading]);
  useEffect(() => {
    // 비로그인일시 되돌려보냄
    if (!userData || !userData.data) {
      router.replace('/auth');
    }
  }, [userData.data, router]);
  if (loading) return <></>;
  return <> </>;
  // return <Donation userData={userData} donationData={donationData} />;
}
