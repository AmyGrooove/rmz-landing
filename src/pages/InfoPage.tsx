import Head from "next/head";
import Header from "../components/Header";
import { Container, Box, styled, Button } from "@mui/material";

const InfoPage = () => {
  return (
    <>
      <Head>
        <title>RMZ Info</title>
      </Head>
      <Header />
      <Container
        sx={{
          padding: {
            lg: "0 10px 0px 100px!important",
            xs: "0 10px",
          },
        }}
      >
        <Box
          sx={{
            maxWidth: "600px",
          }}
        >
          <Box
            sx={{
              fontSize: {
                lg: "44px",
                xs: "24px",
              },
              fontWeight: 700,
              lineHeight: {
                lg: "50px",
                xs: "34px",
              },
            }}
          >
            Цифровая монета RMZ создана в честь великого лидера Чеченского
            народа
          </Box>
          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              gap: {
                lg: "40px",
                xs: "30px",
              },
            }}
          >
            <MiniText
              sx={{
                fontWeight: 600,
                fontSize: {
                  lg: "20px",
                  xs: "16px",
                },
                lineHeight: {
                  lg: "34px",
                  xs: "26px",
                },
              }}
            >
              Рамзана Ахматовича Кадырова, олицетворяющего неиссякаемую силу
              духа, мужество, достоинство, храбрость и честь, талантливого
              правителя Чеченской Республики и верного защитника Родины.
            </MiniText>
            <CustomBr />
            <MiniText>
              Проект RMZ будет поддерживать цифровое развитие Чеченской
              Республики, во всех областях, уходя от использования иностранного
              программного обеспечения. Участвовать в благотворительных акциях
              по всему миру, которые определит весь Чеченский Народ, и поддержит
              Рамзан Ахматович Кадыров.
            </MiniText>
            <MiniText>
              В будущем, планируется создание Российской биржи цифровых валют, и
              другие инвестиционные проекты, связанные с национальными идеями.
            </MiniText>
            <MiniText>
              Мы, как создатели этого проекта, уверенны что наше начинание
              найдет поддержку не только внутри нашей страны, но и в большинстве
              стран, которым надоел однобокий, однополярный мир, диктуемый
              некоторыми странами исключительно для своей выгоды. Мы ждем всех,
              кто не равнодушен к будущему наший Великой, и многонациональной
              страны.
            </MiniText>
            <CustomBr />
            <MiniText>
              С уважением и честностью,
              <br /> группа разработчиков проекта RMZ
            </MiniText>
          </Box>
          <Button
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
              margin: {
                lg: "40px 0 60px 0",
                xs: "30px 0 50px 0",
              },
              textTransform: "none",
              fontFamily: "El Messiri",

              "&:hover": {
                background: "#FFB72A",
              },
            }}
          >
            Телеграм
          </Button>
        </Box>
      </Container>
    </>
  );
};

const MiniText = styled(Box)`
  font-weight: 500;
  font-size: 18px;
  line-height: 32px;
  font-family: Montserrat;

  @media screen and (max-width: 1200px) {
    font-size: 15px;
    line-height: 24px;
  }
`;

const CustomBr = styled(Box)`
  width: 100%;
  height: 1px;
  opacity: 0.2;
  background: #ffffff;
`;

export default InfoPage;
