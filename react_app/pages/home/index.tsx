import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { Box, Button, Container, Stack } from "@mui/material";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
// SwiperCore.use([Autoplay]);
// import 'swiper/css';
// import 'swiper/css/pagination';
import { blue } from "@mui/material/colors";
import { useSetLoader } from "../../components/atoms/loader";

const sampleImages = [
  "https://picsum.photos/482/88",
  "https://picsum.photos/483/88",
  "https://picsum.photos/484/88",
  "https://picsum.photos/485/88",
  "https://picsum.photos/483/88",
  "https://picsum.photos/484/88",
  "https://picsum.photos/485/88",
  "https://picsum.photos/483/88",
  "https://picsum.photos/484/88",
  "https://picsum.photos/485/88",
  "https://picsum.photos/483/88",
  "https://picsum.photos/484/88",
  "https://picsum.photos/485/88",
];
export default function Page() {
  const router = useRouter();
  const setLoader = useSetLoader();
  const onClickMove = (route: string) => router.push(route);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pt: "calc(var(--sait) + 56px)",
        pb: "calc(var(--saib) + 64px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 슬라이드 */}

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        pagination={{
          clickable: true,
        }}
        spaceBetween={8}
        loop
        autoplay={{ delay: 4000 }}
        style={{ width: "100%", padding: "8px 64px" }}
      >
        {sampleImages.map((item: any, index: number) => (
          <SwiperSlide key={index}>
            <Box sx={{ borderRadius: 2, overflow: "hidden", width: "100%", display: "flex", alignItems: "center" }}>
              <img src={item} style={{ height: 160, width: "100%" }} />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
      <Container>
        {/* 1*2 박스 */}
        <Stack direction="row" spacing={2} justifyContent="space-evenly" sx={{ mb: 2 }}>
          <Button fullWidth variant="text" onClick={() => onClickMove("home/style/fontsize")}>
            fontSize, lineHeight
          </Button>
          <Button fullWidth variant="text" onClick={() => onClickMove("home/style/color")}>
            color
          </Button>
        </Stack>
        {/* 1*2 박스 */}
        <Stack direction="row" spacing={2} justifyContent="space-evenly" sx={{ mb: 2 }}>
          <Button fullWidth variant="text" onClick={() => onClickMove("home/style/padding")}>
            padding / margin
          </Button>
          <Button fullWidth style={{ backgroundColor: blue[800] }} onClick={() => onClickMove("home/style/mui")}>
            MUI 컴포넌트들
          </Button>
        </Stack>
        {/* 1*2 박스 */}
        <Stack direction="row" spacing={2} justifyContent="space-evenly" sx={{ mb: 2 }}>
          <Button fullWidth variant="outlined" onClick={() => onClickMove("home/style/layout1")}>
            레이아웃1
          </Button>
          <Button fullWidth variant="outlined" onClick={() => onClickMove("home/style/layout2")}>
            레이아웃2
          </Button>
        </Stack>
        {/* 1*2 박스 */}
        <Stack direction="row" spacing={2} justifyContent="space-evenly" sx={{ mb: 2 }}>
          <Button fullWidth variant="outlined" onClick={() => onClickMove("home/style/layout3")}>
            레이아웃3
          </Button>
          <Button fullWidth variant="outlined" onClick={() => onClickMove("home/style/layout4")}>
            레이아웃4
          </Button>
        </Stack>
        {/* 1*2 박스 */}
        <Stack direction="row" spacing={2} justifyContent="space-evenly" sx={{ mb: 2 }}>
          <Button fullWidth onClick={() => onClickMove("home/style/sort")}>
            정렬
          </Button>
          <Button fullWidth onClick={() => onClickMove("home/style/dup")}>
            중첩
          </Button>
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="space-evenly" sx={{ mb: 2 }}>
          <Button fullWidth onClick={() => onClickMove("chat")}>
            채팅방 목록
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
