import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import MainLayout from "./components/MainLayout";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./components/DashboardLayout";
import CreateBlog from "./pages/CreateBlog";
import BlogDetail from "./pages/BlogDetail";
import ManageBlog from "./pages/ManageBlog";
import ContentLayout from "./components/ContentLayout";

function App() {
  return (
    <Routes>
      <Route path="/sign-in" element={<Signin />} />
      <Route path="/sign-up" element={<Signup />} />

      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route element={<ContentLayout />}>
          <Route path="/:slug" element={<BlogDetail />} />
        </Route>
        <Route path="/contact" element={<Contact />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/manage-blog" element={<ManageBlog />} />
      </Route>
    </Routes>
  );
}

export default App;
