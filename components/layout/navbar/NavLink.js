import React from "react";
import Link from "next/link";

// eslint-disable-next-line react/display-name
const Button = React.forwardRef(({ onClick, href, children }, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref}>
      {children}
    </a>
  );
});

function NavLink({ children, href }) {
  return (
    <Link href={href} passHref>
      <Button>{children}</Button>
    </Link>
  );
}

export default NavLink;
