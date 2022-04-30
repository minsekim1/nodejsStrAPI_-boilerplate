import { Box } from '@mui/material';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getUserDataQuery } from '../../../utils/apollo/useUserQuery';
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

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pt: 'calc(var(--sait) + 56px)',
        pb: 'calc(var(--saib) + 64px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    ></Box>
  );
}
