import React from "react";
import { BookOpen, ShieldCheck, Code2, Sparkles } from "lucide-react";
import NavBar from "../Components/NavBar";

/* -------------------- REUSABLE COMPONENTS -------------------- */

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition text-center">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </div>
);

const InfoCard = ({ title, content }) => (
  <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition">
    <h3 className="text-2xl font-semibold mb-3 text-blue-600">{title}</h3>
    <p className="text-gray-700 leading-relaxed">{content}</p>
  </div>
);

/* -------------------- MAIN PAGE -------------------- */

const AboutPage = () => {
  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-6 py-12">
        {/* HERO SECTION */}
        <section className="max-w-5xl mx-auto text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            A Modern Online Bookstore <br />
            <span className="text-blue-600">Built for Real Users</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            This bookstore is a full-stack application designed to deliver a smooth,
            secure, and enjoyable book-buying experience — from browsing to checkout.
          </p>
        </section>

        {/* VALUE PROPOSITION */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <FeatureCard
            icon={<BookOpen className="w-8 h-8 text-blue-600" />}
            title="Reader-First Design"
            desc="Clean UI, fast navigation, and smart search so users find books without friction."
          />
          <FeatureCard
            icon={<ShieldCheck className="w-8 h-8 text-blue-600" />}
            title="Secure & Scalable"
            desc="JWT authentication, role-based access, and backend architecture designed to scale."
          />
          <FeatureCard
            icon={<Code2 className="w-8 h-8 text-blue-600" />}
            title="Production-Grade Stack"
            desc="Built using industry-relevant tools with real-world best practices."
          />
        </section>

        {/* MISSION & VISION */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
          <InfoCard
            title="Project Mission"
            content="To build a real-world e-commerce bookstore that demonstrates strong backend logic, clean frontend architecture, and secure user flows."
          />
          <InfoCard
            title="Project Vision"
            content="To evolve this project into a feature-rich, scalable platform while continuously improving performance, UX, and maintainability."
          />
        </section>

        {/* DEVELOPER SECTION */}
        <section className="max-w-4xl mx-auto mb-24">
          <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
            <img
              src="https://i.pravatar.cc/200?img=3"
              alt="Developer"
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover ring-4 ring-blue-100"
            />

            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Amogh Shrivastav
            </h2>
            <p className="text-blue-600 font-medium mb-4">
              Full-Stack Developer • Spring Boot & React
            </p>

            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
              I built this bookstore as a serious full-stack project to simulate
              real-world development scenarios. It focuses on backend correctness,
              API design, authentication, and a responsive frontend — not just visuals.
            </p>

            {/* TECH STACK */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {[
                "Spring Boot",
                "JWT Security",
                "React",
                "REST APIs",
                "MySQL",
                "Tailwind CSS",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-blue-50 text-blue-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="inline-flex items-center gap-2 mb-4 text-blue-600">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">Still Improving</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Open to Feedback & Opportunities
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            This project is actively evolving. I’m open to collaboration, feedback,
            and professional opportunities.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-10 rounded-2xl transition shadow-lg">
            Contact Me
          </button>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
