import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { ChangeEvent, MouseEvent, useState } from "react";
import { isEmail, isPassword } from "../util/regx";
import { useSetRecoilState } from "recoil";
import { tokenState } from "../hook/recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Input에 들어갈 수 있는 타입을 선언합니다.
type typeInput = {
  value: string;
  error: boolean;
  helperText: string;
};
// 기본값입니다.
const defaultInput = {
  value: "",
  error: false,
  helperText: "",
};

const Page: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState<typeInput>(defaultInput);
  const [password, setPassword] = useState<typeInput>(defaultInput);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const setToken = useSetRecoilState(tokenState);

  const handleClickBack = () => router.back();
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail({ value: e.target.value, error: false, helperText: "" });
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword({ value: e.target.value, error: false, helperText: "" });
  const handleClickPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => event.preventDefault();
  const handleClickSignup = () => router.push("/signup");

  const handleClickConfirm = () => {
    if (!email.value) setEmail({ ...email, error: true, helperText: "이메일을 주소를 입력해 주세요!" });
    else if (!isEmail(email.value)) setEmail({ ...email, error: true, helperText: "이메일 형식에 맞지 않습니다." });
    else if (!password.value) setPassword({ ...password, error: true, helperText: "비밀번호를 입력해 주세요!" });
    else if (!isPassword(password.value))
      setPassword({ ...password, error: true, helperText: "영문, 숫자, 특수문자 포함 6 ~ 20자" });
    else
      fetch(`http://localhost:1337/api/auth/local`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier: email.value, password: password.value }),
      })
        .then((d) => d.json())
        .then((d: any) => {
          if (d.error) {
            if (d.error.message === "Invalid identifier or password") alert("비밀번호 혹은 아이디가 잘못되었습니다.");
            else alert("서버 에러가 발생했습니다. 자세한 내용은 고객센터에 문의해 주세요.");
          } else {
            localStorage.setItem("user", JSON.stringify(d));
            setToken(d.jwt);
            router.push({ pathname: "/home" });
          }
        });
  };
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        pt: "var(--sait)",
        pb: "var(--saib)",
      }}
    >
      <Container>
        <IconButton onClick={handleClickBack} sx={{ ml: -2 }}>
          Back
        </IconButton>
      </Container>
      <Container sx={{ flex: 1 }}>
        <Typography variant="h1" sx={{ mt: 4 }}>
          로그인
        </Typography>
        <Typography sx={{ mt: 1, color: grey[500] }}>
          React-Boilerplate에 로그인하시고, <br /> 매일을 즐겁게 함께하세요!
        </Typography>
        <Box sx={{ mt: 4 }} component="form" noValidate autoComplete="off">
          <TextField
            // autoFocus
            fullWidth
            variant="outlined"
            type="email"
            label="이메일"
            value={email.value}
            error={email.error}
            helperText={email.helperText}
            placeholder="email@address.com"
            onChange={handleChangeEmail}
          />
          <FormControl fullWidth sx={{ width: "100%", mt: 2 }} variant="outlined">
            <InputLabel htmlFor="auth-login-password" error={password.error}>
              비밀번호
            </InputLabel>
            <OutlinedInput
              id="auth-login-password"
              color="primary"
              autoComplete="off"
              type={showPassword ? "text" : "password"}
              label="비밀번호"
              value={password.value}
              error={password.error}
              onChange={handleChangePassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleClickPassword} onMouseDown={handleMouseDownPassword}>
                    <div style={{ fontSize: 13 }}>{showPassword ? "hide" : "show"}</div>
                  </IconButton>
                </InputAdornment>
              }
              sx={{ pr: 0 }}
            />
            <FormHelperText error={password.error}>{password.helperText}</FormHelperText>
          </FormControl>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button fullWidth onClick={handleClickConfirm}>
            로그인
          </Button>

          <Button fullWidth variant="text" color="inherit" sx={{ mt: 1 }} onClick={handleClickSignup}>
            이메일로 회원가입
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Page;
