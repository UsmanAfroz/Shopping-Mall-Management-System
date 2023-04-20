import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShopCard from "../../components/Cards/ShopCard";
import TitleCard from "../../components/Cards/TitleCard";
import AdminHeader from "../../components/header/AdminHeader";

export default function AllProducts() {
  const navigate = useNavigate();
  const [data, setList] = useState([]);
  let token = localStorage.getItem("token");

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    let url = `http://localhost:2000/api/shop/getShops?token=${token}`;
    axios
      .get(url)
      .then((res) => {
        setList(res.data.data);
      })
      .catch((err) => console.log("err", err));
  };

  const deleteShop = (id) => {
    try {
      let url = `http://localhost:2000/api/shop/delete?token=${token}&id=${id}`;
      axios
        .delete(url)
        .then((r) => load())
        .catch((e) => console.log(e));
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <>
      <AdminHeader />
      <TitleCard name={"Shops"} />
      <section class="text-gray-600 body-font my-10">

        <div class="flex items-center flex-wrap justify-center py-3">
          <a
            class="text-green-500 inline-flex items-center md:mb-2 lg:mb-0"
            href=" "
            onClick={() => {
              localStorage.setItem("Id", "id");
              navigate("/addshop");
            }}
          >
            Add Shop
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
        <div class="container px-5 mx-auto">
          <div class="flex flex-wrap -m-4">
            {data.map((i) => (
              <ShopCard
                id={i["_id"]}
                shopName={i["shopName"]}
                shopNo={i["shopNumber"]}
                name={
                  i["ownerPersonalInformation"]["firstName"] +
                  i["ownerPersonalInformation"]["lastName"]
                }
                cnic={i["ownerPersonalInformation"]["cnic"]}
                shopType={i["userType"]}
                onDelete={deleteShop}
              />
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
