import { ResetForm } from "@/components/auth/reset-form";

const ResetPage = ({ params: { locale } }: any) => {
  return <ResetForm locale={locale} />;
};

export default ResetPage;
