import React, { useEffect, useState } from "react";
import { Heart, ShoppingBag, Package, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/auth/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setName(data.name);
      });
  }, []);

  const updateProfile = async () => {
    await fetch("http://localhost:8080/api/v1/auth/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ name }),
    });
    setUser({ ...user, name });
    setOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">

    
      <div className="bg-white rounded-3xl p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-6">
          <img
            src={`https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff`}
            className="w-28 h-28 rounded-full border-4 border-indigo-100"
          />

          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>
            <span className="inline-block mt-2 px-4 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm">
              {user.role}
            </span>
          </div>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
        >
          <Pencil size={18} /> Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <Card title="My Orders" icon={<Package />} onClick={() => navigate("/cart")} />
        <Card title="Wishlist" icon={<Heart />} onClick={() => navigate("/wishlist")} />
        <Card title="Cart" icon={<ShoppingBag />} onClick={() => navigate("/cart")} />
      </div>

      {/* ===== EDIT MODAL ===== */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

            <input
              className="w-full border rounded-lg p-2 mb-4"
              value={name}
              onChange={e => setName(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button onClick={() => setOpen(false)} className="px-4 py-2 border rounded">
                Cancel
              </button>
              <button onClick={updateProfile} className="px-4 py-2 bg-indigo-600 text-white rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Card = ({ title, icon, onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer bg-white rounded-2xl p-6 shadow hover:shadow-xl transition"
  >
    <div className="text-indigo-600 mb-4">{icon}</div>
    <h3 className="text-lg font-semibold">{title}</h3>
  </div>
);

export default UserDashboard;
