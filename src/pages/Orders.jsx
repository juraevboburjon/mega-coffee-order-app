import axios from "axios";
import React, { useEffect, useState } from "react";
import DoneOrderBtn from "../components/DoneOrderBtn";

const Orders = () => {
  const host = import.meta.env.VITE_HOST;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${host}/orders`)
      .then((res) => {
        const normalizedOrders = res.data.map((item) => item["0"]);
        // if(res.data.length + 1) {

        // }
        setOrders(normalizedOrders);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [host]);
  //   console.log(order);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {orders.map((item, index) => (
            <div key={index}>
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <p>Цена: {item.price}</p>
              <p>Количество: {item.quantity}</p>
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "100px", height: "100px" }}
              />
              <DoneOrderBtn key={item.id} orders={orders} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
