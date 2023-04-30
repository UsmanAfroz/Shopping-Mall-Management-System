import React from "react";
import { useNavigate } from "react-router-dom";

export default function ShopCard({
  id,
  name,
  shopType,
  cnic,
  shopName,
  shopNo,
}) {
  const navigate = useNavigate();

  const handleclick = (id) => {
    localStorage.setItem("pid", id);
    navigate("/customerProducts");
  };

  return (
    <>
      <div class="p-4 md:w-1/3 sm:w-full">
        <div class="cursor-pointer h-64 md:h-72 border-2 border-gray-300 border-opacity-60 rounded-xl overflow-hidden">
          <div>
            <div className="w-full h-16 bg-gray-300 rounded-t-xl px-8 py-5 border-gray-300 border">
              <div className="flex flex-row justify-between">
                <h3 className="text-black font-semibold">{shopName}</h3>
              </div>
            </div>
            <div
              onClick={() => handleclick(id)}
              className="w-full flex items-center justify-center "
            >
              <div className="flex flex-col items-start  ">
                <img
                  src="https://cdn.tuk.dev/assets/templates/olympus/profile.png"
                  alt="profile"
                />
                <p className="mt-2 text-xs sm:text-sm md:text-base font-semibold text-center text-black">
                  {name}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center ">
              <div className>
                <p className="mt-2 text-base sm:text-lg md:text-xl 2xl:text-2xl text-black">
                  CNIC
                </p>
                <p className="text-xs text-black"> {cnic}</p>
              </div>
              <div className="ml-12">
                <p className="mt-2 text-base sm:text-lg md:text-xl 2xl:text-2xl text-black">
                  SHOP #
                </p>
                <p className="text-xs text-black">{shopNo}</p>
              </div>
              <div className="ml-12">
                <p className="mt-2 text-base sm:text-lg md:text-xl 2xl:text-2xl text-black">
                  Contact
                </p>
                <p className="text-xs text-black">0334-5554411</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
