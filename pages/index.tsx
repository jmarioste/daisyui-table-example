import type { NextPage } from "next";
import { useSessionStorage } from "usehooks-ts";

const Home: NextPage = () => {
  const [, setOpen] = useSessionStorage("drawer", false);
  const toggleDrawer = () => setOpen((prev) => !prev);
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl">
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
      <button className="btn" onClick={toggleDrawer}>
        Toggle Drawer
      </button>
    </div>
  );
};

export default Home;
