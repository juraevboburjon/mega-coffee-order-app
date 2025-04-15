import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PaymentPopap({ cart, toggleModal, deleteOnCart }) {
  const host = import.meta.env.VITE_HOST;
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length == 0) {
      toggleModal();
    }
  }, [cart, toggleModal]);

  const handleClick = () => {
    axios
      .post(`${host}/orders`, cart)
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  // console.log(cart);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <div className="bg-gray-400/20 fixed w-full top-0 left-0 bottom-0 flex justify-center items-center z-999 backdrop-blur-sm">
        <div className="block w-[60%] h-[60%] rounded-2xl bg-white p-6 max-xl:h-[48%] max-sm:h-[55%]">
          <div className="h-65 overflow-scroll max-sm:h-1/2">
            {cart.map((item, i) => {
              return (
                <div
                  key={i}
                  className="grid grid-cols-4 text-center mb-6 gap-4 max-sm:w-sm"
                >
                  <div className="flex">
                    <p className="mr-6">{i + 1}</p>
                    <p className="max-sm:text-xs">{item.title}</p>
                  </div>
                  <p className="">{item.quantity}</p>
                  <p className="text-right">{item.price * item.quantity}</p>
                  <button
                    className="cursor-pointer mx-8 tex"
                    onClick={() => deleteOnCart(item.id)}
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
          <div className="w-full grid grid-cols-3 gap-4 my-8 max-xl:grid-cols-1 lg:mt-30 xl:my-8">
            <div className="flex justify-center items-end gap-4">
              총합:
              <p className="text-4xl font-bold max-sm:text-xl">
                {total}{" "}
                <span className="text-2xl font-light max-sm:text-lg">₩</span>
              </p>
            </div>
            <button
              className="cursor-pointer bg-amber-300 rounded-xl lg:py-4"
              onClick={handleClick}
            >
              결제하기
            </button>
            <button
              className="cursor-pointer bg-black text-white rounded-xl lg:py-4"
              onClick={toggleModal}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPopap;
