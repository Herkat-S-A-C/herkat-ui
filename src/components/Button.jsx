import React from "react";

function Button({ children, onClick, className = "", as, to, ...props }) {
  const Component = as || "button";

  return (
    <Component
      to={to}
      onClick={onClick}
      className={`px-4 py-2 rounded transition duration-200 ease-in-out 
        shadow-md hover:shadow-lg transform hover:translate-y-[-2px] active:translate-y-0 
        active:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 
        focus:ring-blue-500 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Button;
