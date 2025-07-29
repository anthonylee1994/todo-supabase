import {useAuth} from "@/hooks/useAuth";
import DefaultLayout from "@/layouts/default";
import React from "react";
import {useNavigate} from "react-router-dom";

export const IndexPage = () => {
    const {session, loading} = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!loading && !session) {
            navigate("/login");
        }
    }, [session, loading, navigate]);

    return <DefaultLayout>123</DefaultLayout>;
};
