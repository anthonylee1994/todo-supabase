import {create} from "zustand";
import {supabase} from "@/utils/supabase";
import {Database} from "@/database.types";

export type Todo = Database["public"]["Tables"]["todos"]["Row"];

export type CreateTodoData = {
    title: string;
};

export type UpdateTodoData = Database["public"]["Tables"]["todos"]["Update"];

interface TodoState {
    todos: Todo[];
    loading: boolean;
    error: string | null;

    // Actions
    fetchTodos: () => Promise<void>;
    createTodo: (data: CreateTodoData) => Promise<void>;
    updateTodo: (id: number, data: UpdateTodoData) => Promise<void>;
    deleteTodo: (id: number) => Promise<void>;
    toggleTodo: (id: number) => Promise<void>;
    clearCompleted: () => Promise<void>;
    setError: (error: string | null) => void;
    setLoading: (loading: boolean) => void;
}

export const useTodoStore = create<TodoState>((set, get) => ({
    todos: [],
    loading: false,
    error: null,

    setError: error => set({error}),
    setLoading: loading => set({loading}),

    fetchTodos: async () => {
        set({loading: true, error: null});

        try {
            const {data, error} = await supabase.from("todos").select("*").order("inserted_at", {ascending: false});

            if (error) throw error;

            set({todos: data || [], loading: false});
        } catch (error: any) {
            console.error("Error fetching todos:", error);
            set({
                error: error.message || "Failed to fetch todos",
                loading: false,
            });
        }
    },

    createTodo: async data => {
        set({loading: true, error: null});

        try {
            const {
                data: {user},
            } = await supabase.auth.getUser();

            if (!user) {
                throw new Error("User not authenticated");
            }

            const {data: newTodo, error} = await supabase
                .from("todos")
                .insert({
                    title: data.title,
                    done: false,
                    user_id: user.id,
                })
                .select()
                .single();

            if (error) throw error;

            set(state => ({
                todos: [newTodo, ...state.todos],
                loading: false,
            }));
        } catch (error: any) {
            console.error("Error creating todo:", error);
            set({
                error: error.message || "Failed to create todo",
                loading: false,
            });
        }
    },

    updateTodo: async (id, data) => {
        set({loading: true, error: null});

        try {
            const {data: updatedTodo, error} = await supabase.from("todos").update(data).eq("id", id).select().single();

            if (error) throw error;

            set(state => ({
                todos: state.todos.map(todo => (todo.id === id ? updatedTodo : todo)),
                loading: false,
            }));
        } catch (error: any) {
            console.error("Error updating todo:", error);
            set({
                error: error.message || "Failed to update todo",
                loading: false,
            });
        }
    },

    deleteTodo: async id => {
        set({loading: true, error: null});

        try {
            const {error} = await supabase.from("todos").delete().eq("id", id);

            if (error) throw error;

            set(state => ({
                todos: state.todos.filter(todo => todo.id !== id),
                loading: false,
            }));
        } catch (error: any) {
            console.error("Error deleting todo:", error);
            set({
                error: error.message || "Failed to delete todo",
                loading: false,
            });
        }
    },

    toggleTodo: async id => {
        const {todos} = get();
        const todo = todos.find(t => t.id === id);

        if (!todo) {
            set({error: "Todo not found"});
            return;
        }

        await get().updateTodo(id, {done: !todo.done});
    },

    clearCompleted: async () => {
        set({loading: true, error: null});

        try {
            const {error} = await supabase.from("todos").delete().eq("done", true);

            if (error) throw error;

            set(state => ({
                todos: state.todos.filter(todo => !todo.done),
                loading: false,
            }));
        } catch (error: any) {
            console.error("Error clearing completed todos:", error);
            set({
                error: error.message || "Failed to clear completed todos",
                loading: false,
            });
        }
    },
}));
