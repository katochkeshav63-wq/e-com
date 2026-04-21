import { useState } from "react";
import { getData } from "/src/context/DataContext";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate()
  const { data = [] } = getData(); // fallback to empty array
  const [selectedCategory, setSelectedCategory] = useState("All");

  // ✅ Fix category (string)
  const categories = [
    "All",
    ...new Set(data.map((item) => item.category)),
  ];

  // ✅ Filter logic
  const filteredData =
    selectedCategory === "All"
      ? data
      : data.filter((item) => item.category === selectedCategory);

  return (
    <div className="px-4 md:px-10 py-6">

      {/* Categories */}
      <div className="flex gap-3 flex-wrap justify-center mb-8">
        {categories.slice(0, 8).map((cat, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${
              selectedCategory === cat
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white scale-105"
                : "bg-gray-100 hover:bg-black hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {filteredData.slice(0, 8).map((item) => (
          <div
            key={item.id}
            className="bg-white cursor-pointer rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
            onClick={() => (window.location.href = `/products/${item.id}`)}
          >
            {/* ✅ Fix image */}
            <div className="overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-44 object-contain p-4 group-hover:scale-110 transition duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-3">
              <h3 className="font-semibold text-sm line-clamp-2">
                {item.title}
              </h3>

              <p className="text-lg font-bold text-indigo-600 mt-1">
                $ {item.price}
              </p>

      <p className="text-lg font-bold text-indigo-600 mt-1">
                ⭐ {item.rating?.rate} 
               
             </p>

              {/* ✅ Prevent double click issue */}
              <button
                className="w-full cursor-pointer mt-3 py-1.5 text-sm bg-black text-white rounded-md"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate (`/products/${item.id}`) ;
                }}
              >
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;