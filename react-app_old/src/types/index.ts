import { SxProps } from '@mui/system';

export type DrawerProps = {
  open: boolean;
  title?: string;
  children?: React.ReactNode;
  onClose?: () => void;
};

export const drawerDefaultProps = {
  open: false,
};

export type InputProps = {
  value: string;
  error: boolean;
  helperText: string;
};

export const inputDefaultProps = {
  value: '',
  error: false,
  helperText: '',
};

export type DialogProps = {
  open: boolean;
  title: React.ReactNode;
  content: React.ReactNode;
  pathname: string;
  cancel: {
    show: boolean;
    title: string;
    disabled: boolean;
    onClick: () => void;
  };
  confirm: {
    title: string;
    onClick: () => void;
    onConfirm: (num: number) => void;
  };
  sx?: SxProps;
  backDisable?: boolean;
  form?: boolean;
  value: string;
  children?: React.ReactNode;
};

export const dialogDefaultProps = {
  open: false,
  title: '',
  content: '',
  pathname: '/',
  cancel: {
    show: true,
    title: '취소',
    disabled: false,
    onClick: () => {},
  },
  confirm: {
    title: '확인',
    onClick: () => {},
    onConfirm: () => {},
  },
  value: '',
};

export type UserProps = {
  jwt: string | null; // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ4MzA2MDE2LCJleHAiOjE2NTA4OTgwMTZ9.1tBFQOdFKGpkND5-yrPcydCAJPrQ7TtQgUB4qRZGvxA",
  user: {
    id: string; //1,
    username: string; // "tkarnrwl7862@naver.com",
    email: string; // "tkarnrwl7862@naver.com",
    provider: string; // "local",
    confirmed: boolean;
    blocked: boolean;
    createdAt: string; // "2022-03-26T09:07:33.324Z",
    updatedAt: string; // "2022-03-26T13:46:50.651Z",
    nickname: string | null;
    greeting: string | null;
    device_token: string | null;
    device_type: 'ios' | 'android' | null;
    agree_push: boolean | null;
  };
};

export const userDefaultProps = {
  jwt: null,
  user: {
    id: 0,
    username: '',
    email: '',
    provider: '',
    confirmed: true,
    blocked: false,
    createdAt: '',
    updatedAt: '',
    nickname: null,
    greeting: null,
    device_token: null,
    device_type: null,
    agree_push: null,
  },
};

export type FeedProps = {
  logo_image: string;
  date: string; // '2022-03-23',
  time: string; //'23:23';
  title: string;
  value: string; // '0.3L';
  mission_id: number; // 23;
};

export type RecordProps = {
  id: number;
  all_litter: number; //"8410"(ml)
  date: string; //"2022.12.24"
  litter: number | null; // "180"(ml)
  time: string; //"23:24"
  reward_at: string | null; //"2022-03-16T15:03:00.000Z" 오늘 받은 포인트 시각
};

export type HomeProps = {
  litter: string; // "1.5L"
  main_text: string; //
  main_title: string; // "오늘의 섭취량"
  percent: string; // "75%"
  recent_list: RecordProps[];
  sub_text: string; // "32일째"
  sub_title: string; //"연속인증"
};

export type ChallengesProps = {
  chanllenge_list: ChallengeProps[];
  main_increase: string; //"TODAT 30,000원 ▴"
  main_text: string; //"2,000,000원"
  main_title: string; //'2월의 숲조성 후원금';
};

export type ChallengeProps = {
  id: number;
  type: 'monthly' | 'daily' | null; // 월별이 monthly 상시가 daily
  image: string;
  grond_1: string; //'D-2';
  grond_2: string; //'남은 날짜';
  grond_3: string; //'1,180명';
  grond_4: string; //'총 참가자';
  grond_5: string; //'219명';
  grond_6: string; //'완주자';
  title: string; // '1만보걷기';
  desc: string; //'매주 1주일을 걸으면서 세상과 나를 건강하게 만드는 챌린지';
  is_like: boolean; //true;
  is_enter: boolean;
  reserve_start_at: string | null;
  reserve_end_at: string | null;
};

export type UserDataProps = {
  user: UserProps;
  feed_list?: FeedProps[];
};

