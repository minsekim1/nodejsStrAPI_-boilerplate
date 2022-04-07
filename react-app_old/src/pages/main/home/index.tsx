import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { API_URL } from '../../../api/config';
import { loaderState } from '../../../recoil/modal';
import { getAndroidPushMessage, getiOSPushMessage, sendMessage } from '../../../utils/sendMessage';
import { getUserDataQuery, UserDataNotNullQueryProps } from '../../../utils/apollo/useUserQuery';
import { Box, Button, Container, Stack } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
SwiperCore.use([Autoplay]);
import 'swiper/css';
import 'swiper/css/pagination';
import { blue } from '@mui/material/colors';

const sampleImages = [
  'https://picsum.photos/482/88',
  'https://picsum.photos/483/88',
  'https://picsum.photos/484/88',
  'https://picsum.photos/485/88',
  'https://picsum.photos/483/88',
  'https://picsum.photos/484/88',
  'https://picsum.photos/485/88',
  'https://picsum.photos/483/88',
  'https://picsum.photos/484/88',
  'https://picsum.photos/485/88',
  'https://picsum.photos/483/88',
  'https://picsum.photos/484/88',
  'https://picsum.photos/485/88',
];
export default function Page() {
  const router = useRouter();
  const userData = getUserDataQuery();
  const loading = userData.loading;
  const setLoader = useSetRecoilState(loaderState);
  const goMessagesPush = (url: string) => {
    // InApp이면 router.push 아니면 window.open
    const isInApp = url && typeof url === 'string' && !url.includes('https://') && !url.includes('http://');
    if (isInApp) router.push(url);
    else sendMessage({ name: 'linking', body: url });
  };

  useEffect(() => {
    // 비로그인일시 되돌려보냄
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
  useEffect(() => {
    if (!loading) {
      setLoader((prev) => {
        return { ...prev, open: false };
      });
    }
  }, [loading, userData]);

  useEffect(() => {
    // 푸쉬알림 받아서 눌렀을 때 안에 함수 실행.
    const Window: any = window;

    // 포그라운드에서 강제실행
    // Window.addEventListener('onNotiPush', () => onNotiPush(f)); //And
    // Window.onNotiPush = () => onNotiPush(f); //iOS

    // 앱 종료 후 푸쉬 누를 때 클릭시
    Window.getNotiData = (d: any) => getiOSPushMessage(d, goMessagesPush); //iOS
    Window.addEventListener('getNotiData', (d: any) => getAndroidPushMessage(d, goMessagesPush)); //And

    // 처음 들어왔을 때 푸쉬 알림데이터 가져오기
    sendMessage({
      name: 'getNotiData',
      body: '',
    });
    return () => {
      window.removeEventListener('getNotiData', (d) => getAndroidPushMessage(d, goMessagesPush));
    };
  }, []);
  if (!userData || !userData.data) return <></>;
  return <Home userData={userData.data} />;
}

type Props = {
  userData: UserDataNotNullQueryProps;
};
const Home = ({ userData }: Props) => {
  const router = useRouter();
  const onClickMove = (route: string) => router.push(route);

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
    >
      {/* 슬라이드 */}
      <Swiper
        // onSwiper={setBmiSwiper}
        // onSlideChange={handleBmiSwiperChange}
        modules={[Pagination]}
        pagination={{
          clickable: true,
        }}
        spaceBetween={8}
        loop
        allowTouchMove={true}
        autoHeight
        slidesPerView={1}
        autoplay={{ delay: 4000 }}
        style={{ width: '100%', touchAction: 'manipulation', padding: '8px 32px' }}
      >
        {sampleImages.map((item: any, index: number) => (
          <SwiperSlide key={index}>
            <Box sx={{ borderRadius: 1, overflow: 'hidden', width: '100%', display: 'flex', alignItems: 'center' }}>
              <img src={item} style={{ height: 160 }} />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
      <Container>
        {/* 1*2 박스 */}
        <Stack direction="row" spacing={2} justifyContent="space-evenly" sx={{ mb: 2 }}>
          <Button fullWidth variant="text" onClick={() => onClickMove('home/style/fontsize')}>
            fontSize, lineHeight
          </Button>
          <Button fullWidth variant="text" onClick={() => onClickMove('home/style/color')}>
            color
          </Button>
        </Stack>
        {/* 1*2 박스 */}
        <Stack direction="row" spacing={2} justifyContent="space-evenly" sx={{ mb: 2 }}>
          <Button fullWidth variant="text" onClick={() => onClickMove('home/style/padding')}>
            padding / margin
          </Button>
          <Button fullWidth style={{ backgroundColor: blue[800] }} onClick={() => onClickMove('home/style/mui')}>
            MUI 컴포넌트들
          </Button>
        </Stack>
        {/* 1*2 박스 */}
        <Stack direction="row" spacing={2} justifyContent="space-evenly" sx={{ mb: 2 }}>
          <Button fullWidth variant="outlined" onClick={() => onClickMove('home/style/layout1')}>
            레이아웃1
          </Button>
          <Button fullWidth variant="outlined" onClick={() => onClickMove('home/style/layout2')}>
            레이아웃2
          </Button>
        </Stack>
        {/* 1*2 박스 */}
        <Stack direction="row" spacing={2} justifyContent="space-evenly" sx={{ mb: 2 }}>
          <Button fullWidth variant="outlined" onClick={() => onClickMove('home/style/layout3')}>
            레이아웃3
          </Button>
          <Button fullWidth variant="outlined" onClick={() => onClickMove('home/style/layout4')}>
            레이아웃4
          </Button>
        </Stack>
        {/* 1*2 박스 */}
        <Stack direction="row" spacing={2} justifyContent="space-evenly" sx={{ mb: 2 }}>
          <Button fullWidth onClick={() => onClickMove('home/style/sort')}>
            정렬
          </Button>
          <Button fullWidth onClick={() => onClickMove('home/style/dup')}>
            중첩
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};
