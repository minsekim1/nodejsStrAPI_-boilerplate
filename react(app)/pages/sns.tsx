import { Button, Container } from "@mui/material";
import { useRouter } from "next/router";
import useSNSLogin from "../../hooks/useSNSLogin";

export default function Page() {
  const router = useRouter();
  const { loginKakao, loginApple, loginNaver } = useSNSLogin();

  const onClickKakao = loginKakao;
  const onClickApple = loginApple;
  const onClickNaver = loginNaver;

  const onClickFacebook = () => {};
  return (
    <Container>
      <Button fullWidth onClick={() => router.back()}>
        뒤로가기
      </Button>
      <Button fullWidth onClick={onClickKakao}>
        카카오톡 로그인
      </Button>
      <Button fullWidth onClick={onClickApple}>
        애플 로그인
      </Button>
      <Button fullWidth onClick={onClickFacebook}>
        페이스북 로그인
      </Button>
      <Button fullWidth onClick={onClickNaver}>
        네이버 로그인
      </Button>
    </Container>
  );
}
