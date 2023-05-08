import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicModal from "./Modal";

export default function ShopCard({
  id,
  name,
  shopType,
  cnic,
  shopName,
  shopNo,
}) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const token = localStorage.getItem("token");

  const handleclick = (id) => {
    localStorage.setItem("pid", id);
    navigate("/customerProducts");
  };
  const feebackHandler = () => {
    if (!token) {
      setIsOpen(true);
    } else {
      setOpenModal(true);
    }
  };

  const SubmitHandler = () => {
    setOpenModal(false);
    axios.post(
      `http://localhost:2000/api/feeback/createFeedback?token=${token}`,
      {
        message: feedbackMessage,
        username: name,
        shopId: id,
      }
    );
    console.log("feedbackMessage", feedbackMessage);
  };

  return (
    <>
      <div class="p-4 md:w-1/3 sm:w-full">
        <div class="cursor-pointer h-64 md:h-72 border-2 border-gray-300 border-opacity-60 rounded-xl overflow-hidden">
          <div>
            <div className="w-full h-16 bg-gray-300 rounded-t-xl px-8 py-5 border-gray-300 border">
              <div className="flex flex-row justify-between">
                <h3 className="text-black font-semibold">{shopName}</h3>
                <section className="flex flex-row">
                  <div className="" onClick={feebackHandler}>
                    <h4>Give Feedback</h4>
                  </div>
                </section>
              </div>
            </div>
            <div
              onClick={() => handleclick(id)}
              className="w-full flex items-center justify-center "
            >
              <div className="flex flex-col items-start  ">
                <img
                  src="https://cdn.tuk.dev/assets/templates/olympus/profile.png"
                  alt="profile"
                />
                <p className="mt-2 text-xs sm:text-sm md:text-base font-semibold text-center text-black">
                  {name}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center ">
              <div className>
                <p className="mt-2 text-base sm:text-lg md:text-xl 2xl:text-2xl text-black">
                  CNIC
                </p>
                <p className="text-xs text-black"> {cnic}</p>
              </div>
              <div className="ml-12">
                <p className="mt-2 text-base sm:text-lg md:text-xl 2xl:text-2xl text-black">
                  SHOP #
                </p>
                <p className="text-xs text-black">{shopNo}</p>
              </div>
              <div className="ml-12">
                <p className="mt-2 text-base sm:text-lg md:text-xl 2xl:text-2xl text-black">
                  Contact
                </p>
                <p className="text-xs text-black">0334-5554411</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && <BasicModal isOpen={isOpen} setIsOpen={setIsOpen} />}
      {openModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5  rounded-t">
                  <h3 className="text-3xl font-semibold">FeedBack</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setOpenModal(false)}
                  ></button>
                </div>
                <textarea
                  className="w-46  m-3 border-solid border-2 border-sky-500 "
                  type="text"
                  onChange={(e) => setFeedbackMessage(e.target.value)}
                />
                <div className="flex items-center justify-end p-6  rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setOpenModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={SubmitHandler}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}
