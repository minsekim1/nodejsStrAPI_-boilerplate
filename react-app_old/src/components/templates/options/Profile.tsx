import axios from 'axios';
import { Box, IconButton, Container, Avatar, Typography, TextField } from '@mui/material';
import { blueGrey, lightBlue } from '@mui/material/colors';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { API_URL, getFetch, putFetch } from '../../../api/config';
import { dialogState, loaderState } from '../../../recoil/modal';
import { UserDataNotNullQueryProps } from '../../../utils/apollo/useUserQuery';
export default function Profile({ userData, refetch }: { userData: UserDataNotNullQueryProps; refetch: () => void }) {
  const router = useRouter();
  const setDialog = useSetRecoilState(dialogState);
  const setLoader = useSetRecoilState(loaderState);
  const [image, setImage] = useState({ pathname: userData.profile_image ? userData.profile_image : '', file: null });
  const [nickname, setNickname] = useState<string | null>(userData.nickname);
  const [greeting, setGreeting] = useState<string | null>(userData.greeting);
  const handleClickBack = () => {
    router.back();
  };
  const hiddenFileInput = useRef<any>(null);
  const handleChangeImage: any = (e: any) => {
    const url = URL.createObjectURL(e.target.files[0]);
    setImage({ pathname: url, file: e.target.files[0] });
  };
  const handleChangeNickname = (e: any) => setNickname(e.target.value);
  const handleChangeGreeting = (e: any) => {
    setGreeting(e.target.value);
  };
  const handleClickConfirm = async () => {
    if (nickname === null || nickname.length === 0 || nickname.length > 20)
      return setDialog((prev) => {
        return {
          ...prev,
          open: true,
          pathname: router.asPath,
          back: false,
          content: '닉네임을 확인해 주세요!',
          cancel: {
            ...prev.cancel,
            show: false,
          },
        };
      });
    if (greeting !== null && greeting.length > 50)
      return setDialog((prev) => {
        return {
          ...prev,
          open: true,
          pathname: router.asPath,
          back: false,
          content: '인삿말을 확인해 주세요!',
          cancel: {
            ...prev.cancel,
            show: false,
          },
        };
      });
    let data: any = {};
    setLoader({ open: true, fill: false, dark: false });
    if (image.file) {
      // 이미지저장
      const formData: any = new FormData();
      formData.append('files', image.file);
      let res: any = await axios.post(`${API_URL}/upload`, formData).catch((e) => console.error(e));
      if (res.status === 200) {
        data.profile_image = res.data[0].id;
      }
    }
    if (userData.nickname != nickname) data.nickname = nickname;
    if (userData.greeting != greeting) data.greeting = greeting;

    putFetch(`/users/${userData.id}`, data).then((d) => {
      getFetch(`/users/${userData.id}`).then((d: any) => {
        if (d.id) {
          refetch();
          setLoader({ open: false, fill: false, dark: false });
          setDialog((prev) => {
            return {
              ...prev,
              open: true,
              pathname: router.asPath,
              back: false,
              content: '변경이 완료되었습니다!',
              cancel: {
                ...prev.cancel,
                show: false,
              },
              confirm: {
                ...prev.confirm,
                onClick: () => {
                  router.back();
                },
              },
            };
          });
        }
      });
    });
  };
  return (
    <>
      <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 2, backgroundColor: '#ffffff', pt: 'var(--sait)' }}>
        <Container sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleClickBack} sx={{ ml: -2 }}>
            Back
          </IconButton>
          <Typography
            sx={{
              flex: 1,
              fontSize: 16,
              lineHeight: '24px',
              fontWeight: '700',
              color: blueGrey[900],
              '& b': {
                color: blueGrey[300],
              },
            }}
          >
            프로필 편집
          </Typography>
          <IconButton onClick={handleClickConfirm} sx={{ mr: -2 }}>
            change
          </IconButton>
        </Container>
      </Box>
      <Box
        sx={{
          position: 'relative',
          pt: 'calc(var(--sait) + 56px)',
          pb: 'calc(var(--saib) + 64px + 8px)',
        }}
      >
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
          <Box sx={{ position: 'relative' }}>
            <input
              type="file"
              ref={hiddenFileInput}
              accept={'image/*'}
              id="file-picker"
              onChange={handleChangeImage}
              style={{ display: 'none' }}
            />
            <label htmlFor="file-picker">
              <Avatar
                sx={{
                  '& *': {
                    borderRadius: '50% !important',
                    overflow: 'hidden',
                  },
                  borderRadius: '50% !important',
                  overflow: 'hidden',
                  width: 128,
                  height: 128,
                  backgroundColor: blueGrey[900],
                }}
              >
                {image.pathname !== '' && image.pathname !== null ? <Avatar src={image.pathname} /> : null}
              </Avatar>
              <Typography
                sx={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  pt: 0.5,
                  pb: 1,
                  fontSize: 14,
                  lineHeight: '20px',
                  textAlign: 'center',
                  fontWeight: '700',
                }}
              >
                변경
              </Typography>
            </label>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Box sx={{ mt: 2, minWidth: 240 }}>
              <TextField
                fullWidth
                value={nickname}
                onChange={handleChangeNickname}
                maxRows={1}
                label="닉네임"
                variant="outlined"
                error={nickname === null || nickname.length === 0 || nickname.length > 20}
                helperText="최대 20자까지의 한글 영문 혹은 숫자"
              />
            </Box>
            <Box sx={{ mt: 2, minWidth: 240 }}>
              <TextField
                fullWidth
                value={greeting}
                onChange={handleChangeGreeting}
                multiline
                minRows={2}
                label="인삿말"
                variant="outlined"
                helperText="최대 50자까지입니다"
                error={greeting !== null && greeting.length > 50}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
