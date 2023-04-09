import { Box, styled, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";

const TokenPrices = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("lg"));

  const salePrice = useSelector((state: RootState) => state.salePrice) || "—";
  const stableName = useSelector((state: RootState) => state.stableName) || "—";

  return (
    <Box
      sx={{
        marginTop: {
          lg: "40px",
          xs: "30px",
        },

        display: "flex",
        width: "100%",
        justifyContent: {
          lg: "unset",
          xs: "space-between",
        },
        gap: {
          lg: "100px",
          xs: "0px",
        },
        marginLeft: {
          lg: "25px",
          xs: "0px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "20px",
        }}
      >
        {!mobile && <CustomVert />}
        <Box
          sx={{
            display: "flex",
            gap: "5px",
            flexDirection: "column",
          }}
        >
          <UpText>Цена токена:</UpText>
          <DownText>
            {salePrice} {salePrice === "—" ? "" : stableName}
          </DownText>
        </Box>
      </Box>
    </Box>
  );
};

const CustomVert = styled(Box)`
  background: #ffb72a;
  height: 38px;
  width: 1px;
`;

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

export default TokenPrices;