export type myMissionList = {
  id: number; //3;
  attributes: {
    today_max: number | null;
    title: string; // "마이올리와 함꼐하는 '기부산타런'";
    subtitle: string | null;
    description: string | null; // "2021년 여말 '기부산타런'을 통해 아이들에게 따뜻한 킇리스마스를 선물하는 산타가 되어주세요!\n\n";
    reserve_started_at: string | null; // '2022-03-11T16:00:00.000Z'; //상시는 없음(null)
    reserve_ended_at: string | null; // '2022-03-11T15:00:00.000Z'; //상시는  없음(null)
    started_at: string; // '2022-03-11T15:00:00.000Z';
    ended_at: string; // '2022-03-24T15:00:00.000Z';
    is_show: true;
    createdAt: string; // '2022-03-10T15:08:41.221Z';
    updatedAt: string; // '2022-03-12T07:16:01.276Z';
    publishedAt: string; // '2022-03-10T15:10:45.166Z';
    type: 'monthly' | 'daily' | null;
    reward: number; //10;
    reward_type: 'daily_feed';
  };
}[];

export type LogResProps = {
  data: {
    id: number;
    attributes: {
      value: string; // '10';
      reason: 'daily_upload_reward'; // 'daily_upload_reward';
      type: 'reward'; // 'reward';
      createdAt: string; // '2022-03-12T16:32:16.073Z';
      updatedAt: string; // '2022-03-12T16:32:16.073Z';
      publishedAt: string; // '2022-03-12T16:32:16.071Z';
    };
  }[];
  meta: {
    pagination: {
      page: 1;
      pageSize: 25;
      pageCount: 1;
      total: 6;
    };
  };
};

