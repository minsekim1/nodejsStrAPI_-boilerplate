import useSWR from 'swr';
import { API_URL_M } from '../api/config';
import { fetcher } from '../utils';
import { InitMissionProps, IntroDataProps } from '../types';
export const useGetIntroData = (
  missionId: number,
  user_id: number | null
): {
  introData: {
    data: IntroDataProps;
    loading: boolean;
    error: boolean;
    mutate: () => void;
  };
  setIntroData: any;
  initFetchMissionData: () => void;
} => {
  const {
    data: introData,
    error,
    mutate: setIntroData,
  } = useSWR(missionId === -1 ? null : `${API_URL_M}/mission/intro?mission_id=${missionId}&user_id=${user_id}`, fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 1000,
  });

  const initFetchMissionData = () => {};

  return { introData, setIntroData, initFetchMissionData };
};
