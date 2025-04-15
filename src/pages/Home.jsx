import Menu from "../components/Menu";
import Cart from "../components/Cart";
import Navbar from "../components/Navbar";
import { useState } from "react";
import PaymentPopap from "../components/PaymentPopap";

function Home() {
  const [cart, setCart] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const toggleModal = () => {
    setShowPaymentModal((prevState) => !prevState);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const haveToCart = prevCart.findIndex((item) => item.id === product.id);
      if (haveToCart >= 0) {
        const updateCart = [...prevCart];
        updateCart[haveToCart].quantity = +1;
        return updateCart;
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const deleteOnCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const incrementOrder = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementOrder = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId && item.quantity > 0
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <>
      <main className="flex flex-col items-center">
        {showPaymentModal && (
          <PaymentPopap
            cart={cart}
            deleteOnCart={deleteOnCart}
            toggleModal={toggleModal}
          />
        )}
        <Navbar />
        <Menu addToCart={addToCart} />
      </main>
      <Cart
        cart={cart}
        deleteOnCart={deleteOnCart}
        incrementOrder={incrementOrder}
        decrementOrder={decrementOrder}
        toggleModal={toggleModal}
      />
    </>
  );
}

export default Home;
