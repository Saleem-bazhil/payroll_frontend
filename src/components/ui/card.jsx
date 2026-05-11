const Card = ({ children, className = "" }) => {
  return (
    <div className={`glass-card rounded-3xl p-6 transition hover:shadow-elevated ${className}`}>
      {children}
    </div>
  );
};

export { Card };