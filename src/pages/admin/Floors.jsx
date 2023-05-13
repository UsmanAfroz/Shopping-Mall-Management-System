import { useEffect, useState } from "react";
import axios from "axios";
import TitleCard from "../../components/Cards/TitleCard";
import AdminHeader from "../../components/header/AdminHeader";
import Footer from "../../sections/user/Footer";

export default function Dashboard() {
  const [usersDict, setUsersDict] = useState({});
  const [ttlShops, setTtlShop] = useState();
  const [ttlFloors, setTtlFloors] = useState();
  const [tmp, setTmp] = useState([]);
  const [selected , setSelected] = useState("Shop Name");
  const [data,setData] = useState([])

  useEffect(() => {
    getLenths();
  }, [ttlFloors, ttlFloors]);

  const getLenths = async () => {
    await axios.get(`http://localhost:2000/api/shop/getShops`).then((res) => {
      setTmp(res.data.data);
      setData(res.data.data)
      const dict = res.data.data.reduce((acc, data) => {
        if (!acc[data["floorNumber"]]) {
          acc[data["floorNumber"]] = [data];
        } else {
          acc[data["floorNumber"]].push(data);
        }
        return acc;
      }, {});
     

      setUsersDict(dict);

      let len = Object.keys(usersDict).length;
      setTtlFloors(len);
      Object.keys(usersDict)
        .map((k, index) => {
          setTtlShop(usersDict[k].length * len);
        })
       
    });
  };
const filterHandler =(val)=>{
  console.log("val", val, selected, tmp);
  
  console.log("selected", selected);
  if(selected == "Shop Name"){
    // setTmp(data);
    setTmp(data.filter(e=>e.shopName.toLowerCase().includes(val.toLowerCase())))
  }
 else if(selected === "Shop Number"){
  // setTmp(data);
    setTmp(data.filter(e=>e.shopNumber.toString().includes(val)))
  }
  else {
    // setTmp(data);
    setTmp(data.filter(e=>e.floorNumber.toString().includes(val)))
  }
}

  console.log("selected", selected, tmp);
  return (
    <>
      <AdminHeader />
      <TitleCard name={"Welcome"} />
      <>
        <div className="flex items-center w-full justify-center px-16 py-8">
          <div className="w-full rounded shadow bg-white dark:bg-gray-800 py-6 pl-6 pr-12">
            <div className="flex items-center">
              <p className="text-lg md:pr-96 font-semibold leading-4 text-gray-800 dark:text-gray-100">
                Statistics
              </p>
              {/* <p className="text-xs leading-3 pl-6 text-right text-gray-500 dark:text-gray-400">
                Updated 1 month ago
              </p> */}
            </div>
            <div className="md:flex items-center justify-between pt-8">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-building"
                    viewBox="0 0 16 16"
                  >
                    {" "}
                    <path
                      fill-rule="evenodd"
                      d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"
                    />{" "}
                    <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z" />{" "}
                  </svg>
                </div>
                <div className="pl-4">
                  <p className="w-11 text-lg font-semibold leading-none text-gray-800 dark:text-gray-100">
                    {ttlFloors}
                  </p>
                  <p className="w-8 text-xs leading-3 text-gray-500 pt-2 dark:text-gray-400">
                    Floors
                  </p>
                </div>
              </div>
              <div className="flex items-center md:pt-0 pt-4 md:pl-10">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-shop"
                    viewBox="0 0 16 16"
                  >
                    {" "}
                    <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z" />{" "}
                  </svg>
                </div>
                <div className="pl-4">
                  <p className="w-11 text-lg font-semibold leading-none text-gray-800 dark:text-gray-100">
                    {ttlShops}
                  </p>
                  <p className="w-8 text-xs leading-3 text-gray-500 pt-2 dark:text-gray-400">
                    Shops
                  </p>
                </div>
              </div>
              <div className="flex items-center md:pt-0 pt-4 md:pl-10">
                <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-shopping-bag"
                  >
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                </div>
                <div className="pl-4">
                  <p className="w-11 text-lg font-semibold leading-none text-gray-800 dark:text-gray-100">
                    3
                  </p>
                  <p className="w-8 text-xs leading-3 text-gray-500 pt-2 dark:text-gray-400">
                    Products
                  </p>
                </div>
              </div>
              <div className="flex items-center md:pt-0 pt-4 md:pl-10">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={25}
                    height={24}
                    viewBox="0 0 25 24"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.6529 11H13.1552V6H17.1489C17.748 6 18.1474 5.6 18.1474 5C18.1474 4.4 17.748 4 17.1489 4H13.1552V1C13.1552 0.4 12.7558 0 12.1568 0C11.5577 0 11.1583 0.4 11.1583 1V4H9.66068C7.16459 4 5.16772 6 5.16772 8.5C5.16772 11 7.16459 13 9.66068 13H11.1583V18H6.16616C5.5671 18 5.16772 18.4 5.16772 19C5.16772 19.6 5.5671 20 6.16616 20H11.1583V23C11.1583 23.6 11.5577 24 12.1568 24C12.7558 24 13.1552 23.6 13.1552 23V20H14.6529C17.1489 20 19.1458 18 19.1458 15.5C19.1458 13 17.1489 11 14.6529 11ZM9.66068 11C8.26287 11 7.16459 9.9 7.16459 8.5C7.16459 7.1 8.26287 6 9.66068 6H11.1583V11H9.66068ZM13.1552 18H14.6529C16.0507 18 17.1489 16.9 17.1489 15.5C17.1489 14.1 16.0507 13 14.6529 13H13.1552V18Z"
                      fill="#047857"
                    />
                  </svg>
                </div>
                <div className="pl-4">
                  <p className="w-11 text-lg font-semibold leading-none text-gray-800 dark:text-gray-100">
                    $9745
                  </p>
                  <p className="w-8 text-xs leading-3 text-gray-500 pt-2 dark:text-gray-400">
                    Revenue
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:px-6 w-full">
          <div className="px-4 md:px-10 py-4 md:py-7">
            <div className="lg:flex items-center justify-between">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
                Shops
              </p>
              <div className="md:flex items-center mt-6 lg:mt-0">
                <div className="flex items-center">
                  <button className="px-2.5 py-2.5 mr-3 bg-indigo-700 hover:bg-indigo-600 rounded focus:outline-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M15 3.3335H4.99998C4.07951 3.3335 3.33331 4.07969 3.33331 5.00016V6.66683C3.33331 7.5873 4.07951 8.3335 4.99998 8.3335H15C15.9205 8.3335 16.6666 7.5873 16.6666 6.66683V5.00016C16.6666 4.07969 15.9205 3.3335 15 3.3335Z"
                        stroke="#FAFAFA"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15 11.6665H4.99998C4.07951 11.6665 3.33331 12.4127 3.33331 13.3332V14.9998C3.33331 15.9203 4.07951 16.6665 4.99998 16.6665H15C15.9205 16.6665 16.6666 15.9203 16.6666 14.9998V13.3332C16.6666 12.4127 15.9205 11.6665 15 11.6665Z"
                        stroke="#FAFAFA"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button className="px-2.5 py-2.5 mr-4 bg-white border hover:bg-gray-100 rounded border-gray-200 focus:outline-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M7.49998 3.3335H4.16665C3.70641 3.3335 3.33331 3.70659 3.33331 4.16683V7.50016C3.33331 7.9604 3.70641 8.3335 4.16665 8.3335H7.49998C7.96022 8.3335 8.33331 7.9604 8.33331 7.50016V4.16683C8.33331 3.70659 7.96022 3.3335 7.49998 3.3335Z"
                        stroke="#6B7280"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.8334 3.3335H12.5C12.0398 3.3335 11.6667 3.70659 11.6667 4.16683V7.50016C11.6667 7.9604 12.0398 8.3335 12.5 8.3335H15.8334C16.2936 8.3335 16.6667 7.9604 16.6667 7.50016V4.16683C16.6667 3.70659 16.2936 3.3335 15.8334 3.3335Z"
                        stroke="#6B7280"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.49998 11.6665H4.16665C3.70641 11.6665 3.33331 12.0396 3.33331 12.4998V15.8332C3.33331 16.2934 3.70641 16.6665 4.16665 16.6665H7.49998C7.96022 16.6665 8.33331 16.2934 8.33331 15.8332V12.4998C8.33331 12.0396 7.96022 11.6665 7.49998 11.6665Z"
                        stroke="#6B7280"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.8334 11.6665H12.5C12.0398 11.6665 11.6667 12.0396 11.6667 12.4998V15.8332C11.6667 16.2934 12.0398 16.6665 12.5 16.6665H15.8334C16.2936 16.6665 16.6667 16.2934 16.6667 15.8332V12.4998C16.6667 12.0396 16.2936 11.6665 15.8334 11.6665Z"
                        stroke="#6B7280"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <div className="flex items-center pl-3 bg-white border w-64 rounded border-gray-200">
                    <svg
                      className="text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M8.33333 13.1667C11.555 13.1667 14.1667 10.555 14.1667 7.33333C14.1667 4.11167 11.555 1.5 8.33333 1.5C5.11167 1.5 2.5 4.11167 2.5 7.33333C2.5 10.555 5.11167 13.1667 8.33333 13.1667Z"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17.5 17.5L12.5 12.5"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <input
                      type="text"
                      className="py-2.5 pl-1 w-full focus:outline-none text-sm rounded text-gray-600 placeholder-gray-500"
                      placeholder="Search"
                      onChange={(e)=>filterHandler(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center mt-4 md:mt-0 md:ml-3 lg:ml-0">
                  <div className="w-40 py-2 px-3 bg-white lg:ml-3 border rounded border-gray-200">
                    <select className="w-full text-sm leading-3 text-gray-500 focus:outline-none" value={selected} onChange={(e)=>setSelected(e.target.value)}>
                      <option value="Shop Name">Shop Name</option>
                      <option value="Shop Number">Shop Number</option>
                      <option value="Floor Number">Floor Number</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white md:px-8 xl:px-5 overflow-x-auto mb-5">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="h-20 w-full text-sm leading-none text-gray-600">
                  <th className="font-normal text-left pl-11">#</th>
                  <th className="font-normal text-left pl-11">Shop No</th>
                  <th className="font-normal text-left pl-10">Shop Name</th>
                  <th className="font-normal text-left pl-10">Shop Type</th>
                  <th className="font-normal text-left pl-10">Floor No</th>
                  <th className="font-normal text-left pl-10">Status</th>
                </tr>
              </thead>

              <tbody className="w-full">
                {tmp.map((i, index) => (
                  <>
                    <tr className="h-20 text-sm leading-none text-gray-700 border-b border-t border-gray-200 bg-white ">
                      <td>
                        <p className="mr-16 pl-10">{index + 1}</p>
                      </td>
                      <td>
                        <p className="mr-16 pl-10">{i["shopNumber"]}</p>
                      </td>
                      <td>
                        <p className="mr-16 pl-10">{i["shopName"]}</p>
                      </td>
                      <td>
                        <p className="mr-16 pl-10">{i["shopType"]}</p>
                      </td>
                      <td>
                        <p className="mr-16 pl-12">{i["floorNumber"]}</p>
                      </td>
                      <td>
                        <p className="mr-16 pl-8">{i["Status"]}</p>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </>
    </>
  );
}
