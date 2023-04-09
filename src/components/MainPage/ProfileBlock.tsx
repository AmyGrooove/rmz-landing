import { Box, Button, styled } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExchangeAddress } from "../../dependencies/helper/contractAddresses";
import {
  copyToClipboard,
  shortAddress,
} from "../../dependencies/helper/helpFunction";
import { RMZ_ICON, METAMASK_ICON, WALLET_CONNECT_ICON } from "../../source";
import { disconnect, WALLET_METAMASK } from "../../store/actions";
import { RootState } from "../../store/reducers";
import QRModal from "../Popups/QRModal";

const ProfileBlock = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const currentNetwork = useSelector(
    (state: RootState) => state.currentNetwork
  );

  const account = useSelector((state: RootState) => state.account);
  const address = getExchangeAddress(currentNetwork?.id) || "—";

  const rmzBalance = useSelector((state: RootState) => state.rmzBalance) || "—";

  const dispatch = useDispatch();

  const disconnectWallet = () => {
    dispatch(disconnect());
  };

  const [copied, setCopied] = useState<boolean>(false);

  const copyButton = async () => {
    await setCopied(true);
    await copyToClipboard(address);
    await setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <>
      {openModal && <QRModal close={() => setOpenModal(false)} />}
      <Box
        sx={{
          background: {
            lg: "rgb(13, 21, 22, 0.4)",
            xs: "rgb(0, 0, 0, 0.0)",
          },
          height: "100%",
          position: {
            lg: "absolute",
            xs: "unset",
          },
          right: 0,
          top: 0,
          zIndex: 20,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: {
            lg: "flex-start",
            xs: "center",
          },
          flexDirection: "column",
          paddingBottom: {
            lg: "0px",
            xs: "40px",
          },
        }}
      >
        <Box
          sx={{
            width: {
              lg: "unset",
              xs: "100%",
            },
            padding: {
              lg: "50px 70px 0 70px",
              xs: "0px",
            },
            display: "flex",
            gap: {
              lg: "60px",
              xs: "0px",
            },
            justifyContent: {
              lg: "unset",
              xs: "space-between",
            },
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "46px",
                height: "46px",
                background: "#FFFFFF",
                borderRadius: "100px",
                alignItems: "center",
                justifyContent: "center",

                "& img": {
                  width:
                    localStorage.getItem("WALLET_CONNECTION_TYPE") ===
                    WALLET_METAMASK
                      ? "24px"
                      : "20px",
                },
              }}
            >
              <img
                src={
                  localStorage.getItem("WALLET_CONNECTION_TYPE") ===
                  WALLET_METAMASK
                    ? METAMASK_ICON
                    : WALLET_CONNECT_ICON
                }
                alt=""
              />
            </Box>
            <Box
              sx={{
                fontWeight: 700,
                fontSize: {
                  lg: "18px",
                  xs: "16px",
                },
                lineHeight: {
                  lg: "28px",
                  xs: "25px",
                },
              }}
            >
              {shortAddress(account)}
            </Box>
          </Box>
          <Button
            onClick={disconnectWallet}
            sx={{
              border: "1px solid #FFB72A",
              borderRadius: "4px",
              padding: {
                lg: "17px 25px 13px 25px",
                xs: "15px 20px 11px 20px",
              },
              fontWeight: 700,
              fontSize: {
                lg: "16px",
                xs: "14px",
              },
              lineHeight: "100%",
              color: "#FFFFFF",
              textTransform: "none",
              fontFamily: "El Messiri",

              "&:hover": {
                background: "#FFB72A",
              },
            }}
          >
            Отключить
          </Button>
        </Box>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "35px",
              flexDirection: "column",
              margin: "64px 0 25px 0",
              padding: {
                lg: "0 70px",
                xs: "0px",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "7px",
                flexDirection: "column",
                borderBottom: "1px solid rgb(255, 255, 255, 0.2)",
                paddingBottom: "15px",
              }}
            >
              <UpText>Ваш баланс:</UpText>
              <Box
                sx={{
                  display: "flex",

                  "& img": {
                    width: "28px",
                    margin: "0 7px 0 15px",

                    position: "relative",
                    bottom: "2px",
                  },
                }}
              >
                <DownText>{rmzBalance}</DownText>
                <img src={RMZ_ICON} alt="" />
                <DownText>RMZ</DownText>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "7px",
                flexDirection: "column",
              }}
            >
              <UpText>Адрес контракта:</UpText>
              <DownText
                sx={{
                  overflowWrap: "break-word",
                  maxWidth: "370px",
                }}
              >
                {address}
              </DownText>
            </Box>
          </Box>
          <Box
            sx={{
              padding: {
                lg: "0 70px",
                xs: "0",
              },
              justifyContent: {
                lg: "unset",
                xs: "space-between",
              },
              display: "flex",
              gap: {
                lg: "20px",
                xs: "0px",
              },
            }}
          >
            <Button
              onClick={copyButton}
              sx={{
                background: "rgba(255, 255, 255, 0.1);",
                borderRadius: "4px",
                height: "38px",
                fontWeight: 700,
                fontSize: "14px",
                lineHeight: "100%",
                color: "#FFFFFF",
                textTransform: "none",
                fontFamily: "El Messiri",
                padding: "13px 20px 11px 20px",

                "&:hover": {
                  background: "rgba(255, 255, 255, 0.1);",
                },
              }}
            >
              {copied ? "Скопировано" : "Копировать"}
            </Button>
            <Button
              onClick={() => setOpenModal(true)}
              sx={{
                background: "rgba(255, 255, 255, 0.1);",
                borderRadius: "4px",
                height: "38px",
                fontWeight: 700,
                fontSize: "14px",
                lineHeight: "100%",
                color: "#FFFFFF",
                textTransform: "none",
                fontFamily: "El Messiri",
                padding: "13px 20px 11px 20px",

                "&:hover": {
                  background: "rgba(255, 255, 255, 0.1);",
                },
              }}
            >
              Показать QR-код
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

const DownText = styled(Box)`
  font-weight: 700;
  font-size: 22px;
  line-height: 34px;

  @media screen and (max-width: 1200px) {
    font-size: 18px;
    line-height: 28px;
  }
`;

const UpText = styled(Box)`
  font-family: Montserrat;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  opacity: 0.7;

  @media screen and (max-width: 1200px) {
    font-size: 10px;
    line-height: 12px;
  }
`;

export default ProfileBlock;
