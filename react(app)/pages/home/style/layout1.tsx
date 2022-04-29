import { Box, Button, Divider, Stack } from '@mui/material';
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();

  return (
    <>
      <Box sx={{ position: 'fixed', bottom: 0 }}>
        <Button onClick={() => router.back()}>뒤로가기</Button>
      </Box>
      3*1 Box
      <Stack>
        <Box sx={{ border: 'black solid 1px' }}>1</Box>
        <Box sx={{ border: 'black solid 1px' }}>2</Box>
        <Box sx={{ border: 'black solid 1px' }}>3</Box>
      </Stack>
      <Divider sx={{ m: 1 }} />
      1*3 Box(row)
      <Stack direction={'row'}>
        <Box sx={{ border: 'black solid 1px' }}>1</Box>
        <Box sx={{ border: 'black solid 1px' }}>2</Box>
        <Box sx={{ border: 'black solid 1px' }}>3</Box>
      </Stack>
      <Divider sx={{ m: 1 }} />
      2*3 Box
      <Stack>
        <Stack direction={'row'}>
          <Box sx={{ border: 'black solid 1px' }}>1</Box>
          <Box sx={{ border: 'black solid 1px' }}>2</Box>
          <Box sx={{ border: 'black solid 1px' }}>3</Box>
        </Stack>
        <Stack direction={'row'}>
          <Box sx={{ border: 'black solid 1px' }}>4</Box>
          <Box sx={{ border: 'black solid 1px' }}>5</Box>
          <Box sx={{ border: 'black solid 1px' }}>6</Box>
        </Stack>
      </Stack>
      <Divider sx={{ m: 1 }} />
      3*2 Box
      <Stack>
        <Stack direction={'row'}>
          <Box sx={{ border: 'black solid 1px' }}>1</Box>
          <Box sx={{ border: 'black solid 1px' }}>2</Box>
        </Stack>
        <Stack direction={'row'}>
          <Box sx={{ border: 'black solid 1px' }}>3</Box>
          <Box sx={{ border: 'black solid 1px' }}>4</Box>
        </Stack>
        <Stack direction={'row'}>
          <Box sx={{ border: 'black solid 1px' }}>5</Box>
          <Box sx={{ border: 'black solid 1px' }}>6</Box>
        </Stack>
      </Stack>
      <Divider sx={{ m: 1 }} />
      3*2 Box(center)
      <Stack alignItems={'center'}>
        <Stack direction={'row'}>
          <Box sx={{ border: 'black solid 1px' }}>1</Box>
          <Box sx={{ border: 'black solid 1px' }}>2</Box>
        </Stack>
        <Stack direction={'row'}>
          <Box sx={{ border: 'black solid 1px' }}>3</Box>
          <Box sx={{ border: 'black solid 1px' }}>4</Box>
        </Stack>
        <Stack direction={'row'}>
          <Box sx={{ border: 'black solid 1px' }}>5</Box>
          <Box sx={{ border: 'black solid 1px' }}>6</Box>
        </Stack>
      </Stack>
      <Divider sx={{ m: 1 }} />
      3*2 Box(flex-end)
      <Stack alignItems={'flex-end'}>
        <Stack direction={'row'}>
          <Box sx={{ border: 'black solid 1px' }}>1</Box>
          <Box sx={{ border: 'black solid 1px' }}>2</Box>
        </Stack>
        <Stack direction={'row'}>
          <Box sx={{ border: 'black solid 1px' }}>3</Box>
          <Box sx={{ border: 'black solid 1px' }}>4</Box>
        </Stack>
        <Stack direction={'row'}>
          <Box sx={{ border: 'black solid 1px' }}>5</Box>
          <Box sx={{ border: 'black solid 1px' }}>6</Box>
        </Stack>
      </Stack>
      <Divider sx={{ m: 1 }} />
      3*2 Box(space-evenly)
      <Stack>
        <Stack direction={'row'} justifyContent={'space-evenly'}>
          <Box sx={{ border: 'black solid 1px' }}>1</Box>
          <Box sx={{ border: 'black solid 1px' }}>2</Box>
        </Stack>
        <Stack direction={'row'} justifyContent={'space-evenly'}>
          <Box sx={{ border: 'black solid 1px' }}>3</Box>
          <Box sx={{ border: 'black solid 1px' }}>4</Box>
        </Stack>
        <Stack direction={'row'} justifyContent={'space-evenly'}>
          <Box sx={{ border: 'black solid 1px' }}>5</Box>
          <Box sx={{ border: 'black solid 1px' }}>6</Box>
        </Stack>
      </Stack>
      <Divider sx={{ m: 1 }} />
      3*2 Box(space-around)
      <Stack>
        <Stack direction={'row'} justifyContent={'space-around'}>
          <Box sx={{ border: 'black solid 1px' }}>1</Box>
          <Box sx={{ border: 'black solid 1px' }}>2</Box>
        </Stack>
        <Stack direction={'row'} justifyContent={'space-around'}>
          <Box sx={{ border: 'black solid 1px' }}>3</Box>
          <Box sx={{ border: 'black solid 1px' }}>4</Box>
        </Stack>
        <Stack direction={'row'} justifyContent={'space-around'}>
          <Box sx={{ border: 'black solid 1px' }}>5</Box>
          <Box sx={{ border: 'black solid 1px' }}>6</Box>
        </Stack>
      </Stack>
      <Divider sx={{ m: 1 }} />
      3*2 Box(space-between)
      <Stack>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Box sx={{ border: 'black solid 1px' }}>1</Box>
          <Box sx={{ border: 'black solid 1px' }}>2</Box>
        </Stack>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Box sx={{ border: 'black solid 1px' }}>3</Box>
          <Box sx={{ border: 'black solid 1px' }}>4</Box>
        </Stack>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Box sx={{ border: 'black solid 1px' }}>5</Box>
          <Box sx={{ border: 'black solid 1px' }}>6</Box>
        </Stack>
      </Stack>
      <Box sx={{ p: 8 }} />
    </>
  );
}
