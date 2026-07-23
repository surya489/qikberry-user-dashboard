import { CircleUserRound, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { logout } from "../../../features/auth/authSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { ROUTES } from "../../../utils/constants";
import Button from "../../ui/Button/Button";
import ThemeToggle from "../../shared/ThemeToggle/ThemeToggle";

const navLinks = [
  { to: ROUTES.home, label: "Home", end: true },
  { to: ROUTES.posts, label: "Posts", end: false },
  { to: ROUTES.photos, label: "Photos", end: false },
] as const;

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "cursor-pointer rounded-full px-3 py-2 text-sm font-medium transition-all duration-200",
    isActive
      ? "bg-indigo-50 font-semibold text-indigo-700 shadow-sm dark:bg-indigo-950/80 dark:text-indigo-300"
      : "text-slate-600 hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-400",
  ].join(" ");

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { username } = useAppSelector((state) => state.auth);
  const { avatar } = useAppSelector((state) => state.profile);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.login, { replace: true });
  };

  const handleProfileClick = () => {
    navigate(ROUTES.profile);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-lg dark:border-slate-800 dark:bg-slate-900/90">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate(ROUTES.home)}
          className="flex cursor-pointer items-center gap-3 text-xl font-bold text-indigo-600 dark:text-indigo-400"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white shadow-lg shadow-indigo-600/25 dark:bg-indigo-500">
            Q
          </div>
          <span className="hidden sm:inline">Qikberry Dashboard</span>
        </button>

        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={navLinkClass}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <button
            type="button"
            onClick={handleProfileClick}
            className="hidden h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-slate-100 transition hover:bg-slate-200 sm:flex dark:bg-slate-800 dark:hover:bg-slate-700"
            aria-label="Open profile settings"
            title={username || "Profile"}
          >
            {avatar ? (
              <img src={avatar} alt="" className="h-full w-full object-cover" />
            ) : (
              <CircleUserRound size={22} className="text-slate-600 dark:text-slate-300" />
            )}
          </button>

          <Button variant="danger" size="sm" onClick={handleLogout} className="hidden sm:inline-flex">
            <LogOut size={16} />
            Logout
          </Button>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white md:hidden dark:border-slate-700 dark:bg-slate-800"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden dark:border-slate-800 dark:bg-slate-900">
          <nav className="flex flex-col gap-2">
            {navLinks.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={navLinkClass}
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={handleProfileClick}
              className="flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {avatar ? (
                <img src={avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
              ) : (
                <CircleUserRound size={18} />
              )}
              Profile settings
            </button>
            <Button variant="danger" size="sm" fullWidth onClick={handleLogout}>
              <LogOut size={16} />
              Logout
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
