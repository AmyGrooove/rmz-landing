import { Box, Container } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import BuyBlock from "./BuyBlock";
import ProfileBlock from "./ProfileBlock";
import TokenPrices from "./TokenPrices";

const MainPage = () => {
  const connected = useSelector((state: RootState) => state.connected);

  return (
    <>
      <Container
        sx={{
          padding: {
            lg: "0 10px 0px 100px!important",
            xs: "0 15px!important",
          },
          display: "flex",
          justifyContent: {
            lg: "flex-start",
            xs: "center",
          },
        }}
      >
        <Box
          sx={{
            flexDirection: "column",
            display: "flex",
            alignItems: {
              lg: "flex-start",
              xs: "center",
            },
          }}
        >
          <Box
            sx={{
              marginBottom: {
                lg: "0px",
                xs: "6px",
              },
              maxWidth: {
                lg: "500px",
                xs: "300px",
              },
              fontWeight: 700,
              fontSize: {
                lg: "44px",
                xs: "26px",
              },
              lineHeight: {
                lg: "50px",
                xs: "32px",
              },
              textAlign: {
                lg: "left",
                xs: "center",
              },
            }}
          >
            Цифровая монета Чеченской Республики и её великого народа
          </Box>
          <BuyBlock />
          <TokenPrices />
        </Box>
      </Container>
      <Box
        sx={{
          padding: "40px 15px 0 15px",
        }}
      >
        {connected && <ProfileBlock />}
      </Box>
    </>
  );
};

export default MainPage;
