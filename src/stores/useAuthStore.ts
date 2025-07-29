import {create} from "zustand";
import {Session, User} from "@supabase/supabase-js";
import {supabase} from "@/utils/supabase";

interface AuthState {
    session: Session | null;
    user: User | null;
    loading: boolean;
    initialized: boolean;
    setSession: (session: Session | null) => void;
    setLoading: (loading: boolean) => void;
    setInitialized: (initialized: boolean) => void;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    session: null,
    user: null,
    loading: true,
    initialized: false,

    setSession: session => {
        set({
            session,
            user: session?.user || null,
            loading: false,
        });
    },

    setLoading: loading => set({loading}),

    setInitialized: initialized => set({initialized}),

    signIn: async (email, password) => {
        const {error, data} = await supabase.auth.signInWithPassword({email, password});
        if (!error) {
            get().setSession(data.session);
        } else {
            set({loading: false});
            throw error;
        }
    },

    signUp: async (email, password) => {
        const {error, data} = await supabase.auth.signUp({email, password});
        if (!error) {
            get().setSession(data.session);
        } else {
            set({loading: false});
            throw error;
        }
    },

    signOut: async () => {
        set({loading: true});
        const {error} = await supabase.auth.signOut();
        if (!error) {
            get().setSession(null);
        } else {
            set({loading: false});
            throw error;
        }
    },

    initialize: async () => {
        if (get().initialized) return;

        set({loading: true});

        try {
            // Get initial session
            const {
                data: {session},
                error,
            } = await supabase.auth.getSession();
            if (error) throw error;

            set({
                session,
                user: session?.user || null,
                loading: false,
                initialized: true,
            });

            // Listen for auth changes
            supabase.auth.onAuthStateChange((_, session) => {
                set({
                    session,
                    user: session?.user || null,
                    loading: false,
                });
            });
        } catch (error) {
            console.error("Error initializing auth:", error);
            set({loading: false, initialized: true});
        }
    },
}));
