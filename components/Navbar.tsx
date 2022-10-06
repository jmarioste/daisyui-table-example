import React from "react";
import { useSessionStorage } from "usehooks-ts";

const Navbar = () => {
  // toggle our drawer using useSessionStorage global state
  const [, setOpen] = useSessionStorage("drawer", false);
  const toggleDrawer = () => setOpen((prev) => !prev);
  return (
    <div className="w-full navbar bg-neutral">
      {/* Mobile menu button only shows for lg and below devices */}
      <div className="flex-none lg:hidden">
        <label className="btn btn-square btn-ghost" onClick={toggleDrawer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      {/* Website logo */}
      <div className="flex-1 px-2 mx-2">React Hustle</div>
      {/* Desktop menu only shows for lg and up devices */}
      <div className="flex-none hidden lg:block">
        <ul className="menu menu-horizontal">
          <li>
            <a>Home </a>
          </li>
          <li>
            <a>About</a>
          </li>
          <li>
            <a>Contact</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
