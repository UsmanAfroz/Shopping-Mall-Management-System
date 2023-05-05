import React from "react";
import AdminHeader from "../../components/header/AdminHeader";
import TitleCard from "../../components/Cards/TitleCard";

import FloorCard from "../../components/Cards/FloorCard";
import Footer from "../../sections/user/Footer";

export default function Shops() {
  return (
    <>
      <AdminHeader />
      <TitleCard name={"Floors"} />
      <div class="flex items-center flex-wrap justify-center py-3">
        <a
          class="text-green-500 inline-flex items-center md:mb-2 lg:mb-0"
          href=" "
          onClick={() => {
            localStorage.setItem("Id", "id");
            navigate("/addshop");
          }}
        >
          Add floor
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-green-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </a>
      </div>
      <section class="text-gray-600 body-font my-10 shopping-carts">
        <div class="container px-5 mx-auto">
          <div class="flex flex-wrap -m-4 ">
            <FloorCard />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
