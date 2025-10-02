import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import axios from "axios";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Cartpage = () => {
  const [items, setItems] = useState([]);
  const [bookIds, setBookIds] = useState([]);
  const [bookInfo, setBookInfo] = useState([]);

  const navigate = useNavigate();

  // Fetch cart
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const cartItems = response.data.items || [];
      setItems(cartItems);
      setBookIds(cartItems.map((item) => item.bookId));
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  // Fetch book info
  useEffect(() => {
    if (bookIds.length === 0) return;
    const fetchBookInfo = async () => {
      try {
        const responses = await Promise.all(
          bookIds.map((id) =>
            axios.get(`http://localhost:8080/book/info?id=${id}`)
          )
        );
        setBookInfo(responses.map((r) => r.data));
      } catch (err) {
        console.error("Error fetching book info", err);
      }
    };
    fetchBookInfo();
  }, [bookIds]);

  // Remove item from cart
  const handleRemove = async (bookId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/cart/remove/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  // Update quantity
  const handleUpdateQuantity = async (bookId, newQuantity) => {
    if (newQuantity < 1) return; // prevent 0 or negative quantities
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8080/cart/update/${bookId}?quantity=${newQuantity}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  // Clear cart
  const handleClearCart = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete("http://localhost:8080/cart/clear", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems([]);
      setBookInfo([]);
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  // Totals
  const subtotal = items.reduce(
    (sum, item, idx) => sum + (bookInfo[idx]?.price || 0) * item.quantity,
    0
  );
  const discount = subtotal > 1000 ? 100 : 0;
  const shipping = subtotal > 500 ? 0 : 49;
  const grandTotal = subtotal - discount + shipping;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="max-w-7xl mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section: Shopping Bag */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Shopping Bag</h2>
            {items.length > 0 && (
              <button
                onClick={handleClearCart}
                className="text-red-500 text-sm hover:underline"
              >
                Clear Cart
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item, index) => {
                const book = bookInfo[index];
                return (
                  <div
                    key={item.itemId}
                    className="flex items-center justify-between border-b pb-4"
                  >
                    {/* Product Image + Info */}
                    <div className="flex items-center gap-4">
                      <img
                        src={book?.imageUrl}
                        alt={book?.title}
                        className="w-20 h-28 object-cover rounded-lg shadow"
                      />
                      <div>
                        <h3 className="font-medium text-lg">{book?.title}</h3>
                        <p className="text-sm text-gray-500">
                          {book?.author} • {book?.genre}
                        </p>
                        <p className="text-sm text-gray-600">
                          Price: ₹{book?.price}
                        </p>

                        {/* Remove button */}
                        <button
                          onClick={() => handleRemove(item.bookId)}
                          className="mt-2 text-red-500 hover:underline text-sm"
                        >
                          <MdDelete className="text-2xl" />
                        </button>
                      </div>
                    </div>

                    {/* Quantity + Total */}
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.bookId, item.quantity + 1)
                          }
                          className="text-green-600 hover:scale-110 transition-transform"
                        >
                          <CiCirclePlus className="text-2xl" />
                        </button>
                        <span className="font-semibold">{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.bookId, item.quantity - 1)
                          }
                          className="text-red-600 hover:scale-110 transition-transform"
                        >
                          <CiCircleMinus className="text-2xl" />
                        </button>
                      </div>
                      <div className="font-semibold text-gray-800">
                        ₹{(book?.price || 0) * item.quantity}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Section: Summary */}
        <div className="bg-white rounded-xl shadow-md p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

          {/* Totals */}
          <div className="border-t pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>-₹{discount}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
            </div>
            <div className="flex justify-between font-semibold text-base border-t pt-2">
              <span>Total</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full mt-6 bg-green-500 hover:bg-green-700 text-white py-3 rounded-lg transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cartpage;
