import {useEffect} from "react";
import {useAuthStore} from "@/stores/useAuthStore";

/**
 * Custom hook to initialize and use auth state
 * This hook should be used at the app level to initialize auth
 */
export const useAuth = () => {
    const {initialize, ...authState} = useAuthStore();

    useEffect(() => {
        initialize();
    }, [initialize]);

    return authState;
};

/**
 * Hook to get auth state without initialization
 * Use this in components that don't need to initialize auth
 */
export const useAuthState = () => {
    const {initialize, ...authState} = useAuthStore();
    return authState;
};
