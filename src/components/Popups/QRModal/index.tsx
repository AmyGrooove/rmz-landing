import PopupBox from "../PopupBox";
import QRCodeReact from "qrcode.react";

interface IQRModal {
  close: () => void;
}

const QRModal = ({ close }: IQRModal) => {
  const address = "";

  return (
    <PopupBox close={close}>
      <QRCodeReact fgColor="black" value={address} size={300} />
    </PopupBox>
  );
};

export default QRModal;
