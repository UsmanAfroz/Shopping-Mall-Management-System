import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TitleCard from "../../components/Cards/TitleCard";
import ShopKeeperHeader from "../../components/header/ShopKeeperHeader";
import OrderCard from './OrderCard'

export default function AllOrders() {
  const navigate = useNavigate();
  const [data, setList] = useState([]);
  let token = localStorage.getItem("token");
  let shopManagerId = localStorage.getItem("uid");

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    let url = `http://localhost:2000/api/order/getOrders`; 
    axios
      .get(url)
      .then((res) => {
        setList(
          res.data)})
      .catch((err) => console.log("err", err));
  };
  console.log("data:::", data);

  return (
    <>
      <ShopKeeperHeader />
      <TitleCard name={"Orders"} />

      <section class="text-gray-600 body-font my-10">
        <div class="flex items-center flex-wrap justify-center py-3">
        </div>
        <div class="container px-5 mx-auto">

          
          <OrderCard data={data} shopManagerId={shopManagerId}/>
        </div>
      </section>
      <div className="text-xl font-large justify-center items-center flex p-5 shopping-cart">
        <h1>No Orders to show </h1>
      </div>
    </>
  );
}
