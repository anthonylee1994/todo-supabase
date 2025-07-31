import {useTodoStore} from "@/stores/useTodoStore";
import {Button} from "@heroui/button";
import {Card, CardBody, Input} from "@heroui/react";
import {useForm} from "react-hook-form";

interface AddTodoForm {
    title: string;
}

export const AddTodoForm = () => {
    const {loading, createTodo} = useTodoStore();
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<AddTodoForm>();

    const onAddTodo = async (data: AddTodoForm) => {
        await createTodo({title: data.title.trim()});
        reset();
    };

    return (
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
    );
};
