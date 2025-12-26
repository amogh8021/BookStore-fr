import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavBar from "./AdminNavbar";
import { toast } from "react-toastify";
import { FaTrash, FaStar } from "react-icons/fa";

const ListedBooks = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 5;

  const token = localStorage.getItem("token");

  /* ================= FETCH BOOKS ================= */
  const fetchBooks = async (pageNumber = 0) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/book/list?page=${pageNumber}&size=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBooks(response.data.content);
      setPage(response.data.number);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      toast.error("Unable to fetch books");
    }
  };

  useEffect(() => {
    fetchBooks(0);
  }, []);

  /* ================= DELETE BOOK ================= */
  const handleDelete = async (bookId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:8080/book/delete/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Book deleted successfully");
      fetchBooks(page);
    } catch (err) {
      toast.error("Failed to delete book");
    }
  };

  /* ================= FEATURED TOGGLE ================= */
  const toggleFeatured = async (bookId, currentStatus) => {
    try {
      await axios.put(
        `http://localhost:8080/book/${bookId}/featured?featured=${!currentStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        !currentStatus
          ? "Book marked as featured ⭐"
          : "Book removed from featured"
      );

      fetchBooks(page);
    } catch (err) {
      toast.error("Unable to update featured status");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavBar />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Listed Books
        </h1>

        {/* ================= TABLE ================= */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3 border">Title</th>
                <th className="p-3 border">Author</th>
                <th className="p-3 border">Genre</th>
                <th className="p-3 border">Price</th>
                <th className="p-3 border">Qty</th>
                <th className="p-3 border">Published</th>
                <th className="p-3 border">Featured</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>

            <tbody>
              {books.length > 0 ? (
                books.map((book) => (
                  <tr
                    key={book.id}
                    className="text-center border hover:bg-gray-50"
                  >
                    <td className="p-3 border font-semibold">
                      {book.title}
                    </td>
                    <td className="p-3 border">{book.author}</td>
                    <td className="p-3 border">{book.genre}</td>
                    <td className="p-3 border">₹{book.price}</td>
                    <td className="p-3 border">{book.quantity}</td>
                    <td className="p-3 border">
                      {book.publishedDate
                        ? new Date(book.publishedDate).toLocaleDateString()
                        : "N/A"}
                    </td>

                    {/* ===== FEATURED ===== */}
                    <td className="p-3 border">
                      <button
                        onClick={() =>
                          toggleFeatured(book.id, book.featured)
                        }
                        className={`p-2 rounded-full transition-all duration-200 ${
                          book.featured
                            ? "bg-yellow-400 text-white"
                            : "bg-gray-200 text-gray-600"
                        } hover:scale-110`}
                        title="Toggle Featured"
                      >
                        <FaStar />
                      </button>
                    </td>

                    {/* ===== ACTIONS ===== */}
                    <td className="p-3 border">
                      <button
                        onClick={() => handleDelete(book.id)}
                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                        title="Delete Book"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center p-6 text-gray-500 italic"
                  >
                    No books found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ================= PAGINATION ================= */}
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={() => fetchBooks(page - 1)}
            disabled={page === 0}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="font-medium">
            Page {page + 1} of {totalPages}
          </span>

          <button
            onClick={() => fetchBooks(page + 1)}
            disabled={page + 1 === totalPages}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListedBooks;
