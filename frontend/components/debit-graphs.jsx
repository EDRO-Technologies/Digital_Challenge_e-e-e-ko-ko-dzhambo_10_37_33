"use client";

import { Area, AreaChart, XAxis, YAxis } from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import Image from "next/image";

const chartConfig = {
    date_fact: {
        label: "Дата",
        color: "hsl(var(--chart-1))",
    },
    debit: {
        label: "Затраты",
        color: "hsl(var(--chart-2))",
    },
};

// mode is week, month, year
export default function DebitGraphs({ data, mode }) {
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
                    interval: 1,
                    tick: ({ x, y, payload }) => {
                        const value =
                            payload.index === 0 ||
                            payload.index === data?.length - 1
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
        <div className="bg-white max-h-[255px] py-4  px-5 w-full rounded-[32px]">
            <div className="flex flex-row flex-grow items-center max-h-[87px]">
                <div className="flex flex-row items-center space-x-3">
                    <div className="background-contrast-for-icons">
                        <Image src="/Waterfall.svg" width={16} height={16} />
                    </div>
                    <p className="align-middle">Дебит скважины</p>
                    <p className="self-start text-xs">м3</p>
                </div>

                <div></div>
            </div>

            <ChartContainer className="w-full" config={chartConfig}>
                <AreaChart accessibilityLayer data={preparingData}>
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
                    <Area
                        dataKey="debit"
                        type="natural"
                        fill="var(--color-debit)"
                        fillOpacity={0.4}
                        stroke="var(--color-debit)"
                    />
                </AreaChart>
            </ChartContainer>
        </div>
    );
}
