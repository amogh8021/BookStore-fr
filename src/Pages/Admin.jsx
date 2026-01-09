import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavbar";
import AdDashCard from "../Components/AdDashCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";
import { toast } from "react-toastify";

const Admin = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ================= COUNTS =================
  const [ordersCount, setOrdersCount] = useState(0);
  const [newOrdersCount, setNewOrdersCount] = useState(0);
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const [completedOrdersCount, setCompletedOrdersCount] = useState(0);
  const [cancelledOrdersCount, setCancelledOrdersCount] = useState(0);

  const [booksCount, setBooksCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [authorsCount, setAuthorsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  // ================= MODAL =================
  const [modal, setModal] = useState(false);
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    price: "",
    quantity: "",
    imageUrl: "",
    description: ""
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleAddBook = async () => {
    try {
      await axios.post(
        "http://localhost:8080/book/create-book",
        book,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Book added successfully");
      setModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add book");
    }
  };

  // ================= FETCH DASHBOARD DATA =================
  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };

    const fetchDashboardData = async () => {
      try {
        // ===== ORDERS =====
        const orders = await axios.get(
          "http://localhost:8080/orders/all?page=0&size=1",
          { headers }
        );
        setOrdersCount(orders.data.totalElements);

        const newOrders = await axios.get(
          "http://localhost:8080/orders/neworders?page=0&size=1",
          { headers }
        );
        setNewOrdersCount(newOrders.data.totalElements);

        const pending = await axios.get(
          "http://localhost:8080/orders/pending?page=0&size=1",
          { headers }
        );
        setPendingOrdersCount(pending.data.totalElements);

        const completed = await axios.get(
          "http://localhost:8080/orders/completed?page=0&size=1",
          { headers }
        );
        setCompletedOrdersCount(completed.data.totalElements);

        const cancelled = await axios.get(
          "http://localhost:8080/orders/cancelled?page=0&size=1",
          { headers }
        );
        setCancelledOrdersCount(cancelled.data.totalElements);

        // ===== BOOKS =====
        const booksRes = await axios.get(
          "http://localhost:8080/book/list?page=0&size=1",
          { headers }
        );
        setBooksCount(booksRes.data.totalElements);

        // ===== CATEGORIES =====
        try {
          const categoriesRes = await axios.get(
            "http://localhost:8080/book/genres",
            { headers }
          );
          setCategoriesCount(
            Array.isArray(categoriesRes.data) ? categoriesRes.data.length : 0
          );
        } catch (e) {
          console.error("Category fetch error:", e);
        }

        // ===== AUTHORS =====
        try {
          const authorsRes = await axios.get(
            "http://localhost:8080/book/authors",
            { headers }
          );
          setAuthorsCount(
            Array.isArray(authorsRes.data) ? authorsRes.data.length : 0
          );
        } catch (e) {
          console.error("Author fetch error:", e);
        }

        // ===== USERS =====
        const usersRes = await axios.get(
          "http://localhost:8080/api/v1/auth/users?page=0&size=1",
          { headers }
        );
        setUsersCount(usersRes.data.totalElements);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load dashboard data");
      }
    };

    fetchDashboardData();
  }, [token]);

  return (
    <div className="relative">
      <AdminNavBar />

      {/* ================= DASHBOARD ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <AdDashCard title="Total Orders" no={ordersCount} btn="View Details" onClick={() => navigate("/admin/orders/total")} />
        <AdDashCard title="New Orders" no={newOrdersCount} btn="View Details" onClick={() => navigate("/admin/orders/new")} />
        <AdDashCard title="Pending Orders" no={pendingOrdersCount} btn="View Details" onClick={() => navigate("/admin/orders/pending")} />
        <AdDashCard title="Cancelled Orders" no={cancelledOrdersCount} btn="View Details" onClick={() => navigate("/admin/orders/cancelled")} />
        <AdDashCard title="Completed Orders" no={completedOrdersCount} btn="View Details" onClick={() => navigate("/admin/orders/completed")} />
        <AdDashCard title="Listed Books" no={booksCount} btn="View Details" onClick={() => navigate("/admin/books")} />
        <AdDashCard title="Listed Categories" no={categoriesCount} btn="View Details" onClick={()=>navigate("/admin/genres")}/>
        <AdDashCard title="Listed Authors" no={authorsCount} btn="View Details" onClick={()=>navigate("/admin/authors")} />
        <AdDashCard title="Registered Users" no={usersCount} btn="View Details" onClick={() => navigate("/admin/users")} />
      </div>

      {/* ================= FLOATING ADD BUTTON ================= */}
      <button
        onClick={() => setModal(true)}
        className="fixed bottom-6 right-6 text-blue-600 hover:scale-110 transition"
      >
        <FaCirclePlus size={60} />
      </button>

      {/* ================= MODAL ================= */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] md:w-[500px] rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Add New Book</h2>

            <div className="space-y-3">
              <input name="title" placeholder="Title" onChange={handleChange} className="w-full border p-2 rounded" />
              <input name="author" placeholder="Author" onChange={handleChange} className="w-full border p-2 rounded" />
              <input name="genre" placeholder="Genre" onChange={handleChange} className="w-full border p-2 rounded" />
              <input name="price" placeholder="Price" onChange={handleChange} className="w-full border p-2 rounded" />
              <input name="quantity" placeholder="Quantity" onChange={handleChange} className="w-full border p-2 rounded" />
              <input name="imageUrl" placeholder="Image URL" onChange={handleChange} className="w-full border p-2 rounded" />
              <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full border p-2 rounded" />
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button onClick={() => setModal(false)} className="px-4 py-2 bg-gray-300 rounded">
                Cancel
              </button>
              <button onClick={handleAddBook} className="px-4 py-2 bg-blue-600 text-white rounded">
                Add Book
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
