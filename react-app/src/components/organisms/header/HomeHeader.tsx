import { useRouter } from 'next/router';
import { Toolbar, AppBar, IconButton, Box, Avatar, Container } from '@mui/material';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { blueGrey } from '@mui/material/colors';
import { loaderState } from '../../../recoil/modal';
import Icon from '../../atoms/Icon';
import Visual from '../../atoms/Visual';
import { useCustomSWR } from '../../../utils';
import { getUserDataQuery } from '../../../utils/apollo/useUserQuery';
export default function HomeHeader() {
  const router = useRouter();
  const userData = getUserDataQuery();

  const setLoader = useSetRecoilState(loaderState);
  const main =
    // (router.pathname.split('/')[1] === 'store' && router.pathname.split('/')[2] === undefined) ||
    router.pathname.split('/')[1] === 'main' &&
    router.pathname.split('/')[2] !== undefined &&
    (router.pathname.split('/')[2] === 'home' ||
      router.pathname.split('/')[2] === 'bookmark' ||
      router.pathname.split('/')[2] === 'my' ||
      router.pathname.split('/')[2] === 'search') &&
    router.pathname.split('/')[3] === undefined;
  const isMy = router.pathname.split('/')[2] === 'my';
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    if (userData.data && userData.data.id !== null && main) {
      setShow(true);
    } else {
      setShow(false);
    }
  });
  const handleClickOption = () => {
    // if (router.pathname.split('/')[1] === 'store') return router.back();
    router.push(`/options`);
  };

  return !show ? (
    <></>
  ) : (
    <AppBar
      component="div"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        pt: 'var(--sait)',
        backgroundColor: '#ffffff',
      }}
      elevation={0}
    >
      <Container>
        <Toolbar
          component="div"
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            pl: '0 !important',
            pr: '0 !important',
          }}
        >
          <Box sx={{ flex: 1 }}></Box>
          <Box sx={{ flex: '100%' }}></Box>
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
            {isMy && (
              <IconButton
                sx={{
                  ml: -2,
                }}
                onClick={handleClickOption}
              >
                <Icon name={'cog'} />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
