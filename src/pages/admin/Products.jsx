import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import TitleCard from "../../components/Cards/TitleCard";
import Footer from "../../sections/user/Footer";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, Navigation } from "swiper";
import AdminHeader from "../../components/header/AdminHeader";


const AdminProduct = () => {
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [products, setProducts] = useState([]);
  let url = `http://localhost:2000/api/product/getProduct`;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => console.log("Err", err));
  }, []);

  const addCart = (obj) => {
    let token = localStorage.getItem("token");
    let uid = localStorage.getItem("uid");

    let condition = uid === undefined;

    switch (condition) {
      case true: {
        navigate("/login");
        break;
      }
      case false: {
        let jsn = {
          _id: obj["_id"],
          title: obj["title"],
          Price: obj["Price"],
          sizes: obj["sizes"],
          status: obj["status"],
          deliveryTime: obj["deliveryTime"],
          description: obj["description"],
          available: obj["available"],
          pid: obj["pid"],
          images: obj["images"][0],
          count: 1,
          uid: obj["uid"],
          brandName: obj["brandName"],
          category: obj["category"],
        };
        axios
          .post(`http://localhost:2000/api/cart/addTemp`, jsn)
          .then((r) => {
            if (r.status === 200) {
              setState({ open: true });
            }
          })
          .catch((er) => console.log("er", er));

        break;
      }
    }
  };
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  return (
    <>
      <AdminHeader />
      {products && products.length ? (
        <>
          <TitleCard name={"Products"} />
          <div>
            {/* Mobile filter dialog */}
            <Transition.Root show={mobileFiltersOpen} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-40 lg:hidden"
                onClose={setMobileFiltersOpen}
              >
                <Transition.Child
                  as={Fragment}
                  enter="transition-opacity ease-linear duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 z-40 flex">
                  <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                      <div className="flex items-center justify-between px-4">
                        <h2 className="text-lg font-medium text-gray-900">
                          Filters
                        </h2>
                        <button
                          type="button"
                          className="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => setMobileFiltersOpen(false)}
                        >
                          <span className="sr-only">Close menu</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition.Root>

            <main className="mx-auto max-w-2xl py-2 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
                <aside>
                  <h2 className="sr-only">Filters</h2>

                  <button
                    type="button"
                    className="inline-flex items-center lg:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    <span className="text-sm font-medium text-gray-700">
                      Filters
                    </span>
                    <PlusIcon
                      className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                  </button>
                </aside>

                {/* Product grid */}
                <div className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3 cursor-pointer">
                  <section class="text-gray-600 body-font">
                    <div class="container px-5 py-8 mx-auto">
                      <div class="flex flex-wrap -m-4">
                        {products.map((i) => (
                          <div class="h-fit m-3 w-2/6 transform overflow-hidden rounded-lg  bg-gray-800 dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
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
                                    className="h-40"
                                  />
                                </SwiperSlide>
                              ))}
                            </Swiper>
                            <div class="p-4">
                              <h2 class="mb-2 text-lg font-medium dark:text-white text-gray-900">
                                {i["title"]}
                              </h2>

                              <h2 class="mb-2 text-xs font-medium bg-gray-500 w-fit p-1 text-center rounded-md dark:text-white text-gray-900">
                                {i["status"]}
                              </h2>

                              <p class="mb-2 truncate  dark:text-gray-300 text-gray-700">
                                {i["description"]}
                              </p>
                              <div class="flex items-center">
                                <p class="mr-2 text-lg font-semibold text-gray-900 dark:text-white">
                                  {i["Price"]} PKR
                                </p>
                                <button
                                  onClick={() => addCart(i)}
                                  class="ml-auto text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-2 py-1 rounded-lg"
                                >
                                  Add to cart
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </main>
          </div>
        </>
      ) : (
        <div className="text-xl font-large justify-center items-center flex p-5 shopping-cart">
          <h1>No products to show </h1>
        </div>
      )}
      <Footer />

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Product added to cart successfully.
        </Alert>
      </Snackbar>
    </>
  );
};

export default AdminProduct;
