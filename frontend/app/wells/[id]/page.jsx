"use client";

import { useParams } from "next/navigation";
import useSupabaseBrowser from "@/utils/supabase/client";
import Image from "next/image";
import ExpensesGraph from "@/components/expenses-graph";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import DebitGraphs from "@/components/debit-graphs";

export default function Page() {
    const params = useParams();
    const supabase = useSupabaseBrowser();
    const [well, setWell] = useState(null);
    const [mode, setMode] = useState("week");

    function getWellByMode() {
        let time;

        switch (mode) {
            case "week": {
                time = {
                    weeks: 1,
                };
            }
            case "month": {
                time = {
                    months: 1,
                };
            }
            case "year": {
                time = {
                    year: 1,
                };
            }
        }

        return well?.wellDayHistory.filter(
            (elem) =>
                DateTime.fromISO(elem.date_fact).toMillis() >
                DateTime.now().minus(time).toMillis(),
        );
    }

    useEffect(() => {
        (async () => {
            const { data, error } = await supabase
                .from("wells")
                .select("*, wellDayHistory:well_day_histories(*)")
                .eq("well_id", params.id)
                .single();

                console.log(data)
            if (error) throw new Error(error);

            setWell(data);
        })();
    }, []);

    return (
        <main>
            <div className="my-[35px] flex w-full justify-between pl-[82px]">
                <h1 className="text-[42px] font-medium">Куст 2, Сургут</h1>
                <div className="flex">
                    <div className="max-w-[137px] w-full h-[36px] rounded-full border border-[#E3E2E7] flex items-center">
                        <span className="font-medium text-xs text-black pl-[15px]">
                            Показ: Неделя
                        </span>
                        <img
                            src="/arrow_down.svg"
                            alt="arrow"
                            className="w-[12px] h-[12px] ml-[5px] mr-[10px] mt-[1px]"
                        />
                    </div>
                    <div className="w-[190px] h-[36px] bg-white rounded-full mx-[8px] flex justify-center items-center">
                        <span className="font-medium text-xs">
                            Выбор подразделения
                        </span>
                        <img
                            src="/arrow_down.svg"
                            alt="arrow"
                            className="w-[12px] h-[12px] ml-[5px] mt-[1px]"
                        />
                    </div>
                    <div className="bg-white flex w-[156px] h-[36px] rounded-full items-center justify-center">
                        <span className="font-medium text-xs">
                            Выбор скважины
                        </span>
                        <img
                            src="/arrow_down.svg"
                            alt="arrow"
                            className="w-[12px] h-[12px] ml-[5px] mt-[1px]"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-row justify-between w-full h-full">
                {/* sidebar */}
                <div className="flex flex-col h-full justify-between max-h-[529px]">
                    <div className="bg-white px-2 py-4 rounded-full space-y-3">
                        <div className="flex flex-row justify-center items-center w-10 h-10 bg-black rounded-full cursor-pointer">
                            <Image
                                src="/darhboard_alt.svg"
                                width="21"
                                height="21"
                                alt="dh"
                            />
                        </div>
                        <div className="flex flex-row justify-center items-center w-10 h-10 cursor-pointer">
                            <Image
                                src="/navigation.svg"
                                width="24"
                                height="24"
                                alt="dh"
                            />
                        </div>
                    </div>

                    <div className="bg-white px-2 py-3 rounded-full space-y-3">
                        <div className="flex flex-row justify-center items-center w-10 h-10 bg-white rounded-full cursor-pointer">
                            <Image
                                src="/setting_icon.svg"
                                width="24"
                                height="24"
                                alt="dh"
                            />
                        </div>
                        <div className="flex flex-row justify-center items-center w-10 h-10 bg-black rounded-full cursor-pointer">
                            <Image
                                src="/arrow_right.svg"
                                width="18"
                                height="0"
                                alt="dh"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col flex-grow justify-between mx-6 space-y-6">
                    <div className="flex flex-row flex-grow space-x-6 max-h-[50%]">
                        {/* Затраты */}
                        <ExpensesGraph data={getWellByMode()} mode={mode} />

                        {/* дебит скважины */}
                        <DebitGraphs data={getWellByMode()} mode={mode} />
                    </div>
                </div>

                <div className="max-w-[282px] h-[529px] bg-white w-full rounded-[32px]"></div>
            </div>
        </main>
    );
}
