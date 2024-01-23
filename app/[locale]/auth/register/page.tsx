import { RegisterForm } from "@/components/auth/register-form";

const RegisterPage = ({ params: { locale } }: any) => {
  return <RegisterForm locale={locale} />;
};

export default RegisterPage;
