import React from "react";

const Offers = () => {
  return (
    <div className="bg-[#F5F2ED] py-12 px-6 rounded-xl mx-8 my-12 shadow">
      <h2 className="text-2xl font-bold text-center mb-6">🎉 Special Offers</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow hover:scale-105 transition">
          <h3 className="font-semibold text-lg">Buy 2 Get 1 Free</h3>
          <p className="text-gray-600 mt-2">On selected bestsellers.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:scale-105 transition">
          <h3 className="font-semibold text-lg">Flat 30% Off</h3>
          <p className="text-gray-600 mt-2">On all Self-Help books.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:scale-105 transition">
          <h3 className="font-semibold text-lg">Free Shipping</h3>
          <p className="text-gray-600 mt-2">On orders above ₹999.</p>
        </div>
      </div>
    </div>
  );
};

export default Offers;
