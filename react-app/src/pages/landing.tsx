import { useRouter } from 'next/router';
import { alpha, Paper, Stack, Box, Container, Typography, Button, IconButton } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
// 리코일의 로딩 관리. <Suspense/> 대신.
// https://blog.woolta.com/categories/1/posts/209
// state : 비동기 상태를 나타내며 hasValue(값이 존재하는 상태), loading(로딩중), hasError(에러발생) 3가지 상태가 존재합니다.
// if(user.state === 'hasError' )
// contents : 비동기 통신의 결과값입니다.
// const user = useRecoilValueLoadable(userState);
import { blue, blueGrey, cyan, lightBlue, pink, teal, grey } from '@mui/material/colors';
import Icon from '../components/atoms/Icon';
import { drawerState } from '../recoil/modal';
import Visual from '../components/atoms/Visual';
import ReactPlayer from 'react-player';
import { sendMessage } from '../utils/sendMessage';
export default function App() {
  const router = useRouter();
  const [height, setHeight] = useState<string | number>('100vh');
  if (typeof window !== 'undefined') {
    useEffect(() => {
      const measure: any = document.querySelector('.measure');
      measure.style.setProperty('--height', `${window.innerHeight}px`);
      window.addEventListener('resize', () => {
        measure.style.setProperty('--height', `${window.innerHeight}px`);
      });
      window.addEventListener('scroll', () => {
        measure.style.setProperty('--height', `${window.innerHeight}px`);
      });
    }, [window]);
  }
  const handleClickBack = () => {
    router.back();
  };
  return (
    <Box
      sx={{
        with: '100%',
        height: '100vh',
        maxHeight: 'var(--height)',
        // pt: "calc(var(--sait))",
        // pb: "calc(var(--saib))",
        transition: 'all 1s ease',
        '& .mob': {
          display: 'none',
          '@media (max-width: 767px)': {
            display: 'initial',
          },
        },
        '& .desktop': {
          display: 'initial',
          '@media (max-width: 767px)': {
            display: 'none',
          },
        },
      }}
      className="measure"
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'auto',
          transition: 'all 1s ease',
          scrollSnapType: 'y mandatory',
          maxHeight: 'var(--height)',
          '& *': {
            fontFamily: 'Noto Sans KR !important',
            '& b': {
              fontWeight: '900',
            },
          },
        }}
        onScroll={(e) => {
          var home: any = document.querySelectorAll('.home');
          var bar: any = document.querySelectorAll('.bar');
          var bars: any = document.querySelectorAll('.bars');
          bar[0].style.top = `${(home[0].scrollTop / 7) * 0.3}px`;
          // for (var i = 0; i < bars.length; i++) {
          //   if (home[0].scrollTop > window.innerHeight * 0.5 && home[0].scrollTop < window.innerHeight * 2.5) {
          //     bar[0].style.background = "rgba(0,0,0,0.6)";
          //     bars[i].style.background = "rgba(0,0,0,0.1)";
          //   } else {
          //     bar[0].style.background = "rgba(255,255,255,0.6)";
          //     bars[i].style.background = "rgba(255,255,255,0.1)";
          //   }
          // }
        }}
        className="home"
      >
        <Stack
          spacing={'2px'}
          sx={{
            position: 'fixed',
            top: '50%',
            transform: 'translateY(-50%)',
            left: 48,
            height: '30%',
            width: 8,
            borderRadius: 2,
            overflow: 'hidden',
            zIndex: 999,
            '@media (max-width: 767px)': {
              left: 8,
            },
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              background: 'rgba(255,255,255,0.6)',
              height: `${100 / 7}%`,
              borderRadius: 2,
            }}
            className="bar"
          />
          {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
            <Box
              key={index}
              sx={{
                flex: 1,
                backgroundColor: 'rgba(255,255,255,0.1)',
                transition: 'all 1s ease',
                cursor: 'pointer',
              }}
              className="bars"
              onClick={() => {
                var home: any = document.querySelector('.home');
                var section: any = document.querySelector(`.section${index + 1}`);
                if (home !== null) {
                  home.scrollBy({ top: section.getBoundingClientRect().top, behavior: 'smooth' });
                }
              }}
            />
          ))}
        </Stack>
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 999,
            background: 'transparent',
            transition: 'all 0.5s ease',
            pt: 'var(--sait)',
          }}
        >
          <Container sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleClickBack} sx={{ ml: -2 }}>
              <Icon name="arrow-left" size={20} sx={{ color: '#ffffff' }} />
            </IconButton>
          </Container>
        </Box>
        <FirstSection />
        <SecondSection />
        <ThirdSection />
        <FourthSection />
        <FifthSection />
        <SixthSection />
        <SeventhSection />
      </Box>
    </Box>
  );
}
function FirstSection() {
  const router = useRouter();
  const { ref, inView, entry } = useInView({
    threshold: 0.5,
  });
  const [className, setClassName] = useState<string>('');
  const [playing, setPlaying] = useState<boolean>(false);
  const [drawer, setDrawer] = useRecoilState(drawerState);
  useEffect(() => {
    if (inView) {
      setClassName('shown');
      setTimeout(() => {
        setPlaying(true);
      }, 1000);
      setTimeout(() => {
        setClassName('shown noStroke');
      }, 2000);
    } else {
      // setClassName("");
      setPlaying(false);
    }
  }, [inView]);
  const handleClickBeta = () => {
    setDrawer({ ...drawer, open: true });
  };
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
        maxHeight: 'var(--height)',
        scrollSnapAlign: 'center',
      }}
      className="section1"
    >
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            '& video': {
              objectFit: 'cover',
              zIndex: -1,
              minheight: '100%',
            },
            '&::after': {
              position: 'absolute',
              content: '""',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.6)',
              zIndex: 1,
            },
          }}
        >
          <ReactPlayer
            playsinline
            url={'/videos/story.m4v'}
            muted
            loop
            playing={playing}
            width="100%"
            height="100%"
            config={{
              file: {
                attributes: {
                  poster: '/images/donation.png',
                },
              },
            }}
          />
        </Box>
      </Box>
      <Container ref={ref} sx={{ maxHeight: 'var(--height)', width: '100%', height: '100%', zIndex: 2 }}>
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  '@media (max-width: 767px)': {
                    flexDirection: 'column',
                    justifyContent: 'center',
                  },
                }}
              >
                <Box
                  sx={{
                    width: '60%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    pt: 8,
                    pb: 8,
                    '@media (max-width: 767px)': {
                      width: '100%',
                    },
                  }}
                >
                  <Box
                    sx={{
                      transform: 'translateX(-100%)',
                      '&.shown': {
                        transform: 'translateX(0%)',
                        transition: 'all 1s ease',
                        transitionDelay: '0s',
                      },
                    }}
                    className={className}
                  >
                    <Typography
                      sx={{
                        fontSize: 72,
                        lineHeight: '80px',
                        WebkitTextStroke: '1px #ffffff',
                        fontWeight: '900',
                        color: 'transparent',
                        textAlign: 'left',
                        backgroundImage: 'url(/images/w_bg.jpeg)',
                        backgroundSize: '0% 100%',
                        '&.shown': {
                          backgroundSize: '101% 100%',
                          transition: 'all 1s ease',
                          transitionDelay: '1s',
                        },
                        backgroundRepeat: 'no-repeat',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        '@media (max-width: 767px)': {
                          fontSize: 56,
                          lineHeight: '64px',
                          textAlign: 'center',
                          WebkitTextStroke: '1px #ffffff',
                        },
                        '&.noStroke': {
                          WebkitTextStroke: '0px #ffffff !important',
                        },
                      }}
                      className={className}
                    >
                      동원샘물이
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      transform: 'translateX(-100%)',
                      '&.shown': {
                        transform: 'translateX(0%)',
                        transition: 'all 1s ease',
                        transitionDelay: '0s',
                      },
                    }}
                    className={className}
                  >
                    <Typography
                      sx={{
                        fontSize: 72,
                        lineHeight: '80px',
                        WebkitTextStroke: '1px #ffffff',
                        fontWeight: '900',
                        color: 'transparent',
                        textAlign: 'left',
                        backgroundImage: 'url(/images/w_bg.jpeg)',
                        backgroundSize: '0% 100%',
                        '&.shown': {
                          backgroundSize: '101% 100%',
                          transition: 'all 1s ease',
                          transitionDelay: '1s',
                        },
                        backgroundRepeat: 'no-repeat',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        '@media (max-width: 767px)': {
                          fontSize: 56,
                          lineHeight: '64px',
                          textAlign: 'center',
                          WebkitTextStroke: '1px #ffffff',
                        },
                        '&.noStroke': {
                          WebkitTextStroke: '0px #ffffff !important',
                        },
                      }}
                      className={className}
                    >
                      [React-Boilerplate] 하는
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      transform: 'translateX(-100%)',
                      '&.shown': {
                        transform: 'translateX(0%)',
                        transition: 'all 1s ease',
                        transitionDelay: '0s',
                      },
                    }}
                    className={className}
                  >
                    <Typography
                      sx={{
                        fontSize: 72,
                        lineHeight: '80px',
                        WebkitTextStroke: '1px #ffffff',
                        fontWeight: '900',
                        color: 'transparent',
                        textAlign: 'left',
                        backgroundImage: 'url(/images/w_bg.jpeg)',
                        backgroundSize: '0% 100%',
                        '&.shown': {
                          backgroundSize: '101% 100%',
                          transition: 'all 1s ease',
                          transitionDelay: '1s',
                        },
                        backgroundRepeat: 'no-repeat',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        '@media (max-width: 767px)': {
                          fontSize: 56,
                          lineHeight: '64px',
                          textAlign: 'center',
                          WebkitTextStroke: '1px #ffffff',
                        },
                        '&.noStroke': {
                          WebkitTextStroke: '0px #ffffff !important',
                        },
                      }}
                      className={className}
                    >
                      이야기
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      pt: 0,
                      height: 0,
                      overflow: 'hidden',
                      '&.shown': {
                        pt: 4,
                        height: 'calc(40px + 32px)',
                        transition: 'all 1s ease',
                        transitionDelay: '2s',
                        '@media (max-width: 767px)': {
                          height: 'calc(28px + 32px)',
                        },
                      },
                    }}
                    className={className}
                  >
                    <Typography
                      sx={{
                        fontSize: 32,
                        lineHeight: '40px',
                        color: '#ffffff',
                        fontWeight: '300',
                        '@media (max-width: 767px)': {
                          fontSize: 20,
                          lineHeight: '28px',
                          textAlign: 'center',
                        },
                        '& b': {
                          fontWeight: '900',
                        },
                        '&:before': {
                          position: 'absolute',
                          fontWeight: '900',
                          top: 0,
                          left: 0,
                          right: 0,
                          zIndex: 2,
                          opacity: 0,
                          '@media (max-width: 767px)': {
                            top: -2,
                          },
                        },
                        '&.shown b:before': {
                          opacity: 1,
                          transition: 'all 1s ease',
                          transitionDelay: '2s',
                        },
                      }}
                      className={className}
                    >
                      <b>동원샘물</b>이 말합니다.
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      position: 'relative',
                      mt: 0,
                      height: 0,
                      overflow: 'hidden',
                      '&.shown': {
                        height: '40px',
                        transition: 'all 1s ease',
                        transitionDelay: '2s',
                        '@media (max-width: 767px)': {
                          height: 'calc(28px)',
                        },
                      },
                      // "&:before": {
                      //   position: "absolute",
                      //   content: '""',
                      //   fontWeight: "900",
                      //   height: "24px",
                      //   backgroundColor: lightBlue[500],
                      //   bottom: -4,
                      //   left: 146,
                      //   width: 0,
                      //   zIndex: 0,
                      //   opacity: 0,
                      //   "@media (max-width: 767px)": {
                      //     left: "50%",
                      //     transform: "translateX(-31px)",
                      //     bottom: -2,
                      //   },
                      // },
                      // "&.shown:before": {
                      //   opacity: 1,
                      //   height: "16px",
                      //   width: 120,
                      //   "@media (max-width: 767px)": {
                      //     height: "12px",
                      //     width: 80,
                      //   },
                      //   transition: "all 1s ease",
                      //   transitionDelay: "5s",
                      // },
                    }}
                    className={className}
                  >
                    <Typography
                      sx={{
                        position: 'relative',
                        fontSize: 32,
                        lineHeight: '40px',
                        color: '#ffffff',
                        fontWeight: '300',
                        '@media (max-width: 767px)': {
                          fontSize: 20,
                          lineHeight: '28px',
                          textAlign: 'center',
                        },
                        '& b': {
                          fontWeight: '900',
                        },
                      }}
                      className={className}
                    >
                      당신과 세상을 건강하게.
                    </Typography>
                  </Box>
                  {/* <Box
                    sx={{
                      pt: 0,
                      height: 0,
                      overflow: 'hidden',
                      '&.shown': {
                        pt: 6,
                        height: 'calc(72px + 48px)',
                        transition: 'all 1s ease',
                        transitionDelay: '3s',
                        '@media (max-width: 767px)': {
                          display: 'flex',
                          justifyContent: 'center',
                          height: 'calc(48px + 48px)',
                        },
                      },
                    }}
                    className={className}
                  >
                    <Button
                      color="primary"
                      sx={{
                        minHeight: 72,
                        fontSize: 24,
                        pl: 6,
                        pr: 6,
                        display: 'block',
                        '@media (max-width: 767px)': {
                          minHeight: 48,
                          fontSize: 16,
                          pl: 3,
                          pr: 3,
                        },
                      }}
                      onClick={handleClickBeta}
                    >
                      <>
                        {'지금 바로 '}
                        <b>{' 사전접수'}</b>
                      </>
                    </Button>
                  </Box> */}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
