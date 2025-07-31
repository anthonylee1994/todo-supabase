import React from "react";
import DefaultLayout from "@/layouts/default";
import {useTodoStore} from "@/stores/useTodoStore";
import {TodoHeader} from "@/components/TodoHeader";
import {AddTodoForm} from "@/components/AddTodoForm";
import {EmptyPlaceholder} from "@/components/EmptyPlaceholder";
import {TodoList} from "@/components/TodoList";
import {ClearCompletedButton} from "@/components/ClearCompletedButton";
import {UserInfo} from "@/components/UserInfo";

interface AddTodoForm {
    title: string;
}

export const IndexPage = () => {
    const {todos, fetchTodos} = useTodoStore();
    const completedCount = todos.filter(todo => todo.done).length;
    const activeCount = todos.length - completedCount;

    // Fetch todos when component mounts (user is guaranteed to be authenticated)
    React.useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

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
