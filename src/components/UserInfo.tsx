import {useAuth} from "@/hooks/useAuth";
import {Button} from "@heroui/button";

export const UserInfo = () => {
    const {user} = useAuth();

    return (
        <div className="mt-8 text-center text-sm text-gray-500">
            <p>Signed in as {user?.email}</p>
            <Button as="a" href="/logout" variant="light" color="danger" className="mt-2">
                Sign out
            </Button>
        </div>
    );
};
