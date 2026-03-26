import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Sponsors from "./components/Sponsors";
import Categories from "./components/Categories";
import Footer from "./components/Footer";

function App() {
  return (
    <ThemeProvider>
      <div className="bg-black min-h-screen">
        <Navbar />
        <Hero />
        <About />
        <Sponsors />
        <Categories />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;