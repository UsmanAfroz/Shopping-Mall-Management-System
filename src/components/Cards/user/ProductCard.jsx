import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function ProductCard({ id, brandName, image, title, price }) {

    const nav = useNavigate();

    return (
        <>
            <div
                onClick={() => {
                    localStorage.setItem('p_id', id)
                    nav('/productDetail')
                }}
                class="w-full max-w-sm my-2 bg-gray-400 border border-gray-200 rounded-lg shadow  dark:border-gray-400">
                <a href=" ">
                    <img class="p-8 rounded-t-lg" src={image} alt="product" />
                    {/* <img class="p-8 rounded-t-lg" src="https://flowbite.com/docs/images/products/apple-watch.png" alt="product" /> */}
                </a>
                <div class="px-5 pb-5">
                    <a href=" ">
                        <h5 class="text-xl font-semibold tracking-tight text-gray-900">{brandName}, {title}</h5>
                    </a>
                    <div class="flex items-center justify-between">
                        <span class="text-3xl font-bold text-gray-900">${price}</span>
                        <a href=" " class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                    </div>
                </div>
            </div>
        </>
    );
}
