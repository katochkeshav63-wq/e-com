import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../assets/Loading4.webm";
import Breadcrums from "../components/Breadcrums";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "../context/CartContext";

const SingleProduct = () => {
  const params = useParams();
  const [singleProduct, setSingleProduct] = useState(null);
  const { addToCart } = useCart();

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(
        `https://api.escuelajs.co/api/v1/products/${params.id}`
      );

      setSingleProduct(res.data); // ✅ FIXED
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [params.id]);

return (
  <>
    {singleProduct ? (
      <div className="bg-gray-100 min-h-screen py-6 px-4">
        
        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto mb-4">
          <Breadcrums title={singleProduct.title} />
        </div>

        {/* Main Container */}
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8 p-6">

          {/* 🖼️ Image Section */}
          <div className="flex justify-center items-center bg-gray-50 rounded-xl p-4">
            <img
              src={singleProduct.images?.[0]}
              alt={singleProduct.title}
              className="h-[300px] object-contain transition duration-300 hover:scale-105"
            />
          </div>

          {/* 📦 Product Details */}
          <div className="flex flex-col gap-4">

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
              {singleProduct.title}
            </h1>

            {/* Category */}
            <p className="text-sm text-gray-500 uppercase tracking-wide">
              {singleProduct.category?.name}
            </p>

            {/* ⭐ Fake Rating (since API doesn't provide it) */}
            <div className="text-yellow-500 text-lg">
              ⭐⭐⭐⭐☆ <span className="text-gray-500 text-sm">(120 reviews)</span>
            </div>

            {/* 💰 Price */}
            <div className="flex items-center gap-3">
              <p className="text-3xl font-bold text-red-500">
                ₹ {singleProduct.price}
              </p>
              <span className="text-sm text-gray-400 line-through">
                ₹ {singleProduct.price + 500}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed text-sm">
              {singleProduct.description}
            </p>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => addToCart(singleProduct)}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition"
              >
                <IoCartOutline className="w-5 h-5" />
                Add to Cart
              </button>


            </div>

          </div>
        </div>
      </div>
    ) : (
      <div className="flex items-center justify-center h-screen">
        <video muted autoPlay loop className="w-40">
          <source src={Loading} type="video/webm" />
        </video>
      </div>
    )}
  </>
);
};

export default SingleProduct;