import axios from "axios";
import { useEffect, useState } from "react";
import TitleCard from "../../components/Cards/TitleCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import AdminHeader from "../../components/header/AdminHeader";

const FeedBacks = () => {
  const [products, setProducts] = useState([]);
  let url = `http://localhost:2000/api/feeback/getfeedbacks`;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => console.log("Err", err));
  }, []);
  console.log("products", products);
  return (
    <>
      <AdminHeader />
      <TitleCard name={"Customer Feedbacks"} />
      {products.length ? (
        products.map((e) => {
          return (
            <div class="p-4 md:w-1/3 sm:w-full">
              <div class="cursor-pointer h-64 md:h-72 border-2 border-gray-300 border-opacity-60 rounded-xl overflow-hidden">
                <div>
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
                        {e.username}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center ">
                    <div className>
                      <p className="text-md text-black p-3"> {e.message}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <>No Feebacks Available</>
      )}
    </>
  );
};

export default FeedBacks;
