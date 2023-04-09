import { X_ARROW_ICON } from "../../../source/image";
import { Box, keyframes } from "@mui/material";
import { useState } from "react";

interface IPopup {
  close?: () => void;
  children: any;
}

const PopupBox = ({ children, close }: IPopup) => {
  const [revailBoll, ChangeRevailBool] = useState<boolean>(false);

  const closeRevail = () => {
    ChangeRevailBool(true);
    if (close !== undefined) {
      setTimeout(close, 150);
    }
  };

  return (
    <>
      <Box
        onClick={closeRevail}
        sx={{
          width: "100%",
          height: "100%",
          background: "#0D1516",
          opacity: 0.7,
          zIndex: 80,
          position: "fixed",
          left: 0,
          top: 0,
        }}
      />
      <Box
        sx={{
          backdropFilter: "blur(5px)",
          bottom: 0,
          left: 0,
          position: "fixed",
          width: "100%",
          height: "100%",
          zIndex: 81,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: revailBoll ? `${UnRevail} 0.15s` : `${Revail} 0.15s`,
        }}
      >
        {close !== undefined && (
          <Box
            onClick={closeRevail}
            sx={{
              position: "absolute",
              right: {
                lg: "40px",
                xs: "10px",
              },
              top: {
                lg: "40px",
                xs: "10px",
              },
              padding: "10px",
              cursor: "pointer",
              display: "flex",

              "& img": {
                height: {
                  lg: "36px",
                  xs: "24px",
                },
              },
            }}
          >
            <img src={X_ARROW_ICON} alt="" />
          </Box>
        )}
        {children}
      </Box>
    </>
  );
};

const Revail = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const UnRevail = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export default PopupBox;
