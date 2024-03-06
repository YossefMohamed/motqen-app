import CenteredModal from "./Modal";
import { Stack } from "react-bootstrap";
import CustomButton from "./Button";
import FireWorks from "./../assets/fire-works.svg";
const WelcomeModal = ({ onClose, show }) => {
  return (
    <CenteredModal onClose={onClose} show={show} size="xl">
      <Stack
        gap={3}
        style={{
          padding: "7rem",
        }}
      >
        <div className="position-absolute top-0 start-0">
          <img src={FireWorks} alt="FireWorks" width={"250px"} />
        </div>
        <div className="position-absolute bottom-0 end-0">
          <img
            src={FireWorks}
            alt="FireWorks"
            width={"250px"}
            style={{
              transform: "rotate(180deg)",
            }}
          />
        </div>
        <Stack
          className="fw-bold text-primary text-center"
          style={{
            fontSize: "6rem",
          }}
        >
          مبروك
        </Stack>
        <Stack className="text-primary fs-1" direction="horizontal" gap={2}>
          <p className="text-center">
            حصلت علي تجربة <b>المدقق اللغوي</b> الآلي ل <b>2500</b> كلمة
          </p>
        </Stack>
        <Stack className="text-primary fs-5">
          <p className="text-center">سنبدأ من المستند التجريبي بمُتقِن!</p>
        </Stack>
        <Stack direction="horizontal" gap={2} className="justify-center ">
          <CustomButton onClick={onClose}>ابداء التجربة</CustomButton>
        </Stack>
      </Stack>
    </CenteredModal>
  );
};

export default WelcomeModal;
