import { Container, Button, Box, Stack, IconButton } from '@mui/material';
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  return (
    <Container>
      <Header onLeftClick={() => router.back()} />
    </Container>
  );
}

// 부모 컴포넌트인 Page에서 onLeftClick라는 함수를 넘겨준다.
const Header = ({ onLeftClick }: { onLeftClick: () => void }) => {
  // display : flex를 통한 정렬
  return (
    <Stack direction={'row'} display={'flex'} sx={{ height: 64, backgroundColor: 'red' }}>
      <Box sx={{ flex: 1 }}>
        <IconButton onClick={onLeftClick} sx={{ p: 0 }}>
          Back
        </IconButton>
      </Box>
      <Box sx={{ flex: 1 }}>2</Box>
      <Box sx={{ flex: 1 }}>3</Box>
    </Stack>
  );
};