function SecondSection() {
  const router = useRouter();
  const { ref, inView, entry } = useInView({
    threshold: 0.5,
  });
  const [className, setClassName] = useState<string>('');
  const [playing, setPlaying] = useState<boolean>(false);
  const [drawer, setDrawer] = useRecoilState(drawerState);
  useEffect(() => {
    if (inView) {
      setClassName('shown');
      setTimeout(() => {
        setPlaying(true);
      }, 1000);
    } else {
      // setClassName("");
      setPlaying(false);
    }
  }, [inView]);
  const handleClickBeta = () => {
    setDrawer({ ...drawer, open: true });
  };
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
        maxHeight: 'var(--height)',
        scrollSnapAlign: 'center',
      }}
      className="section2"
    >
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <Visual
          src="/images/donation.png"
          sx={{
            width: 'auto',
            height: '100%',
            '& img': {
              width: 'auto',
              height: '100%',
            },
            '&:after': {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.6)',
              content: '""',
              zIndex: 1,
            },
          }}
        />
      </Box>
      <Container ref={ref} sx={{ maxHeight: 'var(--height)', width: '100%', height: '100%', zIndex: 2 }}>
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',

              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  fontSize: 48,
                  lineHeight: '56px',
                  fontWeight: '700',
                  textAlign: 'center',
                  color: '#ffffff',
                  transform: 'translateY(100%)',
                  opacity: 0,
                  '&.shown': {
                    transform: 'translateY(0%)',
                    opacity: 1,
                    transition: 'all 1s ease',
                    transitionDelay: '0s',
                  },
                  '& br': { display: 'none' },
                  '@media (max-width: 767px)': {
                    fontSize: 24,
                    lineHeight: '28px',
                    '& br': {
                      display: 'block',
                    },
                  },
                  '& b': {
                    color: lightBlue[500],
                  },
                }}
                className={className}
              >
                동원샘물은 <br />
                <b>물로 건강한 세상</b>을 꿈꿉니다.
              </Typography>
              <Typography
                sx={{
                  mt: 4,
                  maxWidth: '60%',
                  fontSize: 24,
                  lineHeight: '32px',
                  fontWeight: '400',
                  textAlign: 'center',
                  color: '#ffffff',
                  transform: 'translateY(100%)',
                  opacity: 0,
                  '&.shown': {
                    transform: 'translateY(0%)',
                    opacity: 1,
                    transition: 'all 1s ease',
                    transitionDelay: '1s',
                  },
                  '@media (max-width: 767px)': {
                    mt: 2,
                    fontSize: 14,
                    lineHeight: '20px',
                  },
                }}
                className={className}
              >
                챌린지 앱 <b>[물로]</b>는 <b>동원샘물</b>이 <br className="mob" />
                고객들과 <br className="desktop" />
                건강한 세상을 <br className="mob" />
                만들어 나가기 위해서 만들었습니다.
              </Typography>
              {/* <Button
                color="primary"
                sx={{
                  mt: 6,
                  minHeight: 72,
                  fontSize: 24,
                  pl: 6,
                  pr: 6,
                  display: 'block',
                  transform: 'translateY(100%)',
                  opacity: 0,
                  '&.shown': {
                    transform: 'translateY(0%)',
                    opacity: 1,
                    transition: 'all 1s ease',
                    transitionDelay: '2s',
                  },
                  '@media (max-width: 767px)': {
                    mt: 3,
                    minHeight: 48,
                    fontSize: 16,
                    pl: 3,
                    pr: 3,
                  },
                }}
                onClick={handleClickBeta}
                className={className}
              >
                <>
                  {'물로 앱 '}
                  <b>{' 사전접수'}</b>
                </>
              </Button> */}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
