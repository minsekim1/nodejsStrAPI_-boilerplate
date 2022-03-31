import _ from 'lodash';
import {
  Stack,
  Box,
  IconButton,
  Container,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  List,
  Divider,
  Paper,
  Tab,
  Tabs,
} from '@mui/material';
import { blueGrey, pink, amber, deepOrange } from '@mui/material/colors';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userTabs } from '../../../constants';
import { loaderState } from '../../../recoil/modal';
import { comma, displayedAt } from '../../../utils';
import Icon from '../../atoms/Icon';
import Visual from '../../atoms/Visual';
import { getUserDataQuery, UserDataQueryProps } from '../../../utils/apollo/useUserQuery';
type Props = {
  userData: UserDataQueryProps;
};
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <>{children}</>}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function User({ userData }: Props) {
  const router = useRouter();
  const myData = getUserDataQuery();

  const setLoader = useSetRecoilState(loaderState);
  const [show, setShow] = useState<boolean>(false);
  const { slide } = router.query;
  const [value, setValue] = useState<number>(typeof slide === 'string' ? Number(slide) : 0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    router.replace(
      `/${router.asPath.split('/').join(',').split('?').join(',').split(',')[1]}/${
        router.asPath.split('/').join(',').split('?').join(',').split(',')[2]
      }?slide=${newValue}`
    );
  };

  if (typeof window !== 'undefined') {
    useEffect(() => {
      const listener1 = () => {
        var scrollY = window.pageYOffset;
        if (scrollY >= 48) {
          setShow(true);
        } else {
          setShow(false);
        }
      };
      window && window.addEventListener('scroll', listener1);
      return () => {
        window && window.removeEventListener('scroll', listener1);
      };
    }, [window]);
  }
  const handleClickBack = () => router.back();
  const handleClickOptions = () => router.push('/options');
  const handleClickProfile = () => router.push('/options/profile');

  if (!userData.data || !myData.data) return <></>;
  return (
    <>
      <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 2, backgroundColor: '#ffffff', pt: 'var(--sait)' }}>
        <Container sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleClickBack} sx={{ ml: -2 }}>
            <Icon name="arrow-left" size={20} />
          </IconButton>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              opacity: show ? 1 : 0,
              transition: 'all 0.5s ease',
            }}
          >
            <ListItemAvatar
              sx={{
                minWidth: 0,
                mr: 1.5,
              }}
            >
              <Avatar
                sx={{
                  '& *': {
                    borderRadius: '50% !important',
                    overflow: 'hidden',
                  },
                  borderRadius: '50% !important',
                  overflow: 'hidden',
                  backgroundColor: blueGrey[900],
                  width: 32,
                  height: 32,
                }}
              >
                {userData.data.profile_image ? <Visual src={userData.data.profile_image} /> : null}
              </Avatar>
            </ListItemAvatar>
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  lineHeight: '20px',
                  fontWeight: '700',
                }}
              >
                {`${userData.data.nickname}`}
              </Typography>
              <Typography
                sx={{
                  fontSize: 12,
                  lineHeight: '16px',
                  fontWeight: '400',
                  color: blueGrey[500],
                }}
              >
                {`${userData.data.email}`}
              </Typography>
            </Box>
          </Box>
          {userData.data.id === myData.data.id && (
            <IconButton onClick={handleClickOptions} sx={{ mr: -2 }}>
              <Icon name="cog" size={20} />
            </IconButton>
          )}
        </Container>
      </Box>
      <Box
        sx={{
          position: 'relative',
          pt: 'calc(var(--sait) + 56px)',
          pb: 'calc(var(--saib) + 64px + 8px)',
        }}
      >
        <ListItem sx={{ alignItems: 'flex-start' }}>
          <ListItemAvatar sx={{ mr: 2, position: 'relative' }}>
            <Avatar
              sx={{
                '& *': {
                  borderRadius: '50% !important',
                  overflow: 'hidden',
                },
                borderRadius: '50% !important',
                overflow: 'hidden',
                width: 72,
                height: 72,
                backgroundColor: blueGrey[900],
              }}
            >
              {userData.data.profile_image ? <Visual src={userData.data.profile_image} /> : null}
            </Avatar>
            <Paper
              elevation={4}
              sx={{
                position: 'absolute',
                right: -4,
                bottom: -4,
                backgroundColor: blueGrey[700],
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid #ffffff',
              }}
            >
              {userData.data.id === myData.data.id && (
                <IconButton
                  sx={{
                    width: 28,
                    height: 28,
                  }}
                  onClick={handleClickProfile}
                >
                  <Icon name="pen" size={14} sx={{ color: '#ffffff' }} />
                </IconButton>
              )}
            </Paper>
          </ListItemAvatar>
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontSize: 20,
                lineHeight: '28px',
                fontWeight: '700',
              }}
            >
              {`${userData.data.nickname}`}
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: '20px',
                fontWeight: '400',
                color: blueGrey[500],
              }}
            >
              {`${userData.data.email}`}
            </Typography>
            <Typography
              sx={{
                mt: 0.51,
                fontSize: 14,
                lineHeight: '20px',
                fontWeight: '400',
                color: userData.data.greeting === '' || userData.data.greeting === null ? blueGrey[300] : blueGrey[500],
              }}
            >
              {userData.data.greeting === '' || userData.data.greeting === null ? '아직 인사말이 없어요!' : `${userData.data.greeting}`}
            </Typography>
          </Box>
        </ListItem>
        <Stack direction="row" justifyContent="center" sx={{ mt: 1 }}>
          <Box
            sx={{ display: 'flex', justifyContent: 'center', pl: 3, pr: 3, mt: 2, mb: 2, borderRight: '1px solid rgba(0,0,0,0.23)' }}
            onClick={() => router.push('/store')}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Icon name="coins" prefix="far" size={24} sx={{ mr: 1, color: amber[700] }} />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box>
                  <Typography
                    sx={{
                      fontSize: 12,
                      lineHeight: '16px',
                      fontWeight: '700',
                      color: amber[700],
                      fontFamily: "'Montserrat', 'Spoqa Han Sans Neo', 'Spoqa Han Sans JP', sans-serif !important",
                    }}
                  >
                    {myData.data.id === userData.data.id ? '내 포인트' : '포인트'}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Stack>
        <Container
          sx={{
            pl: '24px !important',
            pr: '24px !important',
            // pb: 1,
            position: 'sticky',
            top: 'calc(var(--sait) + 56px)',
            backgroundColor: '#ffffff',
            zIndex: 9999,
            '&:after': {
              position: 'absolute',
              content: '""',
              left: 0,
              right: 0,
              bottom: 0,
              height: '1px',
              backgroundColor: 'rgba(0,0,0,0.16)',
            },
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              backgroundColor: 'transparent',
              '& .MuiTabs-indicator': {
                // backgroundColor: 'transparent',
                backgroundColor: blueGrey[900],
                '&:after': {
                  // position: 'absolute',
                  // content: '""',
                  // bottom: 0,
                  // left: '50%',
                  // transform: 'translateX(-50%)',
                  backgroundColor: blueGrey[900],
                  // width: '4px !important',
                  // height: 4,
                  // borderRadius: '50%',
                },
              },
            }}
          >
            {userTabs.map((item, index) => (
              <Tab
                key={index}
                label={item.label}
                {...a11yProps(index)}
                sx={{
                  flex: 1,
                  // minWidth: 0,
                  pl: 1,
                  pr: 1,
                  color: `${blueGrey[900]} !important`,
                  opacity: 0.3,
                  fontSize: 16,
                  lineHeight: '24px',
                  fontWeight: '700',
                  '&.Mui-selected': {
                    opacity: 1,
                  },
                }}
              />
            ))}
          </Tabs>
        </Container>
        <TabPanel value={value} index={0}></TabPanel>
        <TabPanel value={value} index={1}>
          <Container
            sx={{
              p: '2px !important',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gridAutoColumn: '1fr',
              gridColumnGap: 2,
              gridRowGap: 2,
              gridTemplateRows: 'auto auto',
            }}
          ></Container>
        </TabPanel>
        <TabPanel value={value} index={2}></TabPanel>
      </Box>
    </>
  );
}
