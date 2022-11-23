import React, { FC, memo } from "react";

interface BadgeProps {
  className: string;
  children: React.ReactNode;
}

const Badge: FC<BadgeProps> = memo(({ children, className }) => {
  return (
    <span
      className={"text-white text-sm py-1.5 px-2.5 rounded-3xl " + className}
    >
      {children}
    </span>
  );
});

export default Badge;
