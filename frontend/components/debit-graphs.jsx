"use client";

import { Area, AreaChart, XAxis, YAxis } from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

const chartConfig = {
    date_fact: {
        label: "Дата",
        color: "#B591EF",
    },
    debit: {
        label: "Затраты",
        color: "#B591EF",
    },
}
    ;
const chartPredConfig = {
    date: {
        label: "Дата",
        color: "#B591EF",
    },
    predictedDebit: {
        label: "Затраты",
        color: "#B591EF",
    },
};

export default function DebitGraphs({ data, prediction, mode }) {
    const [isPredication, setIsPrediction] = useState(false);
    const [preparingData, setPreparingData] = useState([])

    useEffect(() => {
        if (mode === "year") {
            const newData = [];

            for (let i = 1; i < 360; i += 30) {
                newData.push(data?.[i]);
            }

            setPreparingData(newData);
        } else {
            setPreparingData(data);
        }
    }, [data, setPreparingData]);

    const activePredicationClasses =
        "bg-black cursor-pointer px-[11px] text-white rounded-full text-[11px] font-medium py-[12px]";
    const inactivePredicationClasses =
        "rounded-full font-medium cursor-pointer text-[11px] mx-[7px]";

    return (
        <div className="bg-white max-w-[616px] px-5 py-5 w-full h-[255px] rounded-[32px] flex flex-col justify-between">
            <div className="w-full flex align-middle justify-between items-center">
                <div className="flex">
                    <div className="w-[38px] h-[38px] bg-[#F5F5F5] rounded-full flex justify-center items-center">
                        <Image
                            width={20}
                            height={20}
                            src="/diagramma.svg"
                            alt="diagram"
                        />
                    </div>
                    <div className="flex flex-row items-center ml-3">
                        <span className="font-medium text-[16px] ml-[10px]">
                            Дебит скважины
                        </span>
                        <span className="text-[#5D5D5D] font-medium text-[13px]">
                            м
                        </span>
                        <span className="text-[#5D5D5D] font-medium text-[10px]">
                            3
                        </span>
                    </div>
                </div>

                {/* кнопка переключения прогноза*/}
                <div className="w-[151px] h-[38px] bg-[#F5F5F5] rounded-[42px] flex items-center">
                    <span
                        onClick={() => setIsPrediction(false)}
                        className={clsx(
                            isPredication
                                ? inactivePredicationClasses
                                : activePredicationClasses,
                        )}
                    >
                        Актуальное
                    </span>
                    <span
                        onClick={() => setIsPrediction(true)}
                        className={clsx(
                            isPredication
                                ? activePredicationClasses
                                : inactivePredicationClasses,
                        )}
                    >
                        Прогноз
                    </span>
                </div>
            </div>

            {isPredication ? (
                <ChartContainer className="h-[75%]" config={chartPredConfig}>
                    <AreaChart accessibilityLayer data={data}>
                        <XAxis dataKey="date" />
                        <Area
                            dataKey="predictedDebit"
                            type="natural"
                            fill="var(--color-predictedDebit)"
                            fillOpacity={0.4}
                            stroke="var(--color-predictedDebit)"
                        />
                        <YAxis
                            hide={false}
                            domain={["dataMin - 5", "dataMax + 5"]}
                        />
                        <ChartTooltip />
                    </AreaChart>
                </ChartContainer>
            ) : (
                <ChartContainer className="h-[75%]" config={chartConfig}>
                    <AreaChart accessibilityLayer data={preparingData}>
                        <XAxis dataKey="date_fact" />
                        <Area 
                            dataKey="debit"
                            type="natural"
                            fill="var(--color-debit)"
                            fillOpacity={0.4}
                            stroke="var(--color-debit)"
                         />
                        <YAxis
                            hide={false}
                            domain={["dataMin - 5", "dataMax + 5"]}
                        />
                        <ChartTooltip />
                    </AreaChart>
                </ChartContainer>
            )}
        </div>
    );
}
