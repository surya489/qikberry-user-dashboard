import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-slate-100 to-purple-100 px-6 py-10 overflow-hidden">
      <LoginForm />
    </div>
  );
};

export default Login;