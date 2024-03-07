import CenteredModal from "./Modal";
import { Stack } from "react-bootstrap";
import CustomButton from "./Button";
import Robot from "./../assets/robot.svg";
import { useBreakpoint } from "use-breakpoint";
import { BREAKPOINTS } from "../helpers/constants";
const EndTrial = ({ onClose, show }) => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const isBelowDesktop = breakpoint !== "desktop";
  return (
    <CenteredModal onClose={onClose} show={show} size="xl" outSideClose={false}>
      {!isBelowDesktop && (
        <img
          src={Robot}
          alt="robot"
          className="position-absolute bottom-0 start-0 mx-3"
        />
      )}
      <Stack
        gap={2}
        style={{
          padding: "7rem",
        }}
      >
        <Stack
          className="fw-bold text-primary text-center"
          style={{
            fontSize: "6rem",
          }}
        >
          نعتذر
        </Stack>
        <Stack className="text-primary fs-1" direction="horizontal" gap={2}>
          <p className="text-center fw-light w-100">
            تم استهلاك رصيدك المجاني "<b>2500</b> كلمة"
          </p>
        </Stack>
        <Stack
          className={`text-primary fs-5 ${
            isBelowDesktop ? "w-100" : "w-75"
          } mx-auto`}
        >
          <p className="text-center">
            يمكنك متابعة التجربة في هذا الملف قبل مغادرته ولتتمكن من استخدام
            كافة خصائص مُتقِن بحرية تامة، يرجى الاشتراك بالباقة الشاملة
          </p>
        </Stack>
        <Stack direction="horizontal" gap={2} className="justify-center ">
          <CustomButton onClick={onClose} className="px-5">
            ترقية
          </CustomButton>
          <CustomButton onClick={onClose} outline>
            متابعة التجربة
          </CustomButton>
        </Stack>
      </Stack>
    </CenteredModal>
  );
};

export default EndTrial;
