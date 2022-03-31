import { Avatar, Box, Container, Divider, IconButton, ListItemAvatar, Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { formatDateFull } from '../../../../utils';
import { dialogState, loaderState } from '../../../../recoil/modal';
import { useSetRecoilState } from 'recoil';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import Visual from '../../../atoms/Visual';
import Icon from '../../../atoms/Icon';
import ChallengeCard from '../../../organisms/card/ChallengeCard';
SwiperCore.use([Navigation, Pagination, Autoplay]);
type Props = {
  feedData: {
    data: any;
    loading: boolean;
    error: boolean;
    mutate: () => void;
  };
};
export default function Feed({ feedData }: Props) {
  const userData = getUserDataQuery();
  const router = useRouter();
  const setLoader = useSetRecoilState(loaderState);
  const setDialog = useSetRecoilState(dialogState);
  const feed = feedData.data.feed;
  const feed_user = feedData.data.user;
  const images = feed.images;
  const mission = feedData.data.mission;
  const handleClickBack = () => {
    router.back();
  };
  const handleClickUser = () => {
    setLoader({ open: true, fill: true, dark: false });
    router.push(`/user/${feed_user.id}`);
  };
  const handleClickDelete = () => {
    setDialog((prev) => {
      return {
        ...prev,
        open: true,
        pathname: router.asPath,
        content: '정말 삭제하시겠습니까? 삭제한 피드는 복구되지 않습니다.',
        confirm: {
          ...prev.confirm,
          onClick: () => deletFeed(),
        },
      };
    });
  };
  const deletFeed = () => {
    setLoader({ open: true, fill: false, dark: false });
    fetch(`https://dongwon.circlin.co.kr:446/api/feeds/${feed.id}`, { method: 'DELETE' }).then((d) => {
      setLoader({ open: false, fill: false, dark: false });
      router.back();
    });
  };
  return (
    <>
      <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 2, backgroundColor: '#ffffff', pt: 'var(--sait)' }}>
        <Container sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleClickBack} sx={{ ml: -2 }}>
            <Icon name="arrow-left" size={20} />
          </IconButton>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              //   opacity: show ? 1 : 0,
              transition: 'all 0.5s ease',
            }}
            onClick={handleClickUser}
          >
            <ListItemAvatar
              sx={{
                minWidth: 0,
                mr: 1.5,
              }}
            >
              <Avatar
                sx={{
                  '& *': {
                    borderRadius: '50% !important',
                    overflow: 'hidden',
                  },
                  borderRadius: '50% !important',
                  overflow: 'hidden',
                  backgroundColor: blueGrey[900],
                  width: 32,
                  height: 32,
                }}
              >
                {feed_user.profile_image ? <Visual src={feed_user.profile_image} /> : null}
              </Avatar>
            </ListItemAvatar>
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  lineHeight: '20px',
                  fontWeight: '700',
                }}
              >
                {`${feed_user.nickname}`}
              </Typography>
              <Typography
                sx={{
                  fontSize: 12,
                  lineHeight: '16px',
                  fontWeight: '400',
                  color: blueGrey[500],
                }}
              >
                {`${feed_user.email}`}
              </Typography>
            </Box>
          </Box>
          {feed_user && feed_user.id === user.id && (
            <IconButton onClick={handleClickDelete} sx={{ mr: -2 }}>
              <Icon name="trash" size={20} />
            </IconButton>
          )}
        </Container>
      </Box>
      <Box
        sx={{
          position: 'relative',
          pt: 'calc(var(--sait) + 56px)',
          pb: 'calc(var(--saib) + 64px + 8px)',
        }}
      >
        <Container
          sx={{
            position: 'relative',
            width: '100%',
            height: 0,
            pt: '100%',
            '@media (min-width: 444px)': {
              pt: '444px',
            },
            pl: '0 !important',
            pr: '0 !important',
            '& .swiper': {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            },
            '& .swiper-pagination-bullets': {},
            '& .swiper-pagination-bullet': {
              width: 12,
              height: 12,
              backgroundColor: `${blueGrey[700]} !important`,
              opacity: '0.5 !important',
            },
            '& .swiper-pagination-bullet-active': {
              backgroundColor: `${blueGrey[700]} !important`,
              opacity: '1 !important',
            },
          }}
        >
          <Swiper
            modules={[Pagination]}
            pagination={{
              clickable: true,
            }}
            preventInteractionOnTransition
            style={{
              touchAction: 'manipulation',
            }}
          >
            {images.map((item: any, index: number) => (
              <SwiperSlide key={index}>
                <Visual
                  src={`${item}`}
                  sx={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
        <Container>
          <Typography
            sx={{
              mt: 2,
              fontSize: 16,
              lineHeight: '24px',
              fontWeight: '400',
              color: blueGrey[900],
            }}
          >
            {feed.description}
          </Typography>
          <Box sx={{ display: 'flex', mt: 1 }}>
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <Typography
                sx={{
                  fontSize: 14,
                  lineHeight: '20px',
                  fontWeight: '400',
                  color: blueGrey[500],
                }}
              >
                {formatDateFull(feed.createdAt)}
              </Typography>
              {feed.is_private && (
                <Icon
                  name="lock"
                  prefix="fas"
                  size={12}
                  sx={{
                    ml: 1,
                    mb: 0.5,
                    color: blueGrey[500],
                  }}
                />
              )}
            </Box>
            {mission.type === 'monthly' && (
              <Typography
                sx={{
                  fontSize: 14,
                  lineHeight: '20px',
                  color: blueGrey[700],
                }}
              >
                인증한 물의 양 <b>{feed.amount + 'ml'}</b>
              </Typography>
            )}
          </Box>
        </Container>
        <Divider sx={{ mt: 2 }} />
        <Container>
          <Box sx={{ pt: 2, pb: 4 }}>
            <Typography
              sx={{
                fontSize: 16,
                lineHeight: '24px',
                fontWeight: '700',
              }}
            >
              인증한 챌린지
            </Typography>
            <ChallengeCard item={mission} upload feed />
          </Box>
        </Container>
      </Box>
    </>
  );
}
