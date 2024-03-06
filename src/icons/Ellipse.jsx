import { themeColors } from "../theme";

function Ellipse({
  color = themeColors.colors.primary,
  width = 12,
  height = 12,
  ...props
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="6" cy="6" r="6" fill={color} />
    </svg>
  );
}

export default Ellipse;
