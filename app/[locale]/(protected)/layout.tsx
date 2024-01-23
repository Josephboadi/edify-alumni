// import Navbar from "./_components/navbar";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/providers/TranslationsProvider";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("@/components/navbar/Navbar"), {
  ssr: false,
});
const i18nNamespace = ["home"];
interface ProtectedLayoutProps {
  children: React.ReactNode;
  params: any;
}

const ProtectedLayout = async ({ children, params }: ProtectedLayoutProps) => {
  const { locale } = params;
  const { t, resources } = await initTranslations(locale, i18nNamespace);
  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespace}
    >
      <main className="flex flex-col min-h-screen min-w-full  max-h-screen">
        <Navbar locale={locale} />
        <div className="flex w-full flex-grow">{children}</div>
      </main>
    </TranslationsProvider>
  );
};

export default ProtectedLayout;
