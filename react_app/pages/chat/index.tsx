import { useRouter } from "next/router";
import { Box, Button, Container, Stack } from "@mui/material";
import { useSetLoader } from "../../components/atoms/loader";

export default function Page() {
  const router = useRouter();
  const setLoader = useSetLoader();

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
      <Container>
        <Stack direction="row" spacing={2} justifyContent="space-evenly" sx={{ mb: 2 }}>
          <Button fullWidth onClick={() => router.back()}>
            뒤로가기
          </Button>
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="space-evenly" sx={{ mb: 2 }}>
          <Button fullWidth onClick={() => router.push("chat/1")}>
            1번채팅방
          </Button>
          <Button fullWidth onClick={() => router.push("chat/2")}>
            2번채팅방
          </Button>
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="space-evenly" sx={{ mb: 2 }}>
          <Button fullWidth onClick={() => router.push("chat/3")}>
            3번채팅방
          </Button>
          <Button fullWidth onClick={() => router.push("chat/4")}>
            4번채팅방
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
