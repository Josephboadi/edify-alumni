import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import PieComponent from "./PieComponent";
import PieComponent2 from "./PieComponent2";
import {
  MdOutlineAnalytics,
  MdOutlineLocationOn,
  MdOutlineReviews,
} from "react-icons/md";
import { BsEmojiHeartEyes } from "react-icons/bs";

const Main = ({
  multiLineInfo,
  multiLineZoneInfo,
  singleLineInfo,
  pieInfo,
  reviewCatInfo,
  colorInfo,
  totalReviews,
  averageReviews,
  totalTouchPoints,
}) => {
  return (
    <div className="overflow-scroll">
      <div className="flex flex-wrap gap-[30px] mt-[5px] pb-[15px]">
        <div className=" h-[100px] min-w-[100%] sm:min-w-[45%] md:min-w-[260px]  rounded-[8px] bg-white border-l-[4px] border-[#B589DF] flex gap-4 items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
          <div>
            <h2 className="text-[#B589DF] text-[11px] leading-[17px] font-bold">
              Total Touch Points
            </h2>
            <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
              {totalTouchPoints}
            </h1>
          </div>
          <MdOutlineLocationOn fontSize={28} className="text-[#B589DF]" />
        </div>
        <div className=" h-[100px] min-w-[100%] sm:min-w-[45%] md:min-w-[260px] rounded-[8px] bg-white border-l-[4px] border-orange-500 flex gap-4 items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
          <div>
            <h2 className="text-orange-500 text-[11px] leading-[17px] font-bold">
              Total Reviews
            </h2>
            <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
              {totalReviews}
            </h1>
          </div>
          <MdOutlineReviews fontSize={28} className="text-orange-500" />
        </div>
        {pieInfo?.map((info, index) => {
          const color = [info?.color];
          return (
            <div
              key={index}
              className={`h-[100px] min-w-[100%] sm:min-w-[45%] md:min-w-[260px] rounded-[8px] bg-white border-l-[4px] border-${info?.color} flex gap-4 items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out`}
              style={{ borderColor: info?.color }}
            >
              <div>
                <h2
                  className=" text-[11px] leading-[17px] font-bold"
                  style={{ color: info?.color }}
                >
                  {info.name}
                </h2>
                <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                  {info.value}
                </h1>
              </div>
              <BsEmojiHeartEyes
                fontSize={28}
                className={`text-${color}`}
                style={{ color: info?.color }}
              />
            </div>
          );
        })}

        <div className=" h-[100px] min-w-[100%] sm:min-w-[45%] md:min-w-[260px] rounded-[8px] bg-white border-l-[4px] border-[#1c1cc8] flex gap-4 items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
          <div>
            <h2 className="text-[#1c1cc8] text-[11px] leading-[17px] font-bold">
              Average Reviews (daily)
            </h2>
            <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
              {averageReviews}
            </h1>
          </div>
          <MdOutlineAnalytics fontSize={28} className="text-[#1c1cc8]" />
        </div>
      </div>

      <div className="flex flex-col lgx:flex-row w-[100%] gap-[20px] mt-4  ">
        <div className="flex w-[100%]  lgx:w-full  lgx:flex-1  shadow-lg bg-white !overflow-hidden p-4 py-8">
          <div className=" w-[100%]  lgx:w-[100%] h-[100%] p-4  !overflow-x-auto [&>div]:flex-shrink-0">
            <h4 className=" mb-4">Number of reveiws per Review Category</h4>
            <LineChart
              width={730}
              height={450}
              data={singleLineInfo}
              syncId="anyId"
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="Total Value"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </LineChart>
          </div>
        </div>

        <div className="w-[100%] lgx:w-[30%] flex-col flex md:flex-row lgx:flex-col gap-[20px]">
          <div className=" shadow-lg bg-white flex flex-1">
            <PieComponent pieInfo={pieInfo} />
          </div>
          <div className=" shadow-lg bg-white flex flex-1 ">
            <PieComponent2 pieInfo={pieInfo} />
          </div>
        </div>
      </div>

      <div className="flex w-[100%] mt-4 !overflow-hidden">
        <div className="flex  w-[100%]  shadow-lg bg-white !overflow-hidden p-4">
          <div className="w-[1000px] lg:w-[100%] h-[500px] p-4  !overflow-x-auto [&>div]:flex-shrink-0 ">
            <h4 className=" mb-4">Number of reveiws per Touch Point</h4>

            <LineChart width={1060} height={400} data={multiLineInfo}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="touchPoint" padding={{ left: 30, right: 30 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              {reviewCatInfo?.map((rcat, index) => (
                <Line
                  key={index}
                  type="monotone"
                  dataKey={rcat}
                  stroke={colorInfo[index]}
                  activeDot={{ r: 8 }}
                />
              ))}
            </LineChart>
          </div>
        </div>
      </div>

      <div className="flex w-[100%] mt-4 !overflow-hidden">
        <div className="flex  w-[100%]  shadow-lg bg-white !overflow-hidden p-4">
          <div className="w-[1000px] lg:w-[100%] h-[500px] p-4  !overflow-x-auto [&>div]:flex-shrink-0 ">
            <h4 className=" mb-4">Number of reveiws per Touch Point Zone</h4>

            <LineChart width={1060} height={400} data={multiLineZoneInfo}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="touchPointZone"
                padding={{ left: 30, right: 30 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              {reviewCatInfo?.map((rcat, index) => (
                <Line
                  key={index}
                  type="monotone"
                  dataKey={rcat}
                  stroke={colorInfo[index]}
                  activeDot={{ r: 8 }}
                />
              ))}
            </LineChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
