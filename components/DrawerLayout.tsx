import React from "react";
import { useSessionStorage } from "usehooks-ts";
import Navbar from "./Navbar";

type Props = {
  children: React.ReactNode;
};

const DrawerLayout = ({ children }: Props) => {
  //initialize state here. we use a key and a default state
  const [open, setOpen] = useSessionStorage("drawer", false);
  return (
    <div className="drawer">
      <input
        id="app-drawer"
        type="checkbox"
        className="drawer-toggle"
        // checked property will now reflect our open state
        checked={open}
      />
      <div className="drawer-content flex flex-col">
        <Navbar />
        {children}
      </div>
      <div className="drawer-side">
        <label
          className="drawer-overlay"
          // add a onClick handler here to close the drawer
          onClick={() => setOpen(false)}
        ></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100">
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

export default DrawerLayout;
