import { Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();

  return (
    <Container>
      <Button onClick={() => router.back()}>뒤로가기</Button>
      <Typography fontSize={11} lineHeight={'14px'}>
        오버라인, legend에 적한 텍스트
      </Typography>
      <Typography fontSize={11} lineHeight={'14px'}>
        오버라인, legend에 적한 텍스트
      </Typography>
      <Typography fontSize={13} lineHeight={'16px'}>
        작은 컴퍼넌트의 서브텍스트
      </Typography>
      <Typography fontSize={13} lineHeight={'16px'}>
        작은 컴퍼넌트의 서브텍스트
      </Typography>
      <Typography fontSize={15} lineHeight={'20px'}>
        메인 텍스트에 적합
      </Typography>
      <Typography fontSize={15} lineHeight={'20px'}>
        메인 텍스트에 적합
      </Typography>
      <Typography fontSize={17} lineHeight={'24px'}>
        섹션 헤더에 적합
      </Typography>
      <Typography fontSize={17} lineHeight={'24px'}>
        섹션 헤더에 적합
      </Typography>
      <Typography fontSize={21} lineHeight={'28px'}>
        페이지 전체 헤더에 적합
      </Typography>
      <Typography fontSize={21} lineHeight={'28px'}>
        페이지 전체 헤더에 적합
      </Typography>
    </Container>
  );
}
