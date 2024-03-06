import { Stack } from "react-bootstrap";
import Card from "../components/Card";
import CustomAccordion from "../components/Accordion";
import { useBreakpoint } from "use-breakpoint";
import { BREAKPOINTS } from "../helpers/constants";

const LeftPanel = () => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const isBelowDesktop = breakpoint !== "desktop";
  return (
    <Stack
      direction="vertical"
      gap={4}
      className={`h-100 ${isBelowDesktop && "mt-3"}`}
    >
      <div>
        <Card>
          <div className="text-primary fw-medium fs-5 text-center">
            مساعد مُتقِن
          </div>
        </Card>
      </div>
      <div className="flex-fill">
        <Card className="h-100 no-padding">
          <CustomAccordion />
        </Card>
      </div>
    </Stack>
  );
};

export default LeftPanel;
