import { createTheme, Theme } from "@mui/material/styles";

export type DefaultTheme = {
  breakpoints: {
    values: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
  };
} & Theme;

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 400,
      md: 768,
      lg: 1200,
      xl: 1440,
    },
  },
  components: {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(0, 0, 0, 0.2)",
          backdropFilter: "blur(6px)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          "& ul": {
            padding: "15px 000",

            "& li": {
              padding: "10px 25px",

              "& div div": {
                color: "#606060",
              },

              "&.Mui-selected": {
                background: "unset",

                "& div div": {
                  color: "#000000",
                },

                "&: hover": {
                  background: "rgb(0, 0, 0, 0.1)",
                },
              },

              "&: hover": {
                background: "rgb(0, 0, 0, 0.1)",
              },
            },
          },
        },
      },
    },
  },
});
