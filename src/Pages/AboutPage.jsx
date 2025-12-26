import React from "react";

const teamMembers = [
  {
    name: "James Clear",
    role: "Author",
    img: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Alice Johnson",
    role: "Frontend Developer",
    img: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Robert Smith",
    role: "Backend Developer",
    img: "https://i.pravatar.cc/150?img=3",
  },
  {
    name: "Emily Davis",
    role: "UI/UX Designer",
    img: "https://i.pravatar.cc/150?img=4",
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Our Project</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Welcome to our Bookstore Project! This platform is designed to help book lovers explore, discover, and purchase books easily. Our mission is to create a seamless and enjoyable reading experience for everyone.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold mb-3 text-blue-600">Our Mission</h2>
          <p className="text-gray-700">
            To make books accessible to everyone and create a seamless experience for readers and authors alike.
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold mb-3 text-blue-600">Our Vision</h2>
          <p className="text-gray-700">
            To become the most user-friendly online bookstore, inspiring a love for reading worldwide.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition flex flex-col items-center text-center"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Call to Action */}
      <div className="text-center mt-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Join Us in Our Journey</h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-6">
          We are constantly improving our platform and looking for passionate individuals to join us. Together, we can create something amazing for the reading community.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-xl transition">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default AboutPage;
