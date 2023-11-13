import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Explore from "./pages/Explore";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import CreateBlog from "./pages/CreateBlog";
import BlogDetail from "./pages/BlogDetail";
import ManageBlog from "./pages/ManageBlog";
import MainLayout from "./components/layouts/MainLayout";
import DashboardLayout from "./components/layouts/DashboardLayout";
import ContentLayout from "./components/layouts/ContentLayout";
import EditBlog from "./pages/EditBlog";
import Category from "./pages/Category";

function App() {
  return (
    <Routes>
      <Route path="/sign-in" element={<Signin />} />
      <Route path="/sign-up" element={<Signup />} />

      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/category/:slug" element={<Category />} />
        <Route element={<ContentLayout />}>
          <Route path="/:slug" element={<BlogDetail />} />
        </Route>
        <Route path="/contact" element={<Contact />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/edit-blog/:id" element={<EditBlog />} />
        <Route path="/manage-blog" element={<ManageBlog />} />
      </Route>
    </Routes>
  );
}

export default App;
