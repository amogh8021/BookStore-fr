import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineClose, AiOutlineFilter } from "react-icons/ai";
import NavBar from "../Components/NavBar";

const ShopPage = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const size = 12;

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [sortBy, setSortBy] = useState("title");
  const [direction, setDirection] = useState("asc");

  const genresList = ["Self-help", "Fiction", "Productivity", "Finance"];
  const authorsList = ["James Clear", "Paulo Coelho", "Cal Newport", "Robert Kiyosaki"];

  // Fetch books from backend
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const params = { page, size, sortBy, direction };
      if (selectedGenre) params.genre = selectedGenre;
      if (selectedAuthor) params.author = selectedAuthor;
      if (searchTerm) params.title = searchTerm;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;

      const res = await axios.get("http://localhost:8080/book/search", { params });
      setBooks(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching books:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch books whenever filters/search/sort/page changes
  useEffect(() => {
    fetchBooks();
  }, [selectedGenre, selectedAuthor, searchTerm, minPrice, maxPrice, page, sortBy, direction]);

  return (
  <>
   <NavBar/>
    <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row p-4 md:p-12 gap-6">
       



      {/* ===== Sidebar Filters ===== */}
      <div className={`bg-white p-4 rounded-lg shadow-md md:w-64 flex-shrink-0 transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} md:block fixed md:relative top-0 left-0 h-full z-50`}>
        <div className="flex justify-between md:hidden mb-4">
          <h2 className="font-bold text-lg">Filters</h2>
          <button onClick={() => setSidebarOpen(false)}><AiOutlineClose size={20} /></button>
        </div>

        {/* Genre */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Genres</h3>
          <div className="flex flex-wrap gap-2">
            {genresList.map((g) => (
              <div
                key={g}
                onClick={() => { setSelectedGenre(g === selectedGenre ? "" : g); setPage(0); }}
                className={`px-3 py-1 rounded-full text-sm cursor-pointer border transition-colors ${
                  selectedGenre === g ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
                }`}
              >
                {g}
              </div>
            ))}
          </div>
        </div>

        {/* Author */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Authors</h3>
          <div className="flex flex-wrap gap-2">
            {authorsList.map((a) => (
              <div
                key={a}
                onClick={() => { setSelectedAuthor(a === selectedAuthor ? "" : a); setPage(0); }}
                className={`px-3 py-1 rounded-full text-sm cursor-pointer border transition-colors ${
                  selectedAuthor === a ? "bg-green-600 text-white border-green-600" : "bg-white text-gray-700 border-gray-300 hover:bg-green-100"
                }`}
              >
                {a}
              </div>
            ))}
          </div>
        </div>

        {/* Price */}
        <div>
          <h3 className="font-semibold mb-2">Price</h3>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => { setMinPrice(e.target.value); setPage(0); }}
              className="border rounded px-2 py-1 w-20 focus:outline-none"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => { setMaxPrice(e.target.value); setPage(0); }}
              className="border rounded px-2 py-1 w-20 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* ===== Main Content ===== */}
      <div className="flex-1">
        {/* Mobile Filter Toggle */}
        <div className="flex md:hidden justify-between mb-4 gap-2">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
            className="border rounded-lg px-3 py-2 w-full focus:outline-none"
          />
          <button onClick={() => setSidebarOpen(true)} className="px-3 py-2 bg-blue-600 text-white rounded-lg">
            <AiOutlineFilter size={20} />
          </button>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
            className="border rounded-lg px-3 py-2 w-full md:w-96 focus:outline-none"
          />

          {/* Sorting */}
          <div className="flex items-center gap-2">
            <span className="font-semibold">Sort by:</span>
            <select
              className="border rounded px-2 py-1 focus:outline-none"
              value={`${sortBy}-${direction}`}
              onChange={(e) => {
                const [s, d] = e.target.value.split("-");
                setSortBy(s);
                setDirection(d);
                setPage(0);
              }}
            >
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="title-asc">Title: A → Z</option>
              <option value="title-desc">Title: Z → A</option>
            </select>
          </div>
        </div>

        {/* Book Grid */}
        {loading ? (
          <p className="text-center mt-10">Loading books...</p>
        ) : books.length === 0 ? (
          <p className="text-center mt-10 text-gray-500">No books found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {books.map((book) => (
              <div
                key={book.id}
                onClick={() => setSelectedBook(book)}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden hover:scale-[1.02] flex flex-col"
              >
                <img src={book.imageUrl} alt={book.title} className="w-full h-40 object-cover" />
                <div className="p-3 flex flex-col">
                  <h2 className="text-sm font-semibold text-gray-800 line-clamp-2">{book.title}</h2>
                  <p className="text-gray-500 text-xs">by {book.author}</p>
                  <p className="text-green-600 font-semibold text-sm mt-auto">₹{book.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-6 gap-3">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            disabled={page === 0}
          >
            Prev
          </button>
          <span className="px-4 py-2 font-semibold">
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            disabled={page + 1 >= totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 relative p-6 animate-fadeIn">
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
            >
              <AiOutlineClose size={22} />
            </button>
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={selectedBook.imageUrl}
                alt={selectedBook.title}
                className="w-full md:w-1/3 h-64 object-cover rounded-xl"
              />
              <div className="flex flex-col flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedBook.title}</h2>
                <p className="text-gray-600 mb-1 font-medium">by {selectedBook.author}</p>
                <p className="text-gray-500 text-sm mb-3">{selectedBook.genre}</p>
                <p className="text-gray-700 mb-4">{selectedBook.description}</p>
                <h3 className="text-green-600 text-xl font-semibold mb-4">₹{selectedBook.price}</h3>
                <button className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition-all duration-200">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
    </>
  );
};

export default ShopPage;
