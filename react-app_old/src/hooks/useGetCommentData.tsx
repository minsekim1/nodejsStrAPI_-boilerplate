import useSWR from 'swr';
import { API_URL_M, postFetch } from '../api/config';
import { fetcher } from '../utils';
import { CommentDataProps, InitMissionProps, IntroDataProps } from '../types';
import { useEffect, useState } from 'react';
import { atom, useRecoilState } from 'recoil';
const commentDataState = atom<CommentDataProps | null>({
  key: 'comment/data',
  default: null,
});
const commentGroup = atom<number>({
  key: 'comment/group',
  default: 0,
});
const commentTargetState = atom<number | null>({
  key: 'comment/target',
  default: null,
});
const commentTargetNicknameState = atom<string | null>({
  key: 'comment/targetNickname',
  default: null,
});
export function useGetCommentData(mission_id: number) {
  const [commentData, setCommentData] = useRecoilState(commentDataState);
  const [group, setGroup] = useRecoilState(commentGroup);
  const [target, setTarget] = useRecoilState(commentTargetState);
  const [targetNickname, setTargetNickname] = useRecoilState(commentTargetNicknameState);
  useEffect(() => {}, [mission_id]);
  const resetCommentData = () => {};
  return { commentData, resetCommentData, group, setGroup, target, setTarget, targetNickname, setTargetNickname };
}
function onhandleFollow(my_id: number | null, target_id: number, is_follow: boolean, initFetch: () => void): void {
  if (my_id === null) return;
  if (!is_follow) postFetch('/follow', { user_id: my_id, target_id: target_id }, true);
  else fetch(`${API_URL_M}/follow?user_id=${my_id}&target_id=${target_id}`, { method: 'DELETE' });
  initFetch();
  // else
}
