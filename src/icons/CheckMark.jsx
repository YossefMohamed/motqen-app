import { themeColors } from "../theme";

const CheckMarkIcon = ({
  width = "24",
  height = "24",
  color = themeColors.colors.primary,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 24C18.6276 24 24 18.6276 24 12C24 5.3724 18.6276 0 12 0C5.3724 0 0 5.3724 0 12C0 18.6276 5.3724 24 12 24Z"
        fill={color}
      />
      <path
        d="M6.54492 12.2185L9.6618 15.2731L17.454 7.63672"
        stroke="white"
        stroke-width="1.83051"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default CheckMarkIcon;