export type PointLogResProps = {
  id: number; //25;
  attributes: {
    value: string; // '50';
    reason: 'daily_upload_reward'; // 'daily_upload_reward';
    type: 'reward'; // 'reward';
    createdAt: string; // '2022-03-13T08:16:29.346Z';
    updatedAt: string; // '2022-03-13T08:16:29.346Z';
    publishedAt: string; // '2022-03-13T08:16:29.344Z';
    mission_id: {
      data: {
        id: 10;
        attributes: {
          title: string; // '국내숲조성에 후원되는 하루 2L 물 마시기';
          subtitle: null;
          description: string; // '내 건강과 지구의 건강을 동시에 챙기는 법!!\n\n하루 2L 물 마시면서 내 건강도 챙기고\n깨끗한 숲을 만들어 지구의 건강도 챙겨주세요!\n\n하루 2L 물 마시고 인증할 때마다 \n100원씩 숲조성 후원금이 적립됩니다!\n더 자주 인증하고, 더 많은 사람들이 참여할 수록 숲조성 사업 후원규모도 커져요!!\nSNS를 통해 더 많은 사람들의 참여를 독려해주세요!';
          reserve_started_at: string; // '2022-03-08T15:00:00.000Z';
          reserve_ended_at: string; // '2022-03-11T15:00:00.000Z';
          started_at: string; // '2022-03-11T15:00:00.000Z';
          ended_at: string; // '2022-03-16T15:00:00.000Z';
          is_show: null;
          createdAt: string; // '2022-03-13T07:25:58.646Z';
          updatedAt: string; // '2022-03-13T10:52:29.502Z';
          publishedAt: string; // '2022-03-13T07:32:50.824Z';
          type: string; // 'monthly';
          reward: 50;
          reward_type: string; // 'daily_feed';
          today_max: 2000;
          count_to_result_multiple: string; // '100';
        };
      };
    };
  };
}[];
export type InitMissionProps = {
  missionData: MissionDataProps | null;
  mutate: any;
  initFetchMissionData: () => void;
};
export type IntroDataProps = {
  id: number;
  logo_image: string; // "";
  title: string; // "마이올리와 함꼐하는 '기부산타런'";
  subtitle: string | null;
  description: string; // "2021년 여말 '기부산타런'을 통해 아이들에게 따뜻한 킇리스마스를 선물하는 산타가 되어주세요!\n\n기부산타들의 러닝거리가 10km 누적될때마다 선물을 ㅂ다을 수 있는 아이가 1명 늘어나요! \n더많이, 더 자주 참여할수록 가부풀뭄도 많아지므로 SNS를 x통해 더 많은 산타들의 참여를 독려해주세요!\n\n기부 물품은 '지파운데이션'을 통해 도움이 필욯나 국내 아돌들에게 지원됩니다.";
  reserve_started_at: string; // "2022-03-10T15:00:00.000Z";
  reserve_ended_at: string; // "2022-03-11T15:00:00.000Z";
  started_at: string; // "2022-03-11T15:00:00.000Z";
  ended_at: string; // "2022-03-24T15:00:00.000Z";
  creator: {
    id: number;
    profile_image: string; // "asd";
    nickname: string; // "wirold";
    greeting: string; // "asd";
  };
  intro: {
    thumbnail_image: string; // "";
    description_images: string[];
  };
  is_enter: boolean;
  youtube_url: string | null;
};
export type MissionDataProps = {
  id: number;
  logo_image: string;
  is_available_enter: boolean;
  is_available_reserve: boolean;
  is_available_upload: boolean; //밑에 소개다시보기/내기록업로드 버튼 또는 소개다시보기만 띄우기
  background_image: string | null; //배경 이미지(ex:나무숲)
  ground: {
    aiText: string;
    progress_title: string;
    progress_present: string;
    progress_percent: number; //진행도 %로 옴. 0~100사이
    progress_max: string;
    progress_success_image: string; //    'https://picsum.photos/300/100';
    progress_background_image: string; // 'https://picsum.photos/300/100';
    progress_image: string; //'https://picsum.photos/300/100';
    box: {
      text1: string; // 'D-1';
      text2: string; //'일차';
      text3: string; // '508명';
      text4: string; //'참가자';
      text5: string; //'136km';
      text6: string; // '누적거리';
    };
    user_list_title: string; //'오늘의 기부 산타';
    user_list: {
      id: number; //32;
      profile_image: string; //'https://picsum.photos/300/100';
      nickname: string; // 'nickname01';
      follower: number; //230;
      is_follow: boolean; // true;
      email: string;
    }[];
  };
  record: {
    aiText: string;
    box: {
      text1: string; // "2회"
      text2: string; //'인증횟수';
      text3: string; // '12km';
      text4: string; //'인증거리';
      text5: string; //'1명';
      text6: string; // '후원아동';
    };
    progress_icon_images: string[][]; //[0]: success, [1]:disable
    progress_max_column: number; //4,
    progress_title: string; //'성공일수';
    progress_present_text: string; //'1';
    progress_max_text: string; //'20일';
    progress_present: number; //1;
    progress_max: number; //20;
    progress_image: string; //
    feed_list: {
      id: number; //feed_id; router.push할때 쓰기
      time_chanllenge: string; //2일차 3일차 챌린지 시작후 몇일 지났는지 (1일차부터시작)
      feed_image: string; //
      desc: string; //상세 피드내용
      time_before: string; //하단 "~분전 ~시간전 ~00일 몇일 등"
      is_private: string;
    }[];
  };
  cert: {
    intro_text: string; //'인증서를 만들어 인스타그램 이벤트에 참여해보세요.';
    cert_image: string; //'';
    box: {
      text1: string; // '인증횟수';
      text2: string; //'2회';
      text3: string; //'인증거리';
      text4: string; //'12km';
      text5: string; // '후원아동';
      text6: string; //'1명';
    };
    event_images: string[];
  };
  feed_list: {
    id: number; //피드아이디 router push 할때 사용
    nickname: string;
    profile_image: string;
    feed_image: string;
    desc: string;
    time_text: string; //지금부터 1시간전으로 표기
    email: string;
    is_private: boolean;
  }[];
  //rank === null이면 탭안보임
  rank: null | {
    title: string; //전체순위
    user_list: rankUserProps[];
  };
  is_enter: boolean;
  type: string;
};
export type rankUserProps = {
  id: number;
  rank: number; //1부터시작
  profile_image: string;
  nickname: string;
  follower: number;
  value: string; //km L 등 단위 다르니 텍스트로 전송 ex)3241.2L 등
  type: string; //상단왼쪽위 텍스트
};

export type CommentDataProps = {
  comment_total: number;
  comments: CommentProps[];
};
export type CommentProps = {
  id: number; //1;
  comment: string; //'1아녕하세요!';
  created_at: string; //'2022-03-10T07:39:24.746Z';
  updated_at: string; // '2022-03-10T07:39:27.505Z';
  mission_id: number; //1;
  user_id: number; // 35;
  profile_image: string | null;
  group: number; //최소0
  nickname: string; //'tkarnrwl';
  target_comment_id: number | null;
  depth: boolean;
  email: string;
};
