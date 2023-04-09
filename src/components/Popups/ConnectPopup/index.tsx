import { WALLET_CONNECT_ICON, METAMASK_ICON } from "../../../source/image";
import { connect, WALLET_METAMASK, WALLET_WC } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import PopupBox from "../PopupBox";
import { Box, Button } from "@mui/material";
import { useEffect } from "react";
import { RootState } from "../../../store/reducers";

interface IConnectPopup {
  close: () => void;
}

const ConnectPopup = ({ close }: IConnectPopup) => {
  const dispatch = useDispatch();

  const connected = useSelector((state: RootState) => state.connected);

  const onConnectMetamask = () => {
    dispatch(connect(WALLET_METAMASK));
  };

  const onConnectWallet = () => {
    dispatch(connect(WALLET_WC));
  };

  const isCorrectNetwork = useSelector(
    (state: RootState) => state.isCorrectNetwork
  );

  useEffect(() => {
    if (connected || !isCorrectNetwork) {
      close();
    }
  }, [connected, isCorrectNetwork]);

  return (
    <PopupBox close={close}>
      <Box
        sx={{
          display: "flex",
          gap: {
            lg: "80px",
            xs: "40px",
          },
        }}
      >
        <Button
          onClick={onConnectMetamask}
          sx={{
            display: {
              lg: "flex",
              xs: "none",
            },
            flexDirection: "column",
            gap: "20px",
            textTransform: "none",

            "&:hover": {
              background: "none",
            },
          }}
        >
          <Box
            sx={{
              background: "#FFFFFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "100px",
              width: {
                lg: "92px",
                xs: "70px",
              },
              height: {
                lg: "92px",
                xs: "70px",
              },

              "& img": {
                height: {
                  lg: "48px",
                  xs: "36px",
                },
              },
            }}
          >
            <img src={METAMASK_ICON} alt="" />
          </Box>
          <Box
            sx={{
              fontSize: {
                lg: "22px",
                xs: "16px",
              },
              fontWeight: 700,
              lineHeight: {
                lg: "34px",
                xs: "25px",
              },
            }}
          >
            MetaMask
          </Box>
        </Button>
        <Button
          onClick={onConnectWallet}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",

            textTransform: "none",

            "&:hover": {
              background: "none",
            },
          }}
        >
          <Box
            sx={{
              background: "#FFFFFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "100px",
              width: {
                lg: "92px",
                xs: "70px",
              },
              height: {
                lg: "92px",
                xs: "70px",
              },

              "& img": {
                height: {
                  lg: "36px",
                  xs: "28px",
                },
              },
            }}
          >
            <img src={WALLET_CONNECT_ICON} alt="" />
          </Box>
          <Box
            sx={{
              fontSize: {
                lg: "22px",
                xs: "16px",
              },
              fontWeight: 700,
              lineHeight: {
                lg: "34px",
                xs: "25px",
              },
            }}
          >
            WalletConnect
          </Box>
        </Button>
      </Box>
    </PopupBox>
  );
};

export default ConnectPopup;
