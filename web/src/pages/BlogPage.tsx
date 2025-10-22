import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/Button";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/slick-custom.css";

const blogPosts = [
  {
    id: 1,
    title: "5 способів уникнути хаосу в командній роботі",
    date: "10 жовтня 2025",
    excerpt:
      "Як структурувати завдання, комунікацію і планування, щоб команда працювала як єдиний механізм.",
    image: "/images/Dashboard.png",
    path: "/blog/teamwork",
  },
  {
    id: 2,
    title: "Як ми створили календар з подвійним рівнем доступу",
    date: "25 вересня 2025",
    excerpt:
      "Ділимося досвідом розробки системи, де особисті події не конфліктують із командними.",
    image: "/images/calendar.png",
    path: "/blog/calendar-access",
  },
  {
    id: 3,
    title: "TeamFlow + GitHub: перша інтеграція вже працює",
    date: "3 вересня 2025",
    excerpt:
      "Тепер ти можеш бачити статус комітів і pull requests прямо у своєму командному просторі.",
    image: "/images/github.jpg",
    path: "/blog/github-integration",
  },
  {
    id: 4,
    title: "Психологія фокусування: як не відволікатись у команді",
    date: "1 серпня 2025",
    excerpt:
      "Ми дослідили як глибокий фокус допомагає командам працювати швидше та якісніше.",
    image: "/images/focus.jpg",
    path: "/blog/focus",
  },
];

export default function BlogPage() {
  const navigate = useNavigate();

  const sliderSettings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: "20px",
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 2, centerPadding: "16px" },
      },
      { breakpoint: 768, settings: { slidesToShow: 1, centerPadding: "0px" } },
    ],
  };

  const renderCard = (post: (typeof blogPosts)[0]) => (
    <div
      key={post.id}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1 
                 overflow-hidden flex flex-col justify-between my-6 min-h-[520px] h-full"
    >
      <img
        src={post.image}
        alt={post.title}
        className="h-56 w-full object-cover"
        loading="lazy"
      />

      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold mb-2 text-gray-900 line-clamp-2">
          {post.title}
        </h2>
        <p className="text-gray-500 text-sm mb-3">{post.date}</p>
        <p className="text-gray-700 flex-grow line-clamp-3">{post.excerpt}</p>

        <div className="mt-4">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => navigate(post.path)}
          >
            Читати далі
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      <main className="w-full max-w-7xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-4 text-center">Блог</h1>

        {blogPosts.length > 3 ? (
          <div className="w-full overflow-hidden pb-12">
            <Slider {...sliderSettings} className="custom-slick-slider">
              {blogPosts.map((post) => renderCard(post))}
            </Slider>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogPosts.map((post) => renderCard(post))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
