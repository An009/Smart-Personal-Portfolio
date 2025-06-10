import React from "react";

interface NavLinkProps {
  href: string;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  children: React.ReactNode;
  className?: string;
}

export function NavLink({
  href,
  onClick,
  children,
  className = "",
}: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`uppercase tracking-wider text-sm font-medium relative group ${className}`}
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
    </a>
  );
}