function ThirdSection() {
  const router = useRouter();
  const { ref, inView, entry } = useInView({
    threshold: 0.5,
  });
  const [className, setClassName] = useState<string>('');
  const [playing, setPlaying] = useState<boolean>(false);
  const [drawer, setDrawer] = useRecoilState(drawerState);
  useEffect(() => {
    if (inView) {
      setClassName('shown');
      setTimeout(() => {
        setPlaying(true);
      }, 1000);
    } else {
      // setClassName("");
      setPlaying(false);
    }
  }, [inView]);
  const handleClickBeta = () => {
    setDrawer({ ...drawer, open: true });
  };
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
        maxHeight: 'var(--height)',
        scrollSnapAlign: 'center',
      }}
      className="section3"
    >
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <Visual
          src="/images/donation.png"
          sx={{
            width: 'auto',
            height: '100%',
            '& img': {
              width: 'auto',
              height: '100%',
            },
            '&:after': {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.6)',
              content: '""',
              zIndex: 1,
            },
          }}
        />
      </Box>
      <Container ref={ref} sx={{ maxHeight: 'var(--height)', width: '100%', height: '100%', zIndex: 2 }}>
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',

              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  fontSize: 48,
                  lineHeight: '56px',
                  fontWeight: '700',
                  textAlign: 'center',
                  color: '#ffffff',
                  transform: 'translateY(100%)',
                  opacity: 0,
                  '&.shown': {
                    transform: 'translateY(0%)',
                    opacity: 1,
                    transition: 'all 1s ease',
                    transitionDelay: '0s',
                  },
                  '& br': { display: 'none' },
                  '@media (max-width: 767px)': {
                    fontSize: 24,
                    lineHeight: '28px',
                    '& br': {
                      display: 'block',
                    },
                  },
                  '& b': {
                    color: lightBlue[500],
                  },
                }}
                className={className}
              >
                세상을 건강하게 만드는 <br />
                <b>일상의 힘.</b>
              </Typography>
              <Typography
                sx={{
                  mt: 4,
                  maxWidth: '60%',
                  minWidth: '220px',
                  fontSize: 24,
                  lineHeight: '32px',
                  fontWeight: '400',
                  textAlign: 'center',
                  color: '#ffffff',
                  transform: 'translateY(100%)',
                  opacity: 0,
                  '&.shown': {
                    transform: 'translateY(0%)',
                    opacity: 1,
                    transition: 'all 1s ease',
                    transitionDelay: '1s',
                  },
                  '@media (max-width: 767px)': {
                    mt: 2,
                    fontSize: 14,
                    lineHeight: '20px',
                  },
                }}
                className={className}
              >
                건강한 움직임에는{' '}
                <b>
                  주변 사람들을 <br className="mob" />
                  움직이는 힘
                </b>
                이 있습니다. <br />
                <b>동원샘물</b>은 개인의 건강한 일상이 모여 <br />
                세상이 건강해진다 믿습니다.
              </Typography>
              {/* <Button
                color="primary"
                sx={{
                  mt: 6,
                  minHeight: 72,
                  fontSize: 24,
                  pl: 6,
                  pr: 6,
                  display: 'block',
                  transform: 'translateY(100%)',
                  opacity: 0,
                  '&.shown': {
                    transform: 'translateY(0%)',
                    opacity: 1,
                    transition: 'all 1s ease',
                    transitionDelay: '2s',
                  },
                  '@media (max-width: 767px)': {
                    mt: 3,
                    minHeight: 48,
                    fontSize: 16,
                    pl: 3,
                    pr: 3,
                  },
                }}
                onClick={handleClickBeta}
                className={className}
              >
                <>
                  {'물로 앱 '}
                  <b>{' 사전접수'}</b>
                </>
              </Button> */}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
