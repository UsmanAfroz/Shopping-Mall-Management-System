import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TitleCard from "../../components/Cards/TitleCard";
import ShopKeeperHeader from "../../components/header/ShopKeeperHeader";

export default function AllOrders() {
  const navigate = useNavigate();
  const [data, setList] = useState([]);
  let token = localStorage.getItem("token");
  let shopManagerId = localStorage.getItem("uid");

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    let url = `http://localhost:2000/api/shop/getShops?token=${token}`;
    axios
      .get(url)
      .then((res) => {
        setList(
          res.data.data.filter(
            (e) => e?.ownerPersonalInformation?.OwnerId === shopManagerId
          )
        );
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
      <ShopKeeperHeader />
      <TitleCard name={"Orders"} />

      {/* <section class="text-gray-600 body-font my-10">
        <div class="flex items-center flex-wrap justify-center py-3">
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
      </section> */}
      <div className="text-xl font-large justify-center items-center flex p-5 shopping-cart">
        <h1>No Orders to show </h1>
      </div>
    </>
  );
}
