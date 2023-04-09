import { Box, Button, Container, Modal } from "@mui/material";
import { LOGO_ICON } from "../../source";
import Link from "next/link";
import { RootState } from "../../store/reducers";
import { useSelector } from "react-redux";
import { useState } from "react";
import ConnectPopup from "../Popups/ConnectPopup";
import { useRouter } from "next/router";

const Header = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const connected = useSelector((state: RootState) => state.connected);

  const router = useRouter();

  return (
    <>
      {openModal && <ConnectPopup close={() => setOpenModal(false)} />}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: {
            lg: "34px 50px 60px 50px",
            xs: "15px 15px 60px 15px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: {
              lg: "50px",
              xs: "0px",
            },
            alignItems: "center",
            width: {
              lg: "unset",
              xs: "100%",
            },
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              cursor: "pointer",
              display: {
                lg: "flex",
                xs: "none",
              },

              "& img": {
                width: "78px",
              },
            }}
          >
            <Link href="/">
              <img src={LOGO_ICON} alt="" />
            </Link>
          </Box>
          <Box
            sx={{
              fontWeight: 700,
              fontSize: {
                lg: "18px",
                xs: "14px",
              },
              lineHeight: "100%",
              borderBottom: "1px solid rgb(255, 255, 255, 0.2)",
              color: "#FFFFFF",
              transition: "0.2s",

              "& a": {
                textDecoration: "none",
              },

              "&:hover": {
                borderBottom: "1px solid #FFB72A",
              },
            }}
          >
            {router.pathname === "/InfoPage" ? (
              <Link href="/">Купить токен</Link>
            ) : (
              <Link href="/InfoPage">Информация</Link>
            )}
          </Box>
          <Box
            sx={{
              cursor: "pointer",
              display: {
                lg: "none",
                xs: "flex",
              },

              "& img": {
                width: "70px",
              },
            }}
          >
            <Link href="/">
              <img src={LOGO_ICON} alt="" />
            </Link>
          </Box>
          {/* <Box
            sx={{
              fontWeight: 700,
              fontSize: {
                lg: "18px",
                xs: "14px",
              },
              lineHeight: "100%",
              borderBottom: "1px solid rgb(255, 255, 255, 0.2)",
              color: "#FFFFFF",
              transition: "0.2s",

              "& a": {
                textDecoration: "none",
              },

              "&:hover": {
                borderBottom: "1px solid rgb(255, 255, 255, 1)",
              },
            }}
          >
            <Link href="/">اللغة العربية</Link>
          </Box> */}
        </Box>
        {!connected && (
          <Box
            sx={{
              display: {
                lg: "flex",
                xs: "none",
              },
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => setOpenModal(true)}
              sx={{
                border: "1px solid #FFB72A",
                borderRadius: "4px",
                padding: {
                  lg: "17px 25px 13px 25px",
                  xs: "15px 20px 11px 20px",
                },
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "100%",
                color: "#FFFFFF",
                textTransform: "none",
                transtiion: "0.2s",
                fontFamily: "El Messiri",

                "&:hover": {
                  background: "#FFB72A",
                },
              }}
            >
              Подключить кошелек
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Header;
