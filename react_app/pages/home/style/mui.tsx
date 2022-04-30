import {
  Avatar,
  Badge,
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  Radio,
  Rating,
  Select,
  Slider,
  Stack,
  Switch,
  Table,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material';
import { red } from '@mui/material/colors';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Page() {
  const router = useRouter();
  const [toggleValue, setToggleValue] = useState<string | null>(null);
  const onClickToggle = (event: React.MouseEvent<HTMLElement>, newValue: string | null) => {
    setToggleValue(newValue);
  };
  return (
    <Container>
      <Button onClick={() => router.back()}>뒤로가기</Button>
      <Stack>
        입력창(Button, TextField, Radio, Rating, Select, Slider, Switch, ToggleButton)
        <Button sx={{ mb: 2 }}>MUI버튼</Button>
        <TextField placeholder="MUI인풋창" label="라벨" />
        <Radio />
        <Rating />
        <Select />
        <Slider />
        <Switch />
        <ToggleButtonGroup color="primary" value={toggleValue} exclusive onChange={onClickToggle}>
          <ToggleButton value="web">Web</ToggleButton>
          <ToggleButton value="android">Android</ToggleButton>
          <ToggleButton value="ios">iOS</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <Stack sx={{ mt: 4 }}>
        이미지 및 아이콘(Avatar, IconButton, Badge, List, Typography)
        <Avatar />
        <IconButton aria-label="cart">
          <Badge badgeContent={4} color="primary">
            Home
          </Badge>
        </IconButton>
        <List>
          <ListItem sx={{ border: '1px solid red', borderRadius: 1 }}>item1</ListItem>
          <ListItem sx={{ border: '1px solid red', borderRadius: 1 }}>item2</ListItem>
        </List>
        <Typography>글자</Typography>
      </Stack>

      <Stack sx={{ mt: 4 }}>
        레이아웃(Box, Stack)
        <Box sx={{ width: 100, height: 100, backgroundColor: red[200] }}>내용</Box>
        <Stack direction={'row'}>
          <Box sx={{ width: 100, height: 100, backgroundColor: red[400] }}>내용</Box>
          <Box sx={{ width: 100, height: 100, backgroundColor: red[400] }}>내용</Box>
        </Stack>
        <Stack direction={'row'} justifyContent={'flex-end'}>
          <Box sx={{ width: 100, height: 100, backgroundColor: red[600] }}>내용</Box>
          <Box sx={{ width: 100, height: 100, backgroundColor: red[600] }}>내용</Box>
        </Stack>
      </Stack>
    </Container>
  );
}
