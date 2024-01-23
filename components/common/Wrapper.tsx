import { ReactNode } from "react";

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="md:max-w-[1300px] mx-auto md:px-3 px-6 max-w-[100%] ">
      {children}
    </div>
  );
};

export default Wrapper;
