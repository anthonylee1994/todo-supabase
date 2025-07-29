import React from "react";
import {useAuth} from "@/hooks/useAuth";
import {Navigate} from "react-router-dom";

export const LogoutPage = () => {
    const {signOut} = useAuth();

    React.useEffect(() => {
        signOut();
    }, []);

    return <Navigate to="/login" />;
};
