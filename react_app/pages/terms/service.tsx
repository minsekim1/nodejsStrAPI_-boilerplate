import type { NextPage } from "next";
import { useRouter } from "next/router";
import { alpha, AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

const Page: NextPage = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      서비스이용약관을 넣어주세요.
    </Box>
  );
};

export default Page;
