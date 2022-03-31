import { Box, ButtonBase, Chip, IconButton, Paper, Stack, Typography } from '@mui/material';
import { blueGrey, pink, teal } from '@mui/material/colors';
import { useRouter } from 'next/router';
import { MouseEvent } from 'react';
import { useSetRecoilState } from 'recoil';
import { drawerState, loaderState } from '../../../recoil/modal';
import { comma, formatDate, getDDay } from '../../../utils';
import Icon from '../../atoms/Icon';
import Visual from '../../atoms/Visual';
type Props = {
  item: any;
  upload?: boolean;
  feed?: boolean;
};
export default function ChallengeCard({ item, upload, feed }: Props) {
  const router = useRouter();
  const setDrawer = useSetRecoilState(drawerState);
  const setLoader = useSetRecoilState(loaderState);
  const daily = item.type === 'daily';
  const entered = item.is_enter;
  const ended = new Date(item.ended_at).getTime() < new Date().getTime() && new Date(item.started_at).getTime() < new Date().getTime();
  const handleClickCard = () => {
    goToChallenge();
  };
  const handleClickUpload = (e: any) => {
    goToUpload();
  };
  const handleMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const goToChallenge = () => {
    if (entered) {
      setLoader({ open: true, fill: true, dark: true });
      router.push(`/challenge/ground/${item.id}`);
    } else {
      setLoader({ open: true, fill: true, dark: true });
      router.push(`/challenge/intro/${item.id}`);
    }
    setDrawer((prev) => {
      return {
        ...prev,
        open: false,
      };
    });
  };
  const goToUpload = () => {
    router.push(`/upload/${item.id}`);
    setLoader({ open: true, fill: true, dark: true });
    setDrawer((prev) => {
      return {
        ...prev,
        open: false,
      };
    });
  };
  const checked = upload ? item.is_check : false;
  const dailyIcon =
    item.id === 12
      ? 'walking'
      : item.id === 13
      ? 'running'
      : item.id === 14
      ? 'dumbbell'
      : item.id === 15
      ? 'home'
      : item.id === 16
      ? 'weight'
      : item.id === 17
      ? 'pills'
      : 'circle';
  const started = new Date(item.started_at).getTime() < new Date().getTime();
  const { day, hours, minutes, seconds } = getDDay(started ? item.ended_at : item.started_at, !upload && !daily);
  return (
    <Box sx={{ position: 'relative' }}>
      <Paper elevation={12} sx={{ mt: 1, overflow: 'hidden' }} onClick={handleClickCard}>
        <ButtonBase
          sx={{
            position: 'relative',
            width: '100%',
            height: daily || upload ? 'auto' : 0,
            pt: daily || upload ? 0 : '100%',
            textAlign: 'left',
          }}
        >
          <Visual
            src={item.image}
            sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            coverBg={`rgba(0,0,0,0.${checked ? 8 : upload ? 6 : daily ? 6 : 3})`}
          />
          <Box
            sx={{
              position: daily || upload ? 'relative' : 'absolute',
              top: daily || upload ? 'initial' : 0,
              left: daily || upload ? 'initial' : 0,
              right: daily || upload ? 'initial' : 0,
              bottom: daily || upload ? 'initial' : 0,
              width: '100%',
              zIndex: 2,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}
          >
            {!upload && !daily && day > 0 && (
              <Paper
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  pt: 1,
                  pb: 1,
                  pl: 1.5,
                  pr: 1.5,
                  alignSelf: 'flex-start',
                  backgroundColor: pink[700],
                }}
              >
                {/* <Stack direction="row" spacing={1}> */}
                <Typography
                  sx={{
                    mt: 0.25,
                    fontSize: 12,
                    lineHeight: '16px',
                    fontWeight: '400',
                    //   color: blueGrey[900],
                    color: '#ffffff',
                    textAlign: 'right',
                  }}
                >
                  {`${new Date(item.started_at).getMonth() + 1}월 챌린지 ${started ? '종료' : '시작'}까지`}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    lineHeight: '20px',
                    fontWeight: '700',
                    //   color: blueGrey[900],
                    color: '#ffffff',
                  }}
                >
                  {day}일 {hours}시간 {minutes}분 {seconds}초
                </Typography>
                {/* <Typography sx={{ color: blueGrey[900] }}>{hours}</Typography>
                <Typography sx={{ color: blueGrey[900] }}>{minutes}</Typography>
                <Typography sx={{ color: blueGrey[900] }}>{seconds}</Typography> */}
                {/* </Stack> */}
              </Paper>
            )}
            <Stack
              direction={daily ? 'row' : 'column'}
              spacing={daily ? 1 : 0}
              sx={{
                position: daily || upload ? 'relative' : 'absolute',
                top: daily || upload ? 'initial' : 0,
                left: daily || upload ? 'initial' : 0,
                p: daily || upload ? 0 : 2,
              }}
            >
              {!upload && !daily && (
                <Chip
                  size="small"
                  label={ended ? '종료' : '~' + formatDate(item.ended_at)}
                  sx={{
                    fontSize: 12,
                    backgroundColor: ended ? blueGrey[500] : teal[700],
                    fontWeight: '700',
                    color: '#ffffff',
                    mb: 1,
                    alignSelf: 'flex-start',
                  }}
                />
              )}
              {!upload && entered && (
                <Chip
                  // size={daily ? 'small' : 'medium'}
                  size="small"
                  label={ended ? '참가완료' : '참가중'}
                  sx={{
                    //   fontSize: daily || upload ? 12 : 14,
                    fontSize: 12,
                    backgroundColor: ended ? blueGrey[300] : '#ffffff',
                    fontWeight: '700',
                    color: ended ? blueGrey[700] : blueGrey[900],
                    mb: 1,
                    alignSelf: 'flex-start',
                  }}
                />
              )}
              {upload && (
                <Chip
                  size="small"
                  label={daily ? '상시' : `~ ${formatDate(item.ended_at)}`}
                  sx={{
                    fontSize: 12,
                    backgroundColor: daily ? blueGrey[700] : teal[700],
                    fontWeight: '700',
                    color: '#ffffff',
                    opacity: checked ? 0.6 : 1,
                    alignSelf: 'flex-start',
                    mb: 1,
                  }}
                />
              )}
            </Stack>
            <Typography
              sx={{
                fontSize: daily ? (upload ? 20 : 16) : upload ? 20 : 24,
                lineHeight: daily ? (upload ? '28px' : '24px') : upload ? '28px' : '32px',
                fontWeight: '700',
                color: '#ffffff',
                width: '70%',
                wordBreak: 'keep-all',
                opacity: checked ? 0.6 : 1,
                // fontFamily: "'Montserrat', 'Spoqa Han Sans Neo', 'Spoqa Han Sans JP', sans-serif !important",
              }}
            >
              {item.title}
            </Typography>
            {!upload && (
              <Stack direction="row" spacing={daily ? 1 : 2} sx={{ mt: daily ? 1 : 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Icon name="users" prefix="fas" sx={{ color: '#ffffff', mr: daily ? 0.5 : 1 }} size={daily ? 14 : 24} />
                  <Box>
                    {!daily && (
                      <Typography
                        sx={{
                          fontSize: 11,
                          lineHeight: '14px',
                          fontWeight: '400',
                          color: '#ffffff',
                          // fontFamily: "'Montserrat', 'Spoqa Han Sans Neo', 'Spoqa Han Sans JP', sans-serif !important",
                        }}
                      >
                        참가자
                      </Typography>
                    )}
                    <Typography
                      sx={{
                        mt: daily ? 0.25 : 0,
                        fontSize: daily ? 14 : 16,
                        lineHeight: '20px',
                        fontWeight: '700',
                        color: '#ffffff',
                        // fontFamily: "'Montserrat', 'Spoqa Han Sans Neo', 'Spoqa Han Sans JP', sans-serif !important",
                      }}
                    >
                      {`${comma(item.ground_3)}${daily ? '' : '명'}`}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Icon name="coins" prefix="fas" sx={{ color: '#ffffff', mr: daily ? 0.5 : 1 }} size={daily ? 14 : 24} />
                  <Box>
                    {!daily && (
                      <Typography
                        sx={{
                          fontSize: 11,
                          lineHeight: '14px',
                          fontWeight: '400',
                          color: '#ffffff',
                          // fontFamily: "'Montserrat', 'Spoqa Han Sans Neo', 'Spoqa Han Sans JP', sans-serif !important",
                        }}
                      >
                        포인트
                      </Typography>
                    )}
                    <Typography
                      sx={{
                        mt: daily ? 0.25 : 0,
                        fontSize: daily ? 14 : 16,
                        lineHeight: '20px',
                        fontWeight: '700',
                        color: '#ffffff',
                        // fontFamily: "'Montserrat', 'Spoqa Han Sans Neo', 'Spoqa Han Sans JP', sans-serif !important",
                      }}
                    >
                      {/* {item.ground_5 === '' ? '--명' : item.ground_5 + '명'} */}
                      {`${daily ? comma(10) : comma(50)}${daily ? '' : '원'}`}
                    </Typography>
                  </Box>
                </Box>
                {!daily && (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Icon name="hands-heart" prefix="fas" sx={{ color: '#ffffff', mr: 1 }} />
                    <Box>
                      <Typography
                        sx={{
                          fontSize: 11,
                          lineHeight: '14px',
                          fontWeight: '400',
                          color: '#ffffff',
                          // fontFamily: "'Montserrat', 'Spoqa Han Sans Neo', 'Spoqa Han Sans JP', sans-serif !important",
                        }}
                      >
                        숲 조성금
                      </Typography>
                      <Typography
                        sx={{
                          mt: 0,
                          fontSize: daily ? 14 : 16,
                          lineHeight: '20px',
                          fontWeight: '700',
                          color: '#ffffff',
                          // fontFamily: "'Montserrat', 'Spoqa Han Sans Neo', 'Spoqa Han Sans JP', sans-serif !important",
                        }}
                      >
                        200원
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Stack>
            )}
          </Box>
          {!upload && daily && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                right: 0,
                transform: 'translateY(-50%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                p: 2,
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px solid #ffffff',
                }}
              >
                <Icon name={dailyIcon} prefix="fal" sx={{ color: '#ffffff' }} />
              </Box>
            </Box>
          )}
          {upload && checked && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                right: 0,
                transform: 'translateY(-50%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                p: 2,
              }}
            >
              <Icon name="check" sx={{ color: '#ffffff' }} />
              <Typography
                sx={{
                  fontSize: 11,
                  lineHeight: '14px',
                  color: '#ffffff',
                  mt: 0.5,
                  textAlign: 'center',
                }}
              >
                {'금일 완료'}
              </Typography>
            </Box>
          )}
        </ButtonBase>
      </Paper>
      {upload && !checked && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            right: 0,
            transform: 'translateY(-50%)',
            zIndex: 99999,
          }}
          onClick={handleClickUpload}
          // onMouseDown={handleMouseDown}
        >
          <ButtonBase
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              p: 2,
            }}
          >
            <Icon name="edit" sx={{ color: '#ffffff' }} />
            <Typography
              sx={{
                fontSize: 11,
                lineHeight: '14px',
                color: '#ffffff',
                mt: 0.5,
                textAlign: 'center',
              }}
            >
              {'업로드하기'}
            </Typography>
          </ButtonBase>
        </Box>
      )}
    </Box>
  );
}
