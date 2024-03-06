const Card = ({ children, className }) => {
  return (
    <div className={`border col-xs-12 rounded-3 p-2 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
