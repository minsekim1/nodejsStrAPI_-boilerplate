import _ from 'lodash';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { BottomNavigation, BottomNavigationAction, Typography, Avatar, Box, Container } from '@mui/material';
import { bottomTabs } from '../../../constants';
import { blueGrey, grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { dialogState, drawerState, loaderState } from '../../../recoil/modal';
import Icon from '../../atoms/Icon';
import { sendMessage } from '../../../utils/sendMessage';
import { isIOS } from 'react-device-detect';
import { getUserDataQuery } from '../../../utils/apollo/useUserQuery';
type Props = {};
export default function BottomNav({}: Props) {
  const router = useRouter();
  const userData = getUserDataQuery();

  const { state } = router.query;
  const [drawer, setDrawer] = useRecoilState(drawerState);
  const setLoader = useSetRecoilState(loaderState);
  const [dialog, setDialog] = useRecoilState(dialogState);
  // router.pathname.split('/')[router.pathname.split('/').length - 1] === '/' + tab.value
  const tabItem = bottomTabs.filter(
    (tab) => router.pathname.split('/')[router.pathname.split('/').length - 1] === tab.value.replace('/', '')
  );
  const color = tabItem.length > 0 ? tabItem[0].color : 'black';
  const main =
    router.pathname.split('/')[1] === 'main' &&
    router.pathname.split('/')[2] !== undefined &&
    (router.pathname.split('/')[2] === 'home' ||
      router.pathname.split('/')[2] === 'search' ||
      router.pathname.split('/')[2] === 'bookmark' ||
      router.pathname.split('/')[2] === 'my') &&
    router.pathname.split('/')[3] === undefined;
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (userData && userData.data && main) {
      setShow(true);
    } else {
      setShow(false);
    }
  });
  useEffect(() => {
    if (!isIOS) {
      sendMessage({ name: 'backEnable', body: '' });
      const finish = () => {
        if (state === 'login') {
          if (dialog.open) {
            setDialog((prev) => {
              return { ...prev, open: false };
            });
          } else if (drawer.open) {
            setDrawer((prev) => {
              return { ...prev, open: false };
            });
          }
        } else {
          if (dialog.open) {
            setDialog((prev) => {
              return { ...prev, open: false };
            });
          } else if (drawer.open) {
            setDrawer((prev) => {
              return { ...prev, open: false };
            });
          } else router.back();
        }
      };
      window.addEventListener('androidBackhandle', finish);
      return () => {
        sendMessage({ name: 'backAble', body: '' });
        window.removeEventListener('androidBackhandle', finish);
      };
    } else {
      if (router.pathname.split('/')[2] === 'home' && state === 'login') {
        sendMessage({ name: 'backEnable', body: '' });
      } else {
        sendMessage({ name: 'backAble', body: '' });
      }
    }
  }, [router, dialog, drawer]);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    const active = `/${router.pathname.split('/')[router.pathname.split('/').length - 1]}` === newValue;
    if (active) return null;
    if (newValue === 'user' && userData && userData.data) router.push(`/main${newValue}/${userData.data.id}`);
    router.push(`/main${newValue}?state=${state}`);
  };
  return !show ? null : (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        pb: 'var(--saib)',
        borderRadius: 0,
        zIndex: 2,
        backgroundColor: '#ffffff',
        // borderTop: `1px solid rgba(0,0,0,0.12)`,
        // backgroundColor: 'transparent',
      }}
    >
      <Container
        sx={{
          pl: '0 !important',
          pr: '0 !important',
        }}
      >
        <BottomNavigation showLabels value={router.pathname} onChange={handleChange} sx={{ backgroundColor: 'transparent' }}>
          {bottomTabs.map((item, index) => {
            const active = `/${router.pathname.split('/')[router.pathname.split('/').length - 1]}` === item.value;
            return (
              <BottomNavigationAction
                disableRipple
                disableTouchRipple
                key={index}
                label={
                  <Typography
                    sx={{
                      fontSize: 11,
                      lineHeight: '14px',
                      color: active ? color : grey[600],
                      transition: 'color 1s ease',
                      fontWeight: active ? '700' : '700',
                      mt: 0.5,
                    }}
                  >
                    {item.label}
                  </Typography>
                }
                value={item.value}
                icon={
                  item.value === '/my' && userData.data !== null ? (
                    <Avatar
                      sx={{
                        '& *': {
                          borderRadius: '50% !important',
                          overflow: 'hidden',
                        },
                        borderRadius: '50% !important',
                        overflow: 'hidden',
                        width: 28,
                        height: 28,
                        backgroundColor: blueGrey[900],
                        transition: 'background-color 0.5s ease',
                      }}
                    >
                      {/* {userData.data && userData.data.profile_image ? <Visual src={userData.data.profile_image} /> : null} */}
                    </Avatar>
                  ) : (
                    <Icon
                      name={item.name}
                      size={24}
                      prefix={active ? 'fas' : 'far'}
                      sx={{
                        color: active ? color : grey[600],
                        transition: 'color 0.5s ease',
                      }}
                    />
                  )
                }
                sx={{
                  transform: 'none',
                  maxWidth: 1000,
                  opacity: 1,
                  '&.Mui-selected': {
                    opacity: 1,
                  },
                }}
              />
            );
          })}
        </BottomNavigation>
      </Container>
    </Box>
  );
}
