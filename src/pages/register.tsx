import React from "react";
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "@heroui/button";
import {Input} from "@heroui/input";
import {useAuth} from "@/hooks/useAuth";
import {addToast} from "@heroui/toast";
import {Alert} from "@heroui/react";
import {AuthHeader} from "@/components/AuthHeader";

interface RegisterFormData {
    email: string;
    password: string;
    confirmPassword: string;
}

export const RegisterPage = () => {
    const {signUp, session} = useAuth();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const navigate = useNavigate();

    const {
        register,
        reset,
        handleSubmit,
        formState: {errors},
        watch,
    } = useForm<RegisterFormData>();

    const password = watch("password");

    const onSubmit = async (data: RegisterFormData) => {
        setLoading(true);
        setError(null);

        try {
            await signUp(data.email, data.password);

            addToast({
                title: "Registration successful!",
                description: "Please check your email to verify your account.",
                color: "success",
            });

            navigate("/login");

            reset();
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
        } finally {
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
                <AuthHeader title="Join TodoApp" description="Create your account to start organizing your tasks" />

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
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    },
                                })}
                            />

                            <Input
                                type="password"
                                label="Confirm Password"
                                placeholder="Confirm your password"
                                isRequired
                                size="lg"
                                autoComplete="new-password"
                                data-form-type="other"
                                isInvalid={!!errors.confirmPassword}
                                errorMessage={errors.confirmPassword?.message}
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: value => value === password || "Passwords do not match",
                                })}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl"
                            isLoading={loading}
                            disabled={loading}
                        >
                            {loading ? "Creating account..." : "Create account"}
                        </Button>

                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{" "}
                                <Link to="/login" className="font-semibold text-blue-600 transition-colors hover:text-blue-700">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
