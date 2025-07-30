import React from "react";
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "@heroui/button";
import {Input} from "@heroui/input";
import {useAuth} from "@/hooks/useAuth";
import {Alert} from "@heroui/react";
import {AuthHeader} from "@/components/AuthHeader";

interface LoginFormData {
    email: string;
    password: string;
}

export const LoginPage = () => {
    const {signIn, session} = useAuth();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const navigate = useNavigate();

    const {
        register,
        reset,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginFormData>({
        mode: "onChange", // This enables real-time validation
    });

    const onSubmit = async (data: LoginFormData) => {
        setLoading(true);
        setError(null);

        try {
            await signIn(data.email, data.password);

            navigate("/");
        } catch (err) {
            setError("Invalid email or password. Please try again.");
        } finally {
            reset();
            setLoading(false);
        }
    };

    React.useEffect(() => {
        if (session) {
            navigate("/");
        }
    }, [session]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
            <div className="w-full max-w-md">
                <AuthHeader title="Welcome back!" description="Sign in to your account to continue" />

                {/* Form Card */}
                <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" autoComplete="off" noValidate>
                        {error && <Alert color="danger" title={error} />}

                        <div className="space-y-4">
                            <Input
                                type="email"
                                label="Email"
                                placeholder="Enter your email"
                                isRequired
                                size="lg"
                                autoComplete="new-email"
                                data-form-type="other"
                                isInvalid={!!errors.email}
                                errorMessage={errors.email?.message}
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address",
                                    },
                                })}
                            />

                            <Input
                                type="password"
                                label="Password"
                                placeholder="Enter your password"
                                isRequired
                                size="lg"
                                autoComplete="new-password"
                                data-form-type="other"
                                isInvalid={!!errors.password}
                                errorMessage={errors.password?.message}
                                {...register("password", {
                                    required: "Password is required",
                                })}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl"
                            isLoading={loading}
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </Button>

                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{" "}
                                <Link to="/register" className="font-semibold text-blue-600 transition-colors hover:text-blue-700">
                                    Create account
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
