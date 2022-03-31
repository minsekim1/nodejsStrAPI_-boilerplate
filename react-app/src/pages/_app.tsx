import Head from 'next/head';
import { AppProps } from 'next/app';
import { CacheProvider, EmotionCache, Global } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { far } from '@fortawesome/pro-regular-svg-icons';
import { fas } from '@fortawesome/pro-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { atom, RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import reset from '../styles/reset';
import '../styles/main.css';
import { createEmotionCache } from '../utils';
import 'swiper/css';
import 'swiper/css/pagination';
import { theme } from '../themes/theme';
import { Component, useEffect } from 'react';
import router, { useRouter } from 'next/router';
import { deviceTokenUpdateToServer } from '../utils/sendMessage';
import Dialog from '../components/organisms/modal/Dialog';
import Loader from '../components/organisms/modal/Loader';
import HomeHeader from '../components/organisms/header/HomeHeader';
import BottomNav from '../components/organisms/nav/BottomNav';
import Drawer from '../components/organisms/modal/Drawer';
import { Box } from '@mui/material';
import { useState } from 'react';
import { httpLink } from '../utils/apollo';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { localStorageEffect } from '../recoil/config';

library.add(fal, far, fas);

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

declare global {
  interface Window {
    webkit?: any;
  }
}

function MyApp(props: MyAppProps) {
  const router = useRouter();
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  var target: any = { scrollTop: 0 };
  if (typeof document !== 'undefined') target = document.querySelector('#__next');

  //#region 1.안드로이드 푸쉬알림 받으면 항상 아래로옴.
  //        2.안드로이드 백그라운드는 실행 안됨. (포그라운드일때만 옴.)
  // const getAndroidPushMessage: any = (event: androidPushEventType) => {
  //   console.debug(event.detail);
  // };
  const [show, setShow] = useState<boolean>(true);
  useEffect(() => {
    // FCM token 서버로 보내기
    const Window: any = window;
    Window.addEventListener('deviceTokenUpdateToServer', (d: any) => deviceTokenUpdateToServer(d, 'android')); //And
    Window.deviceTokenUpdateToServer = (d: any) => deviceTokenUpdateToServer(d, 'ios'); //iOS
    // postMessage;
    setTimeout(() => setShow(false), 2000);
    return () => {
      Window.removeEventListener('deviceTokenUpdateToServer', (d: any) => deviceTokenUpdateToServer(d, 'android'));
    };
  }, []);
  //#endregion
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta charSet="utf-8" />
        <title>React-boilerplate</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover" />
        <meta name="keywords" content="React-boilerplate" />
        <meta name="description" content="React-boilerplate는 개발을 편리하게 하기 위한 앱입니다." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="React-Boilerplate" />
        <meta property="og:title" content="React-Boilerplate, 개발을 편리하게" />
        <meta property="og:description" content="React-Boilerplate에서 개발을 편리하게 해보세요!" />
        <meta property="og:image" content="/static/share.png" />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
        <meta property="og:image:type" content="image/png" />
        {/* 본인 홈페이지 주소 */}
        {/* <meta property="og:url" content="https://www.naver.com" /> */}
        <meta name="twitter:card" content="summary" data-react-helmet="true" />
        <meta name="twitter:creator" content="" data-react-helmet="true" />
        <meta name="twitter:title" content="React-Boilerplate, 개발을 편리하게" data-react-helmet="true" />
        <meta name="twitter:description" content="React-Boilerplate에서 개발을 편리하게 해보세요!" data-react-helmet="true" />
        <meta name="twitter:image" content="/static/share.png" />
        <meta name="HandheldFriendly" content="true" />
        <link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="57x57" href="/static/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/static/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/static/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/static/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/static/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/static/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/static/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/static/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="144x144" href="/favicon/android-icon-144x144.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/static/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/static/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
        <link rel="manifest" href="/static/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/static/ms-icon-144x144.png" />
        <script src="https://js.pusher.com/3.2/pusher.min.js" />
        {/* <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" /> */}
        {/* "Mixed content blocked" when running an HTTP AJAX operation in an HTTPS page */}
        {/* TODO HTTP를 강제로 HTTPS로 바꿈. API_URL_M localhost에서 사용하려면 주석필요 */}
        {/* <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" /> */}
        {/* <!-- jQuery --> */}
        <script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
      </Head>
      <Global styles={reset} />
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ApolloContainer show={show} pageProps={pageProps} Component={Component} router={router} />
        </ThemeProvider>
      </RecoilRoot>
    </CacheProvider>
  );
}

export const tokenState = atom<string | null>({
  key: 'recoil/token',
  default: null,
  effects_UNSTABLE: [localStorageEffect('recoil/cache/token')],
});
const ApolloContainer = ({ show, pageProps, router, Component }: { show: boolean; pageProps: any; router: any; Component: any }) => {
  const token = useRecoilValue(tokenState);
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={apolloClient}>
      <HomeHeader />
      <Component {...pageProps} key={router.route} />
      <BottomNav />
      <Drawer />
      <Loader />
      <Dialog />
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9999,
          backgroundColor: '#ffffff',
          width: '100%',
          height: '100%',
          display: show ? 'flex' : 'none',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src="/images/main_logo.png"
          style={{
            width: 'auto',
            height: 36,
          }}
        />
      </Box>
    </ApolloProvider>
  );
};
export default MyApp;
