import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]); // store products

  const [error, setError] = useState(false);
  const [errorMessage, setErrorrMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    setLoading(true);
    setError(false);

    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      const response = await axios.get(`${apiUrl}/products`);
      setProducts(response.data);
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
    <>
      <div className="flex flex-wrap gap-4 justify-evenly my-20 mx-12">
        {products.map((product, index) => (
          <div key={index}>
            <div className="w-full max-w-sm border border-gray-200 rounded-lg shadow-sm">
              <a
                href={`products/${product.id}`}
                className="flex justify-center"
              >
                <img
                  className="p-8 w-60 h-70 rounded-t-lg"
                  src={product.image}
                  alt="product image"
                />
              </a>
              <div className="px-5 pb-5">
                <a href="#">
                  <h5 className="text-xl font-semibold tracking-tight truncate w-65">
                    {product.title}
                  </h5>
                  <p className="line-clamp-2">{product.description}</p>
                </a>
                <div className="flex items-center justify-between mt-6">
                  <span className="text-3xl font-bold">${product.price}</span>
                  <button className="button bg-blue-700 p-2 rounded-md text-white">
                    <span className="label">+ Add to card</span>
                    <span className="gradient-container">
                      <span className="gradient"></span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
