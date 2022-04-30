import { Button, Container } from "@mui/material";
import { useRouter } from "next/router";
import useSNSLogin from "../hook/useSNSLogin";
export default function Page() {
  const router = useRouter();
  const { loginKakao, loginApple, loginNaver } = useSNSLogin();
  const onClickFacebook = () => {};
  return (
    <Container>
      <Button fullWidth onClick={() => router.back()}>
        뒤로가기
      </Button>
      <Button fullWidth onClick={loginKakao}>
        카카오톡 로그인
      </Button>
      <Button fullWidth onClick={loginApple}>
        애플 로그인
      </Button>
      <Button fullWidth onClick={onClickFacebook}>
        페이스북 로그인
      </Button>
      <Button fullWidth onClick={loginNaver}>
        네이버 로그인
      </Button>
    </Container>
  );
}
