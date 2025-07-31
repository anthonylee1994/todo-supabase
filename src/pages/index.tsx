import React from "react";
import {useAuth} from "@/hooks/useAuth";
import DefaultLayout from "@/layouts/default";
import {useNavigate} from "react-router-dom";
import {useTodoStore} from "@/stores/useTodoStore";
import {TodoHeader} from "@/components/TodoHeader";
import {AddTodoForm} from "@/components/AddTodoForm";
import {Spinner} from "@heroui/react";
import {EmptyPlaceholder} from "@/components/EmptyPlaceholder";
import {TodoList} from "@/components/TodoList";
import {ClearCompletedButton} from "@/components/ClearCompletedButton";
import {UserInfo} from "@/components/UserInfo";

interface AddTodoForm {
    title: string;
}

export const IndexPage = () => {
    const {session, loading: authLoading} = useAuth();
    const navigate = useNavigate();

    const {todos, fetchTodos} = useTodoStore();
    const completedCount = todos.filter(todo => todo.done).length;
    const activeCount = todos.length - completedCount;

    // Redirect to login if not authenticated
    React.useEffect(() => {
        if (!authLoading && !session) {
            navigate("/login");
        }
    }, [session, authLoading, navigate]);

    // Fetch todos when user is authenticated
    React.useEffect(() => {
        if (session) {
            fetchTodos();
        }
    }, [session, fetchTodos]);

    if (authLoading) {
        return (
            <DefaultLayout>
                <div className="flex min-h-[400px] items-center justify-center">
                    <Spinner size="lg" />
                </div>
            </DefaultLayout>
        );
    }

    if (!session) {
        return null; // Will redirect to login
    }

    return (
        <DefaultLayout>
            <div className="mx-auto mt-10 max-w-2xl p-6">
                <TodoHeader activeCount={activeCount} completedCount={completedCount} />
                <AddTodoForm />
                <div className="space-y-3">{todos.length === 0 ? <EmptyPlaceholder /> : <TodoList />}</div>
                {completedCount > 0 && <ClearCompletedButton />}
                <UserInfo />
            </div>
        </DefaultLayout>
    );
};
