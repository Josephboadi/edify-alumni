import { LoginForm } from "@/components/auth/login-form";

const LoginPage = ({ params: { locale } }: any) => {
  return <LoginForm locale={locale} />;
};

export default LoginPage;
