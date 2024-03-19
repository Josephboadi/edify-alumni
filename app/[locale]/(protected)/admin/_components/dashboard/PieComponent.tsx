"use client";

import { useState } from "react";
import { Cell, Pie, PieChart } from "recharts";

const data = [
  { name: "Group A", value: 400, color: "#1b81c2" },
  { name: "Group B", value: 300, color: "#218630" },
  { name: "Group C", value: 300, color: "#2622ae" },
  { name: "Group D", value: 200, color: "#5b26f5" },
];

const PieComponent = () => {
  const [pieInfo, setPieInfo] = useState([...data]);
  return (
    <div className="flex flex-col justify-center items-center w-full py-6 gap-4">
      <PieChart width={400} height={250}>
        <Pie
          data={data}
          isAnimationActive={true}
          cx="50%"
          cy="50%"
          labelLine={true}
          // label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry?.color} />
          ))}
        </Pie>
      </PieChart>

      <div className="grid grid-cols-3 gap-2 justify-center items-center px-2">
        {data?.map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-center items-center gap-1"
          >
            <div className=" flex justify-center items-center gap-1 ">
              <p className="cursor-pointer font-bold text-center text-[10px]">
                {item.name}
              </p>
              <div className="flex  justify-center items-center">
                <div
                  className="h-[15px] w-[15px] rounded-full"
                  style={{ backgroundColor: item?.color }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieComponent;
