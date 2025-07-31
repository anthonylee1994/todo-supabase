import {useTodoStore} from "@/stores/useTodoStore";
import {Button} from "@heroui/button";

export const ClearCompletedButton = () => {
    const {todos, loading, clearCompleted} = useTodoStore();
    const completedCount = todos.filter(todo => todo.done).length;

    const handleClearCompleted = async () => {
        await clearCompleted();
    };

    return (
        <div className="mt-6 text-center">
            <Button color="warning" variant="flat" onPress={handleClearCompleted} isLoading={loading}>
                Clear {completedCount} completed
            </Button>
        </div>
    );
};
