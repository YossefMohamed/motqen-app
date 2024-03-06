import { Stack } from "react-bootstrap";

const DropDownList = ({ dropDownAction, options }) => {
  return (
    <Stack
      direction="horizontal"
      className="position-absolute z-3 top-100 start-100 rounded-3 border overflow-hidden flex-wrap drop-down border bg-light"
      style={{
        width: "150px",
        height: "100px",
      }}
    >
      {options.map((option, index) => (
        <Stack
          key={index}
          direction="horizontal"
          className="align-items-center justify-content-center position-relative "
          role="button"
          onClick={() => dropDownAction && dropDownAction(option)}
        ></Stack>
      ))}
    </Stack>
  );
};

export default DropDownList;
