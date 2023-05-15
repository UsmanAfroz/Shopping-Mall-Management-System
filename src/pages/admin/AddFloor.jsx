import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../components/header/AdminHeader";
import TitleCard from "../../components/Cards/TitleCard";
import ShopKeeperHeader from "../../components/header/ShopKeeperHeader";

export default function AddFloor() {
  const id = localStorage.getItem("Id");
  const title = id === "id" ? "AddShop" : "Edit Info";
  let navigate = useNavigate();

  const token = localStorage.getItem("token");
  const [floorNo, setFloorNo] = useState();
  const [shops, setShops] = useState();

  const submit = () => {
    let jsn = {
      floorNumber: floorNo,
      totalShops: shops
    };

    if (title === "Edit Info") {
      axios
        .put(`http://localhost:2000/api/shop/update/${id}`, jsn)
        .then((r) => {
          navigate("/shopKeeperShops");
        })
        .catch((er) => console.log("err", er));
    } else {
      axios
        .post(`http://localhost:2000/api/shop/create?token=${token}`, jsn)
        .then((res) => {
          navigate("/shopKeeperShops");
        })
        .catch((err) => console.log("error", err));
    }
  };

  return (
    <>
      <AdminHeader />
      <TitleCard name="Add Floor" />
      <div className="flex flex-wrap justify-center">
        <div className="mx-10 bg-gray-300 p-6 rounded-xl mt-5 mb-32 md:mb-0 md:mt-0">
          <h1 className="text-xl  mb-4">Floor Details</h1>
          <div className="flex flex-col mb-2">
            <label className="text-gray-800 text-sm  leading-tight tracking-normal mb-2">
              Floor Number
              <span className="text-xs text-gray-600  italic font-normal"></span>
            </label>
            <input
              value={floorNo}
              onChange={(v) => setFloorNo(v.target.value)}
              className="text-gray-600  focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label className="text-gray-800 text-sm  leading-tight tracking-normal mb-2">
              Total Number of Shops
              <span className="text-xs text-gray-600  italic font-normal"></span>
            </label>
            <input
              value={shops}
              onChange={(v) => setShops(v.target.value)}
              className="text-gray-600  focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
            />
          </div>

          <div className="mt-8">
            <input
              onClick={submit}
              type="submit"
              className="text-white bg-indigo-700 cursor-pointer font-normal w-64 h-10  text-center text-sm border-gray-300 rounded border shadow cursor-pointer"
            />
          </div>
        </div>
      </div>
    </>
  );
}
