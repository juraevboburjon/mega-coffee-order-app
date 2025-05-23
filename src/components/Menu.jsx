import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import Loading from "./Loading";

function Menu({ addToCart }) {
  const [loading, setLoading] = useState(true);
  const host = import.meta.env.VITE_HOST;
  const [products, setProducts] = useState([]);

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
    <div className="w-full max-w-screen-xl p-4 max-lg:px-20 ">
      <div className="flex text-center justify-center items-center flex-col py-8">
        <p className="text-2xl font-thin mb-1 max-lg:text-xl">
          메가MGC커피의 엄선된 메뉴
        </p>
        <h2 className="text-6xl font-black">MEGA MENU</h2>
      </div>
      <Card products={products} addToCart={addToCart} className="mb-20" />
    </div>
  );
}

export default Menu;
