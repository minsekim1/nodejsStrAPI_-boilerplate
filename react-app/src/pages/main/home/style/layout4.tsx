import { Container, Button, Box, Stack, IconButton, Avatar } from '@mui/material';
import { red } from '@mui/material/colors';
import { useRouter } from 'next/router';
import Icon from '../../../../components/atoms/Icon';

export default function Page() {
  const router = useRouter();
  return (
    <Container>
      <Header onLeftClick={() => router.back()} />
      <Box sx={{ backgroundColor: red[50], height: 180 }}>내용</Box>
      <Box sx={{ backgroundColor: red[100], height: 180 }}>내용</Box>
      <Box sx={{ backgroundColor: red[200], height: 180 }}>내용</Box>
      <Box sx={{ backgroundColor: red[300], height: 180 }}>내용</Box>
      <Box sx={{ backgroundColor: red[400], height: 180 }}>내용</Box>
      <Box sx={{ backgroundColor: red[500], height: 180 }}>내용</Box>
      <Box sx={{ backgroundColor: red[600], height: 180 }}>내용</Box>
      <Box sx={{ backgroundColor: red[800], height: 180 }}>내용</Box>
      <Box sx={{ backgroundColor: red[900], height: 180 }}>내용</Box>
    </Container>
  );
}

const Header = ({ onLeftClick }: { onLeftClick: () => void }) => {
  return (
    <Box sx={{ position: 'sticky', top: 0, backgroundColor: 'white' }}>
      {/* position:'sticky'는 컴포넌트를 화면상단에 붙이는것. */}
      <Stack direction={'row'} display={'flex'} sx={{ height: 64 }}>
        <Box sx={{ flex: 1 }}>
          <IconButton onClick={onLeftClick} sx={{ p: 0, width: 24, height: '100%' }}>
            <Icon name={'arrow-left'} />
          </IconButton>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <img src={'/images/main_logo.png'} style={{ height: 30 }} />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Avatar />
        </Box>
      </Stack>
    </Box>
  );
};
