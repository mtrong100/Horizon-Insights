import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import MainLayout from "./components/MainLayout";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./components/DashboardLayout";
import { AuthProvider } from "./context/AuthContext";
import CreateBlog from "./pages/CreateBlog";
import BlogDetail from "./pages/BlogDetail";

function App() {
  return (
    <Routes>
      <Route path="/sign-in" element={<Signin />} />
      <Route path="/sign-up" element={<Signup />} />

      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/:slug" element={<BlogDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-blog" element={<CreateBlog />} />
      </Route>
    </Routes>
  );
}

export default App;
