import Head from "next/head";
import Nav from "./Nav";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Movie Database</title>
      </Head>
      <Nav />
      <main>
        <div className="px-4">
          <div className="flex justify-center items-center bg-white mx-auto w-2/4 rounded-lg my-16 p-16">
            <div className="text-2xl font-medium">{children}</div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;
