import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";

export default function ShopCard({
  id,
  name,
  shopType,
  floorNo,
  cnic,
  shopName,
  shopNo,
  onDelete,
  isPending,
  load,
}) {
  const navigate = useNavigate();
  const handleclick = (id) => {
    localStorage.setItem("pid", id);
    navigate(`/adminProducts/${id}`);
  };

  const updateHandler = (jsn) => {
    axios
      .put(`http://localhost:2000/api/shop/updateStatus/${id}`, jsn)
      .then((r) => {
        if (r.data.statusCode === 200) {
          load();
        }
      })
      .catch((er) => console.log("err", er));
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
                  {isPending ? (
                    <>
                      <Button
                        variant="contained "
                        className="mx-1"
                        onClick={() => updateHandler({ Status: "APPROVED" })}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => updateHandler({ Status: "REJECTED" })}
                      >
                        reject
                      </Button>
                    </>
                  ) : (
                    <div className="" onClick={() => onDelete(id)}>
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
                  )}
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
                  Floor #
                </p>
                <p className="text-xs text-black">{floorNo || 2}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
