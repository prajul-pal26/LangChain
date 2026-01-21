import { Routes, Route } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
import { BlogsPage } from "@/pages/BlogsPage";
import { BlogPostPage } from "@/pages/BlogPostPage";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DashboardPage } from "@/pages/admin/DashboardPage";
import { BlogListPage } from "@/pages/admin/BlogListPage";
import { BlogEditorPage } from "@/pages/admin/BlogEditorPage";

function App() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blogs/:slug" element={<BlogPostPage />} />

            {/* Admin Routes */}
            <Route path="/blog-generator" element={<AdminLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="blogs" element={<BlogListPage />} />
                <Route path="blogs/new" element={<BlogEditorPage />} />
                <Route path="blogs/edit/:id" element={<BlogEditorPage />} />
            </Route>
        </Routes>
    );
}

export default App;
