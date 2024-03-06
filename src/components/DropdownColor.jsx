import { Stack } from "react-bootstrap";

const DropdownColor = ({ dropDownAction }) => {
  return (
    <Stack
      direction="horizontal"
      className="position-absolute translate-middle z-3 top-100 start-100 rounded-3 border overflow-hidden flex-wrap drop-down border bg-light"
      style={{
        width: "150px",
        height: "100px",
      }}
    >
      {colors.map((color, index) => (
        <Stack
          key={index}
          direction="horizontal"
          className="align-items-center justify-content-center position-relative "
          style={{ backgroundColor: color, width: "20%", height: "25%" }}
          role="button"
          onClick={() => dropDownAction && dropDownAction(color)}
        ></Stack>
      ))}
    </Stack>
  );
};

// add 25 colors
const colors = [
  "#4B0082",
  "#EE82EE",
  "#FFC0CB",
  "#FFA07A",
  "#FFD700",
  "#00FF00",
  "#00FFFF",
  "#000080",
  "#800080",
  "#FF00FF",
  "#800000",
  "#808000",
  "#008080",
  "#808080",
  "#C0C0C0",
  "#FF4500",
  "#FF6347",
  "#FF8C00",
  "#FFD700",
  "#FF69B4",
];

export default DropdownColor;
