import { useEffect, useState } from "react";

import axios from "axios";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import TitleCard from "../../components/Cards/TitleCard";
import MainHeader from "../../components/header/MainHeader";
import Footer from "../../sections/user/Footer";

export default function CustomerProducts() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  let pid = localStorage.getItem("pid");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    axios
      .get(
        `http://localhost:2000/api/product/getProductByID/${pid}?token=${token}`
      )
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <MainHeader />
      <TitleCard name={"Products"} />
      {/* Product grid */}
      <div className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
        <section class="text-gray-600 body-font">
          <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-wrap -m-4">
              {data && data.length ? (
                data.map((i) => (
                  <div class="h-fit m-3 w-60 transform overflow-hidden rounded-lg  bg-gray-800 dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
                    <Swiper
                      spaceBetween={30}
                      centeredSlides={true}
                      autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                      }}
                      pagination={{
                        clickable: true,
                      }}
                      navigation={true}
                      modules={[Autoplay, Navigation]}
                    >
                      {i.images.map((e, index) => (
                        <SwiperSlide className="swipe">
                          <img
                            src={`http://localhost:2000/uploads/${i["images"][index]}`}
                            alt="Product Image"
                            className="swipe-image"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <div class="p-4">
                      <h2 class="mb-2 text-lg font-medium dark:text-white text-gray-900">
                        {i["brandName"]}
                      </h2>

                      <h2 class="mb-2 text-xs font-medium bg-gray-500 w-fit p-1 text-center rounded-md dark:text-white text-gray-900">
                        {i["status"]}
                      </h2>

                      <p class="mb-2 truncate  dark:text-gray-300 text-gray-700">
                        {i["description"]}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="justify-center m-auto font-large text-lg">
                  No products available
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
