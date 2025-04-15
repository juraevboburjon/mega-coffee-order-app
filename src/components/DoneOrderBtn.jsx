import axios from "axios";

const DoneOrderBtn = ({ orders }) => {
  const host = import.meta.env.VITE_HOST;

  const handleDoneOrder = () => {
    // Проверьте, что order.id существует и корректен
    if (!orders?.id) {
      console.error("Order ID is missing or invalid.");
      return;
    }

    axios
      .delete(`${host}/orders/${orders.id}`) // Используем order.id
      .then((response) => {
        console.log("Order deleted:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
      });
  };

  return (
    <div>
      <button onClick={handleDoneOrder}>delete</button>
    </div>
  );
};

export default DoneOrderBtn;
