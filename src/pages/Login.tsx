import { Navigate } from "react-router-dom";

import LoginForm from "../components/auth/LoginForm";
import ThemeToggle from "../components/shared/ThemeToggle/ThemeToggle";
import { useAppSelector } from "../hooks/useAppSelector";
import { ROUTES } from "../utils/constants";

const Login = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to={ROUTES.home} replace />;
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-100 via-slate-100 to-purple-100 px-6 py-10 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl dark:bg-indigo-600/20" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-80 w-80 rounded-full bg-violet-300/30 blur-3xl dark:bg-violet-600/20" />

      <div className="absolute right-6 top-6">
        <ThemeToggle />
      </div>

      <LoginForm />
    </div>
  );
};

export default Login;