function FourthSection() {
  const router = useRouter();
  const { ref, inView, entry } = useInView({
    threshold: 0.5,
  });
  const [className, setClassName] = useState<string>('');
  const [playing, setPlaying] = useState<boolean>(false);
  const [drawer, setDrawer] = useRecoilState(drawerState);
  useEffect(() => {
    if (inView) {
      setClassName('shown');
      setTimeout(() => {
        setPlaying(true);
      }, 1000);
    } else {
      // setClassName("");
      setPlaying(false);
    }
  }, [inView]);
  const handleClickBeta = () => {
    setDrawer({ ...drawer, open: true });
  };
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
        maxHeight: 'var(--height)',
        scrollSnapAlign: 'center',
      }}
      className="section4"
    >
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <Visual
          src="/images/donation.png"
          sx={{
            width: 'auto',
            height: '100%',
            '& img': {
              width: 'auto',
              height: '100%',
            },
            '&:after': {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.6)',
              content: '""',
              zIndex: 1,
            },
          }}
        />
      </Box>
      <Container ref={ref} sx={{ maxHeight: 'var(--height)', width: '100%', height: '100%', zIndex: 2 }}>
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',

              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  fontSize: 48,
                  lineHeight: '56px',
                  fontWeight: '700',
                  textAlign: 'center',
                  color: '#ffffff',
                  transform: 'translateY(100%)',
                  opacity: 0,
                  '&.shown': {
                    transform: 'translateY(0%)',
                    opacity: 1,
                    transition: 'all 1s ease',
                    transitionDelay: '0s',
                  },
                  '& br': { display: 'none' },
                  '@media (max-width: 767px)': {
                    fontSize: 24,
                    lineHeight: '28px',
                    '& br': {
                      display: 'block',
                    },
                  },
                  '& b': {
                    color: lightBlue[500],
                  },
                }}
                className={className}
              >
                <b>지속가능한 건강함</b>을 <br />
                찾습니다.
              </Typography>
              <Typography
                sx={{
                  mt: 4,
                  maxWidth: '60%',
                  fontSize: 24,
                  lineHeight: '32px',
                  fontWeight: '400',
                  textAlign: 'center',
                  color: '#ffffff',
                  transform: 'translateY(100%)',
                  opacity: 0,
                  '&.shown': {
                    transform: 'translateY(0%)',
                    opacity: 1,
                    transition: 'all 1s ease',
                    transitionDelay: '1s',
                  },
                  '@media (max-width: 767px)': {
                    mt: 2,
                    fontSize: 14,
                    lineHeight: '20px',
                  },
                }}
                className={className}
              >
                건강한 자연이 만들어낸 좋은 물,
                <br />
                <b>동원샘물</b>이 다시 건강한 자연을 <br className="mob" />
                지키겠습니다.
              </Typography>
              {/* <Button
                color="primary"
                sx={{
                  mt: 6,
                  minHeight: 72,
                  fontSize: 24,
                  pl: 6,
                  pr: 6,
                  display: 'block',
                  transform: 'translateY(100%)',
                  opacity: 0,
                  '&.shown': {
                    transform: 'translateY(0%)',
                    opacity: 1,
                    transition: 'all 1s ease',
                    transitionDelay: '2s',
                  },
                  '@media (max-width: 767px)': {
                    mt: 3,
                    minHeight: 48,
                    fontSize: 16,
                    pl: 3,
                    pr: 3,
                  },
                }}
                onClick={handleClickBeta}
                className={className}
              >
                <>
                  {'물로 앱 '}
                  <b>{' 사전접수'}</b>
                </>
              </Button> */}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
