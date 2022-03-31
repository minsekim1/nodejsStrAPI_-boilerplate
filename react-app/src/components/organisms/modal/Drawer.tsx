import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { isIOS } from 'react-device-detect';
import { SwipeableDrawer, Typography, Container, IconButton, Box } from '@mui/material';
import { drawerState } from '../../../recoil/modal';

import Icon from '../../atoms/Icon';
import { blueGrey } from '@mui/material/colors';
import { sendMessage } from '../../../utils/sendMessage';
import { getUserDataQuery } from '../../../utils/apollo/useUserQuery';
type Props = {};
export default function Drawer({}: Props) {
  const router = useRouter();
  const userData = getUserDataQuery();
  const [drawer, setDrawer] = useRecoilState(drawerState);
  const handleOpen = () => {
    setDrawer({ ...drawer, open: true });
  };
  const handleClose = () => {
    setDrawer({ ...drawer, open: false });
    if (drawer.onClose) drawer.onClose();
  };
  const handleClickTimes = () => {
    setDrawer({ ...drawer, open: false });
    if (drawer.onClose) drawer.onClose();
  };
  return (
    <SwipeableDrawer
      anchor="bottom"
      open={drawer.open}
      disableSwipeToOpen={true}
      onClose={handleClose}
      onOpen={handleOpen}
      disableBackdropTransition={!isIOS}
      disableDiscovery={isIOS}
      swipeAreaWidth={0}
      // ModalProps={ModalProps}
      sx={{
        zIndex: '999999999',
        '& .MuiDrawer-paper': {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          pb: 'var(--saib)',
          maxWidth: '444px',
          ml: 'auto',
          mr: 'auto',
        },
      }}
    >
      {drawer.title ? (
        <Container sx={{ height: 56, display: 'flex', alignItems: 'center' }}>
          <Typography
            sx={{
              flex: 1,
              fontSize: 20,
              lineHeight: '28px',
              fontWeight: '700',
            }}
          >
            {drawer.title}
          </Typography>
          <IconButton sx={{ mr: -2 }} onClick={handleClickTimes}>
            <Icon name="times" />
          </IconButton>
        </Container>
      ) : (
        <Box sx={{ height: 24, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box
            sx={{
              width: 40,
              height: '4px',
              borderRadius: 0.25,
              backgroundColor: blueGrey[200],
            }}
          />
        </Box>
      )}
      {drawer.children}
    </SwipeableDrawer>
  );
}
