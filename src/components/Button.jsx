import React from "react";

function Button({ children, onClick, className = "", as, to, ...props }) {
  const Component = as || "button";

  return (
    <Component
      to={to}
      onClick={onClick}
      className={`px-4 py-2 rounded transition ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Button;