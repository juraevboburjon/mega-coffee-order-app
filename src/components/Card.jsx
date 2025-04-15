import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";

function Card({ addToCart }) {
  const host = import.meta.env.VITE_HOST;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${host}/menu`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [host]);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="mb-40 justify-center items-center p-10 grid grid-cols-4 gap-5 max-xl:grid-cols-3 max-sm:grid-cols-1">
      {products.map((product, i) => {
        return (
          <div
            key={i}
            className="w-full h-full bg-white mb-10 g-4 cursor-pointer"
            onClick={() => addToCart(product)}
          >
            <div className="h-64">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover hover:scale-108 transition-transform"
              />
            </div>
            <div className="flex justify-between items-end mb-3 mt-4">
              <p className="text-lg font-bold max-xl:text-sm">
                {product.title}
              </p>
              <p className="text-3xl font-light max-lg:text-lg">
                {product.price}₩
              </p>
            </div>
            <p className="text-sm font-thin text-gray-400 h-10 overflow-hidden ">
              {product.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Card;
