import React from "react";

const Container = React.forwardRef(({ children, className = "" }, ref) => {
  return (
    <div
      ref={ref}
      className={`mx-auto max-w-7xl px-6 lg:px-10 ${className}`}
    >
      {children}
    </div>
  );
});

Container.displayName = "Container";

export default Container;