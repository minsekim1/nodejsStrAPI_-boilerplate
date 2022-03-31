import { useRecoilState } from 'recoil';
import { alpha, Backdrop, CircularProgress } from '@mui/material';
import { loaderState } from '../../../recoil/modal';
import { grey } from '@mui/material/colors';
type Props = {};
export default function Loader({}: Props) {
  const [loader, setLoader] = useRecoilState(loaderState);
  const open = loader;
  const onClose = () => {
    setLoader({
      ...loader,
      open: false,
    });
  };
  return (
    <Backdrop
      open={loader.open}
      transitionDuration={{ appear: 0, enter: 0, exit: 500 }}
      sx={{
        backgroundColor: alpha(loader.dark ? '#000000' : '#ffffff', loader.fill ? 1 : 0.9),
        position: 'fixed',
        zIndex: 9999999999,
      }}
    >
      <CircularProgress size={56} />
    </Backdrop>
  );
}
Loader.defaultProps = {
  show: false,
};
