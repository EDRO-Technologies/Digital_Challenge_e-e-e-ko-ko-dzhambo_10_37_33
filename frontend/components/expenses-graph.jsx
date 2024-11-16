// "use client";

// import { Bar, BarChart } from "recharts";
// import { ChartContainer } from "@/components/ui/chart";

// const chartConfig = {
//     date_fact: {
//         label: "Дата",
//         color: "#2563eb",
//     },
//     expenses: {
//         label: "Затраты",
//         color: "#60a5fa",
//     },
// };

// export default function ExpensesGraph({ data }) {
//     console.log(data)

//     return (
//         <div className="bg-white max-w-[284px] flex-grow rounded-2xl p-4">
//             <p className="font-medium text-[#686868] mt-0">Общие траты</p>
//             <p className="text-2xl font-semibold mt-2">₽120,000</p>
//             <p className="text-[#767676] mt-[3px]">+20% с прошлого дня</p>

//             <ChartContainer
//                 config={chartConfig}
//                 className=" w-full"
//             >
//                 <BarChart accessibilityLayer data={data}>
//                     <Bar
//                         dataKey="expenses"
//                         fill="#2563eb"
//                         radius={4}
//                     />
//                     <Bar
//                         dataKey="date_fact"
//                         fill="#60a5fa"
//                         radius={4}
//                     />
//                 </BarChart>
//             </ChartContainer>
//         </div>
//     );
// }

"use client";

import {
    Area,
    AreaChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    XAxis,
    YAxis,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { DateTime } from "luxon";

const chartConfig = {
    date_fact: {
        label: "Дата",
        color: "hsl(var(--chart-1))",
    },
    expenses: {
        label: "Затраты",
        color: "hsl(var(--chart-2))",
    },
};

export default function Component({ data }) {
    console.log(data);
    return (
        <div className="bg-white max-w-[284px] flex-grow rounded-2xl p-4">
            <p className="font-medium text-[#686868] mt-0">Общие траты</p>
            <p className="text-2xl font-semibold mt-2">₽120,000</p>
            <p className="text-[#767676] mt-[3px]">+20% с прошлого дня</p>

            <ChartContainer className="w-full" config={chartConfig}>
                <LineChart
                    accessibilityLayer
                    data={data}
                    margin={{
                        left: 4,
                        right: 4,
                    }}
                >
                    <XAxis
                        dataKey="date_fact"
                        tickLine={false}
                        axisLine={false}
                        tickCount={4}
                        tickFormatter={(value) => {
                            switch(value) {
                                case 1: return "пн",
                                case 3: return "пн",
                                case 1: return "пн",
                            }
                            
                        }}
                    />
                    <YAxis
                        hide={true}
                        tickLine={false}
                        axisLine={false}
                        tick={false}
                        domain={["dataMin - 0.1", "dataMax + 0.1"]}
                    />
                    <ChartTooltip
                        cursor={false}
                        content={
                            <ChartTooltipContent hideLabel indicator="line" />
                        }
                    />
                    <Line
                        dataKey="expenses"
                        type="natural"
                        fill="var(--color-expenses)"
                        fillOpacity={0.4}
                        stroke="var(--color-expenses)"
                    />
                </LineChart>
            </ChartContainer>
        </div>
    );
}
