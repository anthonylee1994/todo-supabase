import {Todo, useTodoStore} from "@/stores/useTodoStore";
import {Button, Card, CardBody, Checkbox} from "@heroui/react";
import React from "react";
import {FaTrash} from "react-icons/fa";

export const TodoList = () => {
    const {todos, deleteTodo, toggleTodo} = useTodoStore();

    const handleToggleTodo = async (id: number) => {
        await toggleTodo(id);
    };

    const handleDeleteTodo = async (id: number) => {
        await deleteTodo(id);
    };

    return (
        <React.Fragment>
            {todos.map((todo: Todo) => (
                <Card key={todo.id} className={`transition-all duration-200 ${todo.done ? "border-gray-200 bg-gray-50" : "border-gray-200 bg-white hover:border-blue-300"}`}>
                    <CardBody className="py-4">
                        <div className="flex items-center gap-4">
                            <Checkbox isSelected={Boolean(todo.done)} onValueChange={() => handleToggleTodo(todo.id)} size="lg" />
                            <div className="flex-1">
                                <p className={`text-lg ${todo.done ? "text-gray-500 line-through" : "text-gray-900"}`}>{todo.title}</p>
                            </div>
                            <Button isIconOnly color="danger" variant="light" onPress={() => handleDeleteTodo(todo.id)} className="opacity-60 hover:opacity-100">
                                <FaTrash />
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            ))}
        </React.Fragment>
    );
};
