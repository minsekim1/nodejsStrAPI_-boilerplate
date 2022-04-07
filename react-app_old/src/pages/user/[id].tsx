import _ from 'lodash';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { loaderState } from '../../recoil/modal';
import { useCustomSWR } from '../../utils';
import { getUserDataQuery } from '../../utils/apollo/useUserQuery';
export default function Page() {
  const router = useRouter();
  const userId = typeof router.query.id === 'string' ? Number(router.query.id) : -1;
  const userData = getUserDataQuery();
  const setLoader = useSetRecoilState(loaderState);
  const loading = userData.loading;
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
  }, []);

  if (loading) return <></>;
  return <></>;
}
