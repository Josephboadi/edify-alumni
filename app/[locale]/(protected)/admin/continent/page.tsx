import { ContinentDataTable } from "../_components/setups/Continent";

const Continent = ({ searchParams, params: { locale } }: any) => {
  return (
    <div className="">
      <ContinentDataTable />
    </div>
  );
};

export default Continent;
