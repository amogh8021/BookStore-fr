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

  const [modal, setModal] = useState(false);

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

        const booksRes = await axios.get(
  "http://localhost:8080/book/list?page=0&size=1"
);

setBooksCount(booksRes.data.totalElements);


        // ===== CATEGORIES =====
        const categoriesRes = await axios.get(
          "http://localhost:8080/book/genres"
        );
        setCategoriesCount(categoriesRes.data.length);

        // ===== AUTHORS =====
        const authorsRes = await axios.get(
          "http://localhost:8080/book/authors"
        );
        setAuthorsCount(authorsRes.data.length);

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
        <AdDashCard title="Listed Categories" no={categoriesCount} btn="View Details" onClick={() => navigate("/admin/categories")} />
        <AdDashCard title="Listed Authors" no={authorsCount} btn="View Details" onClick={() => navigate("/admin/authors")} />
        <AdDashCard title="Registered Users" no={usersCount} btn="View Details" onClick={() => navigate("/admin/users")} />
      </div>

      {/* ================= FLOATING ADD BUTTON ================= */}
      <button
        onClick={() => setModal(true)}
        className="fixed bottom-6 right-6 text-blue-600 hover:scale-110 transition"
      >
        <FaCirclePlus size={60} />
      </button>
    </div>
  );
};

export default Admin;
