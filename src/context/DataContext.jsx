import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all products
  const fetchAllProducts = async () => {
    try {
      const res = await axios.get(
        "https://api.escuelajs.co/api/v1/products"
      );
      setData(res.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching products:", error);
      setLoading(false);
    }
  };

  // ✅ Call API on mount
  useEffect(() => {
    fetchAllProducts();
  }, []);

  // ✅ Extract unique categories (IMPORTANT FIX)
  const getUniqueCategories = () => {
    const categories = data?.map((item) => item.category?.name);
    return ["All", ...new Set(categories)];
  };

  const categoryOnlyData = getUniqueCategories();

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        loading,
        categoryOnlyData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// ✅ Custom hook
export const getData = () => useContext(DataContext);