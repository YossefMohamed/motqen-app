import { useState } from "react";
import { Toast } from "react-bootstrap";
import { useBreakpoint } from "use-breakpoint";
import { BREAKPOINTS } from "../helpers/constants";

const CopyIcon = () => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const isBelowDesktop = breakpoint !== "desktop";
  const [copied, setCopied] = useState(false);
  return (
    <div onClick={() => setCopied(true)}>
      <svg
        width="38"
        height="38"
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.75 29.292V26.1253H7.91667V29.292H4.75ZM4.75 23.7503V20.5837H7.91667V23.7503H4.75ZM4.75 18.2087V15.042H7.91667V18.2087H4.75ZM10.2917 34.8337V31.667H13.4583V34.8337H10.2917ZM14.25 28.5003C13.3792 28.5003 12.6339 28.1905 12.0143 27.5709C11.3947 26.9513 11.0844 26.2055 11.0833 25.3337V6.33366C11.0833 5.46283 11.3937 4.7176 12.0143 4.09799C12.635 3.47838 13.3802 3.16805 14.25 3.16699H28.5C29.3708 3.16699 30.1166 3.47733 30.7373 4.09799C31.3579 4.71866 31.6677 5.46388 31.6667 6.33366V25.3337C31.6667 26.2045 31.3569 26.9502 30.7373 27.5709C30.1176 28.1916 29.3719 28.5014 28.5 28.5003H14.25ZM15.8333 34.8337V31.667H19V34.8337H15.8333ZM7.91667 34.8337C7.04583 34.8337 6.30061 34.5239 5.681 33.9042C5.06139 33.2846 4.75106 32.5389 4.75 31.667H7.91667V34.8337ZM21.375 34.8337V31.667H24.5417C24.5417 32.5378 24.2319 33.2836 23.6123 33.9042C22.9926 34.5249 22.2469 34.8347 21.375 34.8337ZM4.75 12.667C4.75 11.7962 5.06033 11.0509 5.681 10.4313C6.30167 9.81171 7.04689 9.50138 7.91667 9.50033V12.667H4.75Z"
          fill="#5225CE"
        />
      </svg>
      {copied && (
        <Toast
          onClose={() => setCopied(false)}
          show={copied}
          delay={3000}
          autohide
          onClick={() => setCopied(false)}
          className={`bg-light border border-2 border-success text-success fs-6 position-fixed top-0 start-0 h-100 z-top ${
            isBelowDesktop ? "w-100" : "w-100"
          }`}
        >
          <Toast.Body>تم نسخ النص</Toast.Body>
        </Toast>
      )}
    </div>
  );
};

export default CopyIcon;
