import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <nav className="flex flex-wrap  items-center justify-between w-full py-4 md:py-0 px-4 text-lg text-gray-700 bg-white">
      <div>
        <Link href="/" passHref>
          <a>
            {/* eslint-disable @next/next/no-img-element */}
            <img
              className="m-3"
              src="/strapi-logo.png"
              width={200}
              height={50}
              alt="Strapi Logo"
            />
          </a>
        </Link>
      </div>
      <div
        className="hidden w-full md:flex md:items-center md:w-auto"
        id="menu"
      >
        <ul
          className="
              pt-4
              text-base text-gray-700
              md:flex
              md:justify-between 
              md:pt-0 space-x-2"
        >
          <li>
            <Link href="/">
              <a className="md:p-2 py-2 block hover:text-purple-400">Home</a>
            </Link>
          </li>
          <li>
            <Link href="/films">
              <a className="md:p-2 py-2 block hover:text-purple-400" href="#">
                Films
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
