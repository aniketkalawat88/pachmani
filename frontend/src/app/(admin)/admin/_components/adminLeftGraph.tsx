"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Jan",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Jun",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Jul",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Aug",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Sep",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
interface RecentActivity {
  name: string;
  count: number;
}
export default function AdminLeftGraph({
  recentUsers,
  text,
}: {
  recentUsers: RecentActivity[];
  text: string;
}) {
  return (
    <div className="p-2 shadow-[0px_4px_16.3px_0px_rgba(0,0,0,0.08)] sm:p-4 md:p-5 xl:p-6 bg-white my-6 rounded-xl">
      <div className="pb-6 text-base font-medium capitalize text-[#4C535F]">
        {text}
      </div>
      <LineChart width={500} height={200} data={recentUsers}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#00AB55"
          activeDot={{ r: 1 }}
        />
      </LineChart>
    </div>
  );
}

// "use client";

// import React from "react";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export default function AdminGraphLeft() {
//   const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];
//   return (
//     <div className="rounded-md bg-white">
//       <div className="p-2 shadow-[0px_4px_16.3px_0px_rgba(0,0,0,0.08)] sm:p-4 md:p-5 xl:p-6">
//         <div className="pb-6 text-base font-medium capitalize text-[#4C535F]">
//           New Car list in last month
//         </div>
//         <div className="h-52">
//           <ResponsiveContainer width={"100%"} height={"100%"}>
//             <AreaChart
//               width={100}
//               height={100}
//               data={data}
//               margin={{
//                 top: 0,
//                 right: 0,
//                 left: 10,
//                 bottom: 0,
//               }}
//             >
//               <defs>
//                 <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="0%" stopColor="#0677D4" stopOpacity={0.9} />
//                   <stop offset="100%" stopColor="#0677D4" stopOpacity={0.1} />
//                 </linearGradient>
//               </defs>
//               <XAxis
//                 dataKey="name"
//                 tickLine={false}
//                 axisLine={false}
//                 fontSize={14}
//                 fontWeight={500}
//               />
//               {/* <YAxis dataKey={"amt"} tickLine={false} axisLine={false} fontSize={13} fontWeight={500} dx={-10} tickCount={10} tickFormatter={(numer: number) => `$${numer.toFixed(0)}`} /> */}
//               <Tooltip />
//               <Area
//                 dataKey="count"
//                 stroke="#0677D4"
//                 fillOpacity={1}
//                 fill="url(#colorAmt)"
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }
