import React from 'react'

// Example images (tumhare paas jo imports hain unhe use kar lo)
import history from "./assets/history.jpg"
import scienceFiction from "./assets/scienceFiction.jpg"
import self from "./assets/self.jpg"
import kids from "./assets/kids.jpg"
import comics from "./assets/comics.jpg"
import fiction from "./assets/image.png"
import nonfiction from "./assets/non-fiction.png"
import tech from "./assets/tech.webp" 
import bio from "./assets/bio.webp" 
import romance from "./assets/romance.webp" 
import Fantasy from "./assets/fantasy.webp" 
import mystery from "./assets/mystrery.jpeg"
import poetry from "./assets/poetry.jpg"


const categories = [
  { id: 1, name: "Fiction", img: fiction },
  { id: 2, name: "Non-Fiction", img: nonfiction },
  { id: 3, name: "Science & Technology", img: tech },
  { id: 4, name: "Biographies", img: bio },
  { id: 5, name: "Self-Help", img: self },
  { id: 6, name: "Children's Books", img: kids },
  { id: 7, name: "History", img: history },
  { id: 8, name: "Romance", img: romance },
  { id: 9, name: "Fantasy", img: Fantasy },
  { id: 10, name: "Mystery & Thriller", img: mystery },
  { id: 11, name: "Comics & Graphic Novels", img: comics },
  { id: 12, name: "Poetry", img: poetry }
];

const CategorySection = () => {
  return (
    <div className="p-8">
      {/* Heading */}
      <div className="heading mb-6">
        <h1 className="text-2xl font-semibold">Categories</h1>
      </div>

      {/* Horizontal Scroll like Author Section */}
      <div className="flex space-x-6 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <div 
            key={cat.id} 
            className="flex-shrink-0 w-40 border rounded-lg shadow hover:shadow-lg transition"
          >
            <img 
              src={cat.img} 
              alt={cat.name} 
              className="w-full h-28 object-cover rounded-t-lg"
            />
            <h2 className="text-center text-sm font-semibold py-2">
              {cat.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategorySection
