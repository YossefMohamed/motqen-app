import { Button } from "react-bootstrap";

const CustomButton = ({
  children,
  variant = "primary",
  outline = false,
  size = "md",
  disabled = false,
  iconPrefix,
  iconSuffix,
  onClick,
  onlyIcon,
  className,
  ...props
}) => {
  const buttonClasses = [
    "btn align-items-center d-flex gap-2 z-2",
    `btn-${variant}`,
    outline ? `btn-outline-${variant} btn-light text-primary ` : "",
    onlyIcon ? "btn-outline-light btn-light text-primary p-1" : "",
    `btn-${size}`,
    `${
      variant === "transparent" && "btn-light btn-outline-light text-secondary"
    }`,
  ];

  return (
    <Button
      className={buttonClasses.join(" ") + " " + className}
      {...props}
      disabled={disabled}
      onClick={onClick}
    >
      {iconPrefix && iconPrefix}
      <div className="fw-medium">{children}</div>
      {iconSuffix && iconSuffix}
    </Button>
  );
};

export default CustomButton;
