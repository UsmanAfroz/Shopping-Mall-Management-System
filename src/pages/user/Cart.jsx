import React, { useEffect, useState } from "react";
import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";

import MainHeader from "../../components/header/MainHeader";
import Footer from "../../sections/user/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [slct, setSlct] = useState(true);

  useEffect(() => {
    if (slct) {
      load();
    }
  }, [data, total]);

  const load = async () => {
    try {
      let uid = localStorage.getItem("uid");
      let ob = await axios.get(`http://localhost:2000/api/cart/getTemp/${uid}`);
      setData(ob.data.data);
      let price = 10;
      data.map((i) => {
        price += parseFloat(i["Price"]) * parseInt(i["count"]);
      });

      setTotal(price);
    } catch (ex) {
      console.log(ex);
    }
  };

  const remove = async (id, ind) => {
    try {
      console.log(id, id);
      let ob = await axios.delete(
        `http://localhost:2000/api/cart/deleteTemp/${id}`
      );
      console.log("ob", ob.data.data);
      if (ob.data) {
        const filterItem = data.filter((i) => i["_id"] !== id);
        setData(filterItem);
        let price = 10;
        data.map((i) => {
          price += parseFloat(i["Price"]) * parseInt(i["count"]);
        });

        setTotal(price);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const select = (v, ind) => {
    const updatedData = [...data];
    updatedData[ind]["count"] = v;
    setData(updatedData);
    let price = 10;
    data.map((i) => {
      price += parseFloat(i["Price"]) * parseInt(i["count"]);
    });

    setTotal(price);
    setSlct(false);
  };

  const add = () => {
    localStorage.setItem("obj", JSON.stringify(data));
    localStorage.setItem("ttl", total);
    navigate("/confirmorder");
  };

  return (
    <>
      <MainHeader />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>
          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul
                role="list"
                className="divide-y divide-gray-200 border-t border-b border-gray-200"
              >
                {data.map((product, productIdx) => (
                  <li key={productIdx} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <img
                        src={`http://localhost:2000/uploads/${product["images"]}`}
                        className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <a className="font-medium text-gray-700 hover:text-gray-800">
                                {product["title"]}
                              </a>
                            </h3>
                          </div>
                          <div className="mt-1 flex text-sm">
                            <p className="text-gray-500">{product.color}</p>
                            {product.size ? (
                              <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                                {product["sizes"][0]}
                              </p>
                            ) : null}
                          </div>
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            {product["Price"]} PKR
                          </p>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9">
                          <label
                            htmlFor={`quantity-${productIdx}`}
                            className="sr-only"
                          >
                            Quantity, {product["count"]}
                          </label>
                          <select
                            onClick={(e) => select(e.target.value, productIdx)}
                            // value={}
                            defaultValue={product["count"]}
                            className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                          >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                          </select>

                          <div className="absolute top-0 right-0">
                            <button
                              onClick={() => remove(product["_id"], productIdx)}
                              type="button"
                              className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                            >
                              <span className="sr-only">Remove</span>
                              <XMarkIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>

                      <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                        <CheckIcon
                          className="h-5 w-5 flex-shrink-0 text-green-500"
                          aria-hidden="true"
                        />

                        <span>"In stock"</span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
            >
              <h2
                id="summary-heading"
                className="text-lg font-medium text-gray-900"
              >
                Order summary
              </h2>

              {/* <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">${total - 10}</dd>
                </div>
           
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="flex text-sm text-gray-600">
                    <span>Tax estimate</span>
                    <a
                      href="#"
                      className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">
                        Learn more about how tax is calculated
                      </span>
                      <QuestionMarkCircleIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </a>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">$10.00</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">
                    Order total
                  </dt>
                  <dd className="text-base font-medium text-gray-900">
                    ${total}
                  </dd>
                </div>
              </dl> */}

              {data.map((i) => (
                <dl className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">{i["title"]}</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {parseFloat(i["Price"]) * parseInt(i["count"])} PKR
                    </dd>
                  </div>
                </dl>
              ))}
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">
                  Order total
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  {total - 10} PKR
                </dd>
              </div>

              <div className="mt-6">
                <button
                  onClick={add}
                  type="submit"
                  className="w-full rounded-md cursor-pointer border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Place order
                </button>
              </div>
            </section>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
