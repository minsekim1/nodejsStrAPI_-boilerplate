import { useQuery } from '@apollo/client';

/**   data: 쿼리의 결과를 포함하는 객체
loading: 요청 진행중 여부
error: graphQLErrors 와 networkError 의 runtime 에러
variables: 쿼리가 실행될 때 전달했던 변수를 포함하는 객체
networkStatus: network 상태를 나타내는 값
refetch: 쿼리를 refetch 하도록 해주는 함수
fetchMore: 페이지네이션에 쓰이는 함수
startPolling: 주기적으로 폴링 이벤트를 발생시키는 함수
stopPolling: 폴링을 멈추는 함수
subscribeToMore: subscribe 에 사용되는 함수. 반환되는 함수는 subscription 취소에 사용된다.
updateQuery: fetch, mutation, subscription 외에 캐시를 업데이트 할 수 있도록 해주는 함수
client: 아폴로클라이언트 인스턴스. 주기적으로 쿼리를 없애거나 캐시에 접근할 수 있다.
called: useLazyQuery 로부터 반환되는 속성. useLazyQuery 가 호출되었는지 여부를 나타낸다.*/
export default function useCustomQuery(query: any) {
  const { loading, data, refetch } = useQuery(query, {
    returnPartialData: true,
  });
  return {
    data: data,
    loading: loading,
    refetch: refetch,
  };
}
