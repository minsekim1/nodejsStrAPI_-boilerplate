import _ from 'lodash';
import moment from 'moment';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import endOfWeek from 'date-fns/endOfWeek';
import isSameDay from 'date-fns/isSameDay';
import isWithinInterval from 'date-fns/isWithinInterval';
import startOfWeek from 'date-fns/startOfWeek';
import { PickersDay, PickersDayProps } from '@mui/lab';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { alpha, Box, Container, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { amber, blueGrey, grey, teal } from '@mui/material/colors';
import { formatDate, formatDateTime } from '../../utils';
import { atom, useRecoilState, useSetRecoilState } from 'recoil';
import { loaderState } from '../../recoil/modal';
import Visual from '../atoms/Visual';
import Typo from '../atoms/Typo';
import Icon from '../atoms/Icon';
type CustomPickerDayProps = PickersDayProps<Date> & {
  dayIsBetween: boolean;
  isFirstDay: boolean;
  isLastDay: boolean;
};

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
})<CustomPickerDayProps>(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: amber[700],
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: amber[500],
    },
    fontWeight: '700',
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  }),
  ...(isLastDay && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  }),
})) as React.ComponentType<CustomPickerDayProps>;
export const valueState = atom<Date | null>({
  key: 'value',
  default: new Date(),
});
type Props = {
  feedDataGroup: {
    data: any;
    loading: boolean;
    error: boolean;
    mutate: () => void;
  };
};
export default function Calendar({ feedDataGroup }: Props) {
  const [swiper, setSwiper] = useState<any>(null);
  const [swiperIndex, setSwiperIndex] = useState<number>(0);
  const [value, setDate] = useRecoilState(valueState);
  const year = value ? value.getFullYear() : 2022;
  const month = value ? value.getMonth() + 1 : 1;
  const [months, setMonths] = useState<{ id: number; scrollY: number }[]>([
    {
      id: 0,
      scrollY: 0,
    },
    {
      id: 0,
      scrollY: 0,
    },
    {
      id: 0,
      scrollY: 0,
    },
    {
      id: 0,
      scrollY: 0,
    },
    {
      id: 0,
      scrollY: 0,
    },
    {
      id: 0,
      scrollY: 0,
    },
    {
      id: 0,
      scrollY: 0,
    },
    {
      id: 0,
      scrollY: 0,
    },
    {
      id: 0,
      scrollY: 0,
    },
    {
      id: 0,
      scrollY: 0,
    },
    {
      id: 0,
      scrollY: 0,
    },
    {
      id: 0,
      scrollY: 0,
    },
    {
      id: 0,
      scrollY: 0,
    },
    {
      id: 0,
      scrollY: 0,
    },
    {
      id: 0,
      scrollY: 0,
    },
    {
      id: 0,
      scrollY: 0,
    },
    {
      id: 0,
      scrollY: 0,
    },
    {
      id: 0,
      scrollY: 0,
    },
    {
      id: 0,
      scrollY: 0,
    },
    {
      id: 0,
      scrollY: 0,
    },
    {
      id: 0,
      scrollY: 0,
    },
    {
      id: 0,
      scrollY: 0,
    },
    {
      id: 0,
      scrollY: 0,
    },
    {
      id: 0,
      scrollY: 0,
    },
    {
      id: 0,
      scrollY: 0,
    },
    {
      id: 0,
      scrollY: 0,
    },
    {
      id: 0,
      scrollY: 0,
    },
    {
      id: 0,
      scrollY: 0,
    },
    {
      id: 0,
      scrollY: 0,
    },
    {
      id: 0,
      scrollY: 0,
    },
    {
      id: 0,
      scrollY: 0,
    },
    {
      id: 0,
      scrollY: 0,
    },
  ]);
  const [dateStr, setDateStr] = useState<string>(moment(value).format('YYYY-MM-DD'));
  const feedDayList = typeof dateStr === 'string' ? feedDataGroup.data[dateStr] : [];
  useEffect(() => {
    if (value !== null) {
      const day = value.getDate() - 1;
      setSwiperIndex(day);
    }
  }, [value]);
  if (typeof window !== 'undefined') {
    useEffect(() => {
      const days = new Date(year, month, 0).getDate();
      const arr: any = Array.from({ length: days }).map((item, i) => {
        return { id: i, scrollY: 0 };
      });
      setMonths(arr);
    }, [year, month, window]);
    useEffect(() => {
      const listener1 = (e: any) => {
        var scrollY = window.pageYOffset;
        let newMonths = _.cloneDeep(months);
        if (scrollY !== 0) {
          newMonths[swiperIndex].scrollY = scrollY;
          setMonths(newMonths);
        }
      };
      window && window.addEventListener('scroll', listener1);
      return () => {
        window && window.removeEventListener('scroll', listener1);
      };
    }, [window, swiperIndex, months]);
    useEffect(() => {
      if (months[swiperIndex] && months[swiperIndex].scrollY) {
        window.scrollTo({
          top: months[swiperIndex].scrollY,
          left: 0,
          // behavior: 'smooth',
        });
      }
    }, [swiperIndex]);
  }

  const handleSlideChange = (swiper: any) => {
    setSwiperIndex(swiper.realIndex);
  };
  const renderWeekPickerDay = (date: Date, selectedDates: Array<Date | null>, pickersDayProps: PickersDayProps<Date>) => {
    if (!value) {
      return <PickersDay {...pickersDayProps} />;
    }
    const start = startOfWeek(value);
    const end = endOfWeek(value);

    const dayIsBetween = isWithinInterval(date, { start, end });
    const isFirstDay = isSameDay(date, start);
    const isLastDay = isSameDay(date, end);

    const dateStr = moment(date).format('YYYY-MM-DD');
    const isFeed = feedDataGroup.data[dateStr] !== undefined;
    return (
      <Box
        key={date.getTime() + ' 1'}
        sx={{
          position: 'relative',
          '&:after': {
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: '4px',
            width: '4px',
            height: '4px',
            backgroundColor: '#ffffff',
            borderRadius: '50%',
            content: '""',
            zIndex: 9999999,
            display: isFeed ? 'block' : 'none',
          },
        }}
      >
        <CustomPickersDay {...pickersDayProps} disableMargin dayIsBetween={dayIsBetween} isFirstDay={isFirstDay} isLastDay={isLastDay} />
      </Box>
    );
  };
  return (
    <>
      <Container>
        <Box
          sx={{
            mt: 3,
            '& .MuiCalendarPicker-root': {
              width: '100%',
              maxHeight: '460px',
              '& > div:first-child *': {
                color: '#ffffff',
              },
            },
            '& .PrivatePickersYear-yearButton': {
              color: '#ffffff',
            },
            '& .PrivatePickersFadeTransitionGroup-root': {
              color: '#ffffff',
              '& > div:first-child > div:nth-child(2)': {
                minHeight: 'calc(((100vw - 48px) / 7 - 4px) * 6)',
              },
              '& > div:first-child > div:nth-child(2) > div': {
                // position: 'relative',
                // top: 'initial',
                // left: 'initial',
                // right: 'initial',
                // mb: 3,
              },
            },
            '& path': {
              color: '#ffffff',
            },
            '& .MuiTypography-caption': {
              width: 'calc((100vw - 48px) / 7 - 4px)',
              height: 'calc((100vw - 48px) / 7 - 4px)',
              m: '0 !important',
              color: alpha('#ffffff', 0.6),
              '@media (min-width: 444px)': {
                width: 'calc((444px - 48px) / 7 - 4px)',
                height: 'calc((444px - 48px) / 7 - 4px)',
              },
            },
            '& .MuiPickersDay-root': {
              width: 'calc((100vw - 48px) / 7 - 4px)',
              height: 'calc((100vw - 48px) / 7 - 4px)',
              '&:hover, &:focus': {
                backgroundColor: blueGrey[700],
              },
              '&:not(.Mui-selected)': {
                backgroundColor: blueGrey[900],
                color: '#ffffff',
              },
              '@media (min-width: 444px)': {
                width: 'calc((444px - 48px) / 7 - 4px)',
                height: 'calc((444px - 48px) / 7 - 4px)',
              },
            },
            '& .MuiIconButton-sizeSmall:last-child': {
              mr: 1,
            },
            '& .Mui-selected': {
              backgroundColor: `${teal[700]} !important`,
              color: `${'#ffffff'} !important`,
              fontWeight: '700 !important',
            },
            '& .MuiPickersDay-today': {
              // backgroundColor: blueGrey[900],
              // color: amber[700],
              border: '1px solid #ffffff !important',
            },
          }}
        >
          <Paper
            elevation={20}
            sx={{
              backgroundColor: alpha(blueGrey[900], 0.9),
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <CalendarPicker
                date={value}
                renderDay={renderWeekPickerDay}
                onChange={(newDate) => {
                  setDate(newDate);
                  setDateStr(moment(newDate).format('YYYY-MM-DD'));
                }}
                minDate={new Date('2022-03-01')}
                maxDate={new Date(moment(new Date()).format('YYYY-12-31'))}
              />
            </LocalizationProvider>
          </Paper>
        </Box>
      </Container>
      <List sx={{ mt: -1 }}>
        {feedDayList && feedDayList.length > 0 && (
          <>
            <Container>
              <Typography
                sx={{
                  mt: 4,
                  fontSize: 16,
                  lineHeight: '24px',
                  fontWeight: '700',
                  color: blueGrey[900],
                  '& b': {
                    color: blueGrey[300],
                  },
                }}
              >
                {formatDate(dateStr) + '의 기록'} <b>{feedDayList.length}</b>
              </Typography>
            </Container>
            <Box sx={{ pb: 4 }}>
              {feedDayList.map((item: any, index: number) => {
                return <FeedItem key={index} item={item} />;
              })}
            </Box>
          </>
        )}
      </List>
    </>
  );
}

type FeedItemProps = {
  item: any;
};

function FeedItem({ item }: FeedItemProps) {
  const router = useRouter();
  const setLoader = useSetRecoilState(loaderState);
  const handleClickFeed = () => {
    setLoader({ open: true, fill: true, dark: false });
    router.push(`/user/feed/${item.id}`);
  };
  return (
    <ListItem
      sx={{
        mt: 1,
        alignItems: 'flex-start',
        height: 'calc(104px + 16px)',
      }}
      onClick={handleClickFeed}
    >
      <Paper elevation={12} sx={{ position: 'relative', width: 104, height: '100%', borderRadius: 1, overflow: 'hidden' }}>
        <Visual
          src={item.images[0]}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            '& img': {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              objectFit: 'cover',
            },
          }}
          coverBg="rgba(0,0,0,0.1)"
        />
        {item.images.length > 1 && (
          <Icon name="clone" prefix="fas" size={16} sx={{ color: blueGrey[100], position: 'absolute', top: 4, right: 4, zIndex: 99 }} />
        )}
      </Paper>
      <Box sx={{ flex: 1, ml: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Typo
          lines={2}
          sx={{
            fontSize: 16,
            lineHeight: '24px',
            textAlign: 'left',
            minHeight: '48px',
          }}
        >
          {item.description}
        </Typo>
        <Box sx={{ flex: 1 }} />
        <Paper
          sx={{
            p: '6px 12px',
            background: blueGrey[700],
            alignSelf: 'flex-start',
          }}
        >
          <Typo lines={1} sx={{ fontSize: 12, lienHeght: '16px', fontWeight: '700', zIndex: 2, color: '#ffffff' }}>
            {item.mission.title}
          </Typo>
        </Paper>
        <Box sx={{ display: 'flex' }}>
          <Typography
            sx={{
              mt: 1,
              fontSize: 14,
              lineHeight: '20px',
              opacity: 0.6,
              textAlign: 'left',
            }}
          >
            {`${formatDateTime(item.createdAt)}`}
          </Typography>
          {item.is_private === 1 && (
            <Icon
              name="lock"
              prefix="fas"
              size={12}
              sx={{
                mt: 1.5,
                ml: 0.5,
                opacity: 0.6,
              }}
            />
          )}
        </Box>
      </Box>
    </ListItem>
  );
}
