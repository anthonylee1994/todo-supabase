import React from "react";
import {useAuth} from "@/hooks/useAuth";
import {useNavigate} from "react-router-dom";

export const LogoutPage = () => {
    const {signOut} = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        (async () => {
            await signOut();
            navigate("/login");
        })();
    }, [signOut, navigate]);

    return null;
};
