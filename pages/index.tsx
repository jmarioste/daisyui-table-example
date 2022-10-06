import type { NextPage } from "next";
import Table from "../components/Table";

const Home: NextPage = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl">React Table Demo</h1>
      <Table />
    </div>
  );
};

export default Home;
