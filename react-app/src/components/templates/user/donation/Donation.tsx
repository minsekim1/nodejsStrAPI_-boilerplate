import { Box, IconButton, Container, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, List, Divider } from '@mui/material';
import { pink, blueGrey, deepOrange } from '@mui/material/colors';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { UserProps } from '../../../../types';
import { comma, displayedAt } from '../../../../utils';
import Icon from '../../../atoms/Icon';
import Visual from '../../../atoms/Visual';
type Props = {
  userData: {
    data: UserProps;
    loading: boolean;
    refetch: () => void;
  };
  donationData: {
    data: any;
    loading: boolean;
    refetch: () => void;
  };
};
export default function Calendar({ userData, donationData }: Props) {
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
            내 후원 기록
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
        <ListItem>
          <ListItemAvatar sx={{ mr: 2 }}>
            <Avatar
              sx={{
                '& *': {
                  borderRadius: '50% !important',
                  overflow: 'hidden',
                },
                borderRadius: '50% !important',
                overflow: 'hidden',
                width: 72,
                height: 72,
                backgroundColor: blueGrey[900],
              }}
            >
              {userData.data.profile_image ? <Visual src={userData.data.profile_image} /> : null}
            </Avatar>
          </ListItemAvatar>
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: '20px',
                fontWeight: '400',
                fontFamily: "'Montserrat', 'Spoqa Han Sans Neo', 'Spoqa Han Sans JP', sans-serif !important",
                //   textAlign: 'center',
              }}
            >
              <b>{`${userData.data.nickname}`}</b>
              {`님의 후원 기록`}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Typography
                sx={{
                  fontSize: 28,
                  lineHeight: '36px',
                  fontWeight: '700',
                  fontFamily: "'Montserrat', 'Spoqa Han Sans Neo', 'Spoqa Han Sans JP', sans-serif !important",
                }}
              >
                {userData.data.donation ? comma(userData.data.donation) : '기록없음'}
              </Typography>
              <Typography
                sx={{
                  ml: 0.5,
                  mb: 0.5,
                  fontSize: 14,
                  lineHeight: '20px',
                  fontWeight: '700',
                  fontFamily: "'Montserrat', 'Spoqa Han Sans Neo', 'Spoqa Han Sans JP', sans-serif !important",
                }}
              >
                {userData.data.donation ? '원' : ''}
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: '20px',
                fontWeight: '700',
                fontFamily: "'Montserrat', 'Spoqa Han Sans Neo', 'Spoqa Han Sans JP', sans-serif !important",
                color: blueGrey[700],
                '& b': {
                  fontFamily: "'Montserrat', 'Spoqa Han Sans Neo', 'Spoqa Han Sans JP', sans-serif !important",
                  color: pink[500],
                },
              }}
            >
              세상을 위한 나의 한걸음
            </Typography>
          </Box>
        </ListItem>
        <Divider sx={{ mt: 2 }} />
        {donationData.data.length === 0 ? (
          <Box
            sx={{
              height: 160,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                fontSize: 16,
                lineHeight: '24px',
                fontWeight: '400',
                textAlign: 'center',
                color: blueGrey[700],
              }}
            >
              아직 후원한 기록이 없어요!
            </Typography>
          </Box>
        ) : (
          <>
            <Container sx={{ mt: 2 }}>
              <Typography
                sx={{
                  fontSize: 16,
                  lineHeight: '24px',
                  fontWeight: '700',
                  '& b': {
                    color: blueGrey[300],
                  },
                }}
              >
                내 후원 기록 <b>{donationData.data.length}</b>
              </Typography>
            </Container>
            <List>
              {donationData.data.map((i: any, index: number) => {
                const item = i.attributes;
                const mission = item.mission_id.data && item.mission_id.data.attributes ? item.mission_id.data.attributes : null;
                const primary =
                  item.reason === 'daily_upload_reward' && mission && mission.type === 'monthly'
                    ? '월간 챌린지 1회 업로드 보상'
                    : item.reason === 'daily_upload_reward' && mission && mission.type === 'daily'
                    ? '개인 챌린지 1회 업로드 보상'
                    : item.reason === 'daily_upload_reward' && mission === null
                    ? '물마시기 2L 보상'
                    : '상품 교환';
                return (
                  <Box key={index}>
                    <ListItem>
                      <ListItemText primary={primary} secondary={displayedAt(new Date(item.createdAt).getTime())} />
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Icon
                          name="hands-heart"
                          prefix="far"
                          size={14}
                          sx={{ mr: 0.5, color: Number(item.point) < 0 ? deepOrange[500] : pink[500] }}
                        />
                        <Typography
                          sx={{
                            fontSize: 16,
                            lineHeight: '24px',
                            fontWeight: '700',
                            color: Number(item.point) < 0 ? deepOrange[500] : pink[500],
                            fontFamily: "'Montserrat', 'Spoqa Han Sans Neo', 'Spoqa Han Sans JP', sans-serif !important",
                          }}
                        >
                          {comma(Number(item.point.replace('-', '')) ?? 0)}
                        </Typography>
                      </Box>
                    </ListItem>
                    <Divider sx={{ ml: '24px' }} />
                  </Box>
                );
              })}
            </List>
          </>
        )}
      </Box>
    </>
  );
}
