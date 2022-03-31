import { useMutation } from '@apollo/client';
import { Box, IconButton, Container, ListItemText, Typography, List, Divider, ListItemButton, ListItemIcon } from '@mui/material';
import { amber, blueGrey, red } from '@mui/material/colors';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { API_URL } from '../../../api/config';
import { tokenState } from '../../../pages/_app';
import { dialogState, loaderState } from '../../../recoil/modal';

import { getUserDataQuery } from '../../../utils/apollo/useUserQuery';
import Icon from '../../atoms/Icon';
export default function Options() {
  const router = useRouter();
  const userData = getUserDataQuery();
  const setDialog = useSetRecoilState(dialogState);
  const setLoader = useSetRecoilState(loaderState);
  const [show, setShow] = useState<boolean>(false);
  const resetToken = useResetRecoilState(tokenState);
  if (typeof window !== 'undefined') {
    useEffect(() => {
      const listener1 = (e: any) => {
        var scrollY = window.pageYOffset;
        if (scrollY >= 48) {
          setShow(true);
        } else {
          setShow(false);
        }
      };
      window && window.addEventListener('scroll', listener1);
      return () => {
        window && window.removeEventListener('scroll', listener1);
      };
    }, [window]);
  }
  const handleClickBack = () => router.back();
  const handleClickProfile = () => router.push('/options/profile');
  const handleClickAlarm = () => router.push('/options/alarm');
  const handleClickInfo = () => router.push('/options/info');
  const handleClickLogout = () => {
    setDialog((prev) => {
      return {
        ...prev,
        open: true,
        pathname: router.asPath,
        back: false,
        content: '정말 로그아웃하시겠어요?',
        confirm: {
          ...prev.confirm,
          onClick: () => {
            resetToken();
            setLoader({ open: true, fill: false, dark: false });
            router.push('/auth');
          },
        },
      };
    });
  };
  const handleClickCs = () => {
    // sendMessage({ name: 'linking', body: 'http://pf.kakao.com/_YQxgxij/chat' });
    alert('빌드 후 ');
  };
  const handleClickWithdraw = () => {
    setDialog((prev) => {
      return {
        ...prev,
        open: true,
        pathname: router.asPath,
        back: false,
        title: '회원탈퇴',
        content: '지금 회원을 탈퇴하시면, 지금까지 활동 내역 및 포인트는 저장되지 않고 소멸됩니다. 계속하시겠습니까?',
        confirm: {
          ...prev.confirm,
          onClick: () => {
            setLoader({ open: true, fill: false, dark: false });
            fetch(`${API_URL}/users/${userData.data?.id}`, { method: 'DELETE' }).then((d) => {
              userData.refetch();
              resetToken();
              router.push('/auth');
            });
          },
        },
      };
    });
  };
  return (
    <>
      <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 2, backgroundColor: '#ffffff', pt: 'var(--sait)' }}>
        <Container sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleClickBack} sx={{ ml: -2 }}>
            <Icon name="arrow-left" size={20} />
          </IconButton>
          <Typography
            sx={{
              flex: 1,
              fontSize: 16,
              lineHeight: '24px',
              fontWeight: '700',
              color: blueGrey[900],
              '& b': {
                color: blueGrey[300],
              },
              opacity: show ? 1 : 0,
              transition: 'all 0.5s ease',
            }}
          >
            옵션
          </Typography>
        </Container>
      </Box>
      <Box
        sx={{
          position: 'relative',
          pt: 'calc(var(--sait) + 56px)',
          pb: 'calc(var(--saib) + 64px + 8px)',
        }}
      >
        <Container sx={{ mt: 1 }}>
          <Typography
            sx={{
              fontSize: 28,
              lineHeight: '36px',
              fontWeight: '700',
              mb: 2,
            }}
          >
            옵션
          </Typography>
        </Container>
        <List
          sx={{
            '& *': {
              fontWeight: '500 !important',
            },
          }}
        >
          <ListItemButton onClick={handleClickProfile}>
            <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
              <Icon name="pen" prefix="far" size={20} />
            </ListItemIcon>
            <ListItemText primary="프로필 편집" />
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={handleClickAlarm}>
            <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
              <Icon name="bell" prefix="far" size={20} />
            </ListItemIcon>
            <ListItemText primary="알림 설정" />
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={handleClickInfo}>
            <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
              <Icon name="file-alt" prefix="far" size={20} />
            </ListItemIcon>
            <ListItemText primary="이용약관" />
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={handleClickLogout}>
            <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
              <Icon name="power-off" prefix="far" size={20} />
            </ListItemIcon>
            <ListItemText primary="로그아웃" />
          </ListItemButton>
          <Divider />
          {/* <ListItemButton onClick={handleClickCs}>
            <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
              <Icon name="headset" prefix="far" size={20} sx={{ color: amber[500] }} />
            </ListItemIcon>
            <ListItemText sx={{ '& *': { color: amber[500] } }} primary="고객센터" />
          </ListItemButton> */}
          <Divider />
          <ListItemButton onClick={handleClickWithdraw}>
            <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
              <Icon name="sign-out" prefix="far" sx={{ color: red[700] }} size={20} />
            </ListItemIcon>
            <ListItemText sx={{ '& *': { color: red[700] } }} primary="회원탈퇴" />
          </ListItemButton>
        </List>
      </Box>
    </>
  );
}
