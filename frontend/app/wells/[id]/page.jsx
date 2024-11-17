"use client";

import { useParams } from "next/navigation";
import useSupabaseBrowser from "@/utils/supabase/client";
import Image from "next/image";
import ExpensesGraph from "@/components/expenses-graph";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import ModelVishka from "@/components/3d models/ModelVishka";
import DebitGraphs from "@/components/debit-graphs";

const mods = [
    {
        label: "Неделя",
        value: "week",
    },
    {
        label: "Месяц",
        value: "month",
    },
    {
        label: "Год",
        value: "year",
    },
];

export default function Page() {
    const params = useParams();
    const supabase = useSupabaseBrowser();
    const [well, setWell] = useState(null);
    const [predictionDebit, setPredictionDebit] = useState(null);
    const [mode, setMode] = useState("week");

    useEffect(() => {
        (async () => {
            const { data, error } = await supabase
                .from("wells")
                .select("*, wellDayHistory:well_day_histories(*)")
                .eq("well_id", params.id)
                .single();

            if (error) throw new Error(error);

            setWell(data);
        })();

        (async () => {
            const res = await fetch(process.env.NEXT_PUBLIC_AI_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain",
                },
                mode: "no-cors",
                body: JSON.stringify({
                    WellId: params.id,
                    AttributeId: 1,
                }),
            });

            const data = res.json();
            console.log(res)

            setPredictionDebit(data);
        })();
    }, []);

    function getWellByMode() {
        let time;

        switch (mode) {
            case "week":
                time = { weeks: 1 };
                break;
            case "month":
                time = { months: 1 };
                break;
            case "year":
                time = { years: 1 };
                break;
        }

        return well?.wellDayHistory.filter(
            (elem) =>
                (DateTime.fromISO(elem.date_fact).toMillis() >
                    DateTime.now().minus(time).toMillis()) &
                (DateTime.fromISO(elem.date_fact).toMillis() <
                    DateTime.now().toMillis()),
        );
    }

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

                <div className="flex flex-col flex-grow justify-between mx-6 space-y-6 max-h-[529px]">
                    <div className="flex flex-row w-full justify-between">
                        {/* Затраты */}
                        <ExpensesGraph data={getWellByMode()} mode={mode} />

                        {/* дебит скважины */}
                        <DebitGraphs
                            data={getWellByMode()}
                            mode={mode}
                            prediction={predictionDebit}
                        />
                    </div>

                    {/* Виджеты + помпа */}
                    <div className="w-full flex justify-between">
                        <div className="max-w-[610px] h-[250px] bg-white w-full rounded-[32px] flex flex-col">
                            <div className="w-full flex justify-between">
                                <div className="flex">
                                    <div className="w-[38px] h-[38px] bg-[#F5F5F5] rounded-full flex justify-center items-center mt-[20px] ml-[25px]">
                                        <img
                                            src="/diagramma.svg"
                                            alt="diagram"
                                        />
                                    </div>
                                    <div className="mt-[27px] flex">
                                        <span className="font-medium text-[16px] ml-[10px]">
                                            Электропотребление
                                        </span>
                                        <span className="text-[#5D5D5D] font-medium text-[13px]">
                                            КВт
                                        </span>
                                        <span className="text-[#5D5D5D] font-medium text-[10px]">
                                            Ч
                                        </span>
                                    </div>
                                </div>
                                {/* кнопка переключения прогноза*/}
                                <div className="w-[151px] h-[38px] bg-[#F5F5F5] rounded-[42px] flex items-center mt-[20px] mr-[29px]">
                                    <span className="bg-black px-[11px] text-white rounded-full text-[11px] font-medium py-[12px]">
                                        Актуальное
                                    </span>
                                    <span className="font-medium text-[11px] ml-[7px]">
                                        Прогноз
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col h-full justify-between">
                            <div className="flex">
                                <div className="w-[140px] h-[135px] bg-[#E7DFF6] rounded-[32px] flex flex-col">
                                    <span className="text-[11px] font-medium max-w-[59px] mt-[17px] ml-[17px]">
                                        Наработка насоса
                                    </span>
                                    <span className="text-[36px] font-medium ml-[17px] mt-[10px]">
                                        20ч
                                    </span>
                                </div>
                                <div className="w-[140px] h-[135px] bg-[#ffffff] rounded-[32px] ml-[12px] flex flex-col">
                                    <span className="text-[11px] font-medium mt-[17px] ml-[17px]">
                                        Местоположение скважины
                                    </span>
                                    <span className="font-semibold text-[24px] ml-[17px] mt-[22px]">
                                        Хвойное
                                    </span>
                                </div>
                            </div>
                            <div className="w-[292px] h-[98px] bg-white rounded-[32px] flex flex-col">
                                <span className="font-medium text-xs color-black ml-[28px] mt-[17px]">
                                    Время работы скважины
                                </span>
                                <span className="font-medium text-[22px] ml-[28px] mt-[9px]">
                                    2 года, 8 месяцев
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-[282px] h-[529px] bg-white w-full rounded-[32px]">
                    <ModelVishka />
                </div>
            </div>
        </main>
    );
}
