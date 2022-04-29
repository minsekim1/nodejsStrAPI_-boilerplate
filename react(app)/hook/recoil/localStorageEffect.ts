const isServer = typeof window !== "undefined";

//#region 로컬 스토리지 저장 함수
const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    if (isServer) {
      const savedValue = localStorage.getItem(key);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }
    }
    onSet((newValue: any) => {
      if (isServer) localStorage.setItem(key, JSON.stringify(newValue));
    });
  };
export default localStorageEffect;
//#endregion
