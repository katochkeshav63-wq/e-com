import { useEffect, useState } from "react";
import { getData } from "../context/DataContext";
import FilterSection from "../components/FilterSection";
import Loading from "../assets/Loading4.webm";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Lottie from "lottie-react";
import notfound from "../assets/notfound.json";
import MobileFilter from "../components/MobileFilter";

const Products = () => {
  const { data, fetchAllProducts } = getData();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    if (!data) {
      fetchAllProducts();
    }
    window.scrollTo(0, 0);
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
    setOpenFilter(false);
  };

  const pageHandler = (selectedPage) => {
    setPage(selectedPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ FIX: category.name check (important)
  const filteredData = data?.filter((item) =>
    item.title?.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || item.category?.name === category) &&
    item.price >= priceRange[0] &&
    item.price <= priceRange[1]
  );

  const dynamicPage = Math.ceil((filteredData?.length || 0) / 5);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* 📱 Mobile Filter */}
        <MobileFilter
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          search={search}
          setSearch={setSearch}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          category={category}
          setCategory={setCategory}
          handleCategoryChange={handleCategoryChange}
        />

        {data?.length > 0 ? (
          <div className="flex gap-6">

            {/* 🧊 Sidebar Filter */}
            <div className="hidden md:block w-[250px] sticky top-20 h-fit bg-white p-4 rounded-xl shadow">
              <FilterSection
                search={search}
                setSearch={setSearch}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                category={category}
                setCategory={setCategory}
                handleCategoryChange={handleCategoryChange}
              />
            </div>

            {/* 🛍️ Products Section */}
            <div className="flex-1">

              {/* 🔍 Top bar */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                  Showing {filteredData?.length || 0} Products
                </h2>

                <button
                  onClick={() => setOpenFilter(true)}
                  className="md:hidden px-4 py-2 bg-black text-white rounded-md"
                >
                  Filters
                </button>
              </div>

              {filteredData?.length > 0 ? (
                <>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {filteredData
    ?.slice(page * 9 - 9, page * 9)
    .map((product) => (
      <div
        key={product.id}
        onClick={() => window.location.href = `/products/${product.id}`}
        className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden group"
      >
        {/* ✅ Product Image */}
        <div className="overflow-hidden">
          <img
            src={product.images?.[0]}
            alt={product.title}
            className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
          />
        </div>

        {/* ✅ Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-sm line-clamp-2">
            {product.title}
          </h3>

          <p className="text-lg font-bold text-indigo-600 mt-2">
            ₹ {product.price}
          </p>

          <p className="text-xs text-gray-500 mt-1">
            {product.category?.name}
          </p>
        </div>
      </div>
    ))}
</div>

                  {/* ✅ Pagination */}
                  <div className="mt-8 flex justify-center">
                    <Pagination
                      pageHandler={pageHandler}
                      page={page}
                      dynamicPage={dynamicPage}
                    />
                  </div>
                </>
              ) : (
                <div className="flex flex-col justify-center items-center h-[400px]">
                  <Lottie animationData={notfound} className="w-[300px]" />
                  <p className="text-gray-500 mt-2">
                    No products found
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* 🔄 Loading State */
          <div className="flex items-center justify-center h-[400px]">
            <video muted autoPlay loop className="w-[150px]">
              <source src={Loading} type="video/webm" />
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;