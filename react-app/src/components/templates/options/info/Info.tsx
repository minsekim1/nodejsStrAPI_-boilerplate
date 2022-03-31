import { Box, IconButton, Container, ListItemText, Typography, List, Divider, ListItemButton, ListItemIcon } from '@mui/material';
import { amber, blueGrey, red } from '@mui/material/colors';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { API_URL } from '../../../../api/config';
import { dialogState, loaderState } from '../../../../recoil/modal';
import { userState } from '../../../../recoil/users';
import Icon from '../../../atoms/Icon';
export default function Info() {
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);
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
  const handleClickBack = () => {
    router.back();
  };
  const handleClickTerms = () => {
    router.push('/options/info/terms');
  };
  const handleClickPolicy = () => {
    router.push('/options/info/policy');
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
            이용약관
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
            이용약관
          </Typography>
        </Container>
        <List
          sx={{
            '& *': {
              fontWeight: '500 !important',
            },
          }}
        >
          <ListItemButton onClick={handleClickTerms}>
            <ListItemText primary="서비스이용약관" />
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={handleClickPolicy}>
            <ListItemText primary="개인정보 처리방침" />
          </ListItemButton>
        </List>
      </Box>
    </>
  );
}
