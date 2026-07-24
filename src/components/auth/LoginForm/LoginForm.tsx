import { type FormEvent, useState } from "react";
import { Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";
import FadeAlert from "@/components/shared/FadeAlert/FadeAlert";
import { login } from "@/features/auth/authSlice";
import { validateCredentials } from "@/features/profile/profileStorage";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { ROUTES } from "@/utils/constants";

interface LoginErrors {
  username: string;
  password: string;
}

const emptyErrors: LoginErrors = {
  username: "",
  password: "",
};

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>(emptyErrors);
  const [credentialsError, setCredentialsError] = useState("");
  const [showCredentialsError, setShowCredentialsError] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors: LoginErrors = { ...emptyErrors };

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

    if (validateCredentials(username, password)) {
      setLoading(true);
      dispatch(login(username.trim()));
      navigate(ROUTES.home, { replace: true });
      return;
    }

    setCredentialsError("Invalid username or password.");
    setShowCredentialsError(true);
  };

  const clearFieldError = (field: keyof LoginErrors) => {
    setErrors((previous) => ({
      ...previous,
      [field]: "",
    }));
    setShowCredentialsError(false);
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/30 bg-white/85 p-8 shadow-2xl backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/85">
      <div className="mb-8 text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-2xl font-bold text-white shadow-lg shadow-indigo-600/30 dark:bg-indigo-500">
            Qik
          </div>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Welcome Back</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Sign in to continue to your dashboard
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <Input
          label="Username"
          placeholder="Enter your username"
          value={username}
          error={errors.username}
          leftIcon={<User size={18} />}
          onChange={(event) => {
            setUsername(event.target.value);
            clearFieldError("username");
          }}
        />

        <Input
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          error={errors.password}
          leftIcon={<Lock size={18} />}
          onChange={(event) => {
            setPassword(event.target.value);
            clearFieldError("password");
          }}
        />

        <FadeAlert
          message={credentialsError}
          visible={showCredentialsError}
          onHidden={() => {
            setCredentialsError("");
            setShowCredentialsError(false);
          }}
        />

        <Button
          type="submit"
          fullWidth
          disabled={!username.trim() || !password.trim()}
          loading={loading}
        >
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
