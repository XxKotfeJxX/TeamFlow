import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";

const blogPosts = [
  {
    id: 1,
    title: "5 способів уникнути хаосу в командній роботі",
    date: "10 жовтня 2025",
    excerpt:
      "Як структурувати завдання, комунікацію і планування, щоб команда працювала як єдиний механізм.",
    image: "https://source.unsplash.com/800x500/?teamwork,office",
  },
  {
    id: 2,
    title: "Як ми створили календар з подвійним рівнем доступу",
    date: "25 вересня 2025",
    excerpt:
      "Ділимося досвідом розробки системи, де особисті події не конфліктують із командними.",
    image: "https://source.unsplash.com/800x500/?calendar,planning",
  },
  {
    id: 3,
    title: "TeamFlow + GitHub: перша інтеграція вже працює",
    date: "3 вересня 2025",
    excerpt:
      "Тепер ти можеш бачити статус комітів і pull requests прямо у своєму командному просторі.",
    image: "https://source.unsplash.com/800x500/?code,developer",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-12 text-center">Блог</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col"
            >
              <img src={post.image} alt={post.title} className="h-48 w-full object-cover" />
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-500 text-sm mb-3">{post.date}</p>
                <p className="text-gray-700 flex-1">{post.excerpt}</p>
                <Button
                  className="mt-4"
                  variant="default"
                  onClick={() => alert("Тут буде детальна сторінка блогу")}
                >
                  Читати далі
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
