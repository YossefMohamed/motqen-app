import { themeColors } from "../theme";
const ArrowIcon = ({
  color = themeColors.colors.light,
  width = 12,
  height = 8,
  rotate,
  ...props
}) => (
  <svg
    style={{ transform: `rotate(${rotate}deg)` }}
    width={width}
    height={height}
    fill="none"
    {...props}
    viewBox="0 0 12 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11.4125 8.5868C11.7871 8.9618 11.9974 9.47013 11.9974 10.0001C11.9974 10.5301 11.7871 11.0385 11.4125 11.4135L3.8712 18.9575C3.49601 19.3325 2.98721 19.5431 2.45673 19.543C1.92625 19.5428 1.41755 19.332 1.04253 18.9568C0.667518 18.5816 0.456906 18.0728 0.457031 17.5423C0.457156 17.0119 0.668008 16.5031 1.0432 16.1281L7.1712 10.0001L1.0432 3.87213C0.678702 3.4951 0.476872 2.98999 0.48118 2.46559C0.485488 1.94119 0.695589 1.43947 1.06623 1.06848C1.43687 0.697483 1.9384 0.486908 2.4628 0.482105C2.98719 0.477302 3.49249 0.678657 3.86987 1.0428L11.4139 8.58547L11.4125 8.5868Z"
      fill={color}
    />
  </svg>
);
export default ArrowIcon;
