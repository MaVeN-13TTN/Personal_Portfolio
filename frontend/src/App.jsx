import { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import FilterProvider from "./contexts/FilterContext";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import ProjectDetails from "./components/projects/ProjectDetails";
import Certifications from "./components/Certifications";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import DynamicBackground from "./components/shared/DynamicBackground";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (error?.response?.status === 404) return false;
        return failureCount < 2;
      },
      staleTime: 300000, // 5 minutes
      cacheTime: 600000, // 10 minutes
    },
  },
});

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.3,
};

// Separate component for animated routes
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
        className="flex-grow"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route
            path="/certifications"
            element={
              <Suspense
                fallback={
                  <div className="flex items-center justify-center min-h-[50vh]">
                    <div className="text-xl text-orange-peel">
                      Loading certifications...
                    </div>
                  </div>
                }
              >
                <Certifications />
              </Suspense>
            }
          />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center min-h-[50vh]">
                <h1 className="text-2xl text-orange-peel">Page not found</h1>
              </div>
            }
          />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FilterProvider>
        <Router>
          <DynamicBackground>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow container mx-auto px-4 py-8">
                <AnimatedRoutes />
              </main>
              <Footer />
            </div>
          </DynamicBackground>
        </Router>
      </FilterProvider>
    </QueryClientProvider>
  );
}

export default App;