function FifthSection() {
  const router = useRouter();
  const { ref, inView, entry } = useInView({
    threshold: 0.5,
  });
  const [className, setClassName] = useState<string>('');
  const [playing, setPlaying] = useState<boolean>(false);
  const [drawer, setDrawer] = useRecoilState(drawerState);
  useEffect(() => {
    if (inView) {
      setClassName('shown');
      setTimeout(() => {
        setPlaying(true);
      }, 1000);
    } else {
      // setClassName("");
      setPlaying(false);
    }
  }, [inView]);
  const handleClickBeta = () => {
    setDrawer({ ...drawer, open: true });
  };
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
        maxHeight: 'var(--height)',
        scrollSnapAlign: 'center',
      }}
      className="section5"
    >
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <Visual
          src="/images/donation.png"
          sx={{
            width: 'auto',
            height: '100%',
            '& img': {
              width: 'auto',
              height: '100%',
            },
            '&:after': {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.6)',
              content: '""',
              zIndex: 1,
            },
          }}
        />
      </Box>
      <Container ref={ref} sx={{ maxHeight: 'var(--height)', width: '100%', height: '100%', zIndex: 2 }}>
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',

              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  fontSize: 48,
                  lineHeight: '56px',
                  fontWeight: '700',
                  textAlign: 'center',
                  color: '#ffffff',
                  transform: 'translateY(100%)',
                  opacity: 0,
                  '&.shown': {
                    transform: 'translateY(0%)',
                    opacity: 1,
                    transition: 'all 1s ease',
                    transitionDelay: '0s',
                  },
                  '& br': { display: 'none' },
                  '@media (max-width: 767px)': {
                    fontSize: 24,
                    lineHeight: '28px',
                    '& br': {
                      display: 'block',
                    },
                  },
                  '& b': {
                    color: lightBlue[500],
                  },
                }}
                className={className}
              >
                물마시기부터 만들어내는 <br />
                <b>사회적 가치.</b>
              </Typography>
              <Typography
                sx={{
                  mt: 4,
                  maxWidth: '60%',
                  minWidth: '220px',
                  fontSize: 24,
                  lineHeight: '32px',
                  fontWeight: '400',
                  textAlign: 'center',
                  color: '#ffffff',
                  transform: 'translateY(100%)',
                  opacity: 0,
                  '&.shown': {
                    transform: 'translateY(0%)',
                    opacity: 1,
                    transition: 'all 1s ease',
                    transitionDelay: '1s',
                  },
                  '@media (max-width: 767px)': {
                    mt: 2,
                    fontSize: 14,
                    lineHeight: '20px',
                  },
                }}
                className={className}
              >
                <b>사소한 일상의 실천</b>으로 나, 우리, <br />
                사회, 환경 모두가 건강해지는 챌린지,
                <br />
                일상의 아주 작은 습관 <br className="mob" />
                <b>물마시기</b>부터 시작합니다
              </Typography>
              {/* <Button
                color="primary"
                sx={{
                  mt: 6,
                  minHeight: 72,
                  fontSize: 24,
                  pl: 6,
                  pr: 6,
                  display: 'block',
                  transform: 'translateY(100%)',
                  opacity: 0,
                  '&.shown': {
                    transform: 'translateY(0%)',
                    opacity: 1,
                    transition: 'all 1s ease',
                    transitionDelay: '2s',
                  },
                  '@media (max-width: 767px)': {
                    mt: 3,
                    minHeight: 48,
                    fontSize: 16,
                    pl: 3,
                    pr: 3,
                  },
                }}
                onClick={handleClickBeta}
                className={className}
              >
                <>
                  {'물로 앱 '}
                  <b>{' 사전접수'}</b>
                </>
              </Button> */}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
