import { Button, Container, Typography } from '@mui/material';
import {
  amber,
  blue,
  blueGrey,
  brown,
  cyan,
  deepOrange,
  deepPurple,
  green,
  grey,
  indigo,
  lightBlue,
  lightGreen,
  lime,
  orange,
  pink,
  purple,
  red,
  teal,
  yellow,
} from '@mui/material/colors';
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  // 각 색갈을 50,100,200,300,400,500,600,700,800,900 처럼 사용가능하다.
  // 예: blueGrey[50]
  // blueGrey
  // red
  // pink
  // purple
  // deepPurple
  // indigo
  // blue
  // lightBlue
  // cyan
  // teal
  // green
  // lightGreen
  // lime
  // yellow
  // amber
  // orange
  // deepOrange
  // brown
  // grey
  // blueGrey
  return (
    <Container>
      <Button onClick={() => router.back()}>뒤로가기</Button>
      <Typography fontSize={21} lineHeight={'28px'} color={blue[100]}>
        페이지 전체 헤더에 적합
      </Typography>
      <Typography fontSize={21} lineHeight={'28px'} color={blue[400]}>
        페이지 전체 헤더에 적합
      </Typography>
      <Typography fontSize={21} lineHeight={'28px'} color={blue[700]}>
        페이지 전체 헤더에 적합
      </Typography>
      <Typography fontSize={21} lineHeight={'28px'} color={blue[800]}>
        페이지 전체 헤더에 적합
      </Typography>
      <Typography fontSize={21} lineHeight={'28px'} color={blue[900]}>
        페이지 전체 헤더에 적합
      </Typography>
      <Typography fontSize={21} lineHeight={'28px'} color={orange[900]}>
        페이지 전체 헤더에 적합
      </Typography>
      <Typography fontSize={21} lineHeight={'28px'} color={deepOrange[900]}>
        페이지 전체 헤더에 적합
      </Typography>
      <Typography fontSize={21} lineHeight={'28px'} color={brown[900]}>
        페이지 전체 헤더에 적합
      </Typography>
      <Typography fontSize={21} lineHeight={'28px'} color={grey[900]}>
        페이지 전체 헤더에 적합
      </Typography>
      <Typography fontSize={21} lineHeight={'28px'} color={grey[600]}>
        비활성 글씨
      </Typography>
      <Typography fontSize={21} lineHeight={'28px'} color={grey[800]}>
        비중요 글씨
      </Typography>
      <Typography fontSize={21} lineHeight={'28px'} color={grey[900]}>
        중요 글씨
      </Typography>
      <Typography fontSize={21} lineHeight={'28px'} color={grey[900]} fontWeight={'bold'}>
        중요 글씨(볼드체)
      </Typography>
    </Container>
  );
}
