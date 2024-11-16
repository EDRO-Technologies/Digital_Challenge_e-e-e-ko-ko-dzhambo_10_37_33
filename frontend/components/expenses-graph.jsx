"use client";

import { Line, LineChart, XAxis, YAxis } from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";

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

// mode is week, month, year
export default function Component({ data, mode = "week" }) {
    const [preparingData, setPreparingData] = useState(data);

    useEffect(() => {
        if (mode === "year") {
            const newData = [];

            for (let i = 1; i < 360; i += 30) {
                newData.push(data?.[i]);
            }

            setPreparingData(newData);
        }
    }, [data, setPreparingData]);

    function XAxisProps() {
        switch (mode) {
            case "week": {
                return {
                    dataKey: "date_fact",
                    tickLine: false,
                    axisLine: false,
                    interval: 0,
                    tick: {
                        fontSize: 10,
                    },
                    tickFormatter: (value) => {
                        switch (DateTime.fromISO(value).weekday) {
                            case 1:
                                return "пн";
                            case 2:
                                return "вт";
                            case 3:
                                return "ср";
                            case 4:
                                return "чт";
                            case 5:
                                return "пт";
                            case 6:
                                return "сб";
                            case 7:
                                return "вс";
                            default:
                                return "";
                        }
                    },
                };
            }
            case "month": {
                return {
                    dataKey: "date_fact",
                    tickLine: false,
                    axisLine: false,
                    interval: 4,
                    tick: ({ x, y, payload }) => {
                        const value =
                            payload.index === 0 ||
                            payload.index === data.length - 1
                                ? null
                                : DateTime.fromISO(payload.value).toFormat(
                                      "LL dd",
                                  );

                        return (
                            <text x={x} y={y} textAnchor="middle">
                                {value}
                            </text>
                        );
                    },
                };
            }
            case "year": {
                return {
                    dataKey: "date_fact",
                    tickLine: false,
                    axisLine: false,
                    interval: 50,
                    tick: ({ x, y, payload }) => {
                        const value =
                            payload.index === 0 ||
                            payload.index === data.length - 1
                                ? null
                                : DateTime.fromISO(payload.value).toFormat(
                                      "LLL",
                                      {
                                          locale: "ru-RU",
                                      },
                                  );

                        return (
                            <text x={x} y={y} textAnchor="middle">
                                {value}
                            </text>
                        );
                    },
                };
            }
            default: {
                return {
                    dataKey: "date_fact",
                    tickLine: false,
                    axisLine: false,
                    tickFormatter: () => "",
                };
            }
        }
    }

    return (
        <div className="bg-white max-w-[284px] flex-grow rounded-2xl p-4">
            <p className="font-medium text-[#686868] mt-0">Общие траты</p>
            <p className="text-2xl font-semibold mt-2">₽120,000</p>
            <p className="text-[#767676] mt-[3px]">+20% с прошлого дня</p>

            <ChartContainer className="w-full" config={chartConfig}>
                <LineChart accessibilityLayer data={data
                    
                }>
                    <XAxis {...XAxisProps()} />
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
