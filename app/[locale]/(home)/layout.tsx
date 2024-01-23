import initTranslations from "@/app/i18n";
// import Navbar from "@/components/navbar/Navbar";
import dynamic from "next/dynamic";
import TranslationsProvider from "./../../../components/providers/TranslationsProvider";
const Navbar = dynamic(() => import("@/components/navbar/Navbar"), {
  ssr: false,
});
// import { usePathname } from "next/navigation";

import { ReactNode } from "react";

const i18nNamespace = ["home"];
async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: any;
}) {
  const { locale } = params;
  const { t, resources } = await initTranslations(locale, i18nNamespace);
  // const pathname = usePathname();
  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespace}
    >
      <main className="flex flex-col min-h-screen min-w-full  max-h-screen">
        {/* <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2">
        <Logo />
        <div className="flex gap-4 items-center">
          <ThemeSwitcher />
          <UserButton />
        </div>
      </nav> */}
        <Navbar locale={locale} />
        <div className="flex w-full flex-grow">{children}</div>
      </main>
    </TranslationsProvider>
  );
}

export default Layout;
