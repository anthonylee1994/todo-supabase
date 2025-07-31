import {useAuth} from "@/hooks/useAuth";
import {Spinner} from "@heroui/react";
import React from "react";
import {Navigate} from "react-router-dom";

interface Props {
    children: React.ReactNode;
}

export const ProtectedRoute = ({children}: Props) => {
    const {session, loading, initialized} = useAuth();

    if (!initialized || loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }

    if (!session) {
        return <Navigate to="/login" replace />;
    }

    return <React.Fragment>{children}</React.Fragment>;
};
