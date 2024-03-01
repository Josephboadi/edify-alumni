import initTranslations from "@/app/i18n";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/navbar/Navbar";
import TranslationsProvider from "@/components/providers/TranslationsProvider";
import { JobApplicationForm } from "../_components/jobapplicationform/jobapplication-form";

const i18nNamespace = ["navbar", "footer", "job"];
const JobApplicationFormPage = async ({
  searchParams,
  params: { locale },
}: any) => {
  const { t, resources } = await initTranslations(locale, i18nNamespace);
  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespace}
    >
      <Navbar locale={locale} />
      <div className="w-full flex justify-center items-center h-[100vh]">
        <div className="p-0  w-max  flex items-center justify-center bg-transparent border-none !z-[10000000] max-h-[96vh] overflow-y-auto no-scrollbar shadow-lg !rounded-xl">
          <JobApplicationForm />
        </div>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </TranslationsProvider>
  );
};

export default JobApplicationFormPage;
