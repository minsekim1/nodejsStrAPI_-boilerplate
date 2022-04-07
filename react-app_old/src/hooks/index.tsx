import useSWR from 'swr';
import { API_URL_M, getFetch } from '../api/config';
import { InitMissionProps } from '../types';
import { fetcher } from '../utils';

export const useInitFetchMission = (missionId: number, user_id: number | null): InitMissionProps => {
  const {
    data: missionData,
    error,
    mutate: setMissionData,
  } = useSWR(missionId === -1 ? null : `${API_URL_M}/mission/ground?mission_id=${missionId}&user_id=${user_id}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: true,
    revalidateOnReconnect: false,
    dedupingInterval: 1000,
  });
  // const [missionData, setMissionData] = useState<MissionDataProps | null>(null); //MissionDataProps

  const initFetchMissionData = () => {};

  return { missionData, mutate: setMissionData, initFetchMissionData };
};
