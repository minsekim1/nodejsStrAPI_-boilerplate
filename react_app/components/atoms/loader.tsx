import { atom, useSetRecoilState } from "recoil";
import { useRecoilState } from "recoil";
import { alpha, Backdrop, CircularProgress } from "@mui/material";
import { grey } from "@mui/material/colors";
import { NextPage } from "next";

type LoaderProps = { open: boolean; fill: boolean; dark: boolean };
const loaderState = atom<LoaderProps>({
  key: "modal/loader",
  default: {
    open: false,
    fill: false,
    dark: false,
  },
});

export const useSetLoader = () => {
  const setLoader = useSetRecoilState(loaderState);
  return setLoader;
};

export default function Loader() {
  const [loader, setLoader] = useRecoilState(loaderState);
  return (
    <Backdrop
      open={loader.open}
      transitionDuration={{ appear: 0, enter: 0, exit: 500 }}
      sx={{
        backgroundColor: alpha(loader.dark ? "#000000" : "#ffffff", loader.fill ? 1 : 0.9),
        position: "fixed",
        zIndex: 9999999999,
      }}
    >
      <CircularProgress size={56} />
    </Backdrop>
  );
}
