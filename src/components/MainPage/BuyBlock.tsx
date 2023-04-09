import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  keyframes,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExchangeService from "../../dependencies/services/ExchangeService";
import {
  CIRCLE_ARROW,
  coins,
  GRAY_ARROW_DOWN,
  RMZ_ICON,
  LOADiNG_ICON,
} from "../../source";
import { changeStable, getData, setLoading } from "../../store/actions";
import { RootState } from "../../store/reducers";
import CongratModal from "../Popups/CongratModal";
import ConnectPopup from "../Popups/ConnectPopup";

const BuyBlock = () => {
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const connected = useSelector((state: RootState) => state.connected);

  const stableName = useSelector((state: RootState) => state.stableName) || "—";
  const salePrice: string =
    useSelector((state: RootState) => state.salePrice) || "—";

  const stableBalance =
    useSelector((state: RootState) => state.stableBalance) || "—";
  const rmzBalance = useSelector((state: RootState) => state.rmzBalance) || "—";

  const ethBalance = useSelector((state: RootState) => state.ethBalance) || "—";
  const gasPrice = useSelector((state: RootState) => state.gasPrice) || "—";

  const loading = useSelector((state: RootState) => state.loading);

  const [stableValue, setStableValue] = useState<string>("");
  const [rmzValue, setRmzValue] = useState<string>("");

  const handleChangeStable = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;

    if (value === "") {
      setStableValue(value);
      setRmzValue("");
      return;
    }

    if (!value.match("^[0-9]*[.]?[0-9]*$")) {
      return;
    }

    await calcStable(value, true);
  };

  const handleChangeRmz = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;

    if (value === "") {
      setStableValue("");
      setRmzValue(value);
      return;
    }

    if (!value.match("^[0-9]*[.]?[0-9]*$")) {
      return;
    }

    await calcStable(value, false);
  };

  const calcStable = async (value: string, change: boolean) => {
    await dispatch(setLoading(true));

    if (change) {
      setStableValue(value);
      setRmzValue((Number(value) / Number(salePrice)).toString());
      setApproved(await ExchangeService.allowance(value, stableName));
    } else {
      setRmzValue(value);
      setStableValue((Number(value) * Number(salePrice)).toString());
      setApproved(
        await ExchangeService.allowance(
          (Number(value) * Number(salePrice)).toString(),
          stableName
        )
      );
    }

    await dispatch(setLoading(false));
  };

  const changeStableButton = (value: string) => {
    dispatch(changeStable(value));
    setStableValue("");
    setRmzValue("");
  };

  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const [approved, setApproved] = useState<boolean>(false);

  const approve = () => {
    setLoadingButton(true);

    ExchangeService.approve(stableValue, stableName)
      .then(() => {
        setApproved(true);
        setLoadingButton(false);
      })
      .catch((error) => {
        setLoadingButton(false);
        console.log(error);
      });
  };

  const buy = async () => {
    setLoadingButton(true);

    ExchangeService.buy(stableName, rmzValue)
      .then(() => {
        openCongrat(true);
        setCongratValue(rmzValue);
        setStableValue("");
        setRmzValue("");
        setLoadingButton(false);
        dispatch(getData());
      })
      .catch((error) => {
        setLoadingButton(false);
        console.log(error);
      });
  };

  const setMaxValue = () => {
    calcStable(stableBalance, true);
  };

  const [congrat, openCongrat] = useState<boolean>(false);
  const [congratValue, setCongratValue] = useState<string>("");

  const disableBuyStable =
    stableValue === "" || Number(stableValue) > Number(stableBalance);

  const disableBuyCommission = Number(ethBalance) < Number(gasPrice);

  return (
    <>
      {openModal && <ConnectPopup close={() => setOpenModal(false)} />}
      {congrat && (
        <CongratModal close={() => openCongrat(false)} value={congratValue} />
      )}
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            top: {
              lg: "101px",
              xs: "97px",
            },
            zIndex: 2,
            width: {
              lg: "510px",
              xs: "100%",
            },

            heihgt: {
              lg: "231px",
              xs: "207px",
            },

            "& img": {
              width: {
                lg: "30px",
                xs: "24px",
              },
            },
          }}
        >
          <img src={CIRCLE_ARROW} alt="" />
        </Box>
        <Box
          sx={{
            background: "#FFFFFF",
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
            borderRadius: "4px 4px 6px 6px",
            width: {
              lg: "510px",
              xs: "100%",
            },
            heihgt: {
              lg: "231px",
              xs: "207px",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              borderBottom: "1px solid #AAB4B3",
            }}
          >
            <TextField
              value={stableValue}
              onChange={handleChangeStable}
              type="text"
              autoComplete="off"
              focused
              placeholder="0.0"
              label="Отдаю:"
              sx={{
                width: "100%",
                background: "#FFFFFF",
                borderTopLeftRadius: "4px",

                "& label": {
                  fontWeight: 500,
                  fontSize: "18px",
                  fontFamily: "Montserrat",
                  lineHeight: "16px",
                  color: "#939393!important",
                  position: "relative",
                  top: "25px",
                  left: "10px",
                  height: "17px",
                },

                "& input": {
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "38px",
                  position: "relative",
                  left: "10px",
                  top: "5px",
                  color: "#606060",
                  fontFamily: "El Messiri",

                  "&:focus": {
                    transition: "0.2s",
                    color: "#000000",
                  },
                },

                "& div fieldset": {
                  display: "none",
                },
              }}
            />
            <Box
              sx={{
                background: "#FFFFFF",
                borderTopRightRadius: "4px",
                padding: "15px 25px 15px 0",
                display: "flex",
                gap: "10px",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Box
                sx={{
                  fontWeight: 500,
                  fontSize: "13px",
                  fontFamily: "Montserrat",
                  lineHeight: "16px",
                  color: "#939393",
                  width: "120px",
                  textAlign: "right",
                }}
              >
                Баланс: {stableBalance === "0.0" ? "0.00" : stableBalance}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",

                  "& img": {
                    width: {
                      lg: "28px",
                      xs: "24px",
                    },
                  },
                }}
              >
                <Button
                  onClick={setMaxValue}
                  sx={{
                    position: "relative",
                    left: "15px",
                    minWidth: "60px",
                    fontWeight: 700,
                    fontSize: "14px",
                    lineHeight: "100%",
                    color: "#939393",
                    textTransform: "none",
                    fontFamily: "El Messiri",
                    background: "rgb(255, 255, 255, 0,1)",
                    border: "1px solid #AAB4B3",
                    borderRadius: "4зч",
                    padding: "7px 0 5px 0",
                    cursor: "pointer",

                    "&:hover": {
                      background: "#e6e6e6",
                    },
                  }}
                >
                  на все
                </Button>
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    cursor: "pointer",

                    "& #arrow": {
                      width: "12px",
                    },
                  }}
                >
                  <Select
                    defaultValue={stableName}
                    sx={{
                      "& .MuiSelect-select": {
                        padding: "0px",
                        paddingRight: "20px!important",
                        position: "relative",
                        left: "20px",
                        zIndex: 2,
                      },

                      "& svg": {
                        display: "none",
                      },

                      "& fieldset": {
                        display: "none",
                      },
                    }}
                  >
                    {coins.map((el, index) => (
                      <MenuItem
                        value={el.name}
                        key={index}
                        onClick={() => changeStableButton(el.name)}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",

                            "& img": {
                              width: "24px",
                            },
                          }}
                        >
                          <img src={el.icon} alt="" />
                          <Box
                            sx={{
                              position: "relative",
                              top: "2px",
                              fontWeight: 800,
                              fontSize: "18px",
                              color: "#000000",
                              lineHeight: "28px",
                            }}
                          >
                            {el.name}
                          </Box>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                  <Box>
                    <img id="arrow" src={GRAY_ARROW_DOWN} alt="" />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <TextField
              value={rmzValue}
              onChange={handleChangeRmz}
              type="text"
              autoComplete="off"
              focused
              placeholder="0.0"
              label="Покупаю:"
              sx={{
                width: "100%",
                background: "#FFFFFF",
                borderTopLeftRadius: "4px",

                "& label": {
                  fontWeight: 500,
                  fontSize: "18px",
                  fontFamily: "Montserrat",
                  lineHeight: "16px",
                  color: "#939393!important",
                  position: "relative",
                  top: "25px",
                  left: "10px",
                  height: "18px",
                },

                "& input": {
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "38px",
                  position: "relative",
                  left: "10px",
                  top: "5px",
                  color: "#606060",
                  fontFamily: "El Messiri",

                  "&:focus": {
                    transition: "0.2s",
                    color: "#000000",
                  },
                },

                "& div fieldset": {
                  display: "none",
                },
              }}
            />
            <Box
              sx={{
                background: "#FFFFFF",
                borderTopRightRadius: "4px",
                padding: "15px 25px 15px 0",
                display: "flex",
                gap: "10px",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Box
                sx={{
                  fontWeight: 500,
                  fontSize: "13px",
                  fontFamily: "Montserrat",
                  lineHeight: "16px",
                  color: "#939393",
                  width: "120px",
                  textAlign: "right",
                }}
              >
                Баланс: {rmzBalance === "0.0" ? "0.00" : rmzBalance}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <img src={RMZ_ICON} alt="" />
                  <Box
                    sx={{
                      position: "relative",
                      top: "2px",
                      fontWeight: 700,
                      fontSize: "18px",
                      color: "#000000",
                      lineHeight: "28px",
                    }}
                  >
                    RMZ
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Button
            onClick={
              connected ? (approved ? buy : approve) : () => setOpenModal(true)
            }
            disabled={
              connected
                ? disableBuyStable || disableBuyCommission || loadingButton
                : false
            }
            sx={{
              background: "linear-gradient(90deg, #AC0800 0%, #DA251C 100%)",
              border: "1px solid #DA251C",
              borderRadius: "0px 0px 4px 4px",
              width: "100%",
              fontWeight: 600,
              fontSize: {
                lg: "22px",
                xs: "18px",
              },
              lineHeight: {
                lg: "34px",
                xs: "28px",
              },
              color: "#FFFFFF",
              textTransform: "none",
              fontFamily: "El Messiri",
              padding: {
                lg: "20px 0 16px 0",
                xs: "15px 0 11px 0",
              },
              transition: "0.2s",

              height: {
                lg: "70px",
                xs: "56px",
              },

              "& img": {
                animation: `${Rotation} infinite linear 1s`,
              },

              "&.Mui-disabled": {
                background: loading
                  ? "linear-gradient(90deg, #AC0800 0%, #DA251C 100%)"
                  : "linear-gradient(90deg, #AAB4B3 0%, #606060 100%)",
                border: loading ? "1px solid #DA251C" : "1px solid #AAB4B3",
                color: "#FFFFFF",
              },
            }}
          >
            {connected ? (
              loading ? (
                <img src={LOADiNG_ICON} alt="" />
              ) : stableValue === "" ? (
                "Купить RMZ"
              ) : disableBuyStable ? (
                "Недостаточно токенов"
              ) : disableBuyCommission ? (
                "Недостаточно Ethereum"
              ) : loadingButton ? (
                "Пожалуйста, подождите"
              ) : approved ? (
                "Купить RMZ"
              ) : (
                "Одобрить токены"
              )
            ) : (
              "Подключить кошелек"
            )}
          </Button>
        </Box>
      </Box>
    </>
  );
};

const Rotation = keyframes`
  0% {
      transform:rotate(0deg);
  }
  100% {
      transform:rotate(360deg);
  }
`;

export default BuyBlock;
