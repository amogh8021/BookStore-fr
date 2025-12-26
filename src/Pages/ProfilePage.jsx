import React, { useState } from "react";
import { FaEdit, FaShoppingCart, FaHeart, FaStar, FaTimes } from "react-icons/fa";

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "Amogh Shrivastav",
    email: "amogh@example.com",
    avatar: "https://i.pravatar.cc/150?img=12",
    orders: 12,
    wishlist: 5,
    reviews: 3,
    phone: "+91 9876543210",
    address: "123, My Street, My City, India",
    recentOrders: [
      { id: "#12345", status: "Delivered" },
      { id: "#12346", status: "Processing" },
      { id: "#12347", status: "Shipped" },
    ],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser(formData); // Save changes locally, you can call backend API here
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between shadow-lg">
        <div className="flex items-center space-x-6">
          <img
            src={user.avatar}
            alt="avatar"
            className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-xl"
          />
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-gray-200">{user.email}</p>
          </div>
        </div>
        <button
          className="mt-4 md:mt-0 bg-white text-blue-600 font-semibold px-5 py-2 rounded-xl hover:bg-gray-100 shadow-md flex items-center space-x-2 transition"
          onClick={() => setIsModalOpen(true)}
        >
          <FaEdit /> <span>Edit Profile</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition transform hover:-translate-y-1">
          <div className="flex items-center space-x-4">
            <FaShoppingCart className="text-blue-500 text-2xl" />
            <div>
              <p className="text-gray-400 text-sm">Orders</p>
              <p className="text-xl font-bold">{user.orders}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition transform hover:-translate-y-1">
          <div className="flex items-center space-x-4">
            <FaHeart className="text-pink-500 text-2xl" />
            <div>
              <p className="text-gray-400 text-sm">Wishlist</p>
              <p className="text-xl font-bold">{user.wishlist}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition transform hover:-translate-y-1">
          <div className="flex items-center space-x-4">
            <FaStar className="text-yellow-400 text-2xl" />
            <div>
              <p className="text-gray-400 text-sm">Reviews</p>
              <p className="text-xl font-bold">{user.reviews}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <div className="bg-white mt-8 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Personal Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-400 text-sm">Full Name</p>
            <p className="font-medium text-gray-800">{user.name}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Email</p>
            <p className="font-medium text-gray-800">{user.email}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Phone</p>
            <p className="font-medium text-gray-800">{user.phone}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Address</p>
            <p className="font-medium text-gray-800">{user.address}</p>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white mt-8 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
        <ul className="space-y-3">
          {user.recentOrders.map((order) => (
            <li
              key={order.id}
              className="flex justify-between p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
            >
              <span className="font-medium">{order.id}</span>
              <span
                className={`font-semibold ${
                  order.status === "Delivered"
                    ? "text-green-500"
                    : order.status === "Processing"
                    ? "text-yellow-500"
                    : "text-blue-500"
                }`}
              >
                {order.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 transform transition-all animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Profile</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-gray-500 text-sm">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="text-gray-500 text-sm">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="text-gray-500 text-sm">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="text-gray-500 text-sm">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <button
                onClick={handleSave}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-xl transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tailwind animation */}
      <style>
        {`
          @keyframes fadeIn {
            from {opacity:0; transform: translateY(-10px);}
            to {opacity:1; transform: translateY(0);}
          }
          .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        `}
      </style>
    </div>
  );
};

export default ProfilePage;
