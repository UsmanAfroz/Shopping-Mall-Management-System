import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MainHeader from "../../components/header/MainHeader";
import Footer from "../../sections/user/Footer";
import axios from "axios";
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

import { useNavigate } from "react-router-dom";
const deliveryMethods = [
  {
    id: 1,
    title: "Standard",
    turnaround: "4–10 business days",
    price: "$5.00",
  },
  { id: 2, title: "Express", turnaround: "2–5 business days", price: "$16.00" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const ConfirmOrder = (props) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state.product[0].count);
  let token = localStorage.getItem("token");

    const paymentAmount = "0.1"; 
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0]
  );

  const ttl = localStorage.getItem("ttl");
  console.log(token);

  useEffect(() => {
    const initializeProvider = async () => {
      const detectedProvider = await detectEthereumProvider();
      if (detectedProvider) {
        setProvider(new ethers.providers.Web3Provider(detectedProvider));
      }
    };

    initializeProvider();
  }, []);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (provider) {
      try {
        await provider.send('eth_requestAccounts', []);
        const accounts = await provider.listAccounts();
        const signer = provider.getSigner(accounts[0]);
        setSigner(signer);

        const transactionResponse = await signer.sendTransaction({
          to: '0x758ac563d89dDe2078CfD77FFf832E21B989217e',
          value: ethers.utils.parseEther(paymentAmount),
        });

        await transactionResponse.wait();
        

        console.log('Payment transaction successful:', transactionResponse);
        navigate('/')
      } catch (error) {
        console.error('Payment transaction error:', error);
      }
    } else {
      console.error('MetaMask provider not available');
    }
  };
  return (
    <>
      <MainHeader />
      <div className="bg-gray-50">
        <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Checkout</h2>

          <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <div>
              <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">
                  Shipping information
                </h2>

                <div className="sm:col-span-2">
                  <div>
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Postal code
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="postal-code"
                        id="postal-code"
                        autoComplete="postal-code"
                        className="block w-full rounded-md h-8 border-[1px] border-gray-300 sm:text-sm"
                        onChange={(e) => {
                          setPostalCode(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        autoComplete="tel"
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                        }}
                        className="block w-full rounded-md h-8 border-[1px] border-gray-300 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-gray-200 pt-10">
                <RadioGroup
                  value={selectedDeliveryMethod}
                  onChange={setSelectedDeliveryMethod}
                >
                  <RadioGroup.Label className="text-lg font-medium text-gray-900">
                    Delivery method
                  </RadioGroup.Label>

                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    {deliveryMethods.map((deliveryMethod) => (
                      <RadioGroup.Option
                        key={deliveryMethod.id}
                        value={deliveryMethod}
                        className={({ checked, active }) =>
                          classNames(
                            checked ? "border-transparent" : "border-gray-300",
                            active ? "ring-2 ring-indigo-500" : "",
                            "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                          )
                        }
                      >
                        {({ checked, active }) => (
                          <>
                            <span className="flex flex-1">
                              <span className="flex flex-col">
                                <RadioGroup.Label
                                  as="span"
                                  className="block text-sm font-medium text-gray-900"
                                >
                                  {deliveryMethod.title}
                                </RadioGroup.Label>
                                <RadioGroup.Description
                                  as="span"
                                  className="mt-1 flex items-center text-sm text-gray-500"
                                >
                                  {deliveryMethod.turnaround}
                                </RadioGroup.Description>
                                <RadioGroup.Description
                                  as="span"
                                  className="mt-6 text-sm font-medium text-gray-900"
                                >
                                  {deliveryMethod.price}
                                </RadioGroup.Description>
                              </span>
                            </span>
                            {checked ? (
                              <CheckCircleIcon
                                className="h-5 w-5 text-indigo-600"
                                aria-hidden="true"
                              />
                            ) : null}
                            <span
                              className={classNames(
                                active ? "border" : "border-2",
                                checked
                                  ? "border-indigo-500"
                                  : "border-transparent",
                                "pointer-events-none absolute -inset-px rounded-lg"
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

            </div>

            {/* Order summary */}
            <div className="mt-10 lg:mt-0">
              <h2 className="text-lg font-medium text-gray-900">
                Order summary
              </h2>

              <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                <h3 className="sr-only">Items in your cart</h3>
                <ul role="list" className="divide-y divide-gray-200"></ul>
                <dl className="space-y-6 border-t border-gray-200 py-6 px-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {ttl - 10}
                    </dd>
                  </div>

                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Taxes</dt>
                    <dd className="text-sm font-medium text-gray-900">$10</dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                    <dt className="text-base font-medium">Total</dt>
                    <dd className="text-base font-medium text-gray-900">
                      0.1 ETH
                    </dd>
                  </div>
                </dl>
              </div>
            </div> 
          </form>
          <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
            <button
              onClick={handlePaymentSubmit}
              className="w-full rounded-md cursor-pointer border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Confirm order
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ConfirmOrder;
