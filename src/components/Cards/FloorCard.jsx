import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { setConstantValue } from "typescript";

export default function FloorCard({ shopNo, id }) {
  let navigate = useNavigate();

  const [usersDict, setUsersDict] = useState({});
  const [state, setState] = useState(false);
  let token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:2000/api/shop/getShops`)
      .then((res) => {
        const dict = res.data.data.reduce((acc, data) => {
          if (!acc[data["floorNumber"]]) {
            acc[data["floorNumber"]] = [data];
          } else {
            acc[data["floorNumber"]].push(data);
          }
          return acc;
        }, {});

        setUsersDict(dict);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, [state]);

  const shopHandler = (id) => {
    localStorage.setItem("pid", id);
    navigate(`/adminProducts/${id}`);
  };

  const onDelete = (id) => {
    try {
      let url = `http://localhost:2000/api/shop/delete?token=${token}&id=${id}`;
      axios
        .delete(url)
        .then((r) => setState(true))
        .catch((e) => console.log(e));
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <>
      <div class="p-4 md:w-1/2 sm:w-full flex justify-evenly">
        {Object.keys(usersDict).map((k) => (
          <>
            <div class=" md:h-fill w-60 border-2 border-gray-300 border-opacity-60 rounded-xl overflow-hidden">
              <div className=" w-full h-8 bg-gray-300 rounded-t-xl px-8 py-5 border-gray-300 border ">
                <div className="flex flex-row justify-evenly">
                  <h3 className="text-black font-semibold text-center">
                    Floor {k}
                  </h3>
                </div>
              </div>
              <div class="px-8 md:h-full bg-white py-5 ">
                {usersDict[k].map((i, index) => (
                  <>
                    <div className="border-b border-gray-200 py-3">
                      <div className="flex items-center justify-between">
                        <h1
                          className="text-sm font-semibold leading-none text-indigo-700 cursor-pointer"
                          onClick={() => shopHandler(i["_id"])}
                        >
                          {i["shopName"]}
                        </h1>
                        <div
                          className="cursor-pointer"
                          onClick={() => onDelete(i["_id"])}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-red-600"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </div>
                      </div>

                      <div className="mt-3 sm:flex items-center justify-between">
                        <div className="sm:flex items-center">
                          <div className="flex items-center"></div>
                          <div className="flex items-center sm:mt-0 mt-4 sm:ml-6">
                            <div role="img" aria-label="Engineering">
                              <svg
                                width={10}
                                height={14}
                                viewBox="0 0 10 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M5 0C2.23969 0 0 2.01594 0 4.5C0 8.5 5 14 5 14C5 14 10 8.5 10 4.5C10 2.01594 7.76031 0 5 0ZM5 7C4.60444 7 4.21776 6.8827 3.88886 6.66294C3.55996 6.44318 3.30362 6.13082 3.15224 5.76537C3.00087 5.39991 2.96126 4.99778 3.03843 4.60982C3.1156 4.22186 3.30608 3.86549 3.58579 3.58579C3.86549 3.30608 4.22186 3.1156 4.60982 3.03843C4.99778 2.96126 5.39991 3.00087 5.76537 3.15224C6.13082 3.30362 6.44318 3.55996 6.66294 3.88886C6.8827 4.21776 7 4.60444 7 5C6.99942 5.53026 6.78852 6.03863 6.41357 6.41357C6.03863 6.78852 5.53026 6.99942 5 7Z"
                                  fill="#4B5563"
                                />
                              </svg>
                            </div>
                            <p className="text-sm leading-none text-gray-600 ml-2">
                              Shop # {i["shopNumber"]}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
