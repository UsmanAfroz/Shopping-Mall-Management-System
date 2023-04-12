import React, { Fragment, useEffect, useState } from "react";

import ProductCard from "../../components/Cards/ProductCard";
import AddCard from "../../components/Cards/AddCard";
import axios from "axios";
import AdminHeader from "../../components/header/AdminHeader";
import TitleCard from "../../components/Cards/TitleCard";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White" },
      { value: "beige", label: "Beige" },
      { value: "blue", label: "Blue" },
      { value: "brown", label: "Brown" },
      { value: "green", label: "Green" },
      { value: "purple", label: "Purple" },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "new-arrivals", label: "All New Arrivals" },
      { value: "tees", label: "Tees" },
      { value: "crewnecks", label: "Crewnecks" },
      { value: "sweatshirts", label: "Sweatshirts" },
      { value: "pants-shorts", label: "Pants & Shorts" },
    ],
  },
  {
    id: "sizes",
    name: "Sizes",
    options: [
      { value: "xs", label: "XS" },
      { value: "s", label: "S" },
      { value: "m", label: "M" },
      { value: "l", label: "L" },
      { value: "xl", label: "XL" },
      { value: "2xl", label: "2XL" },
    ],
  },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Products() {
  const navigate = useNavigate();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  let pid = localStorage.getItem("pid");

  useEffect(() => {
    loadData();
  }, []);

  const deleteProduct = (id) => {
    let url = `http://localhost:2000/api/product/deleteProduct?token=${token}&id=${id}`;
    axios
      .delete(url)
      .then((res) => {
        console.log("deleted", res.data);
        loadData();
      })
      .catch((err) => console.log("err", err));
  };

  const loadData = () => {
    axios
      .get(
        `http://localhost:2000/api/product/getProductByID/${pid}?token=${token}`
      )
      .then((res) => {
        setData(res.data.data);
        console.log("DATA", data);
      })
      .catch((err) => console.log(err));
  };

  const handleclick = (id) => {
    localStorage.setItem('Id',id)
    navigate("/addproduct");
  };

  return (
    <>
      <AdminHeader />

      {/* <MainHeader /> */}
      <TitleCard name={"Products"} />

      {/* Product grid */}
      <div className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
        <section class="text-gray-600 body-font">
          <center>
            <button
              onClick={()=>handleclick('id')}
              className="bg-blue-600 hover:bg-blue-800 text-white rounded-lg px-3 py-2 flex justify-center items-center"
            >
              Add new Product
            </button>
          </center>
          <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-wrap -m-4">
              {data.map((i) => (
                <div class="h-fit m-3 w-56 transform overflow-hidden rounded-lg  bg-gray-800 dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
                  <img
                    onClick={() => {
                      localStorage.setItem("p_id", i["_id"]);
                      navigate("/productDetail");
                    }}
                    class="h-48 w-full object-cover object-center"
                    src={`http://localhost:2000/uploads/${i["images"][0]}`}
                    alt="Product Image"
                  />
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
                    <div class="flex items-center">
                      <p class="mr-2 text-lg font-semibold text-gray-900 dark:text-white">
                        {i["Price"]} PKR
                      </p>

                      <button
                         onClick={() => handleclick(i['_id'])}
                        class="ml-auto text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded-lg"
                      >
                        Edit
                      </button>
                      <button
                         onClick={() =>deleteProduct(i['_id'])}
                        class="ml-auto text-sm font-medium text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                //     <>
                //     <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                //   <a class="block relative h-48 rounded overflow-hidden">
                //     <img
                //       alt="ecommerce"
                //       class="object-cover object-center w-full h-full block"
                //       src={`http://localhost:2000/uploads/${i['images'][0]}`}
                //     />
                //   </a>
                //   <div class="mt-4">
                //     <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">

                //      {i['brandName']}
                //     </h3>
                //     <h1 class="text-gray-900 title-font text-lg font-medium">
                //     {i['title']}
                //     </h1>
                //     <h1 class="text-gray-900 title-font text-lg font-medium">
                //       Status: {i['status']}
                //     </h1>
                //     <p class="mt-1">Price:${i['Price']}</p>
                //   </div>
                // </div>
                //     </>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* <section class="text-gray-400 body-font">
        <div class="container px-5 py-24 mx-auto ">
          <div class="flex flex-wrap -m-4 justify-around">
            {products.map((product) => (
              <ProductCard
                id={product["_id"]}
                brandName={product["brandName"]}
                image={`http://localhost:2000/uploads/${product["images"][0]}`}
                title={product["title"]}
                price={product["Price"]}
              />
            ))}
          </div>
        </div>
      </section> */}
      {/* <Footer /> */}

      {/* <section class="text-gray-600 body-font">
        <div class="container px-5 mx-auto">
          <div class="flex flex-wrap -m-4">
            {data.map((i) => (
              <ProductCard
                id={i["_id"]}
                title={i["title"]}
                img={i["images"][0]}
                price={i["Price"]}
                name={i["brandName"]}
                onClick={deleteProduct}
              />
            ))}
          </div>
        </div>
      </section>
      <section class="text-gray-600 body-font">
        <div class="container px-5 mx-auto">
          <div class="flex flex-wrap -m-4">
            <AddCard />
          </div>
        </div>
      </section> */}
    </>
  );
}
