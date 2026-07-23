import { Link } from "react-router-dom";

import Button from "../components/ui/Button/Button";
import ThemeToggle from "../components/shared/ThemeToggle/ThemeToggle";
import { ROUTES } from "../utils/constants";

const NotFoundPage = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-100 px-6 text-center dark:bg-slate-950">
      <div className="absolute right-6 top-6">
        <ThemeToggle />
      </div>
      <h1 className="text-5xl font-bold text-slate-900 dark:text-slate-100">404</h1>
      <p className="max-w-md text-sm text-slate-600 dark:text-slate-400">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link to={ROUTES.home}>
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
