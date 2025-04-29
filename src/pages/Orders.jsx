import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import DoneOrderBtn from "../components/DoneOrderBtn";
// import NotificationAudio from "../images/order.mp3";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";

const Orders = () => {
  const host = import.meta.env.VITE_HOST;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${host}/orders`)
      .then((res) => {
        setOrders(res.data);
        playNotificationSound();
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [host]);

  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((err) => console.log("Ошибка воспроизведения звука:", err));
    }
  };

  return (
    <div>
      {/* <audio ref={audioRef} src={NotificationAudio} preload="auto"></audio> */}
      <div>
        <Navbar />
        <h1 className="text-center text-2xl font-bold my-3">Orders</h1>
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border-dashed border-2 border-amber-300 rounded-2xl m-2"
              >
                <div className="flex justify-between p-3 items-center">
                  <div className="flex flex-col">
                    <p className="">주문 번호:</p>
                    <p className="text-3xl font-bold">{order.id}</p>
                  </div>
                  <div className="flex">
                    <DoneOrderBtn orderId={order.id} orders={orders} />
                  </div>
                </div>
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-2 items-center justify-center p-3"
                  >
                    <div className="ed">
                      <h1 className="text-xl font-bold">{item.title}</h1>
                      <p className="font-semibold text-lg">
                        가격: {item.price}
                      </p>
                      <p className="text-lg font-bold">수량: {item.quantity}</p>
                    </div>
                    <div className="flex justify-end">
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: "100px", height: "100px" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
