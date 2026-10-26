import { useEffect, useState } from "react";
import Home from "./Pages/Home";
import ProductionPage from "./Pages/Production";
import TrainingPage from "./Pages/Training";
import TeamPage from "./Pages/Team";
import ContactPage from "./Pages/Contact";
import "./App.css";
import Navbar from "./Sections/navbar/Navbar";
import Footer from "./Sections/footer/Footer";

const interiorRoutes = {
  "/production": "production",
  "/training": "training",
  "/team": "team",
  "/contact": "contact",
} as const;

export default function App() {
  const [pathname, setPathname] = useState(
    window.location.pathname.replace(/\/+$/, "") || "/",
  );

  useEffect(() => {
    const updatePathname = () =>
      setPathname(window.location.pathname.replace(/\/+$/, "") || "/");
    window.addEventListener("popstate", updatePathname);
    return () => window.removeEventListener("popstate", updatePathname);
  }, []);

  const page = interiorRoutes[pathname as keyof typeof interiorRoutes];
  if (!page) return <Home />;

  const renderInteriorPage = () => {
    switch (page) {
      case "production":
        return <ProductionPage />;
      case "training":
        return <TrainingPage />;
      case "team":
        return <TeamPage />;
      case "contact":
        return <ContactPage />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="site-shell">
      <Navbar />
      {renderInteriorPage()}
      <Footer />
    </div>
  );
}
