import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState([]); // store products
  console.log(product);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorrMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    setLoading(true);
    setError(false);

    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      const response = await axios.get(`${apiUrl}/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      setError(true);
      setErrorrMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  // first load of web page
  useEffect(() => {
    fetchProduct();
  }, []);

  const handleOnRefetch = () => {
    fetchProduct();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-blue-900" />
        <p className="text-sm text-gray-500">Loading product data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div>
          <h3 className="text-red-600 text-[24px] font-semibold">
            {errorMessage}
          </h3>
          <div className="flex justify-center">
            <button
              onClick={handleOnRefetch}
              className="py-2 mt-2 px-6 bg-red-500 text-white rounded-md cursor-pointer"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      <h1>{product.title}</h1>
      <img src={product.image} alt="" />
    </div>
  );
}
