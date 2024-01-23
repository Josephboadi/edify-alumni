// import { useTranslations } from "next-intl";
// import { unstable_setRequestLocale } from "next-intl/server";
import { Poppins } from "next/font/google";

// import { createRoleMenu, getAllNestedRoleMenus } from "@/actions/role-menu";
import initTranslations from "@/app/i18n";
// import { useEffect } from "react";
import TranslationsProvider from "./../../../components/providers/TranslationsProvider";
import Hero from "./_components/Hero";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const i18nNamespace = ["home"];
export default async function Home({ params: { locale } }: any) {
  // unstable_setRequestLocale(locale);
  // const t = useTranslations("Home");
  const { t, resources } = await initTranslations(locale, i18nNamespace);

  // useEffect(() => {
  //   getAllNestedRoleMenus();
  // }, []);

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespace}
    >
      {/* //{" "} */}
      {/* <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800"> */}
      <main className="space-y-6 text-center w-full">
        <section className="h-[100vh] w-full overflow-hidden">
          <Hero />
        </section>
        <section className="h-[100vh] w-full"></section>
        {/* <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            font.className
          )}
        >
          {t("title")}
        </h1> */}
      </main>
      {/* //{" "} */}
      {/* </main> */}
    </TranslationsProvider>
  );
}
