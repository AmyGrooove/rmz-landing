import { Box, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  ETHEREUM_NETWORK,
  changeNetworkBool,
  GOERLI_TEST_NETWORK,
} from "../../../dependencies/constants";
import { copyToClipboard } from "../../../dependencies/helper/helpFunction";
import { COPY_ICON } from "../../../source";
import { checkConnection, disconnect } from "../../../store/actions";
// import { COPY_ICON } from "../../../source/image";
import PopupBox from "../PopupBox";

const IncorrectNetworkModal = () => {
  const dispatch = useDispatch();

  const [anim, setAnim] = useState<boolean[]>([false, false, false]);

  const info = [
    {
      title: "Name:",
      data: changeNetworkBool
        ? GOERLI_TEST_NETWORK.name
        : ETHEREUM_NETWORK.name,
    },
    {
      title: "RPC URL:",
      data: changeNetworkBool
        ? GOERLI_TEST_NETWORK.rpcUrl
        : ETHEREUM_NETWORK.rpcUrl,
    },
    {
      title: "Chain ID:",
      data: changeNetworkBool
        ? GOERLI_TEST_NETWORK.chainId
        : ETHEREUM_NETWORK.chainId,
    },
  ];

  const copyText = (id: number) => {
    copyToClipboard(info[id].data);
    switch (id) {
      case 0:
        setAnim([true, false, false]);
        break;
      case 1:
        setAnim([false, true, false]);
        break;
      case 2:
        setAnim([false, false, true]);
        break;
      default:
        break;
    }
    setTimeout(() => {
      setAnim([false, false, false]);
    }, 600);
  };

  const changeButton = () => {
    dispatch(checkConnection());
  };

  const disconnectWallet = () => {
    dispatch(disconnect());
  };

  return (
    <PopupBox>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          flexDirection: "column",
          width: {
            lg: "480px",
            xs: "90%",
          },
        }}
      >
        <Box
          sx={{
            fontSize: {
              lg: "44px",
              xs: "26px",
            },
            lineHeight: {
              lg: "50px",
              xs: "32px",
            },
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Пожалуйста, выберите <br />
          правильную сеть
        </Box>
        <Box
          sx={{
            fontSize: {
              lg: "16px",
              xs: "12px",
            },
            lineHeight: {
              lg: "28px",
              xs: "20px",
            },
            fontWeight: 700,
            textAlign: "center",
            fontFamily: "Montserrat",
          }}
        >
          Измените сеть автоматически или сделайте
          <br /> это вручную в кошельке
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          {info.map((el, index) => (
            <Box
              key={index}
              onClick={() => copyText(index)}
              sx={{
                borderBottom: anim[index]
                  ? "1px solid rgba(255, 183, 42, 0.7)"
                  : "1px solid rgba(255, 255, 255, 0.3)",
                paddingBottom: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                transition: "0.2s",

                "& img": {
                  position: "relative",
                  top: "6px",

                  transition: "0.2s",
                  filter: anim[index]
                    ? "invert(8%) sepia(25%) saturate(2727%) hue-rotate(334deg) brightness(102%) contrast(104%)"
                    : "none",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "7px",
                  overflowWrap: "break-word",
                  width: {
                    lg: "480px",
                    xs: "90%",
                  },
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    fontSize: "12px",
                    lineHeight: "15px",
                    fontWeight: 500,
                    opacity: "0.6",
                    fontFamily: "Montserrat",
                  }}
                >
                  {el.title}
                </Box>
                <Box
                  sx={{
                    fontSize: "14px",
                    lineHeight: "17px",
                    fontFamily: "Montserrat",
                    fontWeight: 600,
                  }}
                >
                  {el.data}
                </Box>
              </Box>
              <img src={COPY_ICON} alt="" />
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
          }}
        >
          <Button
            onClick={changeButton}
            sx={{
              border: "1px solid #FFB72A",
              borderRadius: "4px",
              fontWeight: 700,
              fontSize: {
                lg: "16px",
                xs: "14px",
              },
              padding: {
                lg: "17px 25px 13px 25px",
                xs: "15px 20px 11px 20px",
              },
              lineHeight: "100%",
              color: "#FFFFFF",
              textTransform: "none",
              transtiion: "0.2s",
              fontFamily: "El Messiri",
              width: "100%",

              "&:hover": {
                background: "#FFB72A",
              },
            }}
          >
            Изменить сеть
          </Button>
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
              transtiion: "0.2s",
              fontFamily: "El Messiri",
              width: "100%",

              "&:hover": {
                background: "#FFB72A",
              },
            }}
          >
            Отключить
          </Button>
        </Box>
      </Box>
    </PopupBox>
  );
};

export default IncorrectNetworkModal;
