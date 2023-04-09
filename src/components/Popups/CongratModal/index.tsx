import { Box } from "@mui/material";
import { RMZ_ICON } from "../../../source";
import PopupBox from "../PopupBox";

interface IQRModal {
  close: () => void;
  value: string;
}

const CongratModal = ({ close, value }: IQRModal) => {
  return (
    <PopupBox close={close}>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            fontSize: "44px",
            fontWeight: 700,
            lineHeight: "50px",
            textAlign: "center",

            "& img": {
              width: "41px",
              position: "relative",
              top: "7px",
            },
          }}
        >
          Вы приобрели <br /> {value} <img src={RMZ_ICON} alt="" /> RMZ
        </Box>
        <Box
          sx={{
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "28px",
            textAlign: "center",
            fontFamily: "Montserrat",
          }}
        >
          Токены будут зачислены на Ваш
          <br /> кошелек в течении 15 минут.
        </Box>
      </Box>
    </PopupBox>
  );
};

export default CongratModal;
