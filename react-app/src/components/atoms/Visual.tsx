import { useEffect, useRef, useState } from 'react';
import { Box, SxProps } from '@mui/material';
import { useInView } from 'react-intersection-observer';
type VisualProps = {
  src: string;
  width: string | number;
  height: string | number;
  absolute?: boolean;
  coverBg: string;
  sx?: SxProps;
  className?: string;
  onClick?: () => void;
  force?: boolean;
};
export default function Visual({ src, width, height, coverBg, sx, className, onClick, force }: VisualProps) {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const { ref, inView, entry } = useInView({
    threshold: 0.5,
  });
  useEffect(() => {
    if ((force && loaded) || (inView && loaded)) {
      setShow(true);
    }
  }, [inView, loaded, force]);
  return (
    <Box ref={ref} sx={{ ...sx }} onClick={onClick}>
      <img
        src={src}
        style={{
          width: width,
          height: height,
          objectFit: 'cover',
          opacity: show ? 1 : 0,
          transition: 'all 0.35s ease',
        }}
        onLoad={() => {
          setLoaded(true);
        }}
      />
      {coverBg !== '' && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: coverBg,
          }}
        />
      )}
    </Box>
  );
}

Visual.defaultProps = {
  width: '100%',
  height: '100%',
  coverBg: '',
};
