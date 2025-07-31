import {Chip} from "@heroui/react";

interface Props {
    activeCount: number;
    completedCount: number;
}

export const TodoHeader: React.FC<Props> = ({activeCount, completedCount}) => {
    return (
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
    );
};
