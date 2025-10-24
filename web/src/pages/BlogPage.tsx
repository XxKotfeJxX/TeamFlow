// src/pages/BlogPage.tsx
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/Button";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/slick-custom.css";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "../components/useTranslations";

export default function BlogPage() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useTranslation();
  const tb = t("blog");

  // 🔹 Визначення мобільного режиму
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: tb("post1Title"),
      date: tb("post1Date"),
      excerpt: tb("post1Excerpt"),
      image: "images/Dashboard.png",
      path: "/blog/teamwork",
    },
    {
      id: 2,
      title: tb("post2Title"),
      date: tb("post2Date"),
      excerpt: tb("post2Excerpt"),
      image: "images/calendar.png",
      path: "/blog/calendar-access",
    },
    {
      id: 3,
      title: tb("post3Title"),
      date: tb("post3Date"),
      excerpt: tb("post3Excerpt"),
      image: "images/github.jpg",
      path: "/blog/github-integration",
    },
    {
      id: 4,
      title: tb("post4Title"),
      date: tb("post4Date"),
      excerpt: tb("post4Excerpt"),
      image: "images/focus.jpg",
      path: "/blog/focus",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: "40px",
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, centerPadding: "20px" },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          adaptiveHeight: true,
        },
      },
    ],
  };

  const renderCard = (post: (typeof blogPosts)[0]) => (
    <motion.div
      key={post.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white/70 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl transition-transform hover:-translate-y-1 
                 overflow-hidden flex flex-col justify-between mx-auto w-[90%] sm:w-[300px] md:w-[320px] lg:w-[340px]"
    >
      <img
        src={post.image}
        alt={post.title}
        className="h-52 sm:h-56 w-full object-cover"
        loading="lazy"
      />

      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900 line-clamp-2">
          {post.title}
        </h2>
        <p className="text-gray-500 text-sm mb-3">{post.date}</p>
        <p className="text-gray-700 flex-grow text-sm sm:text-base line-clamp-3">
          {post.excerpt}
        </p>

        <div className="mt-4">
          <Button
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 transition-transform hover:scale-[1.02]"
            onClick={() => navigate(post.path)}
          >
            {tb("readMore")}
          </Button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      <Header />
      <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-50 to-gray-50 text-gray-800">
        {/* Градієнтні бліки позаду */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
        </motion.div>

        <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-24">
          {/* Hero */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-10"
          >
            {tb("title")}
          </motion.h1>

          {/* Cards / Slider */}
          {isMobile ? (
            <div className="flex flex-col items-center gap-8">
              {blogPosts.map((post) => renderCard(post))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="pb-12"
            >
              <Slider {...sliderSettings} className="custom-slick-slider">
                {blogPosts.map((post) => renderCard(post))}
              </Slider>
            </motion.div>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}
