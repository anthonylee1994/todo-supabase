import {Route, Routes} from "react-router-dom";
import {IndexPage} from "@/pages/index";
import {RegisterPage} from "@/pages/register";
import {LoginPage} from "@/pages/login";
import {LogoutPage} from "./pages/logout";
import {ProtectedRoute} from "./components/ProtectedRoute";

export const App = () => {
    return (
        <Routes>
            <Route
                element={
                    <ProtectedRoute>
                        <IndexPage />
                    </ProtectedRoute>
                }
                path="/"
            />
            <Route element={<RegisterPage />} path="/register" />
            <Route element={<LoginPage />} path="/login" />
            <Route element={<LogoutPage />} path="/logout" />
        </Routes>
    );
};
