import { Box } from '@mui/material';
export default function Page() {
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
    ></Box>
  );
}
