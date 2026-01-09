import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import axios from "axios";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [items, setItems] = useState([]);
  const [bookInfo, setBookInfo] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0); // coupon discount
  const [couponApplied, setCouponApplied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(response);
      setItems(response.data.items || []);
      setBookInfo(response.data.items || []);
      setCouponApplied(false);
      setAppliedDiscount(0);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const handleRemove = async (bookId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/cart/remove/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateQuantity = async (bookId, newQty) => {
    if (newQty < 1) return;
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8080/cart/update/${bookId}?quantity=${newQty}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setItems(response.data.items); // update items dynamically
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearCart = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete("http://localhost:8080/cart/clear", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems([]);
      setCouponApplied(false);
      setAppliedDiscount(0);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Apply Coupon
  const handleApplyCoupon = async () => {
    if (!couponCode) return alert("Enter coupon code");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:8080/cart/apply-coupon?couponCode=${couponCode}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Fix: calculate applied discount from backend response
      const discount = response.data.items.reduce((sum, item) => {
        const total = item.totalPrice ?? 0;
        const final = item.finalPrice ?? total;
        return sum + (total - final);
      }, 0);

      setAppliedDiscount(discount);
      setCouponApplied(true);
      setItems(response.data.items || []);
      alert(`Coupon applied! You got ₹${discount} off`);
    } catch (err) {
      console.error(err);
      alert("Invalid or expired coupon");
    }
  };

  // ✅ Price calculations
  const subtotal = items.reduce((sum, item) => {
    const unitPrice = item.pricePerUnit ?? Math.round((item.totalPrice ?? 0) / (item.quantity ?? 1));
    const total = item.finalPrice ?? item.totalPrice ?? unitPrice * (item.quantity ?? 0);
    return sum + total;
  }, 0);

  const shipping = subtotal > 500 ? 0 : 49;
  const grandTotal = subtotal - appliedDiscount + shipping;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="max-w-7xl mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
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
            <>
              <div className="mb-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="border p-2 rounded flex-1"
                />
                <button
                  onClick={handleApplyCoupon}
                  disabled={couponApplied}
                  className={`bg-blue-500 text-white px-4 rounded ${
                    couponApplied ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                  }`}
                >
                  {couponApplied ? "Applied" : "Apply"}
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {items.map((item) => {
                  const unitPrice = item.pricePerUnit ?? Math.round((item.totalPrice ?? 0) / (item.quantity ?? 1));
                  const totalPrice = item.finalPrice ?? item.totalPrice ?? unitPrice * (item.quantity ?? 0);

                  return (
                    <div
                      key={item.itemId}
                      className="flex items-center justify-between border-b pb-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.book?.imageUrl}
                          alt={item.book?.title ?? item.bookTitle}
                          className="w-20 h-28 object-cover rounded-lg shadow"
                        />
                        <div>
                          <h3 className="font-medium text-lg">{item.book?.title ?? item.bookTitle}</h3>
                          <p className="text-sm text-gray-500">
                            {item.book?.author} • {item.book?.genre}
                          </p>
                          <p className="text-sm text-gray-600">
                            Price: ₹{unitPrice}
                          </p>
                          <button
                            onClick={() => handleRemove(item.bookId)}
                            className="mt-2 text-red-500 hover:underline text-sm"
                          >
                            <MdDelete className="text-2xl" />
                          </button>
                        </div>
                      </div>

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
                          ₹{totalPrice.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl shadow-md p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="border-t pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>-₹{appliedDiscount}</span>
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
            onClick={async () => {
              if (items.length === 0) {
                alert("Your cart is empty. Add items before checkout.");
                return;
              }
              try {
                const token = localStorage.getItem("token");
                const response = await axios.post(
                  "http://localhost:8080/orders/create",
                  {},
                  { headers: { Authorization: `Bearer ${token}` } }
                );
                navigate(`/order/${response.data.id}`);
              } catch (err) {
                console.error(err);
                alert("Order placement failed. Try again.");
              }
            }}
            className="w-full mt-6 bg-green-500 hover:bg-green-700 text-white py-3 rounded-lg transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
