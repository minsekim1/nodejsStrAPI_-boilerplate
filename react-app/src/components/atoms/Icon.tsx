import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconLookup, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import { Badge, Box, SxProps } from '@mui/material';
import { blueGrey } from '@mui/material/colors';

type IconProps = {
  name: any;
  prefix: IconPrefix;
  size: any;
  padding: number;
  dotCount?: number;
  dotVariant?: 'dot' | 'standard';
  className?: string;
  sx?: SxProps;
};
export default function Icon({ name, prefix, size, padding, dotCount, dotVariant, className, sx }: IconProps) {
  const invisible = typeof dotCount !== 'number';
  const icon: IconLookup = { prefix: prefix, iconName: name };
  return (
    <Box
      sx={{
        color: blueGrey[900],
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: `${size + padding * 2}px !important`,
        padding: `${padding}px !important`,
        fontSize: `${size / 2}px !important`,
        ...sx,
      }}
    >
      <Badge
        max={999}
        invisible={invisible}
        badgeContent={dotCount}
        color="error"
        variant={dotVariant}
        sx={{ '& .MuiBadge-badge': { fontSize: 10, fontWeight: '700' } }}
      >
        <FontAwesomeIcon icon={icon} size="2x" className={className} />
      </Badge>
    </Box>
  );
}

Icon.defaultProps = {
  name: 'circle',
  size: 24,
  padding: 2,
  prefix: 'far',
};
