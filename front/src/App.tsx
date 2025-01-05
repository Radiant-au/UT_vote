import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import { AuthCodePage } from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
import {
  ProtectedAdminLayout,
  ProtectedCodeLayout,
} from "./layout/ProtectedLayout";
import { useEffect, useState, Suspense } from "react";
import Loader from "./common/Loader";
import AdminLogin from "./pages/AdminLogin";

const App = () => {
  const { isCodeAuthenticated, isAdminAuthenticated } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if(loading){
    return <Loader />;
  }

  
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Login Pages */}
        <Route path="/login/code" element={isCodeAuthenticated ? <Navigate to="/" /> : <AuthCodePage/>} />
        <Route path="/login/admin" element={isAdminAuthenticated ? <Navigate to="/admin" /> : <AdminLogin/>} />
        {/* <Route path="/login/admin" element={<AdminLoginPage />} /> */}

        {/* Add all code protected routes here */}
        <Route element={<ProtectedCodeLayout />}>
          <Route path="/" element={<MainPage />} />
        </Route>

        {/* Add all admin protected routes here */}
        <Route element={<ProtectedAdminLayout />}>
          <Route path="/admin" element={<h1 className="text-2xl text-red-500">THis is admin</h1>} />
        </Route>

        <Route path="*" element={<Navigate to='/' />} />
      </Routes>
    </Suspense>
  );
};

export default App;
