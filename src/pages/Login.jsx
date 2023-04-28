import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [type, setType] = useState("admin");
  const handleOptionChange = (event) => setType(event.target.value);

  const login = () => {
    let jsn = {
      email: email,
      password: password,
      userType: type,
    };

    axios
      .post("http://localhost:2000/api/user/login", jsn)
      .then((res) => {
        localStorage.setItem("token", res.data["token"]);
        localStorage.setItem("uid", res.data["id"]);
        switch (res.data["userType"]) {
          case "CUSTOMER": {
            navigate("/");
            break;
          }

          case "SHOPKEEPER": {
            navigate("/dashboard");
            break;
          }
          case "ADMIN": {
            navigate("/dashboard");
            break;
          }
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <>
      <section class="h-screen">
        <div class="px-6 h-full text-gray-800">
          <div class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                class="w-full"
                alt="hhh"
              />
            </div>
            <div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <center>
                <img
                  className="h-10 w-auto my-4"
                  src="https://tailwindui.com/img/logos/mark.svg?color=black"
                  alt=""
                />
              </center>
              <form>
                <div class="mb-6">
                  <input
                    type="text"
                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div class="mb-6">
                  <input
                    type="password"
                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div class="mb-2 flex-row flex justify-between form-control w-full px-4 py-2 text-md font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
                  <section>
                    <label className="text-gray-400 text-md leading-tight tracking-normal mb-2">
                      User Type
                    </label>
                  </section>
                  <section>
                    <input
                      type="radio"
                      name="usertype"
                      value="ADMIN"
                      checked={type === "ADMIN"}
                      onChange={handleOptionChange}
                    />{" "}
                    Admin
                  </section>

                  <section>
                    <input
                      type="radio"
                      name="usertype"
                      value="SHOPKEEPER"
                      checked={type === "SHOPKEEPER"}
                      onChange={handleOptionChange}
                    />{" "}
                    Shop Keeper
                  </section>

                  <section>
                    <input
                      type="radio"
                      name="usertype"
                      value="CUSTOMER"
                      checked={type === "CUSTOMER"}
                      onChange={handleOptionChange}
                    />{" "}
                    Customer
                  </section>
                </div>

                <div class="text-center lg:text-left">
                  <button
                    type="button"
                    onClick={login}
                    class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    class="inline-block px-7 ml-3 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Cancel
                  </button>
                  <p class="text-sm font-semibold mt-2 pt-1 mb-0">
                    Don't have an account?
                    <Link to="/signup">
                      <a
                        href="#!"
                        class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                      >
                        Register
                      </a>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
