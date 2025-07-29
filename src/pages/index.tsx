import {useAuth} from "@/hooks/useAuth";
import DefaultLayout from "@/layouts/default";
import React from "react";
import {useNavigate} from "react-router-dom";
import {useTodoStore, type Todo} from "@/stores/useTodoStore";
import {Button} from "@heroui/button";
import {Input} from "@heroui/input";
import {Checkbox} from "@heroui/checkbox";
import {Card, CardBody} from "@heroui/card";
import {Chip} from "@heroui/chip";
import {useForm} from "react-hook-form";

interface AddTodoForm {
    title: string;
}

export const IndexPage = () => {
    const {session, loading: authLoading, user} = useAuth();
    const navigate = useNavigate();

    const {todos, loading, error, fetchTodos, createTodo, deleteTodo, toggleTodo, clearCompleted} = useTodoStore();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<AddTodoForm>();

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

    const onAddTodo = async (data: AddTodoForm) => {
        await createTodo({title: data.title});
        reset();
    };

    const handleToggleTodo = async (id: number) => {
        await toggleTodo(id);
    };

    const handleDeleteTodo = async (id: number) => {
        await deleteTodo(id);
    };

    const handleClearCompleted = async () => {
        await clearCompleted();
    };

    if (authLoading) {
        return (
            <DefaultLayout>
                <div className="flex min-h-[400px] items-center justify-center">
                    <div className="text-center">
                        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
                        <p className="text-gray-600">Loading...</p>
                    </div>
                </div>
            </DefaultLayout>
        );
    }

    if (!session) {
        return null; // Will redirect to login
    }

    const completedCount = todos.filter(todo => todo.done).length;
    const activeCount = todos.length - completedCount;

    return (
        <DefaultLayout>
            <div className="mx-auto mt-10 max-w-2xl p-6">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="mb-2 text-4xl font-bold text-gray-900">My Todos</h1>
                    <p className="text-gray-600">Stay organized and get things done!</p>
                    <div className="mt-4 flex justify-center gap-4">
                        <Chip color="primary" variant="flat">
                            {activeCount} active
                        </Chip>
                        <Chip color="success" variant="flat">
                            {completedCount} completed
                        </Chip>
                    </div>
                </div>

                {/* Add Todo Form */}
                <Card className="mb-6">
                    <CardBody>
                        <form onSubmit={handleSubmit(onAddTodo)} className="flex gap-3">
                            <Input
                                placeholder="What needs to be done?"
                                className="flex-1"
                                size="lg"
                                isInvalid={!!errors.title}
                                errorMessage={errors.title?.message}
                                {...register("title", {
                                    required: "Todo title is required",
                                    minLength: {
                                        value: 1,
                                        message: "Todo cannot be empty",
                                    },
                                })}
                            />
                            <Button type="submit" color="primary" size="lg" isLoading={loading} className="px-8">
                                Add
                            </Button>
                        </form>
                    </CardBody>
                </Card>

                {/* Error Display */}
                {error && (
                    <Card className="mb-6 border-red-200 bg-red-50">
                        <CardBody>
                            <p className="text-sm text-red-700">{error}</p>
                        </CardBody>
                    </Card>
                )}

                {/* Todo List */}
                <div className="space-y-3">
                    {todos.length === 0 ? (
                        <Card>
                            <CardBody className="py-12 text-center">
                                <div className="mb-4 text-gray-400">
                                    <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                        />
                                    </svg>
                                </div>
                                <h3 className="mb-2 text-lg font-medium text-gray-600">No todos yet</h3>
                                <p className="text-gray-500">Add your first todo above to get started!</p>
                            </CardBody>
                        </Card>
                    ) : (
                        todos.map((todo: Todo) => (
                            <Card key={todo.id} className={`transition-all duration-200 ${todo.done ? "border-gray-200 bg-gray-50" : "border-gray-200 bg-white hover:border-blue-300"}`}>
                                <CardBody className="py-4">
                                    <div className="flex items-center gap-4">
                                        <Checkbox isSelected={!!todo.done} onValueChange={() => handleToggleTodo(todo.id)} color="success" size="lg" />
                                        <div className="flex-1">
                                            <p className={`text-lg ${todo.done ? "text-gray-500 line-through" : "text-gray-900"}`}>{todo.title}</p>
                                            {todo.inserted_at && <p className="mt-1 text-xs text-gray-400">{new Date(todo.inserted_at).toLocaleDateString()}</p>}
                                        </div>
                                        <Button isIconOnly color="danger" variant="light" size="sm" onPress={() => handleDeleteTodo(todo.id)} className="opacity-60 hover:opacity-100">
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                            </svg>
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>
                        ))
                    )}
                </div>

                {/* Actions */}
                {completedCount > 0 && (
                    <div className="mt-6 text-center">
                        <Button color="warning" variant="flat" onPress={handleClearCompleted} isLoading={loading}>
                            Clear {completedCount} completed
                        </Button>
                    </div>
                )}

                {/* User Info */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>Signed in as {user?.email}</p>
                    <Button as="a" href="/logout" variant="light" color="danger" size="sm" className="mt-2">
                        Sign out
                    </Button>
                </div>
            </div>
        </DefaultLayout>
    );
};
