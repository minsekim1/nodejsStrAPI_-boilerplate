import useSWR from 'swr';
import { API_URL_M } from '../api/config';
import { fetcher } from '../utils';
import { InitMissionProps } from '../types';
export const useGetMissionData = (missionId: number, user_id: number | null): InitMissionProps => {
  const {
    data: missionData,
    error,
    mutate: setMissionData,
  } = useSWR(missionId === -1 ? null : `${API_URL_M}/mission/ground?mission_id=${missionId}&user_id=${user_id}`, fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 1000,
  });
  // const [missionData, setMissionData] = useState<MissionDataProps | null>(null); //MissionDataProps
  const initFetchMissionData = () => {};
  return { missionData, mutate: setMissionData, initFetchMissionData };
};