function SixthSection() {
  const router = useRouter();
  const { ref, inView, entry } = useInView({
    threshold: 0.5,
  });
  const [className, setClassName] = useState<string>('');
  const [playing, setPlaying] = useState<boolean>(false);
  const [drawer, setDrawer] = useRecoilState(drawerState);
  useEffect(() => {
    if (inView) {
      setClassName('shown');
      setTimeout(() => {
        setPlaying(true);
      }, 1000);
    } else {
      // setClassName("");
      setPlaying(false);
    }
  }, [inView]);
  const handleClickBeta = () => {
    setDrawer({ ...drawer, open: true });
  };
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
        maxHeight: 'var(--height)',
        scrollSnapAlign: 'center',
        backgroundImage: 'url(/images/main_logo.png)',
        backgroundSize: 'auto 100vh',
        backgroundRepeat: 'repeat-x',
        animation: 'scroll 60s linear infinite',
        '&:after': {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          content: '""',
          zIndex: 1,
        },
      }}
      className="section6"
    >
      <Container ref={ref} sx={{ maxHeight: 'var(--height)', width: '100%', height: '100%', zIndex: 2 }}>
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',

              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  fontSize: 48,
                  lineHeight: '56px',
                  fontWeight: '700',
                  textAlign: 'center',
                  color: '#ffffff',
                  transform: 'translateY(100%)',
                  opacity: 0,
                  '&.shown': {
                    transform: 'translateY(0%)',
                    opacity: 1,
                    transition: 'all 1s ease',
                    transitionDelay: '0s',
                  },
                  '& br': { display: 'none' },
                  '@media (max-width: 767px)': {
                    fontSize: 24,
                    lineHeight: '28px',
                    '& br': {
                      display: 'block',
                    },
                  },
                }}
                className={className}
              >
                #물로 챌린지
              </Typography>
              <Typography
                sx={{
                  mt: 4,
                  maxWidth: '60%',
                  fontSize: 24,
                  lineHeight: '32px',
                  fontWeight: '400',
                  textAlign: 'center',
                  color: '#ffffff',
                  transform: 'translateY(100%)',
                  opacity: 0,
                  '&.shown': {
                    transform: 'translateY(0%)',
                    opacity: 1,
                    transition: 'all 1s ease',
                    transitionDelay: '1s',
                  },
                  '@media (max-width: 767px)': {
                    mt: 2,
                    fontSize: 14,
                    lineHeight: '20px',
                  },
                }}
                className={className}
              >
                <b>물로 챌린지</b>는 <br className="desktop" />
                물로 세상을 건강하게 <br className="mob" />
                만든다는 메시지를 담고 있습니다.
                <br />
                건강한 습관을 실천하는 만큼 <br className="mob" />
                <b>숲조성 기금을 마련</b>하여 <br />
                친환경 숲조성 사업에 후원합니다.
              </Typography>
              <Button
                color="primary"
                sx={{
                  mt: 6,
                  minHeight: 72,
                  fontSize: 24,
                  pl: 6,
                  pr: 6,
                  display: 'block',
                  transform: 'translateY(100%)',
                  opacity: 0,
                  '&.shown': {
                    transform: 'translateY(0%)',
                    opacity: 1,
                    transition: 'all 1s ease',
                    transitionDelay: '2s',
                  },
                  '@media (max-width: 767px)': {
                    mt: 3,
                    minHeight: 48,
                    fontSize: 16,
                    pl: 3,
                    pr: 3,
                  },
                }}
                onClick={handleClickBeta}
                className={className}
              >
                <>
                  {'물로 앱 '}
                  <b>{' 사전접수'}</b>
                </>
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
function SeventhSection() {
  const router = useRouter();
  const { ref, inView, entry } = useInView({
    threshold: 0.5,
  });
  const [className, setClassName] = useState<string>('');
  const [playing, setPlaying] = useState<boolean>(false);
  const [drawer, setDrawer] = useRecoilState(drawerState);
  useEffect(() => {
    if (inView) {
      setClassName('shown');
      setTimeout(() => {
        setPlaying(true);
      }, 1000);
    } else {
      // setClassName("");
      setPlaying(false);
    }
  }, [inView]);
  const handleClickCirclin = () => {
    //   setDrawer({ ...drawer, open: true });
    sendMessage({ name: 'linking', body: 'https://www.circlin.co.kr/landing' });
  };
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
        maxHeight: 'var(--height)',
        scrollSnapAlign: 'center',
        backgroundImage: 'url(/images/main_logo.png)',
        backgroundSize: 'auto 100vh',
        backgroundRepeat: 'repeat-x',
        animation: 'scroll 60s linear infinite',
        '&:after': {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          content: '""',
          zIndex: 1,
        },
      }}
      className="section7"
    >
      <Container ref={ref} sx={{ maxHeight: 'var(--height)', width: '100%', height: '100%', zIndex: 2 }}>
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',

              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  fontSize: 48,
                  lineHeight: '56px',
                  fontWeight: '700',
                  textAlign: 'center',
                  color: '#ffffff',
                  transform: 'translateY(100%)',
                  opacity: 0,
                  '&.shown': {
                    transform: 'translateY(0%)',
                    opacity: 1,
                    transition: 'all 1s ease',
                    transitionDelay: '0s',
                  },
                  '& br': { display: 'none' },
                  '@media (max-width: 767px)': {
                    fontSize: 24,
                    lineHeight: '28px',
                    '& br': {
                      display: 'block',
                    },
                  },
                  '& b': {
                    color: '#ff5722',
                  },
                }}
                className={className}
              >
                운동 챌린지 APP <br />
                <b>써클인</b>이 함께 합니다.
              </Typography>
              <Typography
                sx={{
                  mt: 4,
                  maxWidth: '60%',
                  fontSize: 24,
                  lineHeight: '32px',
                  fontWeight: '400',
                  textAlign: 'center',
                  color: '#ffffff',
                  transform: 'translateY(100%)',
                  opacity: 0,
                  '&.shown': {
                    transform: 'translateY(0%)',
                    opacity: 1,
                    transition: 'all 1s ease',
                    transitionDelay: '1s',
                  },
                  '@media (max-width: 767px)': {
                    mt: 2,
                    fontSize: 14,
                    lineHeight: '20px',
                  },
                }}
                className={className}
              >
                물로 앱은 <b>운동 챌린지 앱 써클인</b>이 <br className="mob" />
                <b>동원샘물</b>과 함께 만들었습니다.
                <br />
                건강한 습관으로 세상을 건강하게 <br className="mob" />
                만들어 나가는데 힘쓰겠습니다.
              </Typography>
              <Button
                color="secondary"
                sx={{
                  mt: 6,
                  minHeight: 72,
                  fontSize: 24,
                  pl: 6,
                  pr: 6,
                  display: 'flex',
                  transform: 'translateY(100%)',
                  opacity: 0,
                  backgroundColor: '#ff5722',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#ff5722',
                    borderColor: 'transparent',
                  },
                  '&:active': {
                    borderColor: 'transparent',
                    backgroundColor: '#ff5722',
                  },
                  '&:focus': {
                    borderColor: 'transparent',
                  },
                  '&.shown': {
                    transform: 'translateY(0%)',
                    opacity: 1,
                    transition: 'all 1s ease',
                    transitionDelay: '2s',
                  },
                  '@media (max-width: 767px)': {
                    mt: 3,
                    minHeight: 48,
                    fontSize: 16,
                    pl: 3,
                    pr: 3,
                  },
                }}
                onClick={handleClickCirclin}
                className={className}
              >
                <Box
                  sx={{
                    mr: 2,
                    ml: -1,
                    '@media (max-width: 767px)': {
                      ml: 0,
                      mr: 1,
                      mb: 0.5,
                    },
                    '& img': {
                      height: 28,
                      '@media (max-width: 767px)': {
                        height: 20,
                      },
                    },
                  }}
                >
                  <img src="url(/images/main_logo.png)" />
                </Box>
                <b>{'React-Boilerplate'}</b>
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
