import type { NextPage } from "next";
import { useRouter } from "next/router";
import { alpha, AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

const Page: NextPage = () => {
  const router = useRouter();
  const [className, setClassName] = useState<string>("");
  useEffect(() => {
    setTimeout(() => {
      setClassName("shown");
    }, 1000);
    return () => {
      setClassName("");
    };
  }, []);
  useEffect(() => {}, []);
  const handleClickLogin = () => router.push("/login");
  const handleClickSignup = () => router.push("/signup");
  const handleClickSNS = () => router.push("/sns");
  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <AppBar
        component="div"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          pt: "var(--sait)",
        }}
        elevation={0}
      >
        <Container>
          <Toolbar
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              pl: "0 !important",
              pr: "0 !important",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <img
                src={"/images/main_logo.png"}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "auto",
                  height: 40,
                }}
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              "& video": {
                objectFit: "cover",
                zIndex: -1,
                minheight: "100%",
              },
              "&::after": {
                position: "absolute",
                content: '""',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.8))",
                zIndex: 1,
              },
            }}
          >
            <video playsInline src={"/videos/main.mp4"} muted loop autoPlay width="100%" height="100%" />
          </Box>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99,
          }}
        >
          <Container
            sx={{
              width: "100%",
              maxWidth: 600,
              height: "100%",
              pt: "calc(var(--sait) + 64px + 8px)",
              pb: "calc(var(--saib) + 24px)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ flex: 1 }}></Box>
            <Box sx={{ pb: 2 }}>
              <Box sx={{ mb: 4 }}>
                <Box
                  sx={{
                    transform: "translateX(-100%)",
                    "&.shown": {
                      transform: "translateX(0%)",
                      transition: "all 1s ease",
                      transitionDelay: "0s",
                    },
                  }}
                  className={className}
                >
                  <Typography
                    sx={{
                      fontSize: 56,
                      lineHeight: "64px",
                      WebkitTextStroke: "1px #ffffff",
                      fontWeight: "900",
                      color: "transparent",
                      textAlign: "left",
                      backgroundImage: "url(/images/w_bg.jpeg)",
                      backgroundSize: "0% 100%",
                      "&.shown": {
                        backgroundSize: "101% 100%",
                        transition: "all 1s ease",
                        transitionDelay: "3s",
                      },
                      backgroundRepeat: "no-repeat",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      "&.noStroke": {
                        WebkitTextStroke: "0px #ffffff !important",
                      },
                    }}
                    className={className}
                  >
                    React-Boilerplate로
                  </Typography>
                </Box>
                <Box
                  sx={{
                    transform: "translateX(-100%)",
                    "&.shown": {
                      transform: "translateX(0%)",
                      transition: "all 1s ease",
                      transitionDelay: "1s",
                    },
                  }}
                  className={className}
                >
                  <Typography
                    sx={{
                      fontSize: 56,
                      lineHeight: "64px",
                      WebkitTextStroke: "1px #ffffff",
                      fontWeight: "900",
                      color: "transparent",
                      textAlign: "left",
                      backgroundImage: "url(/images/w_bg.jpeg)",
                      backgroundSize: "0% 100%",
                      "&.shown": {
                        backgroundSize: "101% 100%",
                        transition: "all 1s ease",
                        transitionDelay: "4s",
                      },
                      backgroundRepeat: "no-repeat",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      "&.noStroke": {
                        WebkitTextStroke: "0px #ffffff !important",
                      },
                    }}
                    className={className}
                  >
                    개발을
                  </Typography>
                </Box>
                <Box
                  sx={{
                    transform: "translateX(-100%)",
                    "&.shown": {
                      transform: "translateX(0%)",
                      transition: "all 1s ease",
                      transitionDelay: "2s",
                    },
                  }}
                  className={className}
                >
                  <Typography
                    sx={{
                      fontSize: 56,
                      lineHeight: "64px",
                      WebkitTextStroke: "1px #ffffff",
                      fontWeight: "900",
                      color: "transparent",
                      textAlign: "left",
                      backgroundImage: "url(/images/w_bg.jpeg)",
                      backgroundSize: "0% 100%",
                      "&.shown": {
                        backgroundSize: "101% 100%",
                        transition: "all 1s ease",
                        transitionDelay: "5s",
                      },
                      backgroundRepeat: "no-repeat",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      "&.noStroke": {
                        WebkitTextStroke: "0px #ffffff !important",
                      },
                    }}
                    className={className}
                  >
                    편리하게
                  </Typography>
                </Box>
              </Box>
              <Button fullWidth variant="contained" onClick={handleClickLogin}>
                이메일로 로그인
              </Button>
              <Button fullWidth variant="outlined" sx={{ mt: 1 }} onClick={handleClickSNS}>
                SNS 로그인
              </Button>
              <Button fullWidth variant="outlined" sx={{ mt: 1 }} onClick={handleClickSignup}>
                이메일로 회원가입
              </Button>
              <Button fullWidth variant="text" sx={{ mt: 1 }} onClick={() => router.push("/home")}>
                넘어가기
              </Button>
              <Typography
                sx={{
                  mt: 2,
                  textAlign: "center",
                  fontSize: 12,
                  lineHeight: "16px",
                  color: alpha("#ffffff", 0.6),
                }}
              >
                화원가입시 React-Boilerplate의{" "}
                <b onClick={() => router.push("/terms/service")}>
                  <u>서비스이용약관</u>
                </b>
                과{" "}
                <b onClick={() => router.push("/terms/privacy")}>
                  <u>개인정보처리방침</u>
                </b>
                에<br />
                동의한 것으로 간주됩니다.
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
