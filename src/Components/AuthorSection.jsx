import { MdOutlineNavigateNext } from "react-icons/md";
import author1 from "./assets/1.jpg";
import author2 from "./assets/2.jpg";
import author3 from "./assets/3.jpg";
import author4 from "./assets/4.jpg";

const authors = [
  { id: 1, name: "James Clear", book: "Atomic Habits", img: author1 },
  { id: 2, name: "Robert Kiyosaki", book: "Rich Dad Poor Dad", img: author2 },
  { id: 3, name: "Arundhati Roy", book: "The God of Small Things", img: author3 },
  { id: 4, name: "Neha Dixit", book: "Bestselling Articles", img: author4 },
  { id: 5, name: "Paulo Coelho", book: "The Alchemist", img: "https://i.pravatar.cc/100?img=5" },
  { id: 6, name: "J.K. Rowling", book: "Harry Potter Series", img: "https://i.pravatar.cc/100?img=6" },
  { id: 7, name: "George Orwell", book: "1984", img: "https://i.pravatar.cc/100?img=7" },
  { id: 8, name: "Haruki Murakami", book: "Kafka on the Shore", img: "https://i.pravatar.cc/100?img=8" },
  { id: 9, name: "Chimamanda Ngozi Adichie", book: "Half of a Yellow Sun", img: "https://i.pravatar.cc/100?img=9" },
  { id: 10, name: "Chetan Bhagat", book: "2 States", img: "https://i.pravatar.cc/100?img=10" },
];


const AuthorSection = () => {
  return (
    <div className="w-full px-6 mt-6 md:mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recommended Authors</h2>

      
      <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-4 no-scrollbar">
        {authors.map((author) => (
          <div
            key={author.id}
            className="flex items-center gap-3 bg-white shadow-md px-4 py-3 rounded-xl
                       cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 min-w-[250px]"
          >
            <img
              src={author.img}
              alt={author.name}
              className="w-12 h-12 rounded-full object-cover shadow-md"
            />

            <div className="flex flex-col">
              <span className="text-gray-800 font-medium">{author.name}</span>
              <span className="text-sm text-gray-500">{author.book}</span>
            </div>

            <MdOutlineNavigateNext className="ml-auto text-gray-500 text-xl" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorSection;
