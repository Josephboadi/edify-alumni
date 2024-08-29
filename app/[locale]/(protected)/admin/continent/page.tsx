import { ContinentDataTable } from "../_components/setups/Continent";

const Continent = async ({ searchParams, params: { locale } }: any) => {
  // const authData = await auth();
  // console.log(
  //   "CONTINENT AUTH DATA================================, ",
  //   authData
  // );
  // if (authData) {
  //   generateSessionToken(
  //     authData?.user?.id,
  //     authData?.expires,
  //     authData?.user?.token
  //   );
  // }
  return (
    <div className="">
      <ContinentDataTable />
    </div>
  );
};

export default Continent;
