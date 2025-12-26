import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import AuthorSection from "./AuthorSection";
import Recommendation from "./Recommendation";
import CaategorySection from "./CaategorySection";
import FeaturedBooks from "./FeaturedBooks";
import BestSellers from "./BestSellers";
import Offers from "./Offers";
import Services from "./Services";
import Testimonials from "./Testimonials";
import Newsletter from "./NewsLetter";
import Footer from "./Footer";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

import img1 from "./assets/bookst.jpg";
import img2 from "./assets/bookst1.jpg";
import img3 from "./assets/bookst2.jpg";
import img4 from "./assets/bookst1.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="container flex p-8 gap-4 md:mx-auto h-full px-6">
        <div className="left flex flex-col max-w-xl">
          <h1 className="font-light font-serif text-gray-700 text-5xl leading-tight tracking-wide">
            Find Your <br /> Next Book
          </h1>

          <h2 className="hidden md:flex font-light text-xl leading-tight tracking-wide text-gray-700 mt-4">
            Discover a world where every page brings a new adventure.
            <br /> At AmoghStore, we curate a diverse collection of books.
          </h2>

          <button
            onClick={() => navigate("/shop")}
            className="hidden md:flex items-center justify-center bg-[#AD7D42] h-10 w-60 text-white p-5 align-middle rounded-2xl tracking-wide leading-tight mt-6"
          >
            Explore Now <IoIosArrowRoundForward className="ml-2 text-2xl" />
          </button>
        </div>

        {/* Swiper Hero Banner */}
        <div className="swiper w-full">
          <Swiper
            modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
            pagination={true}
            spaceBetween={20}
            loop={true}
            autoplay={{ delay: 1000, disableOnInteraction: false }}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 2,
                coverflowEffect: {
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                },
              },
              1024: {
                slidesPerView: 3,
                coverflowEffect: {
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                },
              },
            }}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            className="w-full h-74 md:w-180"
          >
            {[img1, img2, img3, img4].map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img}
                  alt={`Book ${idx + 1}`}
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Mobile Content */}
      <div className="content px-8">
        <h2 className="font-light text-xl leading-tight tracking-wide text-gray-700 mt-2 md:hidden">
          Discover a world where every page brings a new adventure.
          <br /> At AmoghStore, we curate a diverse collection of books.
        </h2>

        <button
          onClick={() => navigate("/shop")}
          className="md:hidden flex items-center justify-center bg-[#AD7D42] h-10 w-full text-white align-middle rounded-2xl tracking-wide leading-tight mt-6"
        >
          Explore Now <IoIosArrowRoundForward className="ml-2 text-xl" />
        </button>
      </div>

      <AuthorSection />
      <Recommendation />
      <CaategorySection />
      <FeaturedBooks />
      <BestSellers />
      <Offers />
      <Services />
      <Testimonials />
      <Newsletter />
      <Footer />
    </>
  );
};

export default HeroSection;
