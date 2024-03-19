import { ContinentDataTable } from "../_components/Continent";


const Continent = ({ searchParams, params: { locale } }: any) => {
  return (
    <div className="">
      <ContinentDataTable />
    </div>
  );
};

export default Continent;
