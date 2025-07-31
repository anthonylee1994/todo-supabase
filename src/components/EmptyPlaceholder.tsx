import {Card, CardBody} from "@heroui/react";
import {FaClipboardList} from "react-icons/fa";

export const EmptyPlaceholder = () => {
    return (
        <Card>
            <CardBody className="py-12 text-center">
                <div className="mb-4 text-gray-400">
                    <FaClipboardList className="mx-auto h-16 w-16" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-600">No todos yet</h3>
                <p className="text-gray-500">Add your first todo above to get started!</p>
            </CardBody>
        </Card>
    );
};
