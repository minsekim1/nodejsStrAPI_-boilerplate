import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';

type TypoProps = {
  variant?: any;
  disabled: boolean;
  textAlign?: 'center' | 'right' | undefined;
  lines?: number;
  children?: React.ReactNode;
  sx?: any;
  className?: any;
};

type BoxProps = {
  // disabled: boolean;
  textAlign?: 'center' | 'right' | undefined;
  lines: number | undefined;
};

const Title = styled(Typography)<BoxProps>`
  display: block;
  word-break: keep-all;
  ${(props) => (typeof props.lines === 'number' ? `display: -webkit-box` : '')};
  ${(props) => (typeof props.lines === 'number' ? `overflow: hidden` : '')};
  ${(props) => (typeof props.lines === 'number' ? `-webkit-box-orient: vertical` : '')};
  ${(props) => (typeof props.lines === 'number' ? `-webkit-line-clamp: ${props.lines}` : 'white-space: pre-line')};
  ${(props) => (props.textAlign === 'center' ? 'text-align: center' : props.textAlign === 'right' ? 'text-align: right' : '')};
  transition: all 0.35s ease;
`;
  /* opacity: ${(props) => (props.disabled ? 0.3 : 1)}; */
export default function Typo({ variant, disabled, textAlign, lines, children, sx, className }: TypoProps) {
  return (
    <Title
      variant={variant}
      lines={lines}
      textAlign={textAlign}
      // disabled={disabled}
      sx={sx}
      className={className}
    >
      {children}
    </Title>
  );
}

Typo.defaultProps = {
  disabled: false,
};
