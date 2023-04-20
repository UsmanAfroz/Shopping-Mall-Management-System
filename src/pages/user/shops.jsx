import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShopCard from "../../components/Cards/ShopCard";
import TitleCard from "../../components/Cards/TitleCard";
import MainHeader from "../../components/header/MainHeader";

export default function AllShops() {
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

  return (
    <>
      <MainHeader />
      <TitleCard name={"Shops"} />
      <section class="text-gray-600 body-font my-10">
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
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
