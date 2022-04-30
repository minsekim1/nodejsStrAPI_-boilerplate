import { Button, Container } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';

// Container는 좌우 여백을 관리해준다.
// 컴포넌트 예제 Header이라는 컴포넌트를 만들어 넣었다.
export default function Page() {
  const router = useRouter();
  return (
    <Container>
      <Header />
      <Button onClick={() => router.back()}>뒤로가기</Button>
    </Container>
  );
}

const Header = () => {
  return <Box sx={{ height: 64, backgroundColor: 'red' }}>헤더</Box>;
};
