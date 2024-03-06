import { Stack } from "react-bootstrap";

const ListDropDown = ({ dropDownAction, options }) => {
  return (
    <Stack
      direction="horizontal"
      className="position-absolute translate-middle z-3 top-100 start-100 rounded-3 border overflow-hidden flex-wrap drop-down border bg-light"
      style={{
        width: "150px",
      }}
    >
      {options.map(({ value }, index) => (
        <Stack
          key={index}
          direction="horizontal"
          className="align-items-center justify-content-center position-relative p-3 px-4"
          style={{
            width: "33%",
            height: "50%",
          }}
          role="button"
          onClick={() => dropDownAction && dropDownAction(value)}
        >
          {value}
        </Stack>
      ))}
    </Stack>
  );
};

export default ListDropDown;
