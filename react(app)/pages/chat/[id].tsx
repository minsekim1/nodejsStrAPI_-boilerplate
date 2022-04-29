import { useRouter } from "next/router";
import { Box, Button, Container, Stack, TextareaAutosize, TextareaAutosizeProps, TextField } from "@mui/material";
import { useSetLoader } from "../../components/atoms/loader";
import { useEffect, useRef, useState } from "react";
import { getFetch, postFetch } from "../../util/fetch";

export default function Page() {
  const router = useRouter();
  const setLoader = useSetLoader();

  const chatroomId = router.query.id;
  const [messageList, setMessageList] = useState({ data: [], meta: null });
  const inputRef = useRef<any>();

  const user = typeof window && localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") ?? "") : null;
  const checkMessage = () => {
    getFetch("/chats").then((d: any) => {
      if (d.data.length != messageList.data.length) setMessageList(d);
    });
  };
  useEffect(() => {
    checkMessage();
    let timer = setInterval(() => checkMessage(), 2000);
    return () => clearInterval(timer);
  }, []);

  const onClickSend = () => {
    postFetch("/chats", {
      data: {
        creator_id: user.user.id, //본인의 유저아이디를 넣으세요
        chatroom_id: Number(chatroomId),
        message: inputRef.current.value,
      },
    }).then((d) => checkMessage());
    inputRef.current.value = "";
  };
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pt: "calc(var(--sait) + 56px)",
        pb: "calc(var(--saib) + 64px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container>
        <Stack direction="row" spacing={2} justifyContent="space-evenly" sx={{ mb: 2 }}>
          <Button fullWidth onClick={() => router.back()}>
            뒤로가기
          </Button>
        </Stack>
        {messageList.data.map(
          (d: {
            id: number;
            attributes: {
              message: string; //"asd";
            };
          }) => (
            <Box>{d.attributes.message}</Box>
          )
        )}
        <Box sx={{ position: "fixed", bottom: 32, display: "flex", alignItems: "center" }}>
          <TextareaAutosize
            ref={inputRef}
            style={{ width: 300, height: "2.5em", borderRadius: 8, resize: "none" }}
          ></TextareaAutosize>
          <Button onClick={onClickSend}>전송</Button>
        </Box>
      </Container>
    </Box>
  );
}
