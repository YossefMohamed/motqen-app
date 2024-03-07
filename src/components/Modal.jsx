import { useRef } from "react";
import Modal from "react-bootstrap/Modal";
import { useBreakpoint } from "use-breakpoint";
import { useOnClickOutside } from "usehooks-ts";
import { BREAKPOINTS } from "../helpers/constants";

function CenteredModal({
  children,
  onClose,
  show,
  size,
  outSideClose = true,
  ...props
}) {
  const ref = useRef(null);

  useOnClickOutside(ref, () => {
    outSideClose && onClose();
  });

  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const isBelowDesktop = breakpoint !== "desktop";
  return (
    <Modal
      {...props}
      className={"position-fixed top-50 start-50 translate-middle w-100 h-100"}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size={size}
      show={show}
      backdrop="static"
    >
      <Modal.Body
        ref={ref}
        className={`p-3 ${
          isBelowDesktop
            ? "h-100 w-100 position-fixed top-0 start-0 bg-light d-flex justify-center items-center p-5"
            : ""
        }`}
      >
        {isBelowDesktop && (
          <div
            role="button"
            className="position-absolute top-0 start-0 p-2 m-2 fs-5 p-3 z-3"
            onClick={onClose}
          >
            ✕
          </div>
        )}
        {children}
      </Modal.Body>
    </Modal>
  );
}

export default CenteredModal;
