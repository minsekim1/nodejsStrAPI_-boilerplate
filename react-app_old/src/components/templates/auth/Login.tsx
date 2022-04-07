import { useState, ChangeEvent, MouseEvent } from 'react';
import router from 'next/router';
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
} from '@mui/material';
import { useSetRecoilState } from 'recoil';
import { getFetch } from '../../../api/config';
import { loginUser } from '../../../api/User';
import { inputDefaultProps, InputProps } from '../../../types';
import { grey } from '@mui/material/colors';
import { isEmail, isPassword } from '../../../utils';
import { dialogState, loaderState } from '../../../recoil/modal';
import { tokenState } from '../../../pages/_app';
export default function Login() {
  const setDialog = useSetRecoilState(dialogState);
  const setLoader = useSetRecoilState(loaderState);
  const [email, setEmail] = useState<InputProps>(inputDefaultProps);
  const [password, setPassword] = useState<InputProps>(inputDefaultProps);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const setToken = useSetRecoilState(tokenState);
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail({ value: e.target.value, error: false, helperText: '' });
    // setEmail(e.target.value);
    // setEmailError(false);
    // setEmailHelperText('');
  };
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword({ value: e.target.value, error: false, helperText: '' });
  const handleClickPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => event.preventDefault();
  const handleClickBack = () => router.back();
  const handleClickConfirm = () => {
    if (!email.value) {
      setEmail({ ...email, error: true, helperText: '이메일을 주소를 입력해 주세요!' });
      return;
    }
    if (!isEmail(email.value)) {
      setEmail({ ...email, error: true, helperText: '이메일 형식에 맞지 않습니다.' });
      return;
    }
    if (!password.value) {
      setPassword({ ...password, error: true, helperText: '비밀번호를 입력해 주세요!' });
      return;
    }
    if (!isPassword(password.value)) {
      setPassword({ ...password, error: true, helperText: '영문, 숫자, 특수문자 포함 6 ~ 20자' });
      return;
    }
    loginUser(email.value, password.value).then((d: any) => {
      if (d.error) {
        if (d.error.message === 'Invalid identifier or password') {
          setDialog((prev) => {
            return {
              ...prev,
              open: true,
              pathname: router.asPath,
              content: '비밀번호 혹은 아이디가 잘못되었습니다.',
              cancel: {
                ...prev.cancel,
                show: false,
              },
            };
          });
        } else {
          setDialog((prev) => {
            return {
              ...prev,
              open: true,
              pathname: router.asPath,
              content: '알 수 없는 에러가 발생했습니다. 자세한 내용은 고객센터에 문의해 주세요.',
              cancel: {
                ...prev.cancel,
                show: false,
              },
            };
          });
        }
      } else {
        setLoader({ open: true, fill: false, dark: false });
        setLoader({ open: false, fill: false, dark: false });
        if (d) {
          localStorage.setItem('user', JSON.stringify(d));
          setToken(d.jwt);
          router.push({ pathname: '/main/home', query: { state: 'login' } });
        } else {
          setDialog((prev) => {
            return {
              ...prev,
              open: true,
              pathname: router.asPath,
              content: '회원가입되지 않은 아이디입니다.',
              cancel: {
                ...prev.cancel,
                title: '회원가입하러 가기',
                onClick: () => {
                  router.push('/auth/signup');
                },
              },
            };
          });
        }
      }
    });
  };
  const handleClickSignup = () => router.push('/auth/signup');
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        pt: 'var(--sait)',
        pb: 'var(--saib)',
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
          React-Boilerplate에 로그인하시고, <br />
          매일을 즐겁게 함께하세요!
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
          <FormControl fullWidth sx={{ width: '100%', mt: 2 }} variant="outlined">
            <InputLabel htmlFor="auth-login-password" error={password.error}>
              비밀번호
            </InputLabel>
            <OutlinedInput
              id="auth-login-password"
              color="primary"
              autoComplete="off"
              type={showPassword ? 'text' : 'password'}
              label="비밀번호"
              value={password.value}
              error={password.error}
              onChange={handleChangePassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleClickPassword} onMouseDown={handleMouseDownPassword}>
                    <div style={{ fontSize: 13 }}>{showPassword ? 'hide' : 'show'}</div>
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
}
