import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { loaderState } from '../../recoil/modal';
import Auth from '../../components/templates/auth/Auth';
export default function Page() {
  const setLoader = useSetRecoilState(loaderState);
  useEffect(() => {
    setLoader({ open: false, fill: false, dark: false });
  });
  return <Auth />;
}
