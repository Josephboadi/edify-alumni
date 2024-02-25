import initTranslations from "@/app/i18n";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/common/Footer";
import Wrapper from "@/components/common/Wrapper";
import TranslationsProvider from "@/components/providers/TranslationsProvider";
import { cn } from "@/lib/utils";
import { Montez, Montserrat, Russo_One } from "next/font/google";
import Image from "next/image";


const font = Montez({
  subsets: ["latin"],
  weight: ["400"],
});

const font1 = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const font11 = Russo_One({
  subsets: ["latin"],
  weight: ["400"],
});

const i18nNamespace = ["navbar", "footer", "service"];
const ServicePage = async ({ searchParams, params: { locale } }: any) => {
  const q = searchParams?.q || "";

  // const searchq = new RegExp(q, "i");

  const { t, resources } = await initTranslations(locale, i18nNamespace);
  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespace}
    >
      <Navbar locale={locale} />
      <div className="w-full h-full overflow-y-auto flex flex-col bg-[var(--clr-silver)]">
        <section className=" w-full mt-32">
          <Wrapper>
            <div className="w-full md:divide-x md:divide-[var(--clr-black)] grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 px-4 sm:px-8 md:px-4 lg:px-14 xl:px-20 ">
              <div className="w-max relative mt-2 sm:mt-2 sm:mb-0 md:col-span-3 lg:col-span-2 flex flex-col gap-3">
                <h1
                  className={cn(
                    "!text-6xl text-md mb-1 text-[var(--clr-black)] font-semibold ",
                    font.className
                  )}
                >
                  Welcome to our
                </h1>
                <h1
                  className={cn(
                    "text-6xl text-[var(--clr-pumpkin)] font-bold ",
                    font11.className
                  )}
                >
                  Services
                </h1>

                <h1
                  className={cn(
                    "text-6xl text-[var(--clr-pumpkin)] font-bold ",
                    font11.className
                  )}
                >
                  Center
                </h1>
              </div>

              <div className="  md:pl-16 lg:pl-20 md:col-span-3 flex flex-col gap-6 md:py-4 mt-9 md:mt-0">
                <p className=" text-xl font-semibold">
                  This center provides insightful and thoughtful support to all
                  Alumni’s in need of emotional, psychological and mental
                  support.
                </p>
                <p className=" text-xl font-semibold">
                  Please feel free to place a request by selecting one of the
                  available options below.
                </p>
              </div>
            </div>
          </Wrapper>
        </section>

        <section className=" w-full md:mt-8 !mb-10  pb-5">
          <Wrapper>
            <div className=" px-4 sm:px-8 md:px-4 lg:px-14 xl:px-20 mt-20 flex w-full items-center justify-center gap-6 sm:gap-12">
              <div className="flex flex-col items-center transition-all duration-300 hover:scale-95 cursor-pointer">
                <div className="w-[65px] h-[65px] sm:w-[70px] sm:h-[70px] relative rounded-full border-[3px] border-[var(--clr-green)] !p-2">
                  <Image
                    src={"/service/image3.png"}
                    width={100}
                    height={100}
                    alt="-"
                    className=" object-cover rounded-full object-center  "
                  />
                </div>
                <p className=" -mt-6 text-[var(--clr-secondary)] flex w-full items-center justify-center text-5xl">
                  .
                </p>
                <p className=" text-center">Emotional</p>
              </div>

              <div className="flex flex-col items-center transition-all duration-300 hover:scale-95 cursor-pointer">
                <div className="w-[65px] h-[65px] sm:w-[70px] sm:h-[70px] relative rounded-full border-[3px] border-[var(--clr-green)] !p-2">
                  <Image
                    src={"/service/image4.png"}
                    width={100}
                    height={100}
                    alt="-"
                    className="object-cover rounded-full object-center "
                  />
                </div>
                <p className=" -mt-6 text-[var(--clr-secondary)] flex w-full items-center justify-center text-5xl">
                  .
                </p>
                <p className=" text-center">Psychological</p>
              </div>

              <div className="flex flex-col items-center transition-all duration-300 hover:scale-95 cursor-pointer">
                <div className="w-[65px] h-[65px] sm:w-[70px] sm:h-[70px] relative rounded-full border-[3px] border-[var(--clr-green)] !p-2">
                  <Image
                    src={"/service/image5.png"}
                    width={100}
                    height={100}
                    alt="-"
                    className="object-cover rounded-full object-center "
                  />
                </div>
                <p className=" -mt-6 text-[var(--clr-secondary)] flex w-full items-center justify-center text-5xl">
                  .
                </p>
                <p className=" text-center">Mental</p>
              </div>
            </div>
          </Wrapper>
        </section>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </TranslationsProvider>
  );
};

export default ServicePage;
