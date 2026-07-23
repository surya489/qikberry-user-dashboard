import { type FormEvent, useState } from "react";
import { Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "../../ui/Button";
import Input from "../../ui/Input";

import { login } from "../../../features/auth/authSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";

import { DEMO_CREDENTIALS } from "../../../utils/constants";

const LoginForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({
        username: "",
        password: "",
        credentials: "",
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationErrors = {
            username: "",
            password: "",
            credentials: "",
        };

        if (!username.trim()) {
            validationErrors.username = "Username is required.";
        }

        if (!password.trim()) {
            validationErrors.password = "Password is required.";
        }

        if (validationErrors.username || validationErrors.password) {
            setErrors(validationErrors);
            return;
        }

        if (
            username === DEMO_CREDENTIALS.username &&
            password === DEMO_CREDENTIALS.password
        ) {
            dispatch(login(username));

            setLoading(true);

            setTimeout(() => {
                dispatch(login(username));
                navigate("/home", { replace: true });
            }, 600);

            return;
        }

        setErrors({
            username: "",
            password: "",
            credentials: "Invalid username or password.",
        });
    };

    return (
        <div className="w-full max-w-md rounded-3xl border border-white/30 bg-white/80 p-8 shadow-2xl backdrop-blur-xl">
            {/* Header */}
            <div className="mb-8 text-center">
                <div className="mb-4 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-2xl font-bold text-white shadow-lg">
                        Qik
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-slate-900">
                    Welcome Back
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    Sign in to continue to your dashboard
                </p>
            </div>

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
                <Input
                    label="Username"
                    placeholder="Enter your username"
                    value={username}
                    error={errors.username}
                    leftIcon={<User size={18} />}
                    onChange={(e) => {
                        setUsername(e.target.value);

                        setErrors((prev) => ({
                            ...prev,
                            username: "",
                            credentials: "",
                        }));
                    }}
                />

                <Input
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                    value={password}
                    error={errors.password}
                    leftIcon={<Lock size={18} />}
                    onChange={(e) => {
                        setPassword(e.target.value);

                        setErrors((prev) => ({
                            ...prev,
                            password: "",
                            credentials: "",
                        }));
                    }}
                />

                {errors.credentials && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {errors.credentials}
                    </div>
                )}

                <Button
                    type="submit"
                    fullWidth
                    disabled={!username.trim() || !password.trim()}
                    loading={loading}
                >
                    Sign In
                </Button>
            </form>

            {/* Demo Credentials */}
            {/* <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50 p-4">
                <p className="mb-2 text-sm font-semibold text-indigo-700">
                    Demo Credentials
                </p>

                <div className="space-y-1 text-sm text-slate-600">
                    <p>
                        <span className="font-medium">Username:</span>{" "}
                        {DEMO_CREDENTIALS.username}
                    </p>

                    <p>
                        <span className="font-medium">Password:</span>{" "}
                        {DEMO_CREDENTIALS.password}
                    </p>
                </div>
            </div> */}
        </div>
    );
};

export default LoginForm;