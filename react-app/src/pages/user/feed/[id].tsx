import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { loaderState } from '../../../recoil/modal';
import { getUserDataQuery } from '../../../utils/apollo/useUserQuery';
export default function Page() {
  const router = useRouter();
  const userData = getUserDataQuery();
  const feedId = typeof router.query.id === 'string' ? Number(router.query.id) : -1;
  const setLoader = useSetRecoilState(loaderState);
  const loading = userData.loading;
  useEffect(() => {
    if (!loading)
      setLoader((prev) => {
        return { ...prev, open: false };
      });
  }, [loading]);
  useEffect(() => {
    if (!userData || !userData.data) {
      router.replace('/auth');
    }
  }, [userData.data, router]);
  if (loading) return <></>;
  // return <Feed feedData={feedIdData} />;
  return <></>;
}
