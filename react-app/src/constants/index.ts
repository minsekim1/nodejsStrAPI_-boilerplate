import { red } from '@mui/material/colors';

export const bottomTabs = [
  {
    label: '홈',
    value: '/home',
    name: 'home',
    color: 'black',
  },
  {
    label: '찜',
    value: '/bookmark',
    name: 'heart',
    color: red[500],
  },
  {
    label: '검색',
    value: '/search',
    name: 'search',
    color: 'black',
  },
  {
    label: '마이페이지',
    value: '/my',
    name: '',
    color: 'black',
  },
];

export const groundTabs = [
  { id: 1, label: '운동장' },
  { id: 2, label: '내 기록' },
  { id: 3, label: '인증서' },
  { id: 4, label: '전체 기록' },
  { id: 5, label: '랭킹' },
];

export const userTabs = [
  { id: 1, label: '기록' },
  { id: 2, label: '인증서' },
  { id: 2, label: '포인트' },
];

export const storeTabs = [
  { id: 1, label: '교환소' },
  { id: 2, label: '교환내역' },
];
