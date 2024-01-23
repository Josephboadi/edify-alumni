import { NewVerificationForm } from "@/components/auth/new-verification-form";

const NewVerificationPage = ({ params: { locale } }: any) => {
  return <NewVerificationForm locale={locale} />;
};

export default NewVerificationPage;
