import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavbar";
import axios from "axios";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8080/book/authors",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response.data); 
        setAuthors(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching authors:", err);
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <h1 className="text-xl font-semibold">Loading authors...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavBar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Listed Authors</h1>

        {authors.length > 0 ? (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-3 border">#</th>
                  <th className="p-3 border">Author Name</th>
                </tr>
              </thead>

              <tbody>
                {authors.map((author, idx) => (
                  <tr
                    key={idx}
                    className="text-center border hover:bg-gray-50 transition"
                  >
                    <td className="p-3 border">{idx + 1}</td>
                    <td className="p-3 border">{author}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-gray-500 italic">
            No authors found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Authors;
