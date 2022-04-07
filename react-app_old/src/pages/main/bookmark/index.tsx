import { Box, Button, Container } from '@mui/material';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import { atom, useRecoilState } from 'recoil';
import { localStorageEffect } from '../../../recoil/config';
export default function Page() {
  const router = useRouter();
  return (
    <Container sx={{ mt: 8 }}>
      <Bookmark />
    </Container>
  );
  // return <Alarm />;
}

const Bookmark = () => {
  return (
    <>
      <CountButton />
      <CountButton />
      <CountButton2 />
      <CountButton2 />
      <br />
      *CountButton 는 페이지 이동시 값이 초기화 되지만 useState가 아닌 useRecoilState를 사용할 경우 전역 State로 관리되기떄문에 앱이
      종료되기 전까지 유지됩니다.
      <br />
      <br />
      또한 전역 State이므로 CountButton2의 count값은 현재와 다른페이지에서도 동일합니다.
      <LikeButton />
      <MLikeButton />
    </>
  );
};

//#region CountButton
const CountButton = () => {
  const [count, setCount] = useState(0);

  const constantValue = useMemo(() => count, []);
  const value = useMemo(() => count, [count]);
  return (
    <Box>
      <Button onClick={() => setCount((prev) => prev + 1)}>카운트하기</Button>총 {count} 번 눌렀습니다!
      <br />
      constantValue:{constantValue}
      <br />
      value:{value}
      <br />
    </Box>
  );
};
//#endregion
//#region CountButton2
const CountState = atom<number>({
  key: 'recoil/count',
  default: 0,
});
const CountButton2 = () => {
  const [count, setCount] = useRecoilState(CountState);
  return (
    <Box>
      <Button variant="outlined" onClick={() => setCount((prev) => prev + 1)}>
        카운트하기
      </Button>
      총 {count} 번 눌렀습니다!
    </Box>
  );
};
//#endregion
//#region LikeButton
const LikeState = atom<boolean>({
  key: 'recoil/like',
  default: false,
});
const LikeButton = () => {
  const [isLike, setIsLike] = useRecoilState(LikeState);
  return (
    <Box sx={{ mt: 4 }}>
      <Button fullWidth color={'secondary'} variant={isLike ? 'outlined' : 'contained'} onClick={() => setIsLike((prev) => !prev)}>
        {isLike ? '취소하기' : '좋아요 > ,<'}
      </Button>
    </Box>
  );
};
//#endregion
//#region MLikeButton
const MLikeState = atom<boolean>({
  key: 'recoil/cache/like',
  default: false,
  effects_UNSTABLE: [localStorageEffect('recoil/cache/like/key')],
});
const MLikeButton = () => {
  const [isLike, setIsLike] = useRecoilState(MLikeState);
  return (
    <Box sx={{ mt: 4 }}>
      <Button fullWidth color={'secondary'} variant={'contained'} onClick={() => setIsLike((prev) => !prev)}>
        {isLike ? '취소하기' : '(새로고침 및 앱종료에도 유지)좋아요 > ,<'}
      </Button>
    </Box>
  );
};
//#endregion
